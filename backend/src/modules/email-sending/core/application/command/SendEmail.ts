export class SendEmail {
    readonly firstName: string;
    readonly lastName: string;
    readonly emailAddress: string;

    constructor(props: { firstName: string; lastName: string; emailAddress: string }) {
        this.firstName = props.firstName;
        this.lastName = props.lastName;
        this.emailAddress = props.emailAddress;
    }
}