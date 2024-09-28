import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ElectionItem from "../components/ElectionItem";
const ElectionList = () => {
  const [elections, setElections] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const API_KEY = import.meta.env.VITE_CIVIC_API_KEY;
      const URL =
        "https://civicinfo.googleapis.com/civicinfo/v2/elections?productionDataOnly=true&key=" +
        API_KEY;
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setElections(data.elections);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Upcoming Elections</h1>

      {elections
        ? elections.map((election) => (
            <Link to={`/electionPage/${election.id}`} key={election.id}>
              <ElectionItem
                name={election.name}
                electionDay={election.electionDay}
              />
            </Link>
          ))
        : <p className="text-gray-600">No elections available.</p>}
    </div>
  );
};

export default ElectionList;
