import { RiCommunityLine } from "react-icons/ri";
import { GiPublicSpeaker } from "react-icons/gi";
import { FaPeopleArrows  } from "react-icons/fa";


const Home = ({ scrollToMapSection }) => {
    return (
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
            onClick={scrollToMapSection}
            className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-full transition duration-300"
          >
            Get Started
          </button>
        </div>
      </div>
    )
}

export default Home