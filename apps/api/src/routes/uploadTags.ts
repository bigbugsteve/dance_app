// scripts/uploadTags.ts
import admin from "firebase-admin";

// A serviceAccountKey.json a Firebase Admin SDK-hoz szükséges privát kulcs fájlod
import serviceAccountJson from "../lib/serviceAccountKey.json";

const serviceAccount: admin.ServiceAccount = {
  projectId: serviceAccountJson.project_id,
  clientEmail: serviceAccountJson.client_email,
  privateKey: serviceAccountJson.private_key.replace(/\\n/g, '\n'), // fontos a sorvégek helyes kezelése
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const tags = [
  { id: "footwork", name: "Footwork" },
  { id: "sensual", name: "Sensual" },
  { id: "dominican", name: "Dominican" },
  { id: "8-count", name: "8 Count" },
  { id: "16-count", name: "16 Count" },
  { id: "turns", name: "Turns" },
  { id: "lead", name: "Lead" },
  { id: "follow", name: "Follow" },
  { id: "body-movement", name: "Body Movement" },
  { id: "isolation", name: "Isolation" },
  { id: "partner-work", name: "Partner Work" },
  { id: "patterns", name: "Patterns" },
];

async function uploadTags() {
  const batch = db.batch();

  tags.forEach((tag) => {
    const docRef = db.collection("tags").doc(tag.id);
    batch.set(docRef, { name: tag.name });
  });

  await batch.commit();
  console.log("Tag-ek feltöltve a Firestore-ba.");
}

uploadTags().catch((error) => {
  console.error("Hiba történt a tag-ek feltöltésekor:", error);
});
