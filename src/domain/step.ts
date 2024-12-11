/**
 * An individual unit or step withing a larger task (ex. clicking a button, filling inputs, etc.)
 * Ideally, steps should be very granular and useful within any given number of applicable tasks
 */
export interface Step<T> {
  /**
   * A selector value that must be present in the tested page before further execution of the test is permitted
   * A timeout error will occur if this value is not present with the configured timeout
   */
  selectorToWaitFor: string;
  /**
   * A function to be executed against the DOM of the page being tested
   * @returns a value returned from the tested DOM
   */
  evaluate(): Promise<T>;
  /**
   * Check the return value of pageEvaluation for errors or other conditions where you want to explicitly fail the test
   * @param result Value retrieved from pageEvaluation to perform assertions against
   * @returns a string to be logged indicating the assertion failed
   */
  assert?: (result: T) => string | void;
}
