import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
);


export class Server{
    public static start(){
        console.log ('Server started...');
        const url = 'https://google.com';
        // const url = 'http://localhost:3000';

        CronService.createJob(
            '*/5 * * * * *',
            ()=>{
               new CheckService(
                fileSystemLogRepository,
                undefined, 
                undefined

               /*  ()=> console.log(`Success: On Check Service ${url}`),
                (error)=> console.log( error ), */


               ).execute(url);
            
            }
        );
     
        
    }
}

    
