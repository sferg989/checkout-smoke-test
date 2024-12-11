import { Step, Page } from '../domain/module';

export class InputPassword implements Step<string> {
  constructor(
    private page: Page
  ) { }

  selectorToWaitFor = '#Password';

  async evaluate(): Promise<string> {
    return await this.page.evaluate((selector, password) => {
      const passwordInput = document.querySelector<HTMLInputElement>(selector);
      if (passwordInput) {
        passwordInput.value = password || '';
      }
      return location.pathname;
    }, this.selectorToWaitFor, process.env.PASSWORD);
  }
}
