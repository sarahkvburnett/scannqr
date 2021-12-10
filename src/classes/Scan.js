import Result from "./Result";

export default class Scan {

    scannedImages = [];

    constructor(scanner) {
        this.scanner = scanner;
        this.stream = scanner.stream;
        this.performScan = this.getOption('performScan');
    }

    getMessage(){
        return this.scanner.message;
    }

    getScanner(){
        return this.scanner;
    }

    getOption(option){
        return this.scanner.getOption(option);
    }

    isState(state){
        return this.state === state;
    }

    setState(state){
        this.state = state;
    }

    setResult(result){
        this.result = result;
    }

    setError(error){
        this.error = error;
    }

    prepare(){
        this.stream.draw();
        this.stream.blob(blob => this.addImage(blob));
        return this.getLastImage();
    }

    async perform(image){
        await this.performScan(image);
        const result = new Result(this);
        await result.handle();
    }

    addImage(image){
        this.scannedImages.push(image);
    }

    getLastImage(){
        return this.scannedImages.pop();
    }

}
