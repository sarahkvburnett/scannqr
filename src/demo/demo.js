import Scanner from "../Scanner";
import QRScanner from "../QRScanner";

const scanner = new Scanner({
    parentElement: document.querySelector('.scanner-demo'),
    startElement: document.querySelector('#scannerBtn'),
    performScan: function(){
        setTimeout(() => {
            this.result = {"msg": 'It works!'};
            this.setState('ERROR');
        }, 100)
    },
    displayVideo: false
});

const qrScanner = new QRScanner({
    parentElement: document.querySelector('.qrscanner-demo'),
    startElement: document.querySelector('#qrScannerBtn'),
    outputElement: document.querySelector('#qrscannerOutput'),
    submitButton: document.querySelector('#qrScannerBtn'),
    successMsg: 'QR Code Found'
});
