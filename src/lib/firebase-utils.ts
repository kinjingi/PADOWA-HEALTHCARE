import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy
} from "firebase/firestore";
import { db } from "./firebase";

/**
 * Example utility functions for Firestore
 * You can use these as a pattern for your own data needs
 */

// Example: Add a new division
export async function addDivisionToFirestore(name: string, description: string) {
  try {
    const docRef = await addDoc(collection(db, "divisions"), {
      name,
      description,
      createdAt: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, error };
  }
}

// Example: Get all divisions
export async function getDivisionsFromFirestore() {
  try {
    const q = query(collection(db, "divisions"), orderBy("name"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting documents: ", error);
    return [];
  }
}
