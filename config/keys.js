//keys.js figure out what set of credentials to return
if (process.env.node_env=='production'){
    module.exports = require('./prod');
} else {
    // we are in dev mode return dev keys
    module.exports = require('./dev');
}