import Options from "@scanner/Options";

export default class QROptions extends Options {

    /** Option overrides for QR scanning **/

    /*
     * Classname for scanner
     */
    classname = 'scanner scanner--qr';

    /*
     * Customisable scanning function called on each video frame
     * Use this.setState(), this.setResult(), this.setError()
     */
    performScan = function() {
        const result = this.checkForQRCode();
        if (result) {
            this.setResult(result);
            return this.setState('SCANNING');
        }
    }

    /*
    Callbacks for scanning success
    */
    handleSuccess = async function(){
        await this.scan.outlineQRCode(this.result);
        this.getOption('input').value = this.result.data;
        if (this.getOption('.submitBtn')) this.getOption('.submitBtn').click();
    };

    /** === Additional Options for QR scanning === **/

    /*
      * Input element to output QR code message REQUIRED
      * e.g. document.querySelector('.scanner__input');
      */
    input = document.querySelector('.scanner__input');

    /**
     * Submit button to click on successful QR code extraction OPTIONAL
     * e.g. document.querySelector('.scanner__submit-btn');
     */
    submitBtn = document.querySelector('.scanner__submit-btn');


}
