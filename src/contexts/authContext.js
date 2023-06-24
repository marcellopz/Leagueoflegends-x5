import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  setPersistence,
  browserLocalPersistence,
  // browserLocalPersistence,
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

  const loadStoreAuth = () => {
    const sessionToken = localStorage.getItem("@AuthFirebase:token");
    const sessionUser = localStorage.getItem("@AuthFirebase:user");

    if (sessionToken && sessionUser) {
      setUser(sessionUser);
      return true;
    } else {
      setUser(undefined);
      return false;
    }
  };

  useEffect(() => {
    loadStoreAuth();
  }, []);

  useEffect(() => {
    setLoading(user === null);
    try {
      setUserObj(typeof user === "object" ? user : JSON.parse(user));
    } catch (e) {}
  }, [user]);

  useEffect(() => {
    if (!!userObj) {
      getUserByUid(userObj.uid).then((r) => {
        if (r) {
          setPermissions(r);
        }
      });
    } else {
      setPermissions({
        admin: false,
        moderator: false,
        nerd: false,
        name: "",
      });
    }
  }, [userObj, auth]);

  const signInAsGuest = () => {
    signInAnonymously(auth)
      .then((credential) => {
        const user_ = credential.user;
        const token = user_.accessToken;
        setUser(user_);
        localStorage.setItem("@AuthFirebase:token", token);
        localStorage.setItem("@AuthFirebase:user", JSON.stringify(user_));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signInGoogle = async () => {
    await setPersistence(auth, browserLocalPersistence);
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user_ = result.user;
        setUser(user_);
        localStorage.setItem("@AuthFirebase:token", token);
        localStorage.setItem("@AuthFirebase:user", JSON.stringify(user_));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signOutx5 = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
    return <Navigate to="/" />;
  };

  const signInUsernamePwd = async (email, password) => {
    await setPersistence(auth, browserLocalPersistence);
    signInWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        const token = credential.accessToken;
        const user_ = credential.user;
        setUser(user_);
        localStorage.setItem("@AuthFirebase:token", token);
        localStorage.setItem("@AuthFirebase:user", JSON.stringify(user_));
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
        localStorage.setItem("@AuthFirebase:token", token);
        localStorage.setItem("@AuthFirebase:user", JSON.stringify(user_));
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
        loadStoreAuth,
        signInAsGuest,
        signUpUsernamePwd,
        signInUsernamePwd,
        signed: !!user,
        isAnonymous: userObj ? userObj.isAnonymous : true,
        signOut: signOutx5,
        isNerd: permissions.nerd,
        isAdmin: permissions.admin,
        userUid: userObj?.uid,
        isNull: userObj === null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
