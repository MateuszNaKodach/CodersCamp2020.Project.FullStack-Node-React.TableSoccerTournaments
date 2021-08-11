export class Email {
  private readonly TYPE = 'Email';

  private constructor(readonly raw: string) {}

  static from(email: string): Email {
    if (email.length <= 0) {
      throw new Error('Email cannot be empty!');
    }

    const regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
    if (!regexp.test(email)) {
      throw new Error('Email format is wrong!');
    }

    return new Email(email);
  }
}
