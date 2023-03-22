const path = require('path')
const os = require('os')
const fs = require('fs')

const configFilePath = path.join(os.homedir(), '.termcb')

module.exports.getConfig = () => {
  let configData
  try {
    configData = fs.readFileSync(configFilePath)
  } catch (err) {
    return {}
  }
  const config = JSON.parse(configData)
  return config
}

module.exports.setConfig = (key, value) => {
  const config = module.exports.getConfig()
  config[key] = value
  fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2))
}
