export default class Scanner {

    isScanning = false;

    constructor(options){
        if (!options) throw new Error('Need to provide options object to create scanner');
        if (!options.hasOwnProperty('container')) throw new Error('Need container to append created scanner');
        if (!options.hasOwnProperty('position')) throw new Error('Need starting position for scanner');

        this.container = options['container'];
        this.position = options['position'];

        this.backBtnHTML = options['backBtnHTML'] ?? 'Go Back';
        this.iconHTML = options['iconHTML'] ?? '';
        this.videoFacingMode = options['videoFacingMode'] ?? 'environment';
        this.classname = options['classname'] ?? 'scanner';
        this.scanFrequency = options['scanFrequency'] ?? 20;

        if (options.hasOwnProperty('scanImage')) this.scanImage = options['scanImage'];
        if (options.hasOwnProperty('displaySuccess')) this.displaySuccess = options['displaySuccess'];
        if (options.hasOwnProperty('displayError')) this.displayError = options['displayError'];
    }

    //Create scanner over calling element with video, canvas, back button, bg icon
    create(){
        this.scanner = document.createElement('div');
        const {top, left, width, height} = this.position;
        this.scanner.classList.add(this.classname);
        this.scanner.style.position = 'fixed';
        this.scanner.style.top = top + 'px';
        this.scanner.style.left = left + 'px';
        this.scanner.style.width = width + 'px';
        this.scanner.style.height = height + 'px';

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext("2d");

        this.video = document.createElement('video');
        this.video.autoplay = true;
        this.video.muted = true;
        this.video.playsInline = true;

        this.icon = document.createElement('p');
        this.icon.className = 'icon';
        this.icon.style.fontSize = '2rem';
        this.icon.innerHTML = this.iconHTML;

        this.backBtn = document.createElement('button');
        this.backBtn.type = 'button';
        this.backBtn.id = 'backBtn';
        this.backBtn.innerHTML = this.backBtnHTML;
        this.backBtn.addEventListener('click', async () => this.stop());

        this.scanner.appendChild(this.canvas);
        this.scanner.appendChild(this.video);
        this.scanner.appendChild(this.icon);
        this.scanner.appendChild(this.backBtn);

        document.querySelector(this.container).appendChild(this.scanner);
    }

    //Start scanner
    async start(){
        if (!this.scanner) this.create();
        try {
            await this.animateIn();
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: this.videoFacingMode } });
            this.video.srcObject = await stream;
            this.video.play();
            this.isScanning = true;
            await this.requestScan();
            this.startTime = Date.now();
        } catch (e) {
            throw e;
        }
    }

    //Stop scanner
    async stop(){
        if (this.isScanning) {
            this.video.pause();
            (this.video.srcObject.getTracks()).forEach(track => track.stop());
            this.video.srcObject = null;
            this.isScanning = false;
        }
        await this.animateOut();
        this.scanner.remove();
    }

    //Perform scan
    async scan() {
        if (!this.isScanning) return;
        if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
            this.drawCanvas();
            await this.scanImage();
        }
        await this.requestScan();
    }

    //Perform image scan
    async scanImage() {
        //Scan image as required then call displayResult
        throw new Error('Method must be implemented');
    }

    async displaySuccess(result) {
        //Display successful result of scan
        throw new Error('Method must be implemented');
    }

    async displayError(result) {
        //Display unsuccessful result of scan
        throw new Error('Method must be implemented');
    }

    //Draw on canvas
    drawCanvas(){
        this.canvas.height = this.video.videoHeight;
        this.canvas.width = this.video.videoWidth;
        this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
        if (this.canvas.style.opacity == 0) this.canvas.style.opacity = 1;
    }

    //Animations
    async requestScan(){
        return await this.requestAnimation(this.scan.bind(this), this.scanFrequency);
    }

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
            this.scanner.style.opacity = '1';
            this.scanner.style.top = 0;
            this.scanner.style.left = 0;
            this.scanner.style.width = '100vw';
            this.scanner.style.height = '100vh';

            this.icon.style.fontSize = '50vh';
        };
        return new Promise( async res => {
            await this.requestAnimation(animation, duration);
            this.backBtn.style.opacity = '1';
            res();
        })
    }

    async animateOut(){
        const duration = '350';
        const animation = () => {
            this.backBtn.style.opacity = '0';
            this.canvas.style.opacity = '0';

            this.scanner.style.transition = `
                width ${duration}ms ease-in-out,
                height ${duration}ms ease-in-out,
                left ${duration}ms ease-in-out,
                top ${duration}ms ease-in-out
            `;

            this.scanner.style.top = this.position.top + 'px';
            this.scanner.style.left = this.position.left + 'px';
            this.scanner.style.width = this.position.width + 'px';
            this.scanner.style.height = this.position.height + 'px';

            this.icon.style.fontSize = '2rem';
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
