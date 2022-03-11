import Scanner from "./scanner";
import Scan from "./qrscanner/QRScan";


function resetDOM(){
    document.body.innerHTML =
        '<div>' +
        '  <div class="scan" />' +
        '  <button class="scanBtn" />' +
        '</div>';
}

function initialiseScanner(state = 'SUCCESS'){
    return new Scanner({
        performScan: () => setTimeout(this.setState(state), 200)
    });
}


beforeEach(() => {
   resetDOM();
});

test('should initialise scanner', () => {
    jest.spyOn(Scanner.prototype, 'setOptions');
    jest.spyOn(Scanner.prototype, 'getOption');

    const scanner = initialiseScanner();

    expect(scanner.options).not.toBeNull();
    expect(scanner.options.performScan).not.toBeNull();
    expect(scanner.message).not.toBeNull();
    expect(scanner.setOptions).toBeCalledTimes(1);
    expect(scanner.getOption).toBeCalled();

})

test('should create scanner', () => {
    const scanner = initialiseScanner();
    scanner.create();

    expect(scanner.scanner).not.toBeNull();
    expect(scanner.stream).not.toBeNull();
    expect(scanner.icon).not.toBeNull();
    expect(scanner.backBtn).not.toBeNull();
    expect(scanner.scan).not.toBeNull();
    expect(scanner.scan.performScan).not.toBeNull();

    expect(document.querySelector('.scanner')).not.toBeNull();
    expect(document.querySelector('.scanner').querySelector('canvas')).not.toBeNull();
    expect(document.querySelector('.scanner').querySelector('video')).not.toBeNull();
    expect(document.querySelector('.scanner').querySelector('#backBtn')).not.toBeNull();
})

it('should generate images to be scanned', async () => {
    jest.spyOn(Scanner.prototype, 'handleError');
    const scanner = initialiseScanner('SUCCESS');
    await scanner.start();
    console.log(scanner);
    // expect(scanner.scan.hasLastImage()).toBeTruthy();
    // expect(scanner.isScanning()).toBeTruthy();
    expect(scanner.handleError).toBeCalled();
});
