import Scanner from "./Scanner";
import jsQR from "jsqr";
import {SUCCESS} from "./utils/states";

export default class QRScanner extends Scanner {

    constructor(options){
        super(options);

        /** Option overrides for QRScanner **/
        this.options.classname = 'scanner scanner--qr';

        /** === Additional Options for QRScanner === **/

        /*
          * Input element to output QR code message REQUIRED
          * e.g. document.querySelector('.scanner__input');
          */
        this.options.input = document.querySelector('.scanner__input');

        /**
         * Submit button to click on successful QR code extraction OPTIONAL
         * e.g. document.querySelector('.scanner__submit-btn');
         */
        this.options.submitBtn = document.querySelector('.scanner__submit-btn');


        this.options.performScan = function(){
            const result = this.checkForQRCode();
            if (result) {
                this.setResult(result);
                return this.setState('SCANNING');
            }
        };

        this.options.handleSuccess = async function(){
            await this.scan.outlineQRCode(this.result);
            this.getOption('input').value = this.result.data;
            if (this.getOption('.submitBtn')) this.getOption('.submitBtn').click();
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

    validateOptions(){
        super.validateOptions();
        if (!this.getOption('input')) throw new Error('Need input to output QR code');
    }

}
