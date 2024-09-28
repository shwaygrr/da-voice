const ElectionItem = (params) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-2 hover:bg-gray-100 transition duration-200">
      <h1 className="text-xl font-semibold">{params.name}</h1>
      <h2 className="text-gray-600">Election Day: {params.electionDay}</h2>
    </div>
  );
};

export default ElectionItem;
