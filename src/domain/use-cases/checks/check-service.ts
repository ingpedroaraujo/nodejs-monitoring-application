import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import type { LogRepository } from "../../repositories/log.repository";

interface CheckServiceUseCase{
    execute(url: string): Promise<boolean>;
}

type SuccessCallBack = ( () => void ) | undefined;
type ErrorCallBack = ( ( error: string ) => void ) | undefined;


export class CheckService implements CheckServiceUseCase{

    constructor(
        private readonly logRepository: LogRepository,  // se inyecta este porq debo de tener la capacidad de recibir cualquier repo
        private readonly successCallBack: SuccessCallBack,
        private readonly errorCallBack: ErrorCallBack,
    ){}

    public async execute(url: string): Promise<boolean>{

        try{

            const req = await fetch( url );
            if(!req.ok) throw new Error(`Error: On Check Service ${url}`);

            const logEntity = new LogEntity(`Service ${url} working`, LogSeverityLevel.low );

            this.logRepository.saveLog( logEntity );
             this.successCallBack && this.successCallBack();
           
            return true;

        }catch(error){

            const errorMsg = `error: ${error} ${url}`;
            const logEntity = new LogEntity( errorMsg, LogSeverityLevel.high );
            this.logRepository.saveLog( logEntity );            

           this.errorCallBack && this.errorCallBack(errorMsg);

            return false;
        }


        return true;
    }
}