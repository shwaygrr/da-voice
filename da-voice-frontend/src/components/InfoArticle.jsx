import { Link } from "react-router-dom";

const InfoArticle = (params) => {
  return (
    <div className="info-article p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 ease-in-out w-full max-w-4xl mx-auto mb-8">
      <Link to={params.url} className="block">
        <div className="flex items-start">
          <div className="relative w-40 h-40 border border-gray-300 rounded-lg overflow-hidden">
            <img
              className="absolute inset-0 w-full h-full object-cover"
              src={params.image}
              alt={params.headline}
            />
          </div>

          <div className="ml-6 flex-1">
            <h1 className="headline text-2xl font-bold text-gray-900 leading-tight mb-2">
              {params.headline}
            </h1>
            <p className="content text-gray-700 text-sm leading-relaxed line-clamp-3">
              {params.content}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default InfoArticle;
