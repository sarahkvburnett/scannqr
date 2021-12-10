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
     * Icon used for scanner background
     */
    iconHTML = '<i class="fa fa-search"></i>';

    /*
     * Back button text
     */
    backBtnHTML = 'Go Back';

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
    scanningHTML = '<i class="fas fa-spinner"></i> Scanning';
    errorHTML = '<i class="fas fa-exclamation-circle"></i> Scanning Error';
    successHTML = '<i class="fas fa-check-circle"></i> Scanning Success';
    failedHTML = '<i class="fas fa-exclamation-circle"></i> Scanning Failed';
    cancelledHTML = '<i class="fas fa-exclamation-circle"></i> Scanning Cancelled';
    unauthorisedHTML = '<i class="fas fa-exclamation-circle"></i> Missing permission to access camera';

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
