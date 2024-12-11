import { Step, Page } from '../domain/module';

export class ClickContinueButton implements Step<string> {
  constructor(
    private page: Page
  ) { }

  selectorToWaitFor = '#submitButton:not([class*=disabled])';

  async evaluate(): Promise<string> {
    return await this.page.evaluate((selector) => {
      const submitButton = document.querySelector<HTMLAnchorElement>(selector);
      submitButton?.click();
      return location.pathname;
    }, this.selectorToWaitFor);
  }
}

export class FrequencyClickContinueButton extends ClickContinueButton {
  selectorToWaitFor = '[class^="frequency"] #submitButton:not([class*=disabled])';
}

export class SpouseClickContinueButton extends ClickContinueButton {
  selectorToWaitFor = '[id^="spouse"] #submitButton:not([class*=disabled])';
}

export class NextShippingClickContinueButton extends ClickContinueButton {
  selectorToWaitFor = '#nextShippingForm #submitButton:not([class*=disabled])';
}

export class ShippingClickContinueButton extends ClickContinueButton {
  selectorToWaitFor = '[class*="shipping_stepContainer"] #submitButton:not([class*=disabled])';
}

export class NextPaymentClickContinueButton extends ClickContinueButton {
  selectorToWaitFor = '[class*="next-payment_stepContainer"] #submitButton:not([class*=disabled])';
}

export class StartMembershipClickContinueButton extends ClickContinueButton {
  selectorToWaitFor = '[class*="summary_stepContainer"] #submitButton:not([class*=disabled])';
}

export class ProceedToInvoiceClickContinueButton extends ClickContinueButton {
  selectorToWaitFor = '[class^="post-transaction-referral"] #submitButton:not([class*=disabled])';
}
