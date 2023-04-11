import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

export const addRoute = async (
  routeName,
  routeGrade,
  routeDescription,
  routeHolds,
  routeOwner
) => {
  const newDoc = {
    name: routeName,
    grade: routeGrade,
    description: routeDescription,
    holds: [...routeHolds],
    routeOwner: routeOwner,
  };
  console.log(newDoc);
  try {
    const docRef = await addDoc(collection(db, "routes"), { ...newDoc });
  } catch (err) {
    console.log(err.message);
  }
  return newDoc;
};
