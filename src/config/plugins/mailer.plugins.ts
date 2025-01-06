import nodemailer from 'nodemailer';
import type { EmailServicePlugin } from "../../domain/use-cases/emails/email.service";

type SendMailOptions = {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
};

type Attachment = {
    filename: string;
    path: string;
};

type MailerSettings = {
    service: string;
    auth: {
        user: string;
        pass: string;
    };
};

export class MailerPlugin implements EmailServicePlugin {
    public settings: MailerSettings;

    constructor(settings: MailerSettings) {
        this.settings = settings;
    }

    // Método que adapta la dependencia de "nodemailer"


    private async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options;
        const { auth, service } = this.settings;
        try {
            const transporter = nodemailer.createTransport({
                service,
                auth,
            });

            const sentInformacion = await transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments,
            });

            console.log(sentInformacion);

            return true;
        } catch (error) {
            return false;
        }
    }

    public async sendEmailWithFileSystemLogs(to: string | string[]) {
        const subject = 'Logs del servidor';
        const htmlBody = `
              <h3>Logs de sistema - NOC</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              <p>Ver logs adjuntos</p>
          `;

        return this.sendEmail({
            to,
            subject,
            htmlBody,
            attachments: this.createAttachments(),
        });
    }
    private createAttachments(): Attachment[] {
        const attachments: Attachment[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
        ];
        return attachments;
    }
}