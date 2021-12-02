export default class Options {
    //ESSENTIAL
    /*
    * Element to append scanner
    * e.g. document.querySelector('.scanner-container');
    * */
    parentElement;

    /*
    * Starting position for scanner
    * DOMRect object
    *  e.g. document.querySelector('scanBtn').getBoundingClientRect()
    */
    position;

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

    /*
     * Icon used for scanner background
     */
    iconHTML = '<i class="fa fa-search"></i>';

    /**
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

    /*
    Scan callbacks
     */
    async handleSuccess(){};
    async handleFailure(){};
    async handleError(){};

    /*
     * Primary color used to draw outline on canvas
     */
    primaryColor = '#03a803';

}
