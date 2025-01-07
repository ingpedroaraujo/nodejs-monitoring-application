
export enum LogSeverityLevel{
    low    = 'low',
    medium = 'medium',
    high   = 'high'
}

 export interface LogEntityOptions  {
    level: LogSeverityLevel;
    message: string;
    origin: string;
    createdAt?: Date;
}


export class LogEntity{

    public level: LogSeverityLevel; 
    public message: string;
    public createdAt: Date;
    public origin: string;


    constructor( options: LogEntityOptions ){

        const { message, level, origin, createdAt = new Date() } = options;
        this.origin = origin;
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
    }

    static fronJson = ( json: string ): LogEntity =>{

        const { message, level, createdAt, orgin } = JSON.parse(json);

        if(!message) throw new Error('Message is required');

        const log = new LogEntity({
            message: message,
            level: level,
            createdAt: createdAt,
            origin: origin
        });

       // log.createdAt = new Date(createdAt);
        return log;
     }

     static fromObject = ( object: { [key: string]: any } ): LogEntity => {

        const { message, level, createdAt, orgin }= object;

        return  new LogEntity({ message, level, createdAt, origin });

     }


}
    

