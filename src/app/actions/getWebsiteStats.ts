// In a Next.js page component (e.g., pages/index.js)
import { doc, getDoc } from "firebase/firestore";
import db from "../../../firebase";
import { InsightsData } from "@/components/insightsData/insightsData";

export async function getWebsiteStats() {
  try {
    const docRef = doc(db, "analytics", "insights");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return JSON.stringify(docSnap.data() as InsightsData); // return the data
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
