import { Step, Page } from '../domain/module';
import { Errors } from '../errors';

export class RemovePtuParams implements Step<string> {
  constructor(
    private page: Page
  ) { }

  selectorToWaitFor = '#Email';
  paramsToRemove = [
    'ptuExist',
    'ptuBundleId',
    'ptuType'
  ];

  async evaluate(): Promise<string> {
    const newHref = await this.page.evaluate((paramsToRemove: string[]) => {
      const queryParams = new URLSearchParams(location.search);
      paramsToRemove.forEach(e => {
        queryParams.delete(e);
      });

      const newHref = `${location.origin}${location.pathname}?${queryParams.toString()}`;
      return newHref;
    }, this.paramsToRemove);

    await this.page.goto(newHref);
    return newHref;
  }

  assert = (result: string): string | void => {
    if (this.paramsToRemove.some(e => result.includes(e))) {
      return Errors.InPtuFlow;
    }
  };
}
