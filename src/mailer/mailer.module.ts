import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { NotificationService } from './mailer.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: '9fd64f2cdf4bc3',
          pass: 'baf8e1faf3be6c',
        },
      },
      defaults: {
        from:
          '"Vending-Machine-noreply" <no-reply.th-vending-machine@example.com>',
      },
    }),
  ],
  providers: [NotificationService],
})
export class NotificationModule {}
