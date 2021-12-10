import Result from "./Result";
import {CANCELLED, ERROR, FAILED, PENDING, SCANNING, SUCCESS} from "../utils/states";

export default class Scan {

    scannedImages = [];
    state = PENDING;

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
        switch (state){
            case SUCCESS:
            case FAILED:
            case CANCELLED:
            case ERROR:
                //Delay result states to allow for UI updates
                setTimeout(() => this.state = state, 300);
                break;
            case PENDING:
            case SCANNING:
            default:
                this.state = state;
                break;
        }
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
    }

    async perform(){
        await this.performScan();
        const result = new Result(this);
        await result.handle();
    }

    addImage(image){
        this.scannedImages.push(image);
    }

    getLastImage(){
        return this.scannedImages.pop();
    }

    hasLastImage(){
        return this.scannedImages.length > 0;
    }

}
