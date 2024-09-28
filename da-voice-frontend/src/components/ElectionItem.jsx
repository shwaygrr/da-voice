const ElectionItem = (params) => {
  return (
    <div>
      <h1>{params.name}</h1>
      <h2>{params.electionDay}</h2>
    </div>
  );
};

export default ElectionItem;
