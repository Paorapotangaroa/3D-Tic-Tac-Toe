import Row from "./Row";



const Board = ({board}) => {

  return (
    <div className="table-square-wrapper">
      {board.map((layer, layerIndex) => (
        <table
          className="table table-bordered table-dark table-hover text-center mb-4"
          data-layer={layerIndex}
          key={layerIndex}
        >
          <thead className="table-dark">
            {/* <tr>
              <th colSpan={3}>Layer {layerIndex+1}</th>
            </tr> */}
          </thead>
          <tbody>
            {layer.map((row, rowIndex) => (
              <Row
                key={`${layerIndex}-${rowIndex}`}
                row={row}
              />
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
};

export default Board;
