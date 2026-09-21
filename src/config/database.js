const mongoose = require("mongoose")
const dns = require("dns")
dns.setServers(["1.1.1.1","8.8.8.8"])

const connectDB = async ()=>{
    await mongoose.connect(process.env.MongoDB_Connection_URL)
}

module.exports = {connectDB}
