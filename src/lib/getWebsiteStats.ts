import { doc, getDoc } from "firebase/firestore";
import db from "../../firebase";
import { InsightsData } from "@/components/insightsData/insightsData";

export async function getWebsiteStats() {
  try {
    const docRef = doc(db, "analytics", "insights");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const casted = docSnap.data() as InsightsData; // return the data
      const { lastUpdated, ...rest } = casted;
      return rest;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
