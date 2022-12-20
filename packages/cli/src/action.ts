import versionCheck from 'github-version-checker'
import PrettyError from 'pretty-error'
import { CliArguments, JsonOutput } from './types'
import { print, printError } from './util'

function printPretty(result: any, args: CliArguments) {
    if (result) { // update is null if there is no update available, so check here
        print('An update is available! ' + result.name)
        print('You are on version ' + args['current-version'] + '!')
    } else {
        print('You are up to date.')
    }
}

export default async function action(args: CliArguments) {
    try {
        const result = await versionCheck({
            owner: args.owner,
            repo: args.repository,
            currentVersion: args['current-version'],
            fetchTags: args.tags === true,
            excludePrereleases: args['no-pre-releases'] === true,
            token: args.token
        })

        if (args.json) {
            const output: JsonOutput = {
                type: result === undefined ? 'notfound' : 'outdated',
                data: result?.update
            }
            print(JSON.stringify(output), false)
        }
        else {
            printPretty(result, args)
        }
    } catch (error: any) {
        if (args.verbose) {
            printError(new PrettyError().render(error))
        }
        else {
            printError(error.message)
        }
    }
}
