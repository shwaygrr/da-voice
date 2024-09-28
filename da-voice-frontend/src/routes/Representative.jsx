import { useLocation, Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";


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
        <IoMdArrowRoundBack className="text-xl"/>
      </Link>
      <h1 className="text-3xl font-bold mb-4 pt-2">{params.name}</h1>
      <h2 className="text-lg mb-2">{params.position}</h2>
      <h2 className="text-lg mb-2">{params.party}</h2>

      <a href={params.website} className="block text-blue-500 hover:underline">
        <p>Website</p>
      </a>
      <p className="mt-2">{params.phone}</p>
      <h2 className="text-lg font-semibold mt-4">Address</h2>
      <p>{params.address}</p>
    </div>
  );
};

export default Representative;
