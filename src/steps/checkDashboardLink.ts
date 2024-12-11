import { Step, Page } from '../domain/module';

export class CheckDashboardLink implements Step<string> {
  constructor(
    private page: Page
  ) { }

  selectorToWaitFor = '#dashboardLink';

  async evaluate(): Promise<string> {
    return await this.page.evaluate((selector) => {
      const dashboardLink = document.querySelector<HTMLAnchorElement>(selector);
      return dashboardLink?.href || '';
    }, this.selectorToWaitFor);
  }

  assert = (result: string): string | void => {
    if (!result.includes('my.')) {
      return `Dashboard link did not lead to myuscca: "${result}"`;
    }
  };
}
