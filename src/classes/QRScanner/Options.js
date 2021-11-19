import Options from "../Options";
import {SUCCESS} from "../../utils/states";

export default class extends Options {
    //ESSENTIAL
    /*
     * Customisable scanning function called on each video frame
     * Use this.setState(), this.setResult(), this.setError()
     */
    performScan(){
        const result = this.checkQRCode();
        if (result) {
            this.setResult(result);
            return this.setState(SUCCESS);
        }
    };

    /**
     * Input element value set with QR code value
     */
    outputElement;

    //OPTIONAL
    /*
     * Form submit button to click when QR code value set
     */
    submitButton;

    //DEFAULTS
    /**
     * Class name for created scanner element
     * @type {string}
     */
    classname = 'qrScanner';

    /*
    Scan callbacks
     */
    async handleSuccess(){
        await this.outlineQRCode(this.result);
        this.getOption('outputElement').value = this.result.data;
        if (this.getOption('.submitButton')) this.getOption('.submitButton').click();
    }

}
