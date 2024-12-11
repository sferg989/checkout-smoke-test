import { Step, Page } from '../domain/module';

export class ClickUseMyEntryButton implements Step<void> {
  constructor(
    private page: Page
  ) { }

  selectorToWaitFor = '[class^=myEntryCta]';

  async evaluate(): Promise<void> {
    await this.page.click(this.selectorToWaitFor);
  }
}
