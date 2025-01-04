import type { LogDatasource } from "../../domain/datasources/log.datasource";
import type { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import type { LogRepository } from "../../domain/repositories/log.repository";


export class LogRepositoryImpl implements LogRepository{

    constructor(
        private readonly logDatasource: LogDatasource
    ){}

    async saveLog(log: LogEntity): Promise<void> {
        this.logDatasource.saveLog( log );
    }

    async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDatasource.getLog(severityLevel);
    }


}