import React, { useContext, useEffect } from "react";
import { getAllUsers, getUserByUid } from "../../services/firebaseDatabase";
import { AuthContext } from "../../contexts/authContext";

export default function TestPage() {
  const { userUid } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      getAllUsers().then((r) => {
        console.log(r);
      });
    })();

    if (userUid) {
      (async () => {
        getUserByUid(userUid).then((r) => {
          console.log(r);
        });
      })();
    }
  }, [userUid]);

  return <div>TestPage</div>;
}
