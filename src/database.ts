import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'

dotenv.config()
/* import { createPool } from 'mysql2/promise'


export async function connect() {
  const connection = await createPool({
    host: 'localhost',
    user: 'osvaldo',
    password: 'sql123',
    database: 'crud-firmenti',
    connectionLimit: 10
  })
  return connection;

}
 */
var sequelize : Sequelize

console.log(process.env.MYSQL_ADDON_DB)
const db = process.env.MYSQL_ADDON_DB
const user = process.env.MYSQL_ADDON_USER
const password = process.env.MYSQL_ADDON_PASSWORD
const host = process.env.MYSQL_ADDON_HOST

if(db && user && password && host){
  sequelize = new Sequelize( db, user, password ,{
    host: host,
    dialect: "mysql",
  })
} else {
  sequelize = new Sequelize('crud-firmenti', 'osvaldo', 'sql123', {
    host: 'localhost',
    dialect: 'mysql',
  })
}

export default sequelize 
  