import Message from "./classes/Message";
import Scan from "./classes/Scan";
import Stream from "./classes/Stream";
import {AVAILABLE, CANCELLED, REMOVED, SCANNING, STOPPING, UNAUTHORIZED} from "./utils/states";
import Options from "./classes/Options";

export default class Scanner {

    options = new Options();

    constructor(options){
        this.setOptions(options);

        this.message = new Message(this);

        this.startElement = this.getOption('startElement');
        this.position = this.startElement.getBoundingClientRect();
        this.startElement.addEventListener('click', async () => this.start());
    }

    setState(state){
        this.state = state;
    }

    isState(state){
        return this.state === state;
    }

    setOptions(options){
        for (let option in options){
            this.setOption(option, options[option]);
        }
        if (!this.getOption('performScan')) throw new Error('Need method for performing scan');
    }

    setOption(option, value){
        this.options[option] = value;
    }

    getOption(option){
        return this.options[option];
    }

    //Create scanner over calling element with video, canvas, back button, bg icon
    create(){
        this.scanner = document.createElement('div');
        const {top, left, width, height} = this.position;

        this.scanner.classList.add(this.getOption('classname'));
        this.scanner.classList.add(this.getOption('theme'));
        this.scanner.style.position = 'fixed';
        this.scanner.style.top = top + 'px';
        this.scanner.style.left = left + 'px';
        this.scanner.style.width = width + 'px';
        this.scanner.style.height = height + 'px';

        this.icon = document.createElement('p');
        this.icon.className = 'icon';
        this.iconTopBorder = document.createElement('div');
        this.iconTopBorder.className = 'iconTopBorder';
        this.iconBottomBorder = document.createElement('div');
        this.iconBottomBorder.className = 'iconBottomBorder';
        this.iconContent = document.createElement('div');
        this.iconContent.innerHTML = this.getOption('iconHTML');
        this.icon.append(this.iconTopBorder);
        this.icon.append(this.iconBottomBorder);
        this.icon.append(this.iconContent);

        this.backBtn = document.createElement('button');
        this.backBtn.type = 'button';
        this.backBtn.id = 'backBtn';
        this.backBtn.innerHTML = this.getOption('backBtnHTML');
        this.backBtn.addEventListener('click', async () => this.handleCancel());

        this.stream = new Stream(this);
        this.scan = new Scan(this);

        this.scanner.appendChild(this.stream.canvas);
        this.scanner.appendChild(this.stream.video);
        this.scanner.appendChild(this.icon);
        this.scanner.appendChild(this.backBtn);

        const parent = this.getOption('parentElement');
        parent.appendChild(this.scanner);

        this.setState(AVAILABLE)
    }

    //Start scanner
    async start(){
        if (!this.scanner || this.isState(REMOVED)) this.create();
        try {
            await this.animateIn(); //Animation first to allow animation to mask video start lag
            await this.stream.start();
            this.setState(SCANNING);
            await this.requestFrameScan();
        } catch (e) {
            await this.handleError();
        }
    }

    //Stop scanner
    async stop(){
        if (this.isScanning()) {
            this.setState(STOPPING);
            await this.stream.stop();
        }
        await this.animateOut();
        setTimeout(() => this.message.hide(), 2000);
        this.scanner.remove();
        this.setState(REMOVED);
    }

    //Recursively scan camera input
    async requestFrameScan(){
        return await this.requestAnimation(this.scanFrame.bind(this), 20);
    }

    //Single image scan
    async scanFrame() {
        if (!this.isScanning()) return;
        if (this.stream.ready()) {
            this.scan.prepare();
            await this.scan.perform();
        }
        await this.requestFrameScan();
    }

    //Cancel scanning
    async handleCancel(){
        await this.stop();
        this.message.update(CANCELLED);
    }

    //Error scanning
    async handleError(){
        setTimeout( async () => {
            await this.stop();
            this.message.update(UNAUTHORIZED);
        }, 300)
    }

    //State
    isScanning(){
        return this.state === SCANNING;
    }

    //Animations
    async animateIn(){
        const duration = '350';
        const animation = () => {
            this.scanner.style.transition = `
                width ${duration}ms ease-in-out,
                height ${duration}ms ease-in-out,
                left ${duration}ms ease-in-out,
                top ${duration}ms ease-in-out
            `;
            this.scanner.style.zIndex = "1000";
            this.scanner.style.opacity = 1;
            this.scanner.style.top = 0;
            this.scanner.style.left = 0;
            this.scanner.style.width = '100vw';
            this.scanner.style.height = '100vh';
        };
        return new Promise( async res => {
            await this.requestAnimation(animation, duration);
            this.scanner.classList.add('show');
            this.backBtn.style.opacity = '1';
            res();
        })
    }

    async animateOut(){
        const duration = '350';
        const {top, left, width, height} = this.position;
        const animation = () => {
            this.backBtn.style.opacity = 0;
            this.stream.hide();
            this.scanner.classList.remove('show');
            this.scanner.style.transition = `
                width ${duration}ms ease-in-out,
                height ${duration}ms ease-in-out,
                left ${duration}ms ease-in-out,
                top ${duration}ms ease-in-out
            `;

            this.scanner.style.top = top + 'px';
            this.scanner.style.left = left + 'px';
            this.scanner.style.width = width + 'px';
            this.scanner.style.height = height + 'px';
        };

        return new Promise( async res => {
            await this.requestAnimation(animation, duration);
           res();
        });
    }

    requestAnimation(animation, duration){
        return new Promise( res => {
            requestAnimationFrame(animation);
            setTimeout(res, duration);
        });
    }

}
