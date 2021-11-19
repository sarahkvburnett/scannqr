import jsQR from "jsqr";
import Scanner from "./Scanner";

export default class QRScanner extends Scanner {

    constructor(options){
        super(options);
        this.classname = options['classname'] ?? 'qrScanner';
        this.primaryColor = options['primaryColor'] ?? '#03a803';
    }

    async scanImage(){
        const result = this.checkBarcode()
        if (result) await this.displayBarcodeResult(result);
    }

    //Extract QR code from canvas
    checkBarcode(){
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        return jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
        });
    }

    //Display QR code result
    async displayBarcodeResult(result){
        await this.drawBox(result);
        await this.displaySuccess(result);
        await this.stop();
    }

    // Draw box around QR code
    async drawBox(result){
        this.drawLine(result.location.topLeftCorner, result.location.topRightCorner);
        this.drawLine(result.location.topRightCorner, result.location.bottomRightCorner);
        this.drawLine(result.location.bottomRightCorner, result.location.bottomLeftCorner);
        this.drawLine(result.location.bottomLeftCorner, result.location.topLeftCorner);
        await new Promise((res) => setTimeout(res, 700));
    }

    drawLine(begin, end) {
        this.ctx.beginPath();
        this.ctx.moveTo(begin.x, begin.y);
        this.ctx.lineTo(end.x, end.y);
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = this.primaryColor;
        this.ctx.stroke();
    }


}
