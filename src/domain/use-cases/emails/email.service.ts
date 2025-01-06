import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import type { LogRepository } from "../../repositories/log.repository";

interface SendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>;
}

export interface EmailServicePlugin {
    sendEmailWithFileSystemLogs: (to: string | string[]) => Promise<boolean>
}

export class EmailService implements SendLogEmailUseCase {
   
    constructor(
        private readonly emailServicePlugin: EmailServicePlugin,
        private readonly logRepository: LogRepository
    ) { }

    async execute(to: string | string[]) {
        const sent = await this.emailServicePlugin.sendEmailWithFileSystemLogs(to)
        const success = !!sent;
        this.saveLog(to, success);
        return success;
    }

    private saveLog(to: string | string[], success: boolean) {
        this.logRepository.saveLog(
            new LogEntity({
                message: success ? 'Email sent' : `Email(s) not sent to ${to}`,
                level: success ? LogSeverityLevel.low : LogSeverityLevel.high,
                origin: 'email.service.ts',
            }));
    }
}
