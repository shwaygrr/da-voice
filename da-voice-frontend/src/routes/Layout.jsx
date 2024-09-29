import { Link } from "react-router-dom";
import { useLocation } from "../contexts/location";
import { Outlet } from "react-router-dom";
import MapComponent from "../components/MapComponent";
import InfoArticle from "../components/InfoArticle";

const Layout = () => {
  const { location, zipcode, error, setZipcode } = useLocation();

  const handleZipcodeChange = (e) => {
    const newZipcode = e.target.value;
    if (newZipcode.length <= 5) {
      setZipcode(newZipcode);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <h1 className="text-white font-bold text-xl">DaVoice</h1>
            </div>
            <div className="flex space-x-4 mx-auto">
              <Link
                to="/"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Representatives
              </Link>
              <Link
                to="/elections"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Elections
              </Link>
              <a
                href="#resources"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Resources
              </a>
            </div>
            {/* <div className="hidden sm:block text-gray-300">
              {zipcode}
            </div> */}
            <div>
              <label className="text-white">Zip Code: </label>
              <input
                value={zipcode}
                onChange={handleZipcodeChange}
                placeholder="Enter Zip Code"
                className="px-1 rounded-sm"
              />
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-1">
        <div className="w-2/3 h-full">
          <MapComponent />
        </div>

        <div className="w-1/3 h-screen p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-4" id="resources">
          More Resources
        </h1>
        <InfoArticle
          url="https://education.nationalgeographic.org/resource/why-voting-important/"
          image="https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638892378/EducationHub/photos/americans-voting.jpg"
          headline="Why Voting is Important"
          content="“Voting is your civic duty.” This is a pretty common sentiment, especially each November as Election Day approaches. But what does it really mean? And what does it mean for Americans in particular?“"
        />
        <InfoArticle
          url="https://www.scientificamerican.com/article/why-we-must-protect-voting-rights/"
          image="https://static.scientificamerican.com/sciam/cache/file/C709F015-39EE-4E63-A7DDC0F1A18132C7_source.jpg?w=900"
          headline="Why We Must Protect Voting Rights"
          content="“Evidence shows they boost suffrage, not fraud“"
        />
        <InfoArticle
          url="https://www.usa.gov/how-to-vote"
          image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.wixstatic.com%2Fmedia%2Ff64377_97a05f5aed264b86a7010dc169ca5bef~mv2_d_4640_3018_s_4_2.jpg%2Fv1%2Ffill%2Fw_1920%2Ch_1249%2Cal_c%2Cq_90%2Cusm_0.66_1.00_0.01%2Ff64377_97a05f5aed264b86a7010dc169ca5bef~mv2_d_4640_3018_s_4_2.jpg&f=1&nofb=1&ipt=3d61637cb4151b6dc57a178b15ba32be4ccad09e42889d940a6a42e7142022b5&ipo=images"
          headline=" How, when, and where to vote "
          content="“See if you are eligible to vote absentee, early, or on Election Day. Get voter ID requirements. “"
        />
        <InfoArticle
          url="https://www.usa.gov/voter-research"
          image="https://www.futurity.org/wp/wp-content/uploads/2018/12/australian_voters_1600.jpg"
          headline="Decide who to vote for "
          content="“Learn how to make informed choices by using voter guides and sample ballots to research candidates. “"
        />
        <InfoArticle
          url="https://www.usa.gov/voting-laws"
          image="https://media.rnztools.nz/rnz/image/upload/s--jyfDx5HL--/ar_16:10,c_fill,f_auto,g_auto,q_auto,w_1050/v1694944462/4MLBXTV_vote2_jpg"
          headline="Voting and election laws"
          content="“Learn how campaign contribution limits, accessibility rules, and other federal election laws help protect your voting rights and the election process. “"
        />
      </div>

      <footer className="p-4 bg-gray-200 text-center">
        <p>Additional Information or Footer Content</p>
      </footer>
    </div>
  );
};

export default Layout;
