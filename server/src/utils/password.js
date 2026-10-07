const bcrypt = require("bcrypt")

const hashPassword = async(password)=>{

    const salt = await bcrypt.genSalt(10)

    return await bcrypt.hash(password,salt)
}

const comparePassword = async(password,hashedPasswrod)=>{
    
    return await bcrypt.compare(password,hashedPasswrod)
}

module.exports = {
    hashPassword,
    comparePassword
}