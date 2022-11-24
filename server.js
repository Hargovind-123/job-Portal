const fs = require('fs')
const express = require('express');
require('./databse/db');
require('dotenv').config();
 const app = express();
 const port = process.env.PORT|| "5000";

 const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
 app.use(express.json())
 app.use(express.urlencoded({extended:true,limit:"1000mb"}))
 const userRouter=require('./router/userRouter');
 const adminRouter=require('./router/adminRouter')
 const companyRouter = require('./router/addCompanyRouter')
 const productRouter = require('./router/addProductRouter')
 
 app.use('/user',userRouter)
 app.use('/admin',adminRouter) 
 app.use('/company', companyRouter)
app.use('/product', productRouter)
 const swaggerDefinition = {
  info: {
    title: "Node Test",
    version: "1.0.0",
    description: "Swagger API Docs",
  },
  host: `192.168.1.21:5000`,
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
    console.log(`server running port  ${port}`)
 });
 