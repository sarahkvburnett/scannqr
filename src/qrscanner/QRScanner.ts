import jsQR, { QRCode } from "jsqr";

export default class QRScanner {

    protected scanner: HTMLElement;
    protected canvas: HTMLCanvasElement;
    protected video: HTMLVideoElement;
    protected icon: HTMLElement;
    protected backBtn: HTMLButtonElement;
    protected ctx: CanvasRenderingContext2D;

    protected wrapper: HTMLElement;
    protected startBtn: HTMLElement;
    protected output: HTMLInputElement;
    protected submitBtn: HTMLButtonElement;
    protected backBtnMsg: string = 'Go Back';
    protected primaryColor: string = '#03a803';
    protected outlineDuration: number = 700;

    protected isScanning: boolean = false;
    protected classname: string = 'qrscanner';
    protected QRCode: QRCode;

    constructor(options: any) {
        if (!options.hasOwnProperty('wrapper')) throw new Error('Missing wrapper to append QRScanner');
        if (!options.hasOwnProperty('startBtn')) throw new Error('Missing button to start QRScanner');

        if (options.hasOwnProperty('primaryColor')) this.primaryColor = options.primaryColor;
        if (options.hasOwnProperty('backBtnMsg')) this.backBtnMsg = options.backBtnMsg;
        if (options.hasOwnProperty('output')) this.output = options.output;
        if (options.hasOwnProperty('submitBtn')) this.submitBtn = options.submitBtn;

        if (options.hasOwnProperty('performScan')) this.performScan = options.performScan;
        if (options.hasOwnProperty('handleScanSuccess')) this.handleScanSuccess = options.handleScanSuccess;
        if (options.hasOwnProperty('outlineDuration')) this.outlineDuration = options.outlineDuration;

        this.wrapper = options.wrapper;
        this.startBtn = options.startBtn;

        this.create();
    }

    //Create scanner with video, canvas, back button, bg icon
    create() {
        const scanner = document.createElement('div');
        const {top, left, width, height} = this.startBtn.getBoundingClientRect();
        scanner.classList.add(this.classname);
        scanner.style.position = 'fixed';
        scanner.style.top = top + 'px';
        scanner.style.left = left + 'px';
        scanner.style.width = width + 'px';
        scanner.style.height = height + 'px';

        const canvas = document.createElement('canvas');
        const video = document.createElement('video');

        const icon = document.createElement('p');
        icon.className = 'icon';
        icon.style.fontSize = '2rem';
        icon.innerHTML = '<i class="fas fa-qrcode">';

        const backBtn = document.createElement('button');
        backBtn.type = 'button';
        backBtn.id = 'backBtn';
        backBtn.innerHTML = this.backBtnMsg;

        video.autoplay = true;
        video.muted = true;
        video.playsInline = true;

        scanner.appendChild(canvas);
        scanner.appendChild(video);
        scanner.appendChild(icon);
        scanner.appendChild(backBtn);

        this.scanner = scanner;
        this.canvas = canvas;
        this.video = video;
        this.icon = icon;
        this.backBtn = backBtn;
        this.ctx = canvas.getContext("2d", { willReadFrequently: true});

        this.backBtn.addEventListener('click', () => this.stop());
        this.startBtn.addEventListener('click', async () => await this.start());

        this.wrapper.append(scanner);
    }

    //Start scanner
    async start() {
        try {
            if (!this.scanner) this.create();
            this.animateIn();
            const stream = await navigator.mediaDevices.getUserMedia({video: {facingMode: "environment"}});
            this.video.srcObject = await stream;
            this.video.play();
            this.requestScan();
            this.isScanning = true;
        } catch {
        }
    }

    //Stop scanner
    async stop() {
        if (!this.isScanning) return;
        this.video.pause();
        const mediaStream = <MediaStream>this.video.srcObject;
        (mediaStream.getTracks()).forEach(track => track.stop());
        this.video.srcObject = null;
        this.isScanning = false;
        await this.animateOut();
        this.scanner.remove();
        this.scanner = null;
    }

    //Perform barcode scan
    async scan() {
        if (!this.isScanning) return;
        if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
            this.displayFrame();
            await this.performScan()
        }
        await this.requestScan();
    }

    //Scan Result
    async performScan() {
        //Extract barcode from canvas
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.QRCode = jsQR(imageData.data, imageData.width, imageData.height, {inversionAttempts: "dontInvert"});
        if (this.QRCode) await this.handleScanSuccess();
    }

    //Successful scan outcome
    async handleScanSuccess(){
        await this.outlineQRCode();
        await this.stop();
        if (this.output) this.output.value = this.QRCode.data;
        if (this.submitBtn) this.submitBtn.click();
    }

    //Canvas Drawing
    displayFrame(){
        this.canvas.height = this.video.videoHeight;
        this.canvas.width = this.video.videoWidth;
        this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
        if (this.canvas.style.opacity == '0') this.canvas.style.opacity = '1';
    }

    async outlineQRCode(){
        const code = this.QRCode;
        this.drawLine(code.location.topLeftCorner, code.location.topRightCorner);
        this.drawLine(code.location.topRightCorner, code.location.bottomRightCorner);
        this.drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner);
        this.drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner);
        await new Promise((res) => setTimeout(res, this.outlineDuration));
    }

    drawLine(begin: { x: number; y: number; }, end: { x: number; y: number; }) {
        this.ctx.beginPath();
        this.ctx.moveTo(begin.x, begin.y);
        this.ctx.lineTo(end.x, end.y);
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = this.primaryColor;
        this.ctx.stroke();
    }

    //Animations
    async requestScan(){
        return await this.requestAnimation(this.scan.bind(this), 20);
    }

    async animateIn(){
        const duration = 350;
        const animation = () => {
            this.scanner.style.transition = `
                width ${duration}ms ease-in-out,
                height ${duration}ms ease-in-out,
                left ${duration}ms ease-in-out,
                top ${duration}ms ease-in-out
            `;
            this.scanner.style.zIndex = '1000';
            this.scanner.style.opacity = '1';
            this.scanner.style.top = '0';
            this.scanner.style.left = '0';
            this.scanner.style.width = '100vw';
            this.scanner.style.height = '100vh';

            this.icon.style.fontSize = '50vh';

            this.canvas.style.opacity = '1';
        };
        return new Promise<void>( async res => {
            await this.requestAnimation(animation, duration);
            this.backBtn.style.opacity = '1';
            res();
        })
    }

    async animateOut(){
        const canvas = this.canvas;
        const scanner = this.scanner;
        const backBtn = this.backBtn;
        const icon = this.icon;
        const {top, left, width, height} = this.startBtn.getBoundingClientRect();
        const duration = 350;
        const animation = () => {
            backBtn.style.opacity = '0';
            canvas.style.opacity = '0';

            scanner.style.transition = `
                width ${duration}ms ease-in-out,
                height ${duration}ms ease-in-out,
                left ${duration}ms ease-in-out,
                top ${duration}ms ease-in-out
            `;

            scanner.style.top = top + 'px';
            scanner.style.left = left + 'px';
            scanner.style.width = width + 'px';
            scanner.style.height = height + 'px';

            icon.style.fontSize = '2rem';
        };

        return new Promise<void>( async res => {
            await this.requestAnimation(animation, duration);
            res();
        });
    }

    requestAnimation(animation: FrameRequestCallback, duration: number){
        return new Promise( res => {
            requestAnimationFrame(animation);
            setTimeout(res, duration);
        });
    }

}
