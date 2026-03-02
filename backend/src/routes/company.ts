import { Router } from "express";
import {prisma} from "../db"
import { asyncHandler } from "../middlewares/asyncHandler";
import { success,error } from "../utils/ApiResponse";
import { create } from "axios";

const router=Router();

//create company draft
router.post("/step1",asyncHandler(async(req,res)=>{
    const {id,name,totalCapital,numberOfShareholders}=req.body;

    const company=id ? await prisma.company.update({
        where:{id},
        data:{name,totalCapital,numberOfShareholders},
    }) :
    await prisma.company.create({
        data:{name,totalCapital,numberOfShareholders}
    });

    if (!company)
        return error(res,"Error occured while creating company",501);
    return success(res,company,"Company saved successfully");

}))

//Add shareholder info
router.post("/step2/:companyId",asyncHandler(async(req,res)=>{
    const companyIdParam=req.params.companyId;

    if(!companyIdParam || Array.isArray(companyIdParam))
        return error(res,"Invalid Company Id", 400);

    const companyId=parseInt(companyIdParam,10);

    if(isNaN(companyId))
        return error(res,"Company Id must be a number", 400);

    const {shareholders} = req.body;

    if(!Array.isArray(shareholders) || shareholders.length==0)
            return error(res,"Shareholders array is required", 400);
    
    const updatedCompany = await prisma.company.update({
        where:{id:companyId},
        data:{shareholders:{
                create: shareholders
            }
        },
        include:{shareholders:true},
    }
    );

    if(!updatedCompany)
        return error(res,"Error occured while updating company details")
    
    return success(res,updatedCompany,"Shareholders added successfully");
}))

//get company from ID
router.get("/:companyId",asyncHandler(async(req,res)=>{
    const companyIdParams = req.params.companyId;

    if(Array.isArray(companyIdParams) || !companyIdParams)
        return error(res,"Invalid Company Id",400);

    const companyId=parseInt(companyIdParams,10);
    if(isNaN(companyId))
        return error(res,"Company Id must be a number",400);

    const company = await prisma.company.findUnique({where:{id:companyId}, include:{shareholders:true}})

    if(!company)
        return error(res,"Company does not exist", 400);

    return success(res,company);
}))

export default router;