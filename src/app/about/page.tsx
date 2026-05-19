import { getSettings } from "@/app/admin/actions";
import AboutClient from "@/components/AboutClient";

export const revalidate = 60;

export default async function About() {
  const keys = [
    "about_us", "mission", "our_vision", "leadership",
    "cv1_title", "cv1_desc", "cv2_title", "cv2_desc", "cv3_title", "cv3_desc"
  ];
  const settings = await getSettings(keys);
  
  return <AboutClient settings={settings} />;
}
