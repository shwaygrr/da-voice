import { Link } from "react-router-dom";
const InfoArticle = (params) => {
  return (
    <Link to={params.url}>
      <div className="info-article flex items-start p-4 max-w-2xl">
        <div className="relative w-32 h-32 border border-gray-300 rounded-lg overflow-hidden">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={params.image}
            alt=""
          />
        </div>
        <div className="ml-4 flex-1">
          <h1 className="headline text-2xl font-bold">{params.headline}</h1>
          <p className="content text-gray-700 mt-2">{params.content}</p>
        </div>
      </div>
    </Link>
  );
};

export default InfoArticle;
