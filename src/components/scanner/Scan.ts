import {CANCELLED, ERROR, FAILED, PENDING, SCANNING, SUCCESS} from "@utils/states";
import Scanner from "@scanner/Scanner";
import Message from "@scanner/Message";
import Result from "@scanner/Result";
import Stream from "@scanner/Stream";

export default class Scan {

    protected scannedImages = [];
    protected state: string = PENDING;
    protected scanner: Scanner;
    protected stream: Stream;
    protected performScan: Function;
    protected result: string;
    protected error: string;

    constructor(scanner) {
        this.scanner = scanner;
        this.stream = scanner.stream;
        this.performScan = this.getOption('performScan');
    }

    getMessage(): Message {
        return this.scanner.message;
    }

    getScanner(): Scanner{
        return this.scanner;
    }

    getOption(option): any {
        return this.scanner.getOption(option);
    }

    isState(state): boolean {
        return this.state === state;
    }

    setState(state: string): void {
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

     setResult(result: string ): void{
        this.result = result;
    }

    setError(error: string): void{
        this.error = error;
    }

    prepare(): void{
        this.stream.draw();
        this.stream.blob(blob => this.addImage(blob));
    }

    async perform(): Promise<void> {
        await this.performScan();
        const result = new Result(this);
        await result.handle();
    }

    addImage(image: Blob): void{
        this.scannedImages.push(image);
    }

    getLastImage(): Blob {
        return this.scannedImages.pop();
    }

    hasLastImage(): boolean {
        return this.scannedImages.length > 0;
    }

}
