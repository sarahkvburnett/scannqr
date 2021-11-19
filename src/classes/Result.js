import {ERROR, FAILED, SUCCESS} from "../utils/states";

export default class Result {

    constructor(scan) {
        this.scan = scan;
        this.type = scan.state;
        this.result = scan.result;
        this.error = scan.error;
        this.scanner = scan.getScanner();
        this.message = scan.getMessage();
    }

    getOption(option){
        return this.scan.getOption(option);
    }

    handle(){
        this.message.update(this.type);
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
        this.getOption('handleSuccess')(result);
        this.scanner.stop();
    }

    handleFailure(error){
        this.getOption('handleFailure')(error);
    }

    handleError(error){
        this.getOption('handleError')(error);
        this.scanner.stop();
    }

}
