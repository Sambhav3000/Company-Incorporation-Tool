import express from "express";
import cors from "cors";
import companyRouter from './routes/company'

const app=express();

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Server is running!");
});

app.use("/api/company",companyRouter)
export default app;