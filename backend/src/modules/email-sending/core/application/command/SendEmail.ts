export class SendEmail {
  readonly emailAddress: string;
  readonly subject: string;
  readonly htmlContent: string;

  constructor(props: { emailAddress: string; subject: string; htmlContent: string }) {
    this.emailAddress = props.emailAddress;
    this.subject = props.subject;
    this.htmlContent = props.htmlContent;
  }
}
