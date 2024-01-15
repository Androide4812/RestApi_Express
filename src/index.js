import express from 'express'
import employeesRoute from './routes/employees.routes.js'
import indexRoute from './routes/index.routes.js'

const app = express()

app.use(express.json())

app.use(indexRoute);
app.use('/api/', employeesRoute);

/*middleware para retornar un json en caso de que el endpoint no exista*/
app.use((req, res, next) => {
    res.status(404).json({
        Message: 'endpoint not found'
    })
})

app.listen(3000)
console.log("server running on port 3000")