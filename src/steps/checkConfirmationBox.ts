import { Step, Page } from '../domain/module';

export class CheckConfirmationBox implements Step<void> {
  constructor(
    private page: Page
  ) { }

  selectorToWaitFor = '#confirmation[type=checkbox]';

  async evaluate(): Promise<void> {
    await this.page.click(this.selectorToWaitFor);
  }
}
