import test from 'ava'
import { release, tag } from '../src/util/scheme-mapper'

// define some test objects
const validReleaseObject = {
    name: 'axelrindle/github-version-checker',
    tag_name: 'v2.0.0',
    prerelease: false,
    published_at: '1. May 2018',
    html_url: 'https://github.com/axelrindle/github-version-checker/releases/tag/v2.0.0'
}
const validReleaseObject2 = {
    name: 'axelrindle/github-version-checker',
    tag_name: 'v2.0.0',
    prerelease: false,
    published_at: '1. May 2018',
    html_url: 'https://github.com/axelrindle/github-version-checker/releases/tag/v2.0.0',
    lorem: 'ipsum',
    dolor: 'sit',
    amet: 'test'
}

test('scheme-mapper#release maps correctly', t => {
    const mapped = release(validReleaseObject)
    t.deepEqual(mapped, {
        name: 'axelrindle/github-version-checker',
        tag: {
            name: 'v2.0.0'
        },
        isPrerelease: false,
        publishedAt: '1. May 2018',
        url: 'https://github.com/axelrindle/github-version-checker/releases/tag/v2.0.0'
    })


    const mapped2 = release(validReleaseObject2)
    t.deepEqual(mapped2, {
        name: 'axelrindle/github-version-checker',
        tag: {
            name: 'v2.0.0'
        },
        isPrerelease: false,
        publishedAt: '1. May 2018',
        url: 'https://github.com/axelrindle/github-version-checker/releases/tag/v2.0.0'
    })
})

test('scheme-mapper#release fails with invalid object', t => {
    const error = t.throws(() => {
        return release(null)
    })
    t.is(error.message, 'The object to map must not be falsy!')

    const error2 = t.throws(() => {
        return release(undefined)
    })
    t.is(error2.message, 'The object to map must not be falsy!')
})

test('scheme-mapper#tag maps correctly', t => {
    const mapped = tag(validReleaseObject)
    t.deepEqual(mapped, {
        name: 'axelrindle/github-version-checker'
    })

    const mapped2 = tag(validReleaseObject2)
    t.deepEqual(mapped2, {
        name: 'axelrindle/github-version-checker'
    })
})

test('scheme-mapper#tag fails with invalid object', t => {
    const error = t.throws(() => {
        return tag(null)
    })
    t.is(error.message, 'The object to map must not be falsy!')

    const error2 = t.throws(() => {
        return tag(undefined)
    })
    t.is(error2.message, 'The object to map must not be falsy!')
})