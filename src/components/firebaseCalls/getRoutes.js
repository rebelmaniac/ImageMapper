import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

export const getRoutes = async () => {
  let allData = [];
  try {
    await getDocs(collection(db, "routes")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      allData.push(...newData);
    });
  } catch (err) {
    console.log(err.message);
  }
  return allData;
};
