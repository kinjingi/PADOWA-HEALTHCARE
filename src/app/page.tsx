import { getSettings, getInformations, getDivisions } from "@/app/admin/actions";
import HomeClient from "@/components/HomeClient";

export const dynamic = "force-dynamic";

export default async function Home() {
  const keys = [
    "hero_badge",
    "hero_title_main",
    "hero_title_highlight",
    "hero_description",
    "hero_budget",
    "about_us",
    "mission",
    "aim",
    "leadership",
    "cv1_title", "cv1_desc", "cv2_title", "cv2_desc", "cv3_title", "cv3_desc"
  ];
  
  let settings: Record<string, string> = {};
  let informations: any[] = [];
  let divisions: any[] = [];
  
  try {
    settings = await getSettings(keys);
  } catch (err) {
    console.error("Home getSettings error:", err);
  }
  
  try {
    informations = await getInformations();
  } catch (err) {
    console.error("Home getInformations error:", err);
  }
  
  try {
    divisions = await getDivisions();
  } catch (err) {
    console.error("Home divisions error:", err);
  }
  
  return <HomeClient heroSettings={settings} informations={informations} divisions={divisions} />;
}
