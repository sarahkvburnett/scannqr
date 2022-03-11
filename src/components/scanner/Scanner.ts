import {AVAILABLE, REMOVED, SCANNING, STOPPING, CANCELLED, UNAUTHORIZED} from "@utils/states";
import Message from "@scanner/Message";
import Stream from "@scanner/Stream";
import Scan from "@scanner/Scan";
import Options from "@scanner/Options";

export default class Scanner {

    protected options;
    message: Message;
    scanner: HTMLDivElement;
    protected startBtn: HTMLElement;
    protected position: DOMRect;
    protected state: string;
    protected icon: HTMLParagraphElement;
    protected backBtn: HTMLButtonElement;
    protected stream: Stream;
    protected scan: Scan;

    constructor(customOptions){
        this.init(customOptions);
        this.startBtn = this.getOption('startBtn');
        this.position = this.startBtn.getBoundingClientRect();
        this.startBtn.addEventListener('click', async () => this.start());
    }

    init(customOptions): void {
        this.options = new Options();
        this.message = new Message(this);
        this.stream = new Stream(this);
        this.scan = new Scan(this);
        this.setCustomOptions(customOptions);
    }

    setState(state: string): void {
        this.state = state;
    }

    isState(state: string): boolean {
        return this.state === state;
    }

    setCustomOptions(options){
        for (let option in options){
            this.setOption(option, options[option]);
        }
        this.validateOptions();
    }

    setOption(option: string, value: any): void {
        this.options[option] = value;
    }

    getOption(option: string ): any {
        return this.options[option];
    }

    validateOptions(): void {
        if (!this.getOption('performScan')) throw new Error('Need method for performing scan');
        if (!this.getOption('wrapper')) throw new Error('Missing element to append scanner');
        if (!this.getOption('startBtn')) throw new Error('Missing button to start scanner');
    }

    //Create scanner over start button with video, canvas, back button, bg icon
    create(): void {
        this.scanner = document.createElement('div');
        const {top, left, width, height} = this.position;

        this.scanner.className = `${this.getOption('classname')} scanner--${this.getOption('theme')}`
        this.scanner.style.position = 'fixed';
        this.scanner.style.top = top + 'px';
        this.scanner.style.left = left + 'px';
        this.scanner.style.width = width + 'px';
        this.scanner.style.height = height + 'px';

        this.icon = document.createElement('p');
        this.icon.className = 'scanner__icon';
        const iconTopBorder = document.createElement('div');
        iconTopBorder.className = 'icon__border-top';
        const iconBottomBorder = document.createElement('div');
        iconBottomBorder.className = 'icon__border-bottom';
        this.icon.append(iconTopBorder);
        this.icon.append(iconBottomBorder);

        this.backBtn = document.createElement('button');
        this.backBtn.type = 'button';
        this.backBtn.className = 'scanner__back-btn';
        this.backBtn.innerHTML = this.getOption('backBtnMsg');
        this.backBtn.addEventListener('click', async () => this.handleCancel());

        this.scanner.appendChild(this.stream.canvas);
        this.scanner.appendChild(this.stream.video);
        this.scanner.appendChild(this.icon);
        this.scanner.appendChild(this.backBtn);

        const wrapper = this.getOption('wrapper');
        wrapper.appendChild(this.scanner);

        this.setState(AVAILABLE)
    }

    //Start scanner
    async start(): Promise<void> {
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
    async stop(): Promise<void> {
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
    isScanning(): boolean {
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
            this.scanner.style.opacity = "1";
            this.scanner.style.top = "0";
            this.scanner.style.left = "0";
            this.scanner.style.width = '100vw';
            this.scanner.style.height = '100vh';
        };
        return new Promise<void>( async res => {
            await this.requestAnimation(animation, duration);
            this.scanner.classList.add('scanner--show');
            this.backBtn.style.opacity = '1';
            res();
        })
    }

    async animateOut(){
        const duration = '350';
        const {top, left, width, height} = this.position;
        const animation = () => {
            this.backBtn.style.opacity = "0";
            this.stream.hide();
            this.scanner.classList.remove('scanner--show');
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

        return new Promise<void>( async res => {
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
