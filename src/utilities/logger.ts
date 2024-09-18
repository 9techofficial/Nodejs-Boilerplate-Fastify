import moment from 'moment';
import winston from 'winston';
const { combine, timestamp, printf, align, json } = winston.format;

export const apiLog = winston.createLogger({
  level: 'info',
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), json(), align(), printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)),
  transports: [new winston.transports.File({ filename: `logger/api-log-${moment().format('YYYY-MM')}.log` })],
});

export const logInfo = winston.createLogger({
  level: 'info',
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), json(), align(), printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)),
  transports: [new winston.transports.File({ filename: `logger/log-info-${moment().format('YYYY-MM')}.log` })],
});