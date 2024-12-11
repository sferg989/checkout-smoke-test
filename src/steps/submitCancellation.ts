import { HTTPResponse } from 'puppeteer';
import { Step, Page } from '../domain/module';

export class SubmitCancellation implements Step<HTTPResponse> {
  constructor(
    private page: Page
  ) { }

  selectorToWaitFor = 'form[class^="cancelForm"] button';

  async evaluate(): Promise<HTTPResponse> {
    await this.page.click(this.selectorToWaitFor);

    return await this.page.waitForResponse(
      r => r.url().includes('/cancel'));
  }
}
