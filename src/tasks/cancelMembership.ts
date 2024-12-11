import { Task, Step, Page } from '../domain/module';
import { Pages } from '../pages';
import {
  InputReasonForCancellation,
  CheckConfirmationBox,
  SignConfirmationBox,
  SubmitCancellation
} from '../steps/module';

enum Steps {
  InputReasonForCancellation = 'Input reason for cancellation',
  CheckConfirmationBox = 'Check confirmation box',
  SignConfirmationBox = 'Sign confirmation box',
  SubmitCancellation = 'Submit cancellation'
}

export class CancelMembership implements Task {
  Name = 'Cancel membership';
  StartingUrl = Pages.MembershipAndBillingPage;
  StepsEnum = Steps;
  StepsRecord: Record<Steps, { new(page: Page): Step<any> }> = {
    [Steps.InputReasonForCancellation]: InputReasonForCancellation,
    [Steps.CheckConfirmationBox]: CheckConfirmationBox,
    [Steps.SignConfirmationBox]: SignConfirmationBox,
    [Steps.SubmitCancellation]: SubmitCancellation
  };
}
