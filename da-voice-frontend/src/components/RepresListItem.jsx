const RepresListItem = (params) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-2 hover:bg-gray-100 transition duration-200">
      <h1 className="text-xl font-semibold">{params.name}</h1>
      <h2 className="text-gray-600">{params.position}</h2>
    </div>
  );
};

export default RepresListItem;
