import { Step, Page } from '../domain/module';

export class AgreeToTerms implements Step<string> {
  constructor(
    private page: Page
  ) { }

  selectorToWaitFor = 'input[name="membershipTerms"]';

  async evaluate(): Promise<string> {
    return await this.page.evaluate((selector) => {
      const termsCheckbox = document.querySelector<HTMLInputElement>(selector);
      termsCheckbox?.click();
      return location.pathname;
    }, this.selectorToWaitFor);
  }
}
