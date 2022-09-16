# Scannqr

Customisable javascript video stream QR Code scanner

## 🚀 Features
- Scan camera video stream for QRCodes using the [jsQR](https://github.com/cozmo/jsQR) QR code reading library. 
- Animated UI with QR code detection outline
- Customisable using the options object when creating scanner
- Option to pass in input to output QR Code result and to submit form

## 📦 Getting Started
#### Installation
```bash
npm install scannqr
```

#### JS Module
```js
// ES6 import
import {QRScanner} from "/your-path-to-scanner/dist/scannqr.ts";

// CommonJS require
const {QRScanner} = require("/your-path-to-scanner/dist/scannqr.ts");
```
#### HTML Script tag

```html
<script src="/your-path-to-scannqr/dist/scannqr.ts"></script>
```


## 🔨 Usage

1. Create HTML
```html
    <form class="qrscanner__wrapper">
        <button class="qrscanner__startBtn" type="button">Scan</button>
        <input class="qrscanner__input"/>
        <button class="qrscanner__submitBtn">Submit</button>
    </form>
</div>
```    
2. Import CSS
```html
    <link rel="stylesheet" href="/your-path-to-scannqr/dist/css/scannqr.css"/>
```   
3. Create Scanner Instance

```js
const qrscanner = new QRScanner({
    wrapper: document.querySelector('.qrscanner__wrapper'),
    startBtn: document.querySelector('.qrscanner__startBtn'),
    output: document.querySelector('.qrscanner__input'),
    submitBtn: document.querySelector('.qrscanner__submitBtn'),
    //See list of all possible options below
});
```

## ⚙️Options
### Required
### `wrapper`
Type: `HTMLElement`  

Element to append scanner

### `startElement`
Type: `HTMLElement`  

Element to commence scanning and calculate starting position

### Optional

### `output`
Type: `String`  

Input element to output QR code message

### `submitBtn`
Type: `String`  

Submit button to click on successful QR code extraction

### `backBtnHTML`
Type: `string`  
Default:`Go Back`

HTML used for scanner background prior/instead of video display

### `handleSuccess`
Type: `Function`  

Default:
```js 
function() {
    await this.outlineQRCode();
    await this.stop();
    if (this.output) this.output.value = this.QRCode.data;
    if (this.submitBtn) this.submitBtn.click();
}
```

Customisable callback for successful QR code detection - default outlines QR code, populates input and submits form

### `primaryColor`
Type: `String`  
Default: `#03a803`

Primary color used for scanner e.g. used to draw on canvas
