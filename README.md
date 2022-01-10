# Scannqr

Customisable javascript video scanner with the ability to scan QR codes

## 🚀 Features
- Fully customisable using options
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
import {Scanner} from "/your-path-to-scanner/dist/index.js";

// CommonJS require
const {Scanner} = require("/your-path-to-scanner/dist/index.js");
```
#### HTML Script tag

```html
<script src="/your-path-to-scanner/dist/index.js"></script>
```


## 🔨 Usage

1. Create HTML
```html
<div class="scan">
    <button class="scanBtn">Scan</button>
</div>
```    
2. Create Scanner Instance
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
### `parentElement`
Type: `HTMLElement`  
Default:`document.querySelector('.scan')`

Element to append scanner

### `startElement`
Type: `HTMLElement`  
Default:`document.querySelector('.scanBtn')`

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

### `iconHTML`
Type: `string`  
Default:`<i class="fa fa-search"></i>`

HTML used for scanner background prior/instead of video display

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
e.g. document.querySelector('.scanner-message');
If false, div.message created within scanner

### `messageClassname`
Type: `String`   
Default: `scannerMessage`

Classname used for created message element

### `displayMessage`
Type: `Boolean`  
Default: true

Whether to display message

### `displayVideo`
Type: `Boolean`  
Default: true

Whether to display video

### `scanningHTML`
Type: `String`  
Default: `<i class="fas fa-spinner"></i> Scanning`

HTML for scanning message

### `errorHTML`
Type: `String`  
Default: `<i class="fas fa-exclamation-circle"></i> Scanning Error`

HTML for scan error

### `successHTML`
Type: `String`  
Default: `<i class="fas fa-check-circle"></i> Scanning Success`

HTML for scan success

### `failedHTML`
Type: `String`  
Default: `<i class="fas fa-exclamation-circle"></i> Scanning Failed`

HTML for failed scan

### `cancelledHTML`
Type: `String`  
Default: `<i class="fas fa-exclamation-circle"></i> Scanning Cancelled`

HTML for cancelled scan

### `unauthorisedHTML`
Type: `String`  
Default: `<i class="fas fa-exclamation-circle"></i> Missing permission to access camera`

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

### Dependencies
[Font Awesome](https://fontawesome.com/) icons are used by default for the scanner background and for the messages.
To remove dependency, pass in a replacement for the following options:
- `scanningHTML`
-  `errorHTML`
-  `successHTML`
-  `failedHTML`
-  `cancelledHTML`
-  `unauthorisedHTML`


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
import {QRScanner} from "/your-path-to-scanner/dist/index.js";

// CommonJS require
const {QRScanner} = require("/your-path-to-scanner/dist/index.js");

QRScanner(...);

```
#### HTML Script tag

```html
<script src="/your-path-to-scanner/dist/index.js"></script>
<script>
  QRScanner(...)
</script>
```

## 🔨 Usage

1. Create HTML
```html  
<form class="scan">
    <button class="scanBtn">Scan</button>
    <input class="find"/>
    <button class="submitBtn"/>
</form>
```    
2. Create Scanner Instance
```js
const qrScanner = new QRScanner({
  performScan: () => console.log('Scanning'),
  //Other options
});
```

## Options
### Required

### `outputElement`
Type: `String`  
Default: `document.querySelector('.find')`

Input element to output QR code message

### Optional
### `submitButton`
Type: `String`  
Default: `document.querySelector('.submitBtn')`

Submit button to click on successful QR code extraction
