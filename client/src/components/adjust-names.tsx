import getUser from "../services/get-user";
import { useState } from "react";
import AdjustName from "../services/adjust-name";
import Session from "../session";



interface IAdjustNamesLinkProps {
  username: string;
  givenName: string;
  middleName: string;
  familyName: string;
}

const AdjustNamesLink = (props: IAdjustNamesLinkProps) => {


  return (
    <div>
      <button
        className="p-2 rounded-lg bg-slate-300"
        onClick={async () => {
          await AdjustName(
            props.username,
            props.givenName,
            props.middleName,
            props.familyName
          );
        }}
      >
        Update Names
      </button>

    </div>
  );
};

export default AdjustNamesLink;