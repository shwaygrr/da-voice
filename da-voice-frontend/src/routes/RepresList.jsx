import { useEffect, useState } from "react";
import RepresListItem from "../components/RepresListItem";

const RepresList = () => {
  // const [reps, setReps] = useState(null);

  // const address = "1616 18th Ave N, Lake Worth Beach, FL 33460";
  // const API_KEY = process.env.NEXT_PUBLIC_CIVIC_API_KEY;
  // const URL =
  //   "https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=" +
  //   address +
  //   "&levels=administrativeArea2&key=" +
  //   API_KEY;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(URL);
  //     const data = await response.json();
  //     const offices = data.offices;
  //     const officials = data.officials;

  //     const temp = officials.map((official, index) => {
  //       return {
  //         name: official.name,
  //         position: offices[index].name,
  //         party: official.party ? official.party : "No party provided",
  //         photo: official.photoUrl ? official.photoUrl : "",
  //         phone: official.phones[0]
  //           ? official.phones[0]
  //           : "No phone number provided",
  //         website: official.urls[0] ? official.urls[0] : "No website provided",
  //         address: official.address
  //           ? `${official.address[0].line1}, ${official.address[0].city}, ${official.address[0].state}, ${official.address[0].zip}`
  //           : "No address provided",
  //       };
  //     });
  //     setReps(temp);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className="represList">
      <h1>List of Representatives</h1>
      {/* {reps
        ? reps.map((rep, index) => (
            <RepresListItem
              key={index}
              name={rep.name}
              position={rep.position}
            />
          ))
        : null} */}
    </div>
  );
};

export default RepresList;
