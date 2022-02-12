import Scanner from "../Scanner";
import QRScanner from "../QRScanner";

const scanner = new Scanner({
    wrapper: document.querySelector('.scanner-demo'),
    startBtn: document.querySelector('#scannerBtn'),
    performScan: function(){
        setTimeout(() => {
            this.result = {"msg": 'It works!'};
            this.setState('ERROR');
        }, 5000)
    },
    displayVideo: false
});

const qrScanner = new QRScanner({
    wrapper: document.querySelector('.qrscanner-demo'),
    startBtn: document.querySelector('#qrScannerBtn'),
    input: document.querySelector('#qrscannerOutput'),
    submitBtn: document.querySelector('#qrScannerBtn'),
    successMsg: 'QR Code Found'
});
