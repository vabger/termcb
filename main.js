const makeCall = require('./makeCall')
const readLine = require('readline')

module.exports = async function main(config) {
  const messages = [{ role: 'system', content: 'You are a chat bot running on terminal' }]
  const ora = await import('ora')

  while (true) {
    try {
      let input = await readInputLine()

      if (input === '`') {
        input = await readInputLines()
      }

      if (input === 'exit') {
        process.exit(0)
      }

      messages.push({ role: 'user', content: input })

      const loading = ora.default('Loading....').start()

      const res = await makeCall(messages, { apiKey: config.apiKey })

      loading.succeed(' ')

      messages.push(res)

      process.stdout.write('\nTermCB:> ' + res.content + '\n\n')
    } catch (err) {
      console.error(err)
      break
    }
  }
}


async function readInputLines() {
  let inputLines = ""
  let flag = true;
  while (flag) {
    const rl = readLine.createInterface({ input: process.stdin, output: process.stdout, terminal: false })
    rl.prompt('');
    await new Promise((resolve) => {
      rl.on('line', (line) => {
        if (line === '`') {
          flag = false;
        }
        inputLines += line + '\n'
        rl.close()
        resolve()
      })
    })
  }

  return inputLines;
}

async function readInputLine() {
  return await new Promise((resolve, reject) => {
    const rl = readLine.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    })

    rl.question('You :> ', (answer) => {
      resolve(answer)
      rl.close()
    })
  })
}