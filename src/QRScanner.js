import Scanner from "./Scanner";
import jsQR from "jsqr";
import {SUCCESS} from "./utils/states";

export default class QRScanner extends Scanner {

    constructor(options){
        super(options);
        if (!this.getOption('outputElement')) throw new Error("Missing input element to output QR code message");

        this.options.classname = 'qrScanner';

        this.options.messageClassname = 'qrScannerMessage';

        this.options.performScan = function(){
            const result = this.checkForQRCode();
            if (result) {
                this.setResult(result);
                return this.setState('SCANNING');
            }
        };

        this.options.handleSuccess = async function(){
            await this.scan.outlineQRCode(this.result);
            this.getOption('outputElement').value = this.result.data;
            if (this.getOption('.submitButton')) this.getOption('.submitButton').click();
        };
    }

    create(){
        super.create();

        this.scan.checkForQRCode = function(){
            const imageData = this.stream.data();
            return jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: "dontInvert",
            });
        }

        this.scan.outlineQRCode = async function(result){
            this.stream.line(result.location.topLeftCorner, result.location.topRightCorner);
            this.stream.line(result.location.topRightCorner, result.location.bottomRightCorner);
            this.stream.line(result.location.bottomRightCorner, result.location.bottomLeftCorner);
            this.stream.line(result.location.bottomLeftCorner, result.location.topLeftCorner);
            await new Promise((res) => setTimeout(res, 800));
        }

    }

}
