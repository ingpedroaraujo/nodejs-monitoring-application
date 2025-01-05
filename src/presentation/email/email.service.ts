import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugins';

interface SendMailOption {
    to: string | string [];
    subject: string;
    html: string;
    attachments?: Attachement[];
}

interface Attachement {
    filename: string;
    path: string;
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

        const { to, subject, html, attachments = [] } = options;

        try {
            const sentEmail = await this.transporter.sendMail({              
                to: to ,
                subject: subject,
                html: html,
                attachments: attachments
            });

            console.log(sentEmail);

            return true;
        } catch (error) {

            return false;

        }

    }

   async sendEmailWithFileSystemLogs(to: string | string [] ) {
        const subject = 'Logs del servidor';
        const html = `
                <h3>Log del sistema NOC</h3>
                <p>Aliquip proident in enim aute aliqua elit. Eu aliqua cupidatat anim mollit anim quis aliqua. Sunt sint enim in anim est amet deserunt. Pariatur laboris minim excepteur non veniam officia. Exercitation adipisicing ipsum consequat eiusmod sunt culpa magna excepteur anim. Id deserunt exercitation ullamco ad pariatur veniam id. Deserunt proident ullamco amet tempor laboris ex eiusmod nulla tempor cillum esse officia et.</p>
                <p>Ver logs adjuntos</p>
                `;
        const attachments: Attachement[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log'},
            { filename: 'logs-high.log', path: './logs/logs-high.log'},
            { filename: 'logs-medium.log', path: './logs/logs-medium.log'}

        ];

      return  this.sendEmail({ to, subject, html, attachments });
    

    }
}