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
    <div className="flex flex-wrap items-center mt-20">
      <div className="w-full text-center sm:w-1/2 sm:px-6">
        <h3 className="text-3xl font-semibold text-gray-900">
          Welcome {givenName}
        </h3>

        <input
          className="e-input"
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
        <button
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