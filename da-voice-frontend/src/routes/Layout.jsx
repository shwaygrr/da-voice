import { Link } from "react-router-dom";
import { useLocation } from "../contexts/location";
import { Outlet, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import MapComponent from "../components/MapComponent";
import InfoArticle from "../components/InfoArticle";
import Home from "./Home"


const Layout = () => {
  const { location, zipcode, error, setZipcode } = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const resourcesRef = useRef(null);
  const mapSectionRef = useRef(null);

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

  const scrollToMapSection = (e) => {
    e.preventDefault();
    if (mapSectionRef.current) {
      mapSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRepresentativesClick = (e) => {
    scrollToMapSection(e);
    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  const handleElectionsClick = (e) => {
    scrollToMapSection(e);
    setTimeout(() => {
      navigate("/elections");
    }, 100);
  };

  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-gray-800 fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/">
                <h1 className="text-white font-bold text-xl">Da Voice</h1>
              </Link>
            </div>
            <div className="flex space-x-4 mx-auto">
              <Link
                to="/"
                onClick={scrollToTop} 
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/representative"
                onClick={handleRepresentativesClick}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Representatives
              </Link>
              <Link
                to="/elections"
                onClick={handleElectionsClick}
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

      <Home scrollToMapSection={scrollToMapSection} />

      <div ref={mapSectionRef} className="flex flex-1 pt-16">
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
          url="https://theconversation.com/nonwhite-people-are-drastically-underrepresented-in-local-government-212318"
          image="https://images.theconversation.com/files/571298/original/file-20240124-27-zt9n4k.jpg?ixlib=rb-4.1.0&rect=35%2C35%2C5955%2C3952&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip"
          headline="Nonwhite People Are Drastically Underrepresented in Local Government"
          content="This article discusses the significant underrepresentation of nonwhite individuals in local government and its implications for communities."
        />
        <InfoArticle
          url="https://news.fiu.edu/2023/no-one-cares-about-local-elections-heres-why-you-should"
          image="https://nchschant.com/wp-content/uploads/2020/12/R.L-The-Importance-of-Voting-in-Local-Elections-Cover-Photo.jpg"
          headline="Why Should I Vote in Local Elections?"
          content="Local elections affect our daily lives, impacting services that matter to our communities."
        />
        <InfoArticle
          url="https://www.whitehouse.gov/cea/written-materials/2021/08/16/the-importance-of-protecting-voting-rights-for-voter-turnout-and-economic-well-being/"
          image="https://www.lwv.org/sites/default/files/53173586778_6326ebc686_k.jpg"
          headline="The Importance of Protecting Voting Rights for Voter Turnout and Economic Well-Being"
          content="Research highlights the disparities in voting experiences for Black Americans and emphasizes the need for equitable voting rights."
        />
        <InfoArticle
          url="https://apiavote.org/how-to-vote/why-vote/"
          image="https://apiavote.org/wp-content/uploads/home-shape-elections.jpg"
          headline="Why Vote"
          content="Voting empowers you to create change for your community and ensures your values are prioritized."
        />
        <InfoArticle
          url="https://www.carnegie.org/our-work/article/voting-rights-timeline/"
          image="https://media.carnegie.org/filer_public_thumbnails/filer_public/20/40/204040de-5b62-4f88-ab3b-43557a7318ef/gettyimages-51506194.jpg__1440x810_q85_crop_subsampling-2_upscale.jpg"
          headline="Voting Rights: A Short History"
          content="A look at the historical struggle for voting rights and the ongoing challenges faced by underrepresented communities."
        />
        <InfoArticle
          url="https://www.vote.org/"
          image="https://www.ppic.org/wp-content/uploads/2023/05/four-people-voting.jpg"
          headline="Everything You Need to Vote"
          content="A one-stop resource for registering to vote, checking your registration status, and accessing absentee ballots."
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
