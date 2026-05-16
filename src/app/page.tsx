import { getSettings, getInformations } from "@/app/admin/actions";
import prisma from "@/lib/prisma";
import HomeClient from "@/components/HomeClient";

export default async function Home() {
  const keys = [
    "hero_badge",
    "hero_title_main",
    "hero_title_highlight",
    "hero_description",
    "about_us",
    "mission",
    "aim",
    "leadership",
    "cv1_title", "cv1_desc", "cv2_title", "cv2_desc", "cv3_title", "cv3_desc"
  ];
  
  const settings = await getSettings(keys);
  const informations = await getInformations();
  const divisions = await prisma.division.findMany();
  
  return <HomeClient heroSettings={settings} informations={informations} divisions={divisions} />;
}
