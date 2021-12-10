import {QRScanner, Scanner} from "../../dist/index.esm";

const scanner = new Scanner({
    parentElement: document.querySelector('.scanner-demo'),
    startElement: document.querySelector('#scannerBtn'),
    performScan: function(){
        setTimeout(() => {
            this.result = {"msg": 'It works!'};
            this.setState('FAILED');
        }, 100)
    },
    displayVideo: false
});

const qrScanner = new QRScanner({
    parentElement: document.querySelector('.qrscanner-demo'),
    startElement: document.querySelector('#qrScannerBtn'),
    outputElement: document.querySelector('#qrscannerOutput'),
    submitButton: document.querySelector('#qrScannerBtn'),
    successHTML: '<i class="fas fa-check-circle"></i> QR Code Found'
});
