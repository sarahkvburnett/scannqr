import QRScanner from "../QRScanner";
import Scanner from "../Scanner";

const scannerBtn = document.querySelector('#scannerBtn');
const qrScannerBtn = document.querySelector('#qrScannerBtn');

const scanner = new Scanner({
    parentElement: document.querySelector('.scanner-demo'),
    position: scannerBtn.getBoundingClientRect(),
    performScan: function(){
        setTimeout(() => {
            this.result = {"msg": 'It works!'};
            this.setState('SUCCESS');
        }, 10000)
    },
    displayVideo: false,
    displayMessage: false,
});

const qrScanner = new QRScanner({
    parentElement: document.querySelector('.qrscanner-demo'),
    position: qrScannerBtn.getBoundingClientRect(),
    outputElement: document.querySelector('#qrscannerOutput'),
    submitButton: document.querySelector('#qrScannerBtn'),
    successHTML: '<i class="fas fa-check-circle"></i> QR Code Found'
});

scannerBtn.addEventListener('click', () => scanner.start());
qrScannerBtn.addEventListener('click', () => qrScanner.start());
