import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export const UserGrab = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      await getDocs(collection(db, "users")).then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUsers(newData);
        console.log(users, newData);
      });
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <ListGroup>
        {users?.map((user, i) => (
          <ListGroupItem key={i}>{`${user.id} => ${
            user.first + " " + user.last
          }`}</ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};
