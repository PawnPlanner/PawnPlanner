import Session from "../session";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginButton from "../components/login-button";
import Container from 'react-bootstrap/Container';

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
    <Container data-bs-theme="dark"> 
      <LoginButton />
    </Container>
  );
};

export default AuthPage;