import chalk from 'chalk'
import { log } from './log'
import fs from 'fs'

// find the first 0.0.0 version number in a file

function getVersion(filespec: string): [string, string, number[], string] {
    if(!fs.existsSync(filespec)) {
        log('fail', `File not found ${chalk.whiteBright(filespec)}`)
        process.exit(-1);
    }

    const json = fs.readFileSync(filespec, { encoding: 'utf-8' })
    const version_regex = /(\d*)\.(\d*)\.(\d*)/
    const version_match = version_regex.exec(json)
    const date_regex = /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)/
    const date_match = date_regex.exec(json)

    if(!version_match) {
        log('fail', `Could not find version number in ${chalk.whiteBright(filespec)}`)
        process.exit(-1)
    }

    if(!date_match) {
        log('fail', `Could not find build date in ${chalk.whiteBright(filespec)}`)
        process.exit(-1)
    }

    return [
        json,
        version_match[0],
        version_match.slice(1).map(v => Number.parseInt(v)),
        date_match[0]
    ];
}

// begin

console.log()

// get file contents and versions from files

const [package_json, package_json_version, old_parts, package_json_build] = getVersion('./package.json')
const [api_package_json, api_package_json_version, _api_old_parts, api_package_json_build] = getVersion('./api/package.json')
const [web_package_json, web_package_json_version, _web_old_parts, web_package_json_build] = getVersion('./web/package.json')

// log master package version

log('info', `found version ${chalk.whiteBright(package_json_version)} in ${chalk.whiteBright('./package.json')}`)
log('info', `found build ${chalk.whiteBright(package_json_build)} in ${chalk.whiteBright('./package.json')}`)

// log api package version

if(package_json_version === api_package_json_version) {
    log('info', `found version ${api_package_json_version} in ${chalk.whiteBright('./api/package.json')}`)
} else {
    log('warn', `version ${api_package_json_version} in ${chalk.whiteBright('./api/package.json')} does not match`)
}

// log web package version

if(package_json_version === web_package_json_version) {
    log('info', `found version ${web_package_json_version} in ${chalk.whiteBright('./web/package.json')}`)
} else {
    log('warn', `version ${web_package_json_version} in ${chalk.whiteBright('./web/package.json')} does not match`)
}

// obtain command parameter

if(process.argv.length !== 3) {
    log('fail', `Expected argument of ${chalk.whiteBright('MAJOR')}, ${chalk.whiteBright('MINOR')}, or ${chalk.whiteBright('BUILD')}.`)
    process.exit(-1)
}

const command = process.argv[2].toLocaleUpperCase()

// calculate new version number

switch(command) {
    case 'MAJOR':
        old_parts[0]++
        old_parts[1] = 0
        old_parts[2] = 0
        break
    case 'MINOR':
        old_parts[1]++
        old_parts[2] =0
        break
    case 'BUILD':
        old_parts[2]++
        break
    default:
        log('fail',`Unknown command ${chalk.whiteBright(command)}`)
        process.exit(-1)
}

const new_version = `${old_parts[0]}.${old_parts[1]}.${old_parts[2]}`
log('info', `New version will be ${chalk.whiteBright(new_version)}`)

// get new build date

const new_build = new Date().toISOString()
log('info', `New build date will be ${chalk.whiteBright(new_build)}`)

// compose replacement files

const new_package_json = package_json
    .replace(package_json_version, new_version)
    .replace(package_json_build, new_build)
const new_api_package_json = api_package_json
    .replace(api_package_json_version, new_version)
    .replace(api_package_json_build, new_build)
const new_web_package_json = web_package_json
    .replace(web_package_json_version, new_version)
    .replace(api_package_json_build, new_build)

// write replacement files

fs.writeFileSync('./package.json', new_package_json, { encoding: 'utf-8' })
log('ok', `Updated ${chalk.whiteBright('./package.json')}`)
fs.writeFileSync('./api/package.json', new_api_package_json, { encoding: 'utf-8' })
log('ok', `Updated ${chalk.whiteBright('./api/package.json')}`)
fs.writeFileSync('./web/package.json', new_web_package_json, { encoding: 'utf-8' })
log('ok', `Updated ${chalk.whiteBright('./web/package.json')}`)

log('done', `Done`)