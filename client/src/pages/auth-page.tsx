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
    <div className="flex justify-center w-screen h-screen place-items-center bg-grey pattern-checkered-lgrey/100 pattern-checkered-scale-[25]"> 
      <div className="flex flex-row w-3/5 h-3/5 rounded-xl bg-navy justify-center place-items-center">
        <div className="p-4 flex-row justify-center">
            <div className="w-45 h-45">
              <img src="/img/pawnlogo.png"></img>
            </div>
            <div className="flex justify-center text-grey mt-4 mb-12 p-3 text-3xl"> Welcome Back Player</div>
            <div className="flex justify-center mt-5">
              <LoginButton />
            </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;