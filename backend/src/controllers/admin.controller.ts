import { success,error } from "../utils/ApiResponse";
import {prisma} from "../db"
import { Request,Response } from "express";

export const registeredCompanies = async(req:Request, res:Response)=>{
    const companies = await prisma.company.findMany({
        include:{shareholders:true},
        orderBy:{id:"desc"}
    });

    if (companies.length==0)
        return error(res,"No companies registered")

    if(!companies)
        return error(res,"Error fetching companies")
    
    return success(res,companies,"Companies fetched successfully")
    }
