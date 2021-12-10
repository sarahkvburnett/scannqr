export default class Stream {

    constructor(scanner) {
        this.scanner = scanner;

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext("2d");

        this.video = document.createElement('video');
        this.video.autoplay = true;
        this.video.muted = true;
        this.video.playsInline = true;
    }

    getOption(option){
        return this.scanner.getOption(option);
    }

    //Video
    async start() {
        const stream = await navigator.mediaDevices.getUserMedia({video: {facingMode: this.getOption('videoFacingMode')}});
        this.video.srcObject = await stream;
        await this.video.play();
    }

    async stop() {
        this.video.pause();
        (this.video.srcObject.getTracks()).forEach(track => track.stop());
        this.video.srcObject = null;
    }

    ready(){
        return this.video.readyState === this.video.HAVE_ENOUGH_DATA;
    }

    //Canvas
    draw(){
        this.canvas.height = this.video.videoHeight;
        this.canvas.width = this.video.videoWidth;
        this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
        if (this.getOption('displayVideo') && this.canvas.style.opacity == 0) {
            this.scanner.scanner.style.opacity = 1;
            this.canvas.style.opacity = 1;
        }
    }

    blob(callback) {
        this.canvas.toBlob(callback);
    }

    data(){
        return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    }

    line(begin, end){
        this.ctx.beginPath();
        this.ctx.moveTo(begin.x, begin.y);
        this.ctx.lineTo(end.x, end.y);
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = this.getOption('primaryColor');
        this.ctx.stroke();
    }

    hide(){
        this.canvas.style.opacity = '0';
    }

}
