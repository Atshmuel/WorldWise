import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import Button from "../components/Button";
import SpinnerFullPage from "../components/SpinnerFullPage";
export default function Login() {
  const navigate = useNavigate();
  const { isAuth, login, isLoadingUser } = useAuth();
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  useEffect(() => {
    if (isAuth) navigate("/app", { replace: true });
  }, [isAuth]);

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) login(email, password);
  }
  if (isLoadingUser) return <SpinnerFullPage />;

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary" onClick={handleSubmit}>
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
