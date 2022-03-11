import {CANCELLED, ERROR, FAILED, SUCCESS, UNAUTHORIZED} from "@utils/states";
import Scanner from "@scanner/Scanner";

export default class Message {

    protected isCreated: boolean = false;
    private scanner: Scanner;
    private element: HTMLElement;
    private message: HTMLDivElement;

    constructor(scanner) {
        this.scanner = scanner;
        this.element = this.getOption('messageElement') ?? this.create();
        if (!this.getOption('displayMessage')) this.element.style.display = 'none';
    }

    getOption(option): any {
        return this.scanner.getOption(option);
    }

    create(): HTMLElement {
        if (this.isCreated) return;
        this.isCreated = true;
        const element = document.createElement('div');
        element.className = this.getOption('messageClassname');
        this.getOption('wrapper').append(element);
        return element;
    }

    update(type: string, message: string | null = null): void{
        this.hide();
        this.message = document.createElement('div');
        this.message.className = 'message ' + this.getClassname(type);
        this.message.innerHTML = message ? message : this.getMessage(type);
        this.element.append(this.message);
        this.display();
    }

    display(): void{
        this.message.style.display = 'block';
    }

    hide(): void{
        if (this.message) this.message.style.display = 'none';
        this.element.innerHTML = '';
    }

    getClassname(type: string): string {
        switch (type) {
            case SUCCESS:
                return 'message--success';
            case ERROR:
            case FAILED:
            case CANCELLED:
            case UNAUTHORIZED:
                return 'message--error';
            default:
                return 'message--loading';
        }
    }

    getMessage(type: string): string{
        switch (type) {
            case SUCCESS:
                return this.getOption('successMsg');
            case ERROR:
                return this.getOption('errorMsg');
            case FAILED:
                return this.getOption('failedMsg');
            case CANCELLED:
                return this.getOption('cancelledMsg');
            case UNAUTHORIZED:
                return this.getOption('unauthorisedMsg');
            default:
                return this.getOption('scanningMsg');
        }
    }

}
