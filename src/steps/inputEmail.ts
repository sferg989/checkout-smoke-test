import { Step, Page } from '../domain/module';
import { Errors } from '../errors';

export class InputEmail implements Step<string> {
  constructor(
    private page: Page
  ) { }

  selectorToWaitFor = '#Email';

  async evaluate(): Promise<string> {
    return await this.page.evaluate((selector, email) => {
      const emailInput = document.querySelector<HTMLInputElement>(selector);
      if (emailInput) {
        emailInput.value = email || '';
      }
      return location.href;
    }, this.selectorToWaitFor, process.env.EMAIL);
  }

  assert = (result: string): string | void => {
    if (result.includes('ptuExist=1')) {
      return Errors.InPtuFlow;
    }
  };
}
