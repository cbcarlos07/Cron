const cron = require('cron')
const pm2  = require('pm2')
const CronJob = cron.CronJob
// https://pm2.keymetrics.io/docs/usage/pm2-api/#programmatic-api
/* 
    https://www.npmjs.com/package/node-cron

    # ┌────────────── second (optional)
    # │ ┌──────────── minute
    # │ │ ┌────────── hour
    # │ │ │ ┌──────── day of month
    # │ │ │ │ ┌────── month
    # │ │ │ │ │ ┌──── day of week
    # │ │ │ │ │ │
    # │ │ │ │ │ │
    # * * * * * *


    second	0-59
    minute	0-59
    hour	0-23
    day of month	1-31
    month	1-12 (or names)
    day of week	0-7 (or names, 0 or 7 are sunday)


    * * / 1 * * *
    (* / 1) é tudo junto
    Todos os dias de segunda a sexta às 08:00 da manhã, 
 enviar requisição para verificar se existem ocorrências enviadas que ainda não foram confirmadas
*/

const job = new CronJob( '*/5 * * * * *', () => {
    pm2.connect( err => {
        if(err) throw err
        pm2.restart(1, () => {})
        pm2.restart(2, () => {})
        pm2.restart(3, () => {})
    })
    console.log('Verificando ...', getCurDate());
}, null, true, 'America/Manaus')

const getCurDate = () => {
    let curDate = new Date()
    let montth  = curDate.getMonth() + 1 < 10 ? `0${curDate.getMonth() + 1}` : curDate.getMonth() + 1
    let day     = curDate.getDate() < 10 ? `0${curDate.getDate()}` :  curDate.getDate()
    let hour    = curDate.getHours() < 10 ? `0${curDate.getHours()}` : curDate.getHours()
    let minute  = curDate.getMinutes() < 10 ? `0${curDate.getMinutes()}` : curDate.getMinutes()
    let second  = curDate.getSeconds() < 10 ? `0${curDate.getSeconds()}` : curDate.getSeconds()
    let formatedDate = `${day}/${montth}/${curDate.getFullYear()} ${hour}:${minute}:${second}`
    return formatedDate
  }