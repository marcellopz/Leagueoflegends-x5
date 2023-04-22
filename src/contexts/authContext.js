import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
} from "firebase/auth";
import { app } from "../services/firebaseConfig";
import { Navigate } from "react-router-dom";
import { getUserByUid } from "../services/firebaseDatabase";

const provider = new GoogleAuthProvider();

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userObj, setUserObj] = useState(null);
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState({
    admin: false,
    moderator: false,
    nerd: false,
    name: "",
  });
  const auth = getAuth(app);

  useEffect(() => {
    const loadStoreAuth = () => {
      const sessionToken = sessionStorage.getItem("@AuthFirebase:token");
      const sessionUser = sessionStorage.getItem("@AuthFirebase:user");

      if (sessionToken && sessionUser) {
        setUser(sessionUser);
      } else {
        setUser(undefined);
      }
    };
    loadStoreAuth();
  }, []);

  useEffect(() => {
    setLoading(user === null);
    try {
      setUserObj(JSON.parse(user));
    } catch (e) {}
  }, [user]);

  useEffect(() => {
    if (!!userObj) {
      getUserByUid(userObj.uid).then((r) => {
        if (r) {
          setPermissions(r);
        }
      });
    }
  }, [userObj]);

  const signInAsGuest = () => {
    signInAnonymously(auth)
      .then((credential) => {
        const user_ = credential.user;
        const token = user_.accessToken;
        setUser(user_);
        sessionStorage.setItem("@AuthFirebase:token", token);
        sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user_));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signInGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user_ = result.user;
        setUser(user_);
        sessionStorage.setItem("@AuthFirebase:token", token);
        sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user_));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signOutx5 = () => {
    signOut(auth)
      .then(() => {
        sessionStorage.clear();
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
    return <Navigate to="/" />;
  };

  const signInUsernamePwd = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        const token = credential.accessToken;
        const user_ = credential.user;
        setUser(user_);
        sessionStorage.setItem("@AuthFirebase:token", token);
        sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user_));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signUpUsernamePwd = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        const token = credential.accessToken;
        const user_ = credential.user;
        setUser(user_);
        sessionStorage.setItem("@AuthFirebase:token", token);
        sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user_));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userObj,
        loading,
        signInGoogle,
        signInAsGuest,
        signUpUsernamePwd,
        signInUsernamePwd,
        signed: !!user,
        isAnonymous: userObj ? userObj.isAnonymous : true,
        signOut: signOutx5,
        isNerd: permissions.nerd,
        userUid: userObj?.uid,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
