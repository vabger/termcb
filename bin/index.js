#!/usr/bin/env node

const readLine = require('readline')
const main = require('../main')
const { setConfig, getConfig } = require('../util/config')

const config = getConfig()

if (!config.apiKey) {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question('Enter your openai api key: ', (answer) => {
    setConfig('apiKey', answer)
    rl.close()
    main(getConfig())
  })
} else {
  main(config)
}
