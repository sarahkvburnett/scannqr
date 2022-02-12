# Scannqr

Customisable javascript video scanner with the ability to scan QR codes

## 🚀 Features
- Fully customisable using the options object when creating scanner and CSS variables
- Ability to scan and output QR codes with QRScanner
- Dark/Light theme available

## 📦 Getting Started
#### Installation
```bash
npm install scannqr
```

#### JS Module
```js
// ES6 import
import {Scanner} from "/your-path-to-scannqr/dist/scannqr.js";

// CommonJS require
const {Scanner} = require("/your-path-to-scannqr/dist/scannqr.js");
```
#### HTML Script tag

```html
<script src="/your-path-to-scannqr/dist/scannqr.js"></script>
```


## 🔨 Usage

1. Create HTML
```html
<div class="scanner__wrapper">
    <button class="scanner__start-btn">Scan</button>
</div>
```    
2. Import CSS
```html
    <link rel="stylesheet" href="/your-path-to-scannqr/dist/css/scannqr.css"/>
    <style>
      /* Customise any css custom properties */
    </style>

```   
3. Create Scanner Instance
```js
const scanner = new Scanner({
  performScan: () => console.log('Scanning'),
  //Other options
});
```

## ⚙️ Options
### Required
### `performScan`
Type: `Function`  
Default: `undefined`

Called on each video to perform scan

Utilise `this.setState()` - `'SUCCESS'` |`'FAILURE'` | `'ERROR'`  
Example:


### Optional
### `wrapper`
Type: `HTMLElement`  
Default:`document.querySelector('.scanner__wrapper')`

Element to append scanner

### `startElement`
Type: `HTMLElement`  
Default:`document.querySelector('.scanner__start-btn')`

Starting element for scanner - used to initiate scanner and calculate starting position

### `classname`
Type: `string`  
Default:`scanner`

Classname for scanner

### `theme`
Type: `string`  
Options: `dark` | `light`  
Default:`dark`

Theme for scanner - background color

### `backBtnHTML`
Type: `string`  
Default:`Go Back`

HTML used for scanner background prior/instead of video display

### `videoFacingMode`
Type: `String`  
Options: `user` | `environment` | `left` | `right`  
Default: `environment`

Which camera to source stream to be scanned as in:
`MediaTrackConstraints.facingMode
`
### `messageElement`
Type: `HTMLElement`  
Default: `null`

Element used to append messages
e.g. document.querySelector('.scanner__message');
If false, div.message created within scanner

### `messageClassname`
Type: `String`   
Default: `scanner__message`

Classname used for created message element

### `displayMessage`
Type: `Boolean`  
Default: true

Whether to display message

### `displayVideo`
Type: `Boolean`  
Default: true

Whether to display video

### `scanningMsg`
Type: `String`  
Default: `Scanning`

HTML for scanning message

### `errorMsg`
Type: `String`  
Default: `Scanning Error`

HTML for scan error

### `successMsg`
Type: `String`  
Default: `Scanning Success`

HTML for scan success

### `failedMsg`
Type: `String`  
Default: `Scanning Failed`

HTML for failed scan

### `cancelledMsg`
Type: `String`  
Default: `Scanning Cancelled`

HTML for cancelled scan

### `unauthorisedMsg`
Type: `String`  
Default: `Missing permission to access camera`

HTML for unauthorized scan failure

### `handleSuccess`
Type: `Function`  
Default: `() => {}`

Callback for additional action on scan success

### `handleError`
Type: `Function`  
Default: `() => {}`

Callback for additional action on scan error

### `handleFailure`
Type: `Function`  
Default: `() => {}`

Callback for additional action on scan failure

### `primaryColor`
Type: `String`  
Default: `#03a803`

Primary color used for scanner e.g. used to draw on canvas

### CSS Custom Properties
[Font Awesome](https://fontawesome.com/) icons are used by default for the scanner background and for the messages.
To replace icons override the following custom properties:  
`--scanner-icon-font-family`  
`--scanner-icon-font-weight`   
`--scanner-icon-success`    
`--scanner-icon-error`   
`--scanner-icon-loading`  
`--scanner-icon-background`  



# QR Scanner
Extension to scan video stream for QRCodes using the [jsQR](https://github.com/cozmo/jsQR) QR code reading library. Detected QR code outlined and then outputted into input. Form can then be submitted if passed in.


## 📦 Getting Started

#### Installation
```bash
npm install scannqr
```

#### JS Module
```js
// ES6 import
import {QRScanner} from "/your-path-to-scanner/dist/scannqr.js";

// CommonJS require
const {QRScanner} = require("/your-path-to-scanner/dist/scannqr.js");

QRScanner(...);

```
#### HTML Script tag

```html
<script src="/your-path-to-scannqr/dist/scannqr.js"></script>
<script>
  QRScanner(...)
</script>
```

## 🔨 Usage

1. Create HTML
```html  
<form class="scanner__wrapper">
    <button class="scanner__start-btn">Scan</button>
    <input class="scanner__input"/>
    <button class="scanner__submit-btn"/>
</form>
```  

2. Import CSS
```html
    <link rel="stylesheet" href="/your-path-to-scannqr/dist/css/scannqr.css"/>
    <style>
      /* Customise any css custom properties */
    </style>

```   

3. Create Scanner Instance
```js
const qrScanner = new QRScanner({
  performScan: () => console.log('Scanning'),
  //Other options
});
```

## Options
### Required

### `input`
Type: `String`  
Default: `document.querySelector('.scanner__input')`

Input element to output QR code message

### Optional
### `submitBtn`
Type: `String`  
Default: `document.querySelector('.scanner__submitBtn')`

Submit button to click on successful QR code extraction
