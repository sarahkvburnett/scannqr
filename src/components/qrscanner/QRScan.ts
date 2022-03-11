import Scan from "@scanner/Scan";
import jsQR from "jsqr";

export default class QRScan extends Scan {

    checkForQRCode(){
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
        await new Promise((res) => setTimeout(res, 800));
    }

}
