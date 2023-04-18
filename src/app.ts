import express, { Application } from "express"
import morgan from "morgan"
import cors from "cors"
//import productRouter from './routes/producto.routes'
//ROUTES
import IndexRoutes from './routes/index.routes'
import CategoriaRoutes from './routes/categoria.routes'
import ProductoRoutes from './routes/producto.routes'

export class App{

  private app: Application

  constructor(private port?: number | string) {
    this.app = express()
    this.settings()
    this.middlewares()
    this.routes()
    
  } 

  settings() {
    this.app.set('port', this.port || process.env.PORT || 4000)
  }

  middlewares() {
    this.app.use(morgan('dev'))
    this.app.use(express.json())
    this.app.use(cors())
  }

  routes() {
    this.app.use(IndexRoutes)
    this.app.use('/api/categorias', CategoriaRoutes)
    this.app.use('/api/productos', ProductoRoutes)
  }

  async listen() {
    await this.app.listen(this.app.get('port'), () => {
      console.log(`Servidor corriendo en puerto ${ this.app.get('port') } `)
    }) 
    
  }
}