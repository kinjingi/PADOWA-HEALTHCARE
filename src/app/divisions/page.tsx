import { getDivisions } from "@/app/admin/actions";
import DivisionsClient from "@/components/DivisionsClient";

export const revalidate = 60;

export default async function Divisions() {
  let divisions: any[] = [];
  try {
    divisions = await getDivisions();
  } catch (error) {
    console.error("Divisions database error:", error);
  }
  return <DivisionsClient divisions={divisions} />;
}
