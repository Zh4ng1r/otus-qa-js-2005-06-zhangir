/* global inject */
/* eslint-disable no-undef */

const { I } = inject();

class LoginPage {
  constructor() {
    this.fields = {
      username: '#user-name',
      password: '#password',
    };
    this.loginButton = '#login-button';
    this.errorMessage = '[data-test="error"]';
  }

  open() {
    I.amOnPage('/');
  }

  login(username, password) {
    I.fillField(this.fields.username, username);
    I.fillField(this.fields.password, password);
    I.click(this.loginButton);
  }

  seeError(text) {
    I.see(text, this.errorMessage);
  }
}

module.exports = new LoginPage();
