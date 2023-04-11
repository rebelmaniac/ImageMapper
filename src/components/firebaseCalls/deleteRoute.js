import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

export const deleteRoute = async (route) => {
  try {
    const res = await deleteDoc(doc(db, "routes", route.id));
  } catch (err) {
    console.log(err.message);
  }
};
