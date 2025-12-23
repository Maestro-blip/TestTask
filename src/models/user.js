const db = require('../config/db.js');

class userModels{

    static async create(name,email,password){
        const [result] = await db.execute(`INSERT INTO Users (name,email,password) VALUES (?,?,?)`,[name,email,password]);
        return result.insertId;
    }
    
    static async getByEmail(email){
        const [result] = await db.execute(`SELECT * FROM Users WHERE email = ?`,[email])
        if(result.length === 0)
            return null
        return result[0]
    }
}

module.exports = userModels;