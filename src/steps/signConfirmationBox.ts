import { Step, Page } from '../domain/module';

export class SignConfirmationBox implements Step<void> {
  constructor(
    private page: Page
  ) { }

  selectorToWaitFor = '#signature';

  async evaluate(): Promise<void> {
    const placeholder = await this.page.$eval(this.selectorToWaitFor, e => e['placeholder']);
    await this.page.type(this.selectorToWaitFor, placeholder);
  }
}
