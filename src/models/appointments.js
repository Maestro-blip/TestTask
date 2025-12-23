const db = require('../config/db.js');

class appointModels{

    static async create(title,description,date,duration,userID,status){
        const [result] = await db.execute(`INSERT INTO Appointments (title, description, date, duration,created_by,status) VALUES (?,?,?,?,?,?)`,[title,description,date,duration,userID,status]);
            return result.insertId;
    }
    static async getAll(userID,userRole){
        let result
        if(userRole =='Admin')
            result = await db.execute(`Select * FROM Appointments`);

        else
            result = await db.execute(`Select * FROM Appointments WHERE created_by = ?`,[userID]);
         if(result.length === 0)
            return null
        return result;
    }
    static async getById(appointID,userID,userRole){
        let result;
        if(userRole =='Admin')
            [result] = await db.execute(`Select * FROM Appointments WHERE appoint_id = ?`,[appointID]);
        else
        [result] = await db.execute(`Select * FROM Appointments WHERE appoint_id = ? AND created_by = ?`,[appointID,userID])
       
          if(result.length === 0)
            return null
        return result
    }
    static async delete(appointID,userID,userRole){
        let result;
        if(userRole =='Admin')
        [result]= await db.execute(`UPDATE Appointments SET status = 'canceled' WHERE appoint_id = ?`,[appointID])
        else
        [result]= await db.execute(`UPDATE Appointments SET status = 'canceled' WHERE appoint_id = ? AND created_by = ?`,[appointID,userID])
            return result.insertId;
    }


}

module.exports = appointModels;