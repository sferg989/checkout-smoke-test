import * as env from 'dotenv';
import * as fs from 'fs';
import { TaskRunner } from './domain/module';
import { StartMembership, CancelMembership } from './tasks/module';
import { timeout } from './constants';

env.config({ path: './.env' });

export class Program {
  static async Main() {
    TaskRunner.Timeout = timeout;

    await TaskRunner.Start([
      new StartMembership(),
      new CancelMembership()
    ]);
  }

  static async PostResults(responseUrl: string) {
    let message = '';
    const dumpFilePath = './results/dump.json';
    const dumpFileExists = fs.existsSync(dumpFilePath);

    if (dumpFileExists) {
      message += 'Houston, we have a problem...\n';

      const dumpFile = fs.readFileSync(dumpFilePath).toString();
      const dumpObject: {
        error: string,
        location: string,
        cookies: {
          name: string,
          value: string
        }[]
      } = JSON.parse(dumpFile);

      message += dumpObject.error;
    } else {
      message += 'It worked!';
    }

    await fetch(responseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: message,
        response_type: 'in_channel'
      })
    });
  }
}
