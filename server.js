const express = require('express');
require('./databse/db');
require('dotenv').config();
 const app = express();
 const port =5504;
 const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
 app.use(express.json())
 app.use(express.urlencoded({extended:true,limit:"1000mb"}))
 const userRouter=require('./router/userRouter');
 const adminRouter=require('./router/adminRouter')
 const jobTypeRouter=require('./router/jobTypeRouter')
 const skillRouter=require('./router/skillRouter')
 const planRouter = require('./router/planRouter')
 const jobRouter = require('./router/jobAddRouter')

 app.use('/user',userRouter)
 app.use('/admin',adminRouter)
 app.use('/jobType', jobTypeRouter)
 app.use('/Skills', skillRouter)
 app.use('/Plan', planRouter)
 app.use('/Job', jobRouter)

 app.get('/',(req,res)=>{
    console.log("Data send successful"+req.query.name)
    res.send("welcome to" +req.query.name)
 });
 app.get('/about',(req,res)=>{
    res.send("About Us page")
 });
 const swaggerDefinition = {
  info: {
    title: "Node Test",
    version: "1.0.0",
    description: "Swagger API Docs",
  },
  host: `localhost:5504`,
  basePath: "/",
};
const options = {
  swaggerDefinition: swaggerDefinition,
  apis: ["./router/*.js"],
};
const swaggerSpec = swaggerJSDoc(options);
app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

 app.listen(port,()=>{
    console.log("server is running as port 5503")
 });
 