import {ERROR, FAILED, SUCCESS} from "../utils/states";

export default class Message {

    constructor(scanner) {
        this.scanner = scanner;
        this.element = this.getOption('messageElement') ?? this.create();
    }

    getOption(option){
        return this.scanner.getOption(option);
    }

    create(){
        const element = document.createElement('div');
        element.className = 'message';
        this.scanner.append(element);
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
        this.message.style.display = 'none';
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
        }
    }

}
