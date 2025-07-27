import { makeAutoObservable } from "mobx";
import { createContext, useContext, useEffect } from "react";

class UserStore {
  email = "";

  constructor() {
    makeAutoObservable(this);
  }

  initialize() {
    if (typeof window !== "undefined") {
      this.email = localStorage.getItem("email") || "";
    }
  }

  login(email) {
    this.email = email;
    if (typeof window !== "undefined") {
      localStorage.setItem("email", email);
    }
  }

  logout() {
    this.email = "";
    if (typeof window !== "undefined") {
      localStorage.removeItem("email");
    }
  }
}

const UserStoreContext = createContext(null);

export const UserStoreProvider = ({ children }) => {
  const store = new UserStore();
  
  useEffect(() => {
    store.initialize();
  }, [store]);

  return (
    <UserStoreContext.Provider value={store}>
      {children}
    </UserStoreContext.Provider>
  );
};

export const useUserStore = () => useContext(UserStoreContext);