import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugins';

interface SendMailOption {
    to: string;
    subject: string;
    html: string;
    // TODO: attachment
}

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_MAIL,
            pass: envs.MAILER_SECRET_KEY,
        },
    });

    async sendEmail(options: SendMailOption): Promise<boolean> {

        const { to, subject, html } = options;

        try {
            const sentEmail = await this.transporter.sendMail({              
                to: to ,
                subject: subject,
                html: html,
            });

            console.log(sentEmail);

            return true;
        } catch (error) {

            return false;

        }

    }
}