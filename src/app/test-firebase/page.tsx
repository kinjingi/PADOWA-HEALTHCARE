"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function TestFirebasePage() {
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const seedData = async () => {
    setLoading(true);
    setStatus("Seeding...");
    try {
      const testData = {
        divisions: [
          { name: "Cardiology", description: "Heart related medicines and treatments" },
          { name: "Neurology", description: "Brain and nervous system treatments" },
          { name: "Gastroenterology", description: "Digestive system healthcare" }
        ],
        products: [
          { name: "Padocard 10", composition: "Atorvastatin 10mg", description: "Cholesterol management", division: "Cardiology" },
          { name: "Padoneuro Plus", composition: "Methylcobalamin 1500mcg", description: "Nerve health supplement", division: "Neurology" }
        ]
      };

      for (const div of testData.divisions) {
        await addDoc(collection(db, "divisions"), div);
      }
      for (const prod of testData.products) {
        await addDoc(collection(db, "products"), prod);
      }

      setStatus("Success! Test data added to Firestore.");
    } catch (error: any) {
      console.error(error);
      setStatus("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-20 flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold">Firebase Connection Test</h1>
      <p className="text-gray-600">Click the button below to push test data to your Firestore database.</p>
      
      <button 
        onClick={seedData}
        disabled={loading}
        className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 transition-all"
      >
        {loading ? "Adding Data..." : "Push Test Data"}
      </button>

      {status && (
        <div className={`p-4 rounded-lg ${status.startsWith("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
          {status}
        </div>
      )}
    </div>
  );
}
