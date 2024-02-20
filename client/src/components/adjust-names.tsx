import getUser from "../services/get-user";
import { useState } from "react";
import AdjustName from "../services/adjust-name";
import Session from "../session";
import PopUpFail from "./popup-fail";


interface IAdjustNamesLinkProps {
  username: string;
  givenName: string;
  middleName: string;
  familyName: string;
}

const AdjustNamesLink = (props: IAdjustNamesLinkProps) => {
  const [nameFailOpen, setNameFailOpen] = useState(false);
  const SET_NAME_ERR_MSG =
    "Oops! Your name is not sucessfully updated. Try again later";

  return (
    <div>
      <button
        className="px-1.5 py-2 rounded-full bg-slate-300 text-navy border border-navy hover:bg-navy hover:text-lgrey mt-4"
        onClick={async () => {
          await AdjustName(
            props.username,
            props.givenName,
            props.middleName,
            props.familyName
          ) .then(async (res) => {
            if (!res) {
              setNameFailOpen(true);
            }
            await Session.setUser(await getUser());
          })
          .catch((err) => {
            setNameFailOpen(true);
            console.error(err);
          });
        }}
      >
        Update Names
      </button>
      <PopUpFail
        open={nameFailOpen}
        setOpen={setNameFailOpen}
        failText={SET_NAME_ERR_MSG}
      />

    </div>
  );
};

export default AdjustNamesLink;