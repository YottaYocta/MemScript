import React from "react";
import { useState, useEffect } from "react";
import { sortChunk } from "../Utils/Chunk";

function ChunkReview({ chunks, setChunks }) {
  const [mode, setMode] = useState("review");

  const startTest = () => {
    setMode("test");
  };

  const endTest = () => {
    setMode("results");
  };

  const finishCard = (rating) => {
    let chunksCopy = [...chunks];
    if (rating == 0) {
      chunksCopy[0].strength = 0;
    } else {
      chunksCopy[0].strength += rating;
    }
    chunksCopy[0].strength = Math.min(7, chunksCopy[0].strength);
    chunksCopy[0].nextReview = Math.pow(chunksCopy[0].strength, 1.5);
    chunksCopy.sort(sortChunk);
    setChunks(chunksCopy);
    setMode("review");
  };

  const renderCard = () => {
    switch (mode) {
      case "review":
        {
          return (
            <div>
              <p className="blockquote">{chunks[0].text}</p>
              <button className="btn btn-primary btn-lg" onClick={startTest}>
                Test this Phrase
              </button>
            </div>
          );
        }
        break;
      case "test":
        {
          return (
            <button className="btn btn-primary btn-lg" onClick={endTest}>
              Finish test
            </button>
          );
        }
        break;
      case "results": {
        return (
          <div className="row">
            <button
              className="col btn btn-primary btn-lg me-2"
              onClick={() => finishCard(0)}
            >
              Poor
            </button>
            <button
              className="col btn btn-primary btn-lg ms-2 me-2"
              onClick={() => finishCard(1.1)}
            >
              Adequate
            </button>
            <button
              className="col btn btn-primary btn-lg ms-2"
              onClick={() => finishCard(1.4)}
            >
              Good
            </button>
          </div>
        );
      }
    }
  };

  return <div className="container mt-3 d-grid gap-2">{renderCard()}</div>;
}

export default ChunkReview;
