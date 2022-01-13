export default class Options {

    /** === Customisable Options for Scanner/QRScanner === **/

    /*
    * Element to append scanner
    * HTMLElement
    * */
    parentElement = document.querySelector('.scan');

    /*
    * Starting element for scanner - used to initiate scanner and calculate starting position
    * HTMLElement
    */
    startElement = document.querySelector('.scanBtn');

    /*
     * Customisable scanning function called on each video frame
     * Use this.setState(), this.setResult(), this.setError()
     */
    performScan = () => {};

    //DEFAULTS
    /*
     * Classname for scanner
     */
    classname = 'scanner';

    /**
     * Theme for scanner
     * 'dark', 'light'
     */
    theme = 'dark';

    /*
     * Back button text
     */
    backBtnMsg = 'Go Back';

    /*
    * Which camera to source
    * 'user', 'environment'
     */
    videoFacingMode = 'environment';

    /*
     * Element used to append messages
     * e.g. document.querySelector('.scanner-message');
     * If left blank, div.message created within scanner
     */
    messageElement

    /*
     * Classname used for created message element
     */
    messageClassname = 'scannerMessage';

    /*
    * Whether to display message
    * boolean
    */
    displayMessage = true;

    /*
    * Whether to display video stream
    * boolean
    */
    displayVideo = true;

    /*
     Text for messages
     */
    scanningMsg = 'Scanning';
    errorMsg = 'Scanning Error';
    successMsg = 'Scanning Success';
    failedMsg = 'Scanning Failed';
    cancelledMsg = 'Scanning Cancelled';
    unauthorisedMsg = 'Missing permission to access camera';

    /*
    Scan callbacks for additional actions
     */
    async handleSuccess(){};
    async handleFailure(){};
    async handleError(){};

    /*
     * Primary color e.g. used to draw on canvas
     */
    primaryColor = '#03a803';

    /** === Additional Options for QRScanner === **/

    /*
      * Input element to output QR code message REQUIRED
      * e.g. document.querySelector('.find');
      */
    outputElement;

    /**
     * Submit button to click on successful QR code extraction OPTIONAL
     * e.g. document.querySelector('.submitBtn');
     */
    submitButton;
}
