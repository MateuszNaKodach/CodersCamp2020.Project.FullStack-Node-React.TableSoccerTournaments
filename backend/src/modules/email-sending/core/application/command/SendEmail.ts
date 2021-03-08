export class SendEmail {
    readonly emailAddress: string;
    readonly subject: string;
    readonly content: string;

    constructor(props: { emailAddress: string, subject: string, content: string }) {
        this.emailAddress = props.emailAddress;
        this.subject = props.subject;
        this.content = props.content;
    }
}