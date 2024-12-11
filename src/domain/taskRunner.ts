import * as fs from 'fs';
import { Browser } from 'puppeteer';
import { timeout } from '../constants';
import { Results } from './results';
import { Page, getBrowser } from './puppeteer';
import { Step } from './step';
import { Task } from './task';

type StepResult = { step: string, evaluation: any, result: Results };

/**
 * Handles the configuration, execution, and reporting for tasks and their steps
 */
export class TaskRunner {
  /**
   * The number of milliseconds to wait for a given operation - default: 10000 (ten seconds)
   */
  public static Timeout = 1000 * 10;
  private static encounteredError = false;
  private static screenshotCount = 0;

  /**
   * Begins the async execution of given tasks
   * @param tasks tasks to execute steps for
   * @param browser optional override if customization of the puppeteer browser object is required
   * @param page optional override if customization of the puppeteer page object is required
  */
  // eslint-disable-next-line complexity
  static async Start(
    tasks: Task[],
    browser?: Browser,
    page?: Page
  ): Promise<void> {
    browser = browser || await getBrowser();
    page = page || await browser.newPage();
    page.setUserAgent(process.env.PUPPETEER_USER_AGENT || '');
    page.setDefaultTimeout(this.Timeout);

    for (const task of tasks) {
      console.log(`\nStarting task: ${task.Name}\n`);
      const stepResults: StepResult[] = [];
      task.StartingUrl && await page.goto(task.StartingUrl, { waitUntil: 'networkidle2' });

      for (const stepKey of Object.keys(task.StepsRecord)) {
        const step: Step<any> = new task.StepsRecord[stepKey](page);
        try {
          await this.executeStep(page, step, stepKey, stepResults);
        } catch (error: any | Error) {
          await this.handleError(page, stepKey, error);
          break;
        }
      }

      this.logTaskResults(task, stepResults);

      if (this.encounteredError) {
        break;
      }
    }

    await browser.close();
    process.exit(this.encounteredError ? 1 : 0);
  }

  private static async executeStep(page: Page, step: Step<any>, stepKey: string, stepResults: StepResult[]) {
    console.log(`Executing: ${stepKey}`);
    await page.waitForFunction(
      '!document.querySelector(\'[class*="Loading_modalWrap"]\')',
      { timeout }
    );
    await page.waitForSelector(step.selectorToWaitFor);
    await this.takeScreenshot(page, stepKey);
    const evaluation = await step.evaluate();
    const assertionError = (step.assert ? step.assert(evaluation) : '');

    stepResults.push({
      step: stepKey,
      evaluation,
      result: assertionError ? Results.Failed : Results.Passed
    });

    if (assertionError) {
      this.encounteredError = true;
      throw new Error(assertionError);
    }
  }

  private static async handleError(page, stepKey: string, error: any) {
    this.encounteredError = true;
    await this.takeScreenshot(page, `${stepKey} error`);
    console.error(`\nFAILED to "${stepKey}"\n-`, error?.message, '\n');

    const dumpContents = {
      error: `\nFAILED to "${stepKey}"\n-${error?.message}`,
      location: await page.url(),
      cookies: await page.cookies()
    };

    fs.writeFileSync('results/dump.json', JSON.stringify(dumpContents));
    fs.writeFileSync('results/index.html', await page.content());
    console.log('Debugging dump', dumpContents);
  }

  private static async takeScreenshot(page: Page, step: string): Promise<void> {
    this.screenshotCount++;
    await page.screenshot({
      path: `results/${this.screenshotCount} - ${step}.jpeg`
    });
  }

  private static logTaskResults(task: Task, stepResults: StepResult[]) {
    const results = {
      task: task.Name,
      result: this.encounteredError ? Results.Failed : Results.Passed,
      steps: stepResults
    };

    fs.writeFileSync(`results/${task.Name}.json`, JSON.stringify(results));
    console.log(results);
  }
}
