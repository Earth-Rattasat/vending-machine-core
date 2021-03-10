import { contextMail } from './type/mailer';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  constructor(private readonly mailerService: MailerService) {}

  public sendNotification(context: contextMail): void {
    this.mailerService.sendMail({
      to: 'admin-test@example.com',
      subject: 'Warning product almost sold out!',
      html: `<p><b>${context.productName}</b> in drinking vending machine name is <b>${context.machineName}</b> at <b>${context.machineAddress}</b> has low quantity,<br/> please check it soon.</p>`,
    });
  }
}
