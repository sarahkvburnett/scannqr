import {QRScanner} from "../../dist/scannqr.esm";

const qrscanner = new QRScanner({
    wrapper: document.querySelector('.qrscanner__wrapper'),
    startBtn: document.querySelector('.qrscanner__startBtn'),
    output: document.querySelector('.qrscanner__input'),
    submitBtn: document.querySelector('.qrscanner__submitBtn'),
});

document.querySelector('form').onsubmit = function(e){
    e.preventDefault();
    console.log('submitted')
}