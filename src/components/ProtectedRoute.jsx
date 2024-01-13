import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  useEffect(() => {
    if (!isAuth) navigate("/");
  }, [isAuth, navigate]);

  return isAuth ? children : null;
}
