import chalk from 'chalk'

const prefix_default = `${chalk.whiteBright('[ ')}${chalk.reset('    ')}${chalk.whiteBright(' ]')} `
const prefix_done = `${chalk.whiteBright('[ ')}${chalk.blueBright('DONE')}${chalk.whiteBright(' ]')} `
const prefix_fail = `${chalk.whiteBright('[ ')}${chalk.redBright('FAIL')}${chalk.whiteBright(' ]')} `
const prefix_info = `${chalk.whiteBright('[ ')}${chalk.cyanBright('INFO')}${chalk.whiteBright(' ]')} `
const prefix_ok = `${chalk.whiteBright('[ ')} ${chalk.greenBright('OK')} ${chalk.whiteBright(' ]')} `
const prefix_warn = `${chalk.whiteBright('[ ')}${chalk.yellowBright('WARN')}${chalk.whiteBright(' ]')} `

export type LogLevel = 'done' | 'fail' | 'info' | 'ok' | 'warn'

export function log(level: LogLevel, message: string) {
    let prefix: string

    switch(level) {
        case 'done':
            prefix = prefix_done
            break;
        case 'fail':
            prefix = prefix_fail
            break
        case 'info':
            prefix = prefix_info
            break
        case 'ok':
            prefix = prefix_ok
            break
        case 'warn':
            prefix = prefix_warn
            break
        default:
            prefix = prefix_default
            break
    }

    console.log(`${prefix}${chalk.blackBright(message)}`)
}