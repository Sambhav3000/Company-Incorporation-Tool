import { Router } from "express";
import { prisma } from "../db";
import { asyncHandler } from "../middleware/asyncHandler";
import { success, error } from "../utils/ApiResponse";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);


router.post(
  "/step1",
  asyncHandler(async (req, res) => {
    const { id, name, totalCapital, numberOfShareholders } = req.body;
    const adminId = (req as any).admin.id; 

    if (!name || totalCapital === undefined || numberOfShareholders === undefined)
      return error(res, "Missing required company fields", 400);

    const company = id
      ? await prisma.company.update({
          where: { id },
          data: { name, totalCapital, numberOfShareholders },
        })
      : await prisma.company.create({
          data: {
            name,
            totalCapital,
            numberOfShareholders,
            adminId, 
          },
        });

    if (!company) return error(res, "Error occurred while creating company", 500);
    return success(res, company, "Company saved successfully");
  })
);


router.post(
  "/step2/:companyId",
  asyncHandler(async (req, res) => {
    const companyIdParam = req.params.companyId;

    if (!companyIdParam || Array.isArray(companyIdParam))
      return error(res, "Invalid Company Id", 400);

    const companyId = parseInt(companyIdParam, 10);
    if (isNaN(companyId)) return error(res, "Company Id must be a number", 400);

    const { shareholders } = req.body;
    if (!Array.isArray(shareholders) || shareholders.length === 0)
      return error(res, "Shareholders array is required", 400);

    
    const companyExists = await prisma.company.findFirst({
      where: { id: companyId, adminId: (req as any).admin.id },
    });
    if (!companyExists)
      return error(res, "Company does not exist or you do not have permission", 403);

    const updatedCompany = await prisma.company.update({
      where: { id: companyId },
      data: { shareholders: { create: shareholders } },
      include: { shareholders: true },
    });

    return success(res, updatedCompany, "Shareholders added successfully");
  })
);


router.get(
  "/:companyId",
  asyncHandler(async (req, res) => {
    const companyIdParam = req.params.companyId;
    if (!companyIdParam || Array.isArray(companyIdParam))
      return error(res, "Invalid Company Id", 400);

    const companyId = parseInt(companyIdParam, 10);
    if (isNaN(companyId)) return error(res, "Company Id must be a number", 400);

    const company = await prisma.company.findFirst({
      where: { id: companyId, adminId: (req as any).admin.id },
      include: { shareholders: true },
    });

    if (!company) return error(res, "Company does not exist", 404);
    return success(res, company);
  })
);


router.get(
  "/",
  asyncHandler(async (req, res) => {
    const companies = await prisma.company.findMany({
      where: { adminId: (req as any).admin.id },
      include: { shareholders: true },
      orderBy: { id: "desc" },
    });

    return success(res, companies);
  })
);

export default router;