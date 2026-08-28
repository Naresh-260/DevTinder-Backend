const mongoose = require("mongoose")
const dns = require("dns")
dns.setServers(["1.1.1.1","8.8.8.8"])

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://lnareshnaru6_db_user:7sWaSOHoSSP0JVFi@namastedev.af2xz29.mongodb.net/DevTinder")
}

module.exports = {connectDB}
