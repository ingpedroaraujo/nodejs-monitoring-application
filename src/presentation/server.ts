import { envs } from "../config/plugins/envs.plugins";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
);


export class Server{
    public static start(){
        console.log ('Server started...');
       
        
        /// Enviar correo
        const emailService = new EmailService();
        emailService.sendEmail({
            to: 'ing.pedroaraujo@live.com',
            subject: 'Prueba de correo desde NodeJS',
            html:`
                <h3>Log del sistema NOC</h3>
                <p>Aliquip proident in enim aute aliqua elit. Eu aliqua cupidatat anim mollit anim quis aliqua. Sunt sint enim in anim est amet deserunt. Pariatur laboris minim excepteur non veniam officia. Exercitation adipisicing ipsum consequat eiusmod sunt culpa magna excepteur anim. Id deserunt exercitation ullamco ad pariatur veniam id. Deserunt proident ullamco amet tempor laboris ex eiusmod nulla tempor cillum esse officia et.</p>
                <p>Ver logs adjuntos</p>
                `


        });
        
        // const url = 'http://localhost:3000';

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     ()=>{
        //        const url = 'https://google.com';
               
        //        new CheckService(
        //         fileSystemLogRepository,
        //         // undefined, 
        //         // undefined

        //         ()=> console.log(`Success: ${url} is Ok.`),
        //         (error)=> console.log( error ),


        //        ).execute(url);
            
        //     }
        // );
     
        
    }
}

    
