import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { useLocation } from "../contexts/location";

const Election = () => {
  const { id } = useParams();
  const [election, setElection] = useState(null);
  const { location, zipcode, error } = useLocation();

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_CIVIC_API_KEY;
    const address = zipcode;
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
  }, [id, zipcode]);

  return (
    <div>
      {election && zipcode ? (
        <div>
          <Link to="/elections" className="back">
            Back
          </Link>
          <h1>{election.election.name}</h1>
          <h2>{election.election.electionDay}</h2>
          <h2>Important Links</h2>
          <a
            href={
              election.state[0].electionAdministrationBody
                .electionRegistrationUrl
            }
          >
            <p>Register Here</p>
          </a>

          <a
            href={
              election.state[0].electionAdministrationBody
                .votingLocationFinderUrl
            }
          >
            <p>Voting Locations</p>
          </a>

          <a href={election.state[0].electionAdministrationBody.ballotInfoUrl}>
            <p>Ballot Info</p>
          </a>
        </div>
      ) : null}
    </div>
  );
};

export default Election;
