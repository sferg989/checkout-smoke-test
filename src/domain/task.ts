import { Page } from './puppeteer';
import { Step } from './step';

/**
 * A collection of steps and other configuration that mirrors what is required for an end user to complete a given task
 * Ideally, tasks should map to user-oriented tasks within a system (ex. register for an account, update my billing info, etc.)
 */
export interface Task {
  /**
   * Human readable name of the task
   * Appears in logs
   */
  Name: string;
  /**
   * Enumeration of necessary steps to complete the task
   */
  StepsEnum: object;
  /**
   * Map of necessary step actions to complete the task
   */
  StepsRecord: Record<number, { new(page: Page): Step<any> }>;
  /**
   * A page to route to before execution of the tasks steps
   * When not defined it is assumed that this navigation is handled elsewhere
   */
  StartingUrl?: string;
}
