import React from "react";
import { useState, useEffect } from "react";

import Chunker from "./Chunker";
import Review from "./Review";
import { rechunk } from "../Utils/Chunk";

const maxStrength = 4.0;

function Dashboard() {
  const [chunks, setChunks] = useState([]);
  const [script, setScript] = useState("");
  const [chunkSize, setChunkSize] = useState(2);

  useEffect(() => {
    setChunks(rechunk(script, chunkSize));
  }, [chunkSize, script]);

  useEffect(() => {
    let finished = true;
    for (let i = 0; i < chunks.length; i++) {
      if (chunks[i].strength < maxStrength - 0.01) {
        finished = false;
      }
    }
    if (chunks.length > 0 && finished) {
      alert(`Congratulations, script memorization round complete`);
      setChunkSize((prev) => prev * 2);
    }
  }, [chunks]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a href="/" className="navbar-brand">
            MemScript
          </a>
        </div>
      </nav>
      <div className="container-fluid mt-3 mb-3">
        {chunks.length > 0 && script ? (
          <Review
            chunks={chunks}
            setChunks={setChunks}
            maxStrength={maxStrength}
          />
        ) : (
          <Chunker
            chunkSize={chunkSize}
            chunks={chunks}
            setChunks={setChunks}
            script={script}
            setScript={setScript}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
