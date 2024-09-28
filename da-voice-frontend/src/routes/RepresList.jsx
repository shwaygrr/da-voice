import { useEffect, useState } from "react";
import RepresListItem from "../components/RepresListItem";
import { Link } from "react-router-dom";
const RepresList = () => {
  const [reps, setReps] = useState(null);

  useEffect(() => {
    const address = "10001";
    const API_KEY = import.meta.env.VITE_CIVIC_API_KEY;

    const URL =
      "https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=" +
      address +
      "&key=" +
      API_KEY;

    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const offices = data.offices;
        const officials = data.officials;

        const temp = offices.map((office) => {
          const officialsData = office.officialIndices.map((index) => {
            const official = officials[index];
            return official
              ? {
                  name: official.name,
                  position: office.name,
                  party: official.party || "No party provided",
                  phone: official.phones[0] || "No phone number provided",
                  website: official.urls[0] || "No website provided",
                  address: official.address
                    ? `${official.address[0].line1}, ${official.address[0].city}, ${official.address[0].state}, ${official.address[0].zip}`
                    : "No address provided",
                }
              : {
                  name: "Unknown",
                  position: office.name,
                  party: "No party provided",
                  phone: "No phone number provided",
                  website: "No website provided",
                  address: "No address provided",
                };
          });

          return officialsData;
        });

        const flattenedReps = temp.flat();
        setReps(flattenedReps);
      } catch (error) {
        console.error("Failed to fetch representatives:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="represList">
      <h1 className="text-2xl font-bold mb-4">List of Representatives</h1>
      {reps
        ? reps.map((rep) => (
            <Link
              key={rep.id}
              to={`/representatives?name=${encodeURIComponent(
                rep.name
              )}&position=${encodeURIComponent(
                rep.position
              )}&party=${encodeURIComponent(
                rep.party
              )}&website=${encodeURIComponent(
                rep.website
              )}&phone=${encodeURIComponent(
                rep.phone
              )}&address=${encodeURIComponent(rep.address)}`}
            >
              <RepresListItem name={rep.name} position={rep.position} />
            </Link>
          ))
        : <p className="text-gray-600">No representatives available.</p>}
    </div>
  );
};

export default RepresList;
