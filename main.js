const makeCall = require('./makeCall')
const readLine = require('readline')

module.exports = async function main (config) {
  const messages = [{ role: 'system', content: 'You are a chat bot running on terminal' }]
  const ora = await import('ora')

  while (true) {
    try {
      const input = await new Promise((resolve, reject) => {
        const rl = readLine.createInterface({
          input: process.stdin,
          output: process.stdout
        })

        rl.question('You :> ', (answer) => {
          resolve(answer)
          rl.close()
        })
      })

      if (input === 'exit') {
        process.exit(0)
      }

      messages.push({ role: 'user', content: input })

      const loading = ora.default('Loading....').start()
      const res = await makeCall(messages, { apiKey: config.apiKey })
      loading.succeed(' ')

      messages.push(res)
      process.stdout.write('\nTermGPT:> ' + res.content + '\n\n')
    } catch (err) {
      console.error(err)
      break
    }
  }
}
