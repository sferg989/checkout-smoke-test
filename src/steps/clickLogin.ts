import { Step, Page } from '../domain/module';

export class ClickLogin implements Step<string> {
  constructor(
    private page: Page
  ) { }

  selectorToWaitFor = 'a[href^="/signup/password"]';

  async evaluate(): Promise<string> {
    return await this.page.evaluate((selector) => {
      const loginLink = document.querySelector<HTMLInputElement>(selector);
      loginLink?.click();
      return location.pathname;
    }, this.selectorToWaitFor);
  }
}
