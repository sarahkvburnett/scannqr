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
    performScan;

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
    backButtonHTML = 'Go Back';

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
    * Whether to display video stream
    * boolean
    */
    displayVideo = true;

    /*
     Text for messages
     */
    errorHTML = 'Scanning Error';
    successHTML = 'Scanning Success';
    failedHTML = 'Scanning Failed';
    cancelledHTML = 'Scanning Cancelled';

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
