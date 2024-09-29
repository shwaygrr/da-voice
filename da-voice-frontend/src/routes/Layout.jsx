import { Link } from "react-router-dom";
import { useLocation } from "../contexts/location";
import { Outlet, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { MdSpeakerNotes , MdPublic  } from "react-icons/md";
import { FaPeopleArrows  } from "react-icons/fa";
import MapComponent from "../components/MapComponent";
import InfoArticle from "../components/InfoArticle";
import { RiCommunityLine } from "react-icons/ri";
import { GiPublicSpeaker } from "react-icons/gi";

const Layout = () => {
  const { location, zipcode, error, setZipcode } = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const resourcesRef = useRef(null);

  const handleZipcodeChange = (e) => {
    const newZipcode = e.target.value;
    if (newZipcode.length <= 5) {
      setZipcode(newZipcode);
    }
  };

  const handleExpandSidebar = () => {
    setIsExpanded(true);
  };

  const handleCollapseSidebar = () => {
    setIsExpanded(false);
    navigate(-1);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToResources = (e) => {
    e.preventDefault();
    if (resourcesRef.current) {
      resourcesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-gray-800 fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <h1 className="text-white font-bold text-xl">Da Voice</h1>
            </div>
            <div className="flex space-x-4 mx-auto">
              <Link
                to="/"
                onClick={scrollToTop} 
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Representatives
              </Link>
              <Link
                to="/elections"
                onClick={scrollToTop}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Elections
              </Link>
              <a
                href="#resources"
                onClick={scrollToResources} 
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Resources
              </a>
            </div>
            <div>
              <label className="text-white">Zip Code </label>
              <input
                value={zipcode}
                onChange={handleZipcodeChange}
                placeholder="Enter Zip Code"
                className="px-1.5 rounded-sm"
              />
            </div>
          </div>
        </div>
      </nav>

      <div className="min-h-screen pt-12 flex flex-col justify-between items-center bg-gray-900 text-white">
        <div className="text-center mt-20">
          <h1 className="text-5xl font-bold mb-4">Educating for Representation, Leading to Change</h1>
          <p className="text-xl mb-6">Stay informed about your local elections and representatives.</p>

          <div className="flex justify-center space-x-8 mt-12 pt-24">
            <div className="text-center max-w-xs">
              <div>
                <GiPublicSpeaker  className="text-6xl mx-auto" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Your Voice, Your Future</h3>
              <p className="text-gray-400">Make every vote count to amplify the voices of underrepresented communities</p>
            </div>

            <div className="text-center max-w-xs">
              <div>
                <FaPeopleArrows className="text-6xl mx-auto pb-2" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Empower Your Community</h3>
              <p className="text-gray-400">Early voting makes your voice heard and helps build stronger representation for marginalized groups.</p>
            </div>

            <div className="text-center max-w-xs">
              <div>
                <RiCommunityLine className="text-6xl mx-auto pb-1" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Local Elections Matter</h3>
              <p className="text-gray-400">Local elections impact your life more directly than national ones, yet minority representation is lacking.</p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <button
            className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-full transition duration-300"
          >
            Get Started
          </button>
        </div>
      </div>

      <div className="flex flex-1 pt-16">
        <div className={`z-0 h-full transition-all duration-700 ease-out ${isExpanded ? "w-1/3" : "w-2/3"}`}>
          <MapComponent />
        </div>

        <div className={`h-screen p-4 overflow-y-auto transition-all duration-700 ease-out ${isExpanded ? 'w-2/3' : 'w-1/3'}`}>
          <Outlet context={{ handleExpandSidebar, handleCollapseSidebar }}/>
        </div>
      </div>

      <div ref={resourcesRef} className="w-full p-4">
        <h1 className="text-4xl font-bold mb-8 text-center pt-20" id="resources">
          More Resources
        </h1>
        <InfoArticle
          url="https://news.fiu.edu/2023/no-one-cares-about-local-elections-heres-why-you-should"
          image="https://nchschant.com/wp-content/uploads/2020/12/R.L-The-Importance-of-Voting-in-Local-Elections-Cover-Photo.jpg"
          headline="Why should I vote in local elections?"
          content="“Local elections affect us through everything that has to do with our daily lives. Municipalities generally take responsibility for parks and recreation services, police and fire departments, housing services, emergency medical services, municipal courts and transportation services.“"
        />
        <InfoArticle
          url="https://www.whitehouse.gov/cea/written-materials/2021/08/16/the-importance-of-protecting-voting-rights-for-voter-turnout-and-economic-well-being/"
          image="https://www.lwv.org/sites/default/files/53173586778_6326ebc686_k.jpg"
          headline="The Importance of Protecting Voting Rights for Voter Turnout and Economic Well-Being"
          content="“Voters’ waiting times in predominately Black neighborhoods are already 29 percent longer than in predominately white neighborhoods. In this blog post, we outline research that has been done on the impact of voting rights on election turnout and on the economic well-being of Black Americans.“"
        />
        <InfoArticle
          url="https://apiavote.org/how-to-vote/why-vote/"
          image="https://apiavote.org/wp-content/uploads/home-shape-elections.jpg"
          headline="Why Vote"
          content="“Voting gives you the power to create positive change for your community and determine a better quality of life for you and your family. Voting together with your neighbors, family, and friends ensures that your shared values and issues are prioritized and that you play a key role in choosing who represents us, and where government funding and resources will go.“"
        />
        <InfoArticle
          url="https://www.carnegie.org/our-work/article/voting-rights-timeline/"
          image="https://media.carnegie.org/filer_public_thumbnails/filer_public/20/40/204040de-5b62-4f88-ab3b-43557a7318ef/gettyimages-51506194.jpg__1440x810_q85_crop_subsampling-2_upscale.jpg"
          headline="Voting Rights: A Short History"
          content="“The struggle for equal voting rights dates to the earliest days of U.S. history. Now, after a period of bipartisan efforts to expand enfranchisement, Americans once again face new obstacles to voting.“"
        />
        <InfoArticle
          url="https://www.vote.org/"
          image="https://www.ppic.org/wp-content/uploads/2023/05/four-people-voting.jpg"
          headline="Everything You Need to Vote"
          content="“Register to vote. Check your registration status. Get your absentee ballot. Fast, free, easy, secure, nonpartisan.“"
        />
      </div>

      <footer className="p-4 bg-gray-200 text-center">
        <p className="text-gray-600">
          Empowering minorities to make informed choices and gain representation in local government.
        </p>
        <p className="text-gray-500">
          © 2024 GCT Software. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
