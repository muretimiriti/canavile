import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const saveOverrideCode = async () => {
  try {
    await addDoc(collection(db, "AdminSettings"), {
      type: "overrideCode",
      code: "CanavilleLimitedX2520" // Replace with your desired override code
    });
    console.log("Override code saved successfully!");
  } catch (error) {
    console.error("Error saving override code: ", error);
  }
};

saveOverrideCode();