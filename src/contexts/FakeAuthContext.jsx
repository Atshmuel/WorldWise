import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const BASE_URL = "http://localhost:8000";

const initialState = {
  user: null,
  isAuth: false,
  isLoadingUser: false,
};

const fakeUser = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoadingUser: true };
    case "login":
      return { ...state, user: action.payload, isAuth: true };
    case "logout":
      return { ...state, ...initialState };

    default:
      throw new Error("Unknown action type");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuth, isLoadingUser }, dispatch] = useReducer(
    reducer,
    initialState
  );
  async function login(email, password) {
    dispatch({ type: "loading" });
    try {
      // const res = await fetch(`${BASE_URL}/users`);
      // const data = await res.json();
      // const user = data.at(0);
      if (email === fakeUser.email && password === fakeUser.password)
        dispatch({ type: "login", payload: fakeUser });
    } catch (error) {
      console.log(error);
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoadingUser, isAuth, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside of AuthProvider !");
  return context;
}

export { useAuth, AuthProvider };
