import { LogModel } from "../../data/mongo";
import type { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, type LogSeverityLevel } from "../../domain/entities/log.entity";


export class MongoLogDatasource implements LogDatasource{

   async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);
        console.log('MongoLog created: ', newLog.id);
    }

    async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({ level: severityLevel });
        // return logs.map( mongoLog => LogEntity.fromObject(mongoLog));
        return logs.map( LogEntity.fromObject );

    }
    

}