import prisma from "@/lib/prisma";
import DivisionsClient from "@/components/DivisionsClient";

export default async function Divisions() {
  const divisions = await prisma.division.findMany();
  return <DivisionsClient divisions={divisions} />;
}
