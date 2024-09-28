import { useLocation, Link } from "react-router-dom";

const Representative = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const params = {
    name: queryParams.get("name"),
    position: queryParams.get("position"),
    party: queryParams.get("party"),
    website: queryParams.get("website"),
    phone: queryParams.get("phone"),
    address: queryParams.get("address"),
  };

  return (
    <div className="repres">
      <Link to="/" className="back">
        Back
      </Link>
      <h1>{params.name}</h1>
      <h2>{params.position}</h2>
      <h2>{params.party}</h2>

      <a href={params.website}>
        <p>Website</p>
      </a>
      <p>{params.phone}</p>
      <h2>Address</h2>
      <p>{params.address}</p>
    </div>
  );
};

export default Representative;
