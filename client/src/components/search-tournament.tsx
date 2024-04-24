import { useState } from "react";
import { TUser } from "../types/user";
import { useNavigate } from "react-router-dom";
import Session from "../session";
import { TTournament } from "../types/tournament";
import fetchTournaments from "../services/fetch-tournaments";

const SearchTournament = () => {
  let currentUser = Session.getUser();
  let [tournaments, setTournaments] = useState<TTournament[]>([]);
  const navigate = useNavigate();

  if (!currentUser) {
    return <div>fetching user</div>;
  }

  return (
    <div className="flex justify-center min-h-screen overflow-hidden">
      <div className="">
        <div className="relative max-w-lg w-96">
          <form>
            <div className="flex justify-between overflow-hidden rounded-md shadow bg-navy shadow-black/20">
              <input
                type="text"
                className="flex-1 block w-full px-3 py-2 focus:outline-none"
                placeholder="Search for tournaments"
                onChange={async (event) => {
                  if((event.target.value as string) == "") {
                    setTournaments([]);
                  } else if ((event.target.value as string) !== "") {
                    await fetchTournaments(event.target.value as string).then(
                      (result) => {
                        if(result) {
                          setTournaments(result);
                        } else {
                          setTournaments([]);
                        }
                      }
                    );
                  }
                }}
              />
              <span className="inline-flex items-center px-2 py-2 m-1 rounded-md cursor-pointer bg-navy">
                <svg
                  className="text-white"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="white"
                    d="M21.07 16.83L19 14.71a3.08 3.08 0 0 0-3.4-.57l-.9-.9a7 7 0 1 0-1.41 1.41l.89.89a3 3 0 0 0 .53 3.46l2.12 2.12a3 3 0 0 0 4.24 0a3 3 0 0 0 0-4.29Zm-8.48-4.24a5 5 0 1 1 0-7.08a5 5 0 0 1 0 7.08Zm7.07 7.07a1 1 0 0 1-1.42 0l-2.12-2.12a1 1 0 0 1 0-1.42a1 1 0 0 1 1.42 0l2.12 2.12a1 1 0 0 1 0 1.42Z"
                  />
                </svg>
              </span>
            </div>
          </form>

          {tournaments.length > 0 ? (
            tournaments.filter(
              (tournament) =>
              !tournament!.isPrivate
            )
              
              .map((tournament) => {
                return (
                  <div key={tournament.name}>
                    <button
                      key={tournament.location}
                      onClick={() => {
                        navigate(`/TournamentInfo/${tournament._id}`);
                      }}
                    >
                      <div className="w-full py-2 mt-2 overflow-hidden rounded-md px-36 bg-lgrey text-navy">
                        <div className="items-center ">
                        <div className="text-lg">
                            <p className="pr-2 leading-none text-gray-900">
                              {tournament.name}
                            </p>
                          </div>
                          <div className="text-lg">
                            <p className="pr-2 leading-none text-gray-900">
                              Location: {tournament.location}
                            </p>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })
          ) : (
            <div className="px-3 py-2 cursor-pointer hover:bg-slate-100">
              <p className="text-sm font-medium text-gray-600">No Tournaments</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchTournament;