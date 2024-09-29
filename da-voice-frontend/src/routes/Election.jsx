import { useState, useEffect } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation } from "../contexts/location";

const Election = () => {
  const { id } = useParams();
  const { handleExpandSidebar, handleCollapseSidebar } = useOutletContext();
  const [election, setElection] = useState(null);
  const [summary, setSummary] = useState("")
  const { zipcode } = useLocation()

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/summarize-election", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ election: election.election.name }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch bio");
        }
  
        const data = await response.json();
        setSummary(data.bio);
      } catch (err) {
        throw new Error("Failed to fetch bio: " + err.message); // Handle error
      };
    }
    
    fetchSummary()

    handleExpandSidebar();
    const API_KEY = import.meta.env.VITE_CIVIC_API_KEY;
    const URL =
      "https://civicinfo.googleapis.com/civicinfo/v2/voterinfo?address=" +
      zipcode +
      "&electionId=" +
      id +
      "&productionDataOnly=true&returnAllAvailableData=true&key=" +
      API_KEY;

    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setElection(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      {election ? (
        <div>
          <Link to="/elections" className="back" onClick={handleCollapseSidebar}>
            <IoMdArrowRoundBack className="text-xl" />
          </Link>
          <h1 className="text-3xl font-bold mb-4 pt-2">{election.election.name}</h1>
          <h2 className="text-lg mb-2">{election.election.electionDay}</h2>
          <h2 className="text-lg font-semibold">Important Links</h2>
          <a
            href={
              election.state[0].electionAdministrationBody
                .electionRegistrationUrl
            }
            className="block text-blue-500 hover:underline"
          >
            <p>Register Here</p>
          </a>

          <a
            href={
              election.state[0].electionAdministrationBody
                .votingLocationFinderUrl
            }
            className="block text-blue-500 hover:underline"
          >
            <p>Voting Locations</p>
          </a>

          <a href={election.state[0].electionAdministrationBody.ballotInfoUrl} className="block text-blue-500 hover:underline">
            <p>Ballot Info</p>
          </a>

          <div className="mt-4">
        <h1 className="text-lg font-bold mb-4 pt-2">Election Summary</h1>
          {summary !== 0 ? (
            <div>
              <p>{summary}</p>
              <p className="text-sm text-gray-500 mt-2">
                *This biography was generated using ChatGPT and may not be fully accurate. Please verify the information.
              </p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        </div>
      ) : null}
    </div>
  );
};

export default Election;
