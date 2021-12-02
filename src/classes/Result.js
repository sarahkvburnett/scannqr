import {ERROR, FAILED, SUCCESS} from "../utils/states";

export default class Result {

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

    handle(){
        switch (this.type){
            case SUCCESS:
                this.handleSuccess(this.result);
                break;
            case FAILED:
                this.handleFailure(this.error);
                break;
            case ERROR:
                this.handleError(this.error);
        }
    }

    handleSuccess(result){
        this.message.update(this.type);
        this.onSuccess(result);
        this.scanner.stop();
    }

    handleFailure(error){
        this.message.update(this.type);
        this.onFailure(error);
    }

    handleError(error){
        this.message.update(this.type);
        this.onError(error);
        this.scanner.stop();
    }

}
