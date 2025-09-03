import chalk from 'chalk'
import { log } from './log'
import fs from 'fs'

// parsed file information

interface ParsedFile {
    filespec?: string,
    content: string,
    version: string,
    version_parts: number[],
    build: string
}

// find the first 0.0.0 version number in a file

function getVersion(filespec: string): ParsedFile {
    if(!fs.existsSync(filespec)) {
        log('fail', `File not found ${chalk.whiteBright(filespec)}`)
        process.exit(-1);
    }

    const content = fs.readFileSync(filespec, { encoding: 'utf-8' })
    const version_regex = /(\d*)\.(\d*)\.(\d*)/
    const version_match = version_regex.exec(content)
    const date_regex = /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)/
    const date_match = date_regex.exec(content)

    if(!version_match) {
        log('fail', `Could not find version number in ${chalk.whiteBright(filespec)}`)
        process.exit(-1)
    }

    if(!date_match) {
        log('fail', `Could not find build date in ${chalk.whiteBright(filespec)}`)
        process.exit(-1)
    }

    return {
        content,
        version: version_match[0],
        version_parts: version_match.slice(1).map(v => Number.parseInt(v)),
        build: date_match[0]
    };
}

// log information about parsed file

function logVersion(expected_version: string, parsedFile: Required<ParsedFile>) {
    let prefix: string
    log('info', `${parsedFile.filespec} is version ${parsedFile.version} (${parsedFile.build})`)
    if(expected_version !== parsedFile.version) {
        log('warn', `${parsedFile.filespec} version does not match`)
    }
}

// begin

console.log()

const targetFileSpec = [
    './package.json',
    './api/package.json',
    './web/package.json',
    './web/src/app/app.html'
]

// get file contents and versions from files

const parsedFiles = targetFileSpec.map<Required<ParsedFile>>(filespec => ({filespec, ...getVersion(filespec)}))

// log versions

const expected_version = parsedFiles[0].version

parsedFiles.forEach(parsedFile => logVersion(expected_version, parsedFile))

// obtain command parameter

if(process.argv.length !== 3) {
    log('fail', `Expected argument of ${chalk.whiteBright('MAJOR')}, ${chalk.whiteBright('MINOR')}, or ${chalk.whiteBright('BUILD')}.`)
    process.exit(-1)
}

const command = process.argv[2].toLocaleUpperCase()

// calculate new version number

switch(command) {
    case 'MAJOR':
        parsedFiles[0].version_parts[0]++
        parsedFiles[0].version_parts[1] = 0
        parsedFiles[0].version_parts[2] = 0
        break
    case 'MINOR':
        parsedFiles[0].version_parts[1]++
        parsedFiles[0].version_parts[2] =0
        break
    case 'BUILD':
        parsedFiles[0].version_parts[2]++
        break
    default:
        log('fail',`Unknown command ${chalk.whiteBright(command)}`)
        process.exit(-1)
}

const new_version = `${parsedFiles[0].version_parts[0]}.${parsedFiles[0].version_parts[1]}.${parsedFiles[0].version_parts[2]}`
const new_build = new Date().toISOString()
log('info', `New version will be ${chalk.whiteBright(`${new_version} (${new_build})`)}`)

// compose replacement files

const replacement_files = parsedFiles.map(parsedFile => ({
    filespec: parsedFile.filespec,
    content: parsedFile.content
        .replace(parsedFile.version, new_version)
        .replace(parsedFile.build, new_build)
}))

// write replacement files

replacement_files.forEach(({filespec, content}) => {
    fs.writeFileSync(filespec, content, { encoding: 'utf-8' })
    log('ok', `Updated ${chalk.whiteBright(filespec)}`)
})

// done

log('done', `Done`)
console.log()