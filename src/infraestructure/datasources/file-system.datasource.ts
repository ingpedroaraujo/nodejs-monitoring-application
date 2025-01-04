import fs from 'fs';
import type { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogSeverityLevel, type LogEntity } from "../../domain/entities/log.entity";


export class FileSystemDatasource implements LogDatasource{

    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    constructor(){
        this.createLogFiles();
    }

    private createLogFiles = () => {

        if(!fs.existsSync(this.logPath)){
            fs.mkdirSync(this.logPath);
        }

        [   
            this.allLogsPath, 
            this.mediumLogsPath, 
            this.highLogsPath
        ].forEach(( path)=>{
            if(!fs.existsSync( path )) return;
            fs.writeFileSync(path, '');
        });

    }

    
    async saveLog( newLog: LogEntity ): Promise<void> {    
        
       const logAsJson = `${JSON.stringify(newLog)}\n`;
        
        fs.appendFileSync( this.allLogsPath, `${JSON.stringify(newLog)}\n`);

        if(newLog.level === LogSeverityLevel.low) return;
        if(newLog.level === LogSeverityLevel.medium) { 
            fs.appendFileSync( this.mediumLogsPath, logAsJson)
        } else{
            fs.appendFileSync( this.highLogsPath, logAsJson );
        }
       
       
    }

    getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }



}
