import React from "react";

import ChunkReview from "./ChunkReview";

function Review({ chunks, setChunks, maxStrength }) {
  const renderChunks = () => {
    return (
      <div className="row">
        <div className="border-end border-2 rounded mt-3 mb-3 pe-4 col-4">
          <h1 className="mt-3">Reivew Queue</h1>
          <ul className="list-group mt-3 mb-3">
            <li className="list-group-item active" key={chunks[0].number}>
              <p>Phrase # {chunks[0].number}</p>
              <p>
                Progress till complete:{" "}
                {Math.floor((chunks[0].strength / maxStrength) * 100)} %
              </p>
            </li>
            {chunks.slice(1).map((chunk) => (
              <li className="list-group-item" key={chunk.number}>
                <p>Phrase # {chunk.number}</p>
                <p>
                  Progress till complete:{" "}
                  {Math.floor((chunk.strength / maxStrength) * 100)} %
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="col">
          <ChunkReview chunks={chunks} setChunks={setChunks} maxStrength={maxStrength}/>
        </div>
      </div>
    );
  };

  return (
    <div>
      {chunks.length > 0 ? renderChunks() : <p>No phrases to review!</p>}
    </div>
  );
}

export default Review;
