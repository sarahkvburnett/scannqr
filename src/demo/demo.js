import QRScanner from "../QRScanner";
import Scanner from "../Scanner";

const scannerBtn = document.querySelector('#scannerBtn');
const qrScannerBtn = document.querySelector('#qrScannerBtn');

const scanner = new Scanner({
    parentElement: document.querySelector('.scanner-demo'),
    position: scannerBtn.getBoundingClientRect(),
    performScan: function(){
        this.result = {"msg": 'It works!'};
        this.setState('SUCCESS');
    },
    displayVideo: false
});

const qrScanner = new QRScanner({
    parentElement: document.querySelector('.qrscanner-demo'),
    position: qrScannerBtn.getBoundingClientRect(),
    outputElement: document.querySelector('#qrscannerOutput'),
    submitButton: document.querySelector('#qrScannerBtn')
});

scannerBtn.addEventListener('click', () => scanner.start());
qrScannerBtn.addEventListener('click', () => qrScanner.start());
