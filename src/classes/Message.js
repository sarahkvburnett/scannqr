import {CANCELLED, ERROR, FAILED, SUCCESS, UNAUTHORIZED} from "../utils/states";

export default class Message {

    isCreated = false;

    constructor(scanner) {
        this.scanner = scanner;
        this.element = this.getOption('messageElement') ?? this.create();
        if (!this.getOption('displayMessage')) this.element.style.display = 'none';
    }

    getOption(option){
        return this.scanner.getOption(option);
    }

    create(){
        if (this.isCreated) return;
        this.isCreated = true;
        const element = document.createElement('div');
        element.className = this.getOption('messageClassname');
        this.getOption('parentElement').append(element);
        return element;
    }

    update(type, message = null){
        this.hide();
        this.message = document.createElement('div');
        this.message.className = this.getClassname(type);
        this.message.innerHTML = message ? message : this.getMessage(type);
        this.element.append(this.message);
        this.display();
    }

    display(){
        this.message.style.display = 'block';
    }

    hide(){
        if (this.message) this.message.style.display = 'none';
        this.element.innerHTML = '';
    }

    getClassname(type){
        return type.toLowerCase();
    }

    getMessage(type){
        switch (type) {
            case SUCCESS:
                return this.getOption('successHTML');
            case ERROR:
                return this.getOption('errorHTML');
            case FAILED:
                return this.getOption('failedHTML');
            case CANCELLED:
                return this.getOption('cancelledHTML');
            case UNAUTHORIZED:
                return this.getOption('unauthorisedHTML');
            default:
                return this.getOption('scanningHTML');
        }
    }

}
