import prisma from "@/lib/prisma";
import DivisionsClient from "@/components/DivisionsClient";

export default async function Divisions() {
  let divisions: any[] = [];
  try {
    divisions = await prisma.division.findMany();
  } catch (error) {
    console.error("Divisions database error:", error);
  }
  return <DivisionsClient divisions={divisions} />;
}
