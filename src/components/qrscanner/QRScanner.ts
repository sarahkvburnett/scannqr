import Scanner from "@scanner/Scanner";
import QROptions from "@qrscanner/QROptions";
import QRScan from "@qrscanner/QRScan";


export default class QRScanner extends Scanner {

    init(customOptions){
        this.options = new QROptions();
        this.scan = new QRScan(this);
        this.setCustomOptions(customOptions);
    }

    validateOptions(){
        super.validateOptions();
        if (!this.getOption('input')) throw new Error('Need input to output QR code');
    }

}
