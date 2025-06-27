import mongoose from 'mongoose'
import config from 'config'
import debug from 'debug'
const devdbgr = debug("development:mongooseConnection");
const proddbgr = debug("production:mongooseConnection");


mongoose
    .connect(`${config.get("MONGO_URI")}/IWS`)
    .then(function () {
        devdbgr('Connected')
        proddbgr('Connected')
    })
    .catch(function (err) {
        proddbgr(err)
    })

export default mongoose.connection