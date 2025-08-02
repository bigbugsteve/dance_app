"use client";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../api/src/lib/firebaseAdmin";

export default function TestFirebase() {
  const handleAddData = async () => {
    try {
      const docRef = await addDoc(collection(db, "testData"), {
        name: "bachata figura",
        createdAt: new Date(),
      });
      alert(`Dokumentum hozzáadva! ID: ${docRef.id}`);
    } catch (err) {
      console.error("Hiba:", err);
    }
  };

  const handleAddUser = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        name: "Teszt Elek",
        email: "teszt@example.com",
        createdAt: new Date(),
      });
      console.log("Sikeres mentés! ID:", docRef.id);
    } catch (e) {
      console.error("Hiba történt:", e);
    }
  };

  return (
    <div>
      <h1>Firebase Teszt</h1>
      <button onClick={handleAddData}>Adat hozzáadása</button>
      <button onClick={handleAddUser}>User hozzáadása</button>
    </div>
  );
}
