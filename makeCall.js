const { Configuration, OpenAIApi } = require('openai')

module.exports = async function makeCall (messages, { apiKey }) {
  const configuration = new Configuration({
    apiKey
  })
  const openai = new OpenAIApi(configuration)

  let res
  try {
    res = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages
    })
    return res.data.choices[0].message
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}
