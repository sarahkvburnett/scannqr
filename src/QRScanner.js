import Scanner from "./Scanner";
import Options from "./classes/QRScanner/Options";
import jsQR from "jsqr";

export default class QRScanner extends Scanner {

    options = new Options();

    constructor(options){
        if (!options.hasOwnProperty('outputElement')) throw new Error("Missing input element to output QR code message");
        super(options);
    }

    checkQRCode(){
        const imageData = this.stream.data();
        return jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
        });
    }

    async outlineQRCode(result){
        this.stream.line(result.location.topLeftCorner, result.location.topRightCorner);
        this.stream.line(result.location.topRightCorner, result.location.bottomRightCorner);
        this.stream.line(result.location.bottomRightCorner, result.location.bottomLeftCorner);
        this.stream.line(result.location.bottomLeftCorner, result.location.topLeftCorner);
        await new Promise((res) => setTimeout(res, 700));
    }

}
