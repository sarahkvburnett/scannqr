import QRScanner from "../QRScanner";
import Scanner from "../Scanner";

const scannerBtn = document.querySelector('#scannerBtn');
const qrScannerBtn = document.querySelector('#qrScannerBtn');

const scanner = new Scanner({
    container: '.qrscanner-demo',
    position: qrScannerBtn.getBoundingClientRect(),
    scanImage: () => console.log("Scanning...")
});

const qrScanner = new QRScanner({
    container: '.scanner-demo',
    position: scannerBtn.getBoundingClientRect(),
    displaySuccess: result => document.querySelector('#qrscannerOutput').value = result.data
});

scannerBtn.addEventListener('click', () => scanner.start());
qrScannerBtn.addEventListener('click', () => qrScanner.start());
