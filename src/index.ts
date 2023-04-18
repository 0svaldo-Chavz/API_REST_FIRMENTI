import dotenv from "dotenv"
import { App } from "./app"
import sequelize from "./database"

dotenv.config()

async function main() {
  try {
    const app = new App()
    await app.listen()
    await sequelize.authenticate() 
    console.log('Conectado a la base de datos')
    await sequelize.sync({force: false})
  } catch (error) {
    console.log(error)
  }
}

main()