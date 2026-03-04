import { Router } from "express";
import {prisma} from '../db'
import { asyncHandler } from "../middleware/asyncHandler";
import { success, error } from "../utils/ApiResponse";

const router=Router()

router.get('/companies',asyncHandler(
    async(req,res)=>{
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
))

export default router;