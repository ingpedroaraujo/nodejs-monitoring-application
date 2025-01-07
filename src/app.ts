import { envs } from "./config/plugins/envs.plugins";
import { LogModel, MongoDatabase } from "./data/mongo";

import { Server } from "./presentation/server";


(async()=>{

    main();


})();

async function main(){

    await MongoDatabase.connect({ 
        mongoUrl: envs.MONGO_URL,
        mongoDBName: envs.MONGO_DB_NAME 
    });

    /// crear una coleccion = tables, documento = registro
   /*  const newLog = await LogModel.create({
        message: 'Test Message from Mongo',
        origin: 'app.ts',
        level:  'low'

    });
 
    await newLog.save();
    console.log(newLog); 

    const logs = await LogModel.find();
    console.log(logs);
 */


    // console.log( envs );
    // Server.start();

}