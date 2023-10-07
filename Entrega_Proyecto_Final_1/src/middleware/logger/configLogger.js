import winston from 'winston';
import config from '../../config/config.js';


const levelOptions = {
    levels: {
      fatal: 0,
      error: 1,
      info: 2,
      http: 3,
      debug: 4
    },
  };

  //desarrollo
  export const developmentLogger = winston.createLogger({
    levels: levelOptions.levels,
    transports: [
      new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(winston.format.simple())
      })
    ]
  });
  
  //produccion
  export const productionLogger = winston.createLogger({
    levels: levelOptions.levels,
    transports: [
      new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(winston.format.simple())
      }),
      new winston.transports.File({
        filename: './errors.log',
        level: 'error',
        format: winston.format.simple()
      })
    ]
  });
  

  
  let logger;

  if( config.AMBIENTE === "production" ){
    logger = productionLogger
   
  }else{
    logger = developmentLogger
    
  }
  export default logger 

  export const addLogger = (req, res, next) => {
    
    const logInfo = {
      method: req.method,
      url: req.url,
      time: new Date().toLocaleTimeString(),
      ip: req.ip,
      params: req.params,
    };
    const logMessage = JSON.stringify(logInfo)
    logger.info(logMessage);
    next();
  };
  