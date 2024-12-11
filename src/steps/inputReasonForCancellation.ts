import { Step, Page } from '../domain/module';

export class InputReasonForCancellation implements Step<void> {
  constructor(
    private page: Page
  ) { }

  selectorToWaitFor = '#cancellationReason';

  async evaluate(): Promise<void> {
    await this.page.focus(this.selectorToWaitFor);
    await this.page.type(
      this.selectorToWaitFor,
      'Cancelling a test account created for QA purposes');
  }
}
