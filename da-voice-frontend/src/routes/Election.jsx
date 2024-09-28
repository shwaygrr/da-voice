import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const Election = () => {
  const { id } = useParams();
  const [election, setElection] = useState(null);
  useEffect(() => {
    const API_KEY = import.meta.env.VITE_CIVIC_API_KEY;
    const address = "10001";
    const URL =
      "https://civicinfo.googleapis.com/civicinfo/v2/voterinfo?address=" +
      address +
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
          <Link to="/elections" className="back">
            <IoMdArrowRoundBack className="text-xl"/>
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
        </div>
      ) : null}
    </div>
  );
};

export default Election;
