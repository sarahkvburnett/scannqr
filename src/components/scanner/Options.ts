export default class Options {

    /** === Customisable QROptions for scanner/qrscanner === **/

    /*
    * Element to append scanner
    * HTMLElement
    * */
    wrapper = document.querySelector('.scanner__wrapper');

    /*
    * Starting element for scanner - used to initiate scanner and calculate starting position
    * HTMLElement
    */
    startBtn = document.querySelector('.scanner__start-btn');

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
    messageClassname = 'scanner__message';

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

}
