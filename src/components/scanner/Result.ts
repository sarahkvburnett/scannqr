import {ERROR, FAILED, PENDING, SUCCESS} from "@utils/states";
import Scan from "@scanner/Scan";

export default class Result {
    protected scan: Scan;
    protected type: string;
    protected result: any;
    protected error: any;
    protected scanner: any;
    protected message: any;
    protected onSuccess: any;
    protected onFailure: any;
    protected onError: any;

    constructor(scan) {
        this.scan = scan;
        this.type = scan.state;
        this.result = scan.result;
        this.error = scan.error;
        this.scanner = scan.getScanner();
        this.message = scan.getMessage();
        this.onSuccess = this.getOption('handleSuccess');
        this.onFailure = this.getOption('handleFailure');
        this.onError = this.getOption('handleSuccess');
    }

    getOption(option){
        return this.scan.getOption(option);
    }

    async handle(){
        switch (this.type){
            case SUCCESS:
                await this.handleSuccess(this.result);
                break;
            case FAILED:
                await this.handleFailure(this.error);
                break;
            case ERROR:
                await this.handleError(this.error);
        }
    }

    async handleSuccess(result){
        this.message.update(this.type);
        await this.onSuccess(result);
        this.scanner.stop();
    }

    async handleFailure(error){
        this.scan.setState(PENDING);
        this.message.update(this.type);
        await this.onFailure(error);
    }

    async handleError(error){
        this.message.update(this.type);
        await this.onError(error);
        this.scanner.stop();
    }

}
