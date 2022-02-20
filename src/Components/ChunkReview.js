import React from "react";
import { useState, useEffect } from "react";
import { sortChunk } from "../Utils/Chunk";

function ChunkReview ({chunks, setChunks}) {
  const [mode, setMode] = useState("review");
  
  const startTest = () => {
    setMode("test");
  }

  const endTest = () => {
    setMode("results");
  }

  const finishCard = (rating) => {
    let chunksCopy = [...chunks];
    if (rating == 0) {
      chunksCopy[0].strength = 0;
    } else {
      chunksCopy[0].strength += rating;
    }
    chunksCopy[0].strength = Math.min(7, chunksCopy[0].strength)
    chunksCopy[0].nextReview = Math.pow(chunksCopy[0].strength, 1.5);
    chunksCopy.sort(sortChunk);
    setChunks(chunksCopy);
    setMode("review");
  }

  const renderCard = () => {
    switch (mode) {
      case "review": {
        return (
          <div>
            {chunks[0].text}
            <button onClick={startTest}>
              Test this Phrase
            </button>
          </div>
        );
      }; break;
      case "test": {
        return (
          <button onClick={endTest}>
            Finish test
          </button>
        );
      }; break;
      case "results": {
        return (
          <div>
            <button onClick={() => {finishCard(0)}}>
              Poor
            </button>
            <button onClick={() => {finishCard(1.1)}}>
              Adequate
            </button>
            <button onClick={() => {finishCard(1.3)}}>
              Good
            </button>
          </div>
        )
      }
    }
  }

  return renderCard()
}

export default ChunkReview;
