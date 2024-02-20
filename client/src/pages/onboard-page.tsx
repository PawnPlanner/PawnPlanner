import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TUser } from "../types/user";
import AdjustNamesLink from "../components/adjust-names";
import setOnboard from "../services/set-onboard";
import Session from "../session";

const OnBoardPage = () => {
  let navigate = useNavigate();

  const [username, setUsername] = useState<string>();
  const [middleName, setMiddleName] = useState<string>();
  const [givenName, setGivenName] = useState<string>();
  const [familyName, setFamilyName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [user, setUser] = useState<TUser | null>(null);

  // hook to load user session from object
  useEffect(() => {
    setUser(Session.getUser());
  }, []);

  useEffect(() => {
    if (user) {
      setGivenName(user.givenName);
      setFamilyName(user.familyName);
      setEmail(user.email);
      setUsername(user.username);
      setMiddleName(user.middleName);

      if (user.onboarded) {
        navigate("/");
      }

    }
  }, [user]);

  if (!user) {
    return <div>fetching user</div>;
  }

  return (
    <div className="flex justify-center w-screen h-screen items-center bg-navy">
      <div className="text-center px-6 bg-lgrey w-3/5 h-3/5 ">
      <div className="w-45 h-45 flex justify-center align mb-12">
              <img src="/img/pawnlogo.png"></img>
            </div>
        <h3 className="text-3xl font-semibold text-navy">
          Welcome {givenName}
        </h3>

        <input
          className="e-input m-3"
          type="text"
          placeholder="Enter User Name"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          className="e-input"
          type="text"
          placeholder="Enter Middle Name"
          onChange={(e) => setMiddleName(e.target.value)}
          value={middleName}
        />
        <AdjustNamesLink 
          username={username ? username : ""}
          givenName={givenName ? givenName : ""}
          middleName={middleName ? middleName : ""}
          familyName={familyName ? familyName : ""}
        />
        <button className="text-navy border border-navy rounded-full px-4 py-1 hover:text-lgrey hover:bg-navy mt-4"
          onClick={() => {
              if (user) {
                setOnboard(email).then(() => {
                  navigate("/");
                  window.location.reload();
                });
              }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OnBoardPage;