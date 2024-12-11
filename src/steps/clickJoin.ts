import { Step, Page } from '../domain/module';

export class ClickJoin implements Step<string> {
  constructor(
    private page: Page
  ) { }

  selectorToWaitFor = 'a[href^="https://www.deltadefense.com/offers"].bg-gold';

  async evaluate(): Promise<string> {
    return await this.page.evaluate((selector) => {
      const goldButton = document.querySelector<HTMLAnchorElement>(selector);
      goldButton?.click();
      return location.href;
    }, this.selectorToWaitFor);
  }
}
