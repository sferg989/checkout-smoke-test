import { Page } from '../domain/puppeteer';
import { Task, Step } from '../domain/module';
import {
  AgreeToTerms,
  CheckDashboardLink,
  ClickContinueButton,
  ClickJoin,
  ClickLogin,
  ClickUseMyEntryButton,
  DeclinePtu,
  FrequencyClickContinueButton,
  InputEmail,
  InputPassword,
  NextPaymentClickContinueButton,
  NextShippingClickContinueButton,
  ProceedToInvoiceClickContinueButton,
  RemovePtuParams,
  ShippingClickContinueButton,
  SpouseClickContinueButton,
  StartMembershipClickContinueButton
} from '../steps/module';
import { Pages } from '../pages';

enum Steps {
  ClickJoin = 'Click join',
  RemovePtuParams = 'Remove PTU params',
  InputEmail = 'Input email',
  SubmitEmail = 'Submit email',
  ClickLogin = 'Click login button',
  InputPassword = 'Input password',
  SubmitPassword = 'Submit password',
  SubmitFrequency = 'Submit frequency',
  SubmitSpouseSelection = 'Submit spouse selection',
  AddressValidationModal = 'Address validation modal',
  ContinueToShipping = 'Continue to shipping',
  SubmitShippingInfo = 'Submit shipping info',
  ContinueToPayment = 'Continue to payment',
  AgreeToTerms = 'Agree to terms',
  ContinueToSummary = 'Continue to summary',
  StartMembership = 'Start membership',
  DeclinePtu = 'Decline Ptu',
  ProceedToInvoice = 'Proceed to invoice',
  CheckDashboardLink = 'Check dashboard link'
}

export class StartMembership implements Task {
  Name = 'Start membership';
  StartingUrl = Pages.CurrentOfferPage;
  StepsEnum = Steps;
  StepsRecord: Record<Steps, { new(page: Page): Step<any> }> = {
    [Steps.ClickJoin]: ClickJoin,
    [Steps.RemovePtuParams]: RemovePtuParams,
    [Steps.InputEmail]: InputEmail,
    [Steps.SubmitEmail]: ClickContinueButton,
    [Steps.ClickLogin]: ClickLogin,
    [Steps.InputPassword]: InputPassword,
    [Steps.SubmitPassword]: ClickContinueButton,
    [Steps.SubmitFrequency]: FrequencyClickContinueButton,
    [Steps.SubmitSpouseSelection]: SpouseClickContinueButton,
    [Steps.ContinueToShipping]: NextShippingClickContinueButton,
    [Steps.SubmitShippingInfo]: ShippingClickContinueButton,
    [Steps.AddressValidationModal]: ClickUseMyEntryButton,
    [Steps.ContinueToPayment]: NextPaymentClickContinueButton,
    [Steps.AgreeToTerms]: AgreeToTerms,
    [Steps.ContinueToSummary]: ClickContinueButton,
    [Steps.StartMembership]: StartMembershipClickContinueButton,
    [Steps.DeclinePtu]: DeclinePtu,
    [Steps.ProceedToInvoice]: ProceedToInvoiceClickContinueButton,
    [Steps.CheckDashboardLink]: CheckDashboardLink
  };
}
