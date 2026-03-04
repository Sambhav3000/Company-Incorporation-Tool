import express from "express";
import cors from "cors";
import companyRouter from './routes/company'
import adminRouter from './routes/admin'
import authRouter from './routes/auth.routes'

const app=express();

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Server is running!");
});

app.use("/api/company",companyRouter)
app.use("/api/admin",adminRouter)
app.use("/api/auth",authRouter)
export default app;