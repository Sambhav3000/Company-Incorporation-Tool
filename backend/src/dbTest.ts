// src/dbTest.ts

import dotenv from "dotenv";
dotenv.config();  // Load DATABASE_URL from .env

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); 

async function main() {
  const company = await prisma.company.create({
    data: {
      name: "MyCompany",
      totalCapital: 100000,
      numberOfShareholders: 2,
      shareholders: {
        create: [
          { firstName: "Alice", lastName: "Smith", nationality: "DK" },
          { firstName: "Bob", lastName: "Jones", nationality: "US" },
        ],
      },
    },
    include: { shareholders: true },
  });

  console.log(company);
}

main()
  