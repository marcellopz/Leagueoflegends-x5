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

const provider = new GoogleAuthProvider();

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
  });

  useEffect(() => {
    setLoading(user === null);
  }, [user]);

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
        loading,
        signInGoogle,
        signInAsGuest,
        signUpUsernamePwd,
        signInUsernamePwd,
        signed: !!user,
        signOut: signOutx5,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
