const {getExports} = require('../helper/heroku-api')

module.exports = {
    timetravel: false,
    misrepresentedTokens: true,
    ...getExports("karura-staking", ['karura', 'acala'])
}