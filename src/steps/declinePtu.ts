import { Step, Page } from '../domain/module';

export class DeclinePtu implements Step<void> {
  constructor(
    private page: Page
  ) { }

  selectorToWaitFor = 'a[class*="noThanks"]';

  async evaluate(): Promise<void> {
    await this.page.click(this.selectorToWaitFor);
  }
}
