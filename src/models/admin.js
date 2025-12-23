const db = require('../config/db.js');


let id = process.argv.slice(2)[0];

async function admin(UserID) {
    await db.execute(`UPDATE Users SET is_admin = 'yes' WHERE user_id = ?`,[UserID]);
}

admin(id);
