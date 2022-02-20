import React from "react";
import { useState, useEffect } from "react";

import ChunkCard from './ChunkCard'
import ChunkReview from './ChunkReview'

function Review({ chunks, setChunks }) {

  const renderChunks = () => {
      return (
        <div>
          <ChunkReview chunks={chunks} setChunks={setChunks}/>
          {
            chunks.map(chunk => (
              <div key={chunk.number}>
                <p>
                  {chunk.number}
                </p>
              </div>
            ))
          }
        </div>
      )
  }

  return (
    <div>
      {chunks.length > 0 ? 
        renderChunks() : (
        <p>No phrases to review!</p>
      )}

    </div>
  );
}

export default Review;
