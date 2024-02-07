import Session from "../session";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginButton from "../components/login-button";

interface IAuthPageProps {}

const AuthPage = (props: IAuthPageProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = Session.getUser();
    console.log("debug", user);
    if (user != null) {
      navigate("/");
    }
  }, []);

  return (
    <div className="">
      <LoginButton />
    </div>
  );
};

export default AuthPage;