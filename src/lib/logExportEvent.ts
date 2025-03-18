// lib/firebase/analytics.ts
import {
  doc,
  getDoc,
  increment,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import db from "../../firebase";

interface ExportEvent {
  stylesheetPreset: string;
  colorFormat: string;
  timestamp: Timestamp;
  userAgent?: string;
}
/**
 * Tracks a new website visit
 */
export async function trackWebsiteVisit() {
  try {
    const insightsRef = doc(db, "analytics", "insights");

    // Check if the document exists
    const docSnap = await getDoc(insightsRef);

    if (docSnap.exists()) {
      // Update existing document
      await updateDoc(insightsRef, {
        totalVisits: increment(1),
      });
    } else {
      // Create new document
      await setDoc(insightsRef, {
        totalVisits: 1,
        totalExports: 0,
        requestsExport: 0,
        stylesheetPresets: {},
        colorFormats: {},
      });
    }
  } catch (error) {
    console.error("Error tracking website visit:", error);
  }
}

export async function logRequestExportEvent(): Promise<void> {
  const insightsRef = doc(db, "analytics", "insights");

  // Get the current document or create it if it doesn't exist
  const insightsDoc = await getDoc(insightsRef);

  if (insightsDoc.exists()) {
    await updateDoc(insightsRef, {
      requestsExport: increment(1),
      lastUpdated: Timestamp.now(),
    });
  } else {
  }
}

/**
 * Logs an export event to Firebase Firestore
 */
export async function logExportEvent(
  stylesheetPreset: string,
  colorFormat: string,
): Promise<void> {
  try {
    // 1. Log individual export event to "exportEvents" collection
    const eventRef = doc(db, "exportEvents", crypto.randomUUID());
    const eventData: ExportEvent = {
      stylesheetPreset,
      colorFormat,
      timestamp: Timestamp.now(),
      userAgent:
        typeof navigator !== "undefined" ? navigator.userAgent : undefined,
    };

    await setDoc(eventRef, eventData);

    // 2. Increment aggregate counters in "analytics/insights" document
    const insightsRef = doc(db, "analytics", "insights");

    // Get the current document or create it if it doesn't exist
    const insightsDoc = await getDoc(insightsRef);

    if (!insightsDoc.exists()) {
      // Create initial document structure if it doesn't exist
      await setDoc(insightsRef, {
        totalExports: 1,
        totalVisits: 1,
        stylesheetPresets: {
          [stylesheetPreset]: 1,
        },
        colorFormats: {
          [colorFormat]: 1,
        },
        lastUpdated: Timestamp.now(),
      });
    } else {
      // Update existing document
      const updateData: any = {
        totalExports: increment(1),
        lastUpdated: Timestamp.now(),
      };

      // Use dot notation for nested fields
      updateData[`stylesheetPresets.${stylesheetPreset}`] = increment(1);
      updateData[`colorFormats.${colorFormat}`] = increment(1);

      await updateDoc(insightsRef, updateData);
    }
  } catch (error) {
    console.error("Error logging export event:", error);
    // Don't throw the error to avoid disrupting user experience
  }
}

/**
 * Retrieves analytics insights from Firestore
 */
export async function getExportAnalytics() {
  try {
    const insightsRef = doc(db, "analytics", "insights");
    const insightsDoc = await getDoc(insightsRef);

    if (insightsDoc.exists()) {
      return insightsDoc.data();
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
