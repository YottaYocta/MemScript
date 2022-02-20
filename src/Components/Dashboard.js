import React from "react";
import { useState, useEffect } from "react";

import Chunker from "./Chunker";
import Review from "./Review";
import Chunk from "../Utils/Chunk";

function Dashboard() {
  const [chunks, setChunks] = useState([]);

  useEffect(() => {
    let finished = true;
    for (let i = 0; i < chunks.length; i++) {
      if (chunks[i].strength < 7 - 0.1) {
        finished = false;
      }
    }
    if (chunks.length > 0 && finished) {
      alert("Congratulations, script memorization training complete");
    }
    console.log(chunks);
  }, [chunks]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a href="#" className="navbar-brand">
            MemScript
          </a>
        </div>
      </nav>
      <div className="container-fluid m-3">
        {chunks.length > 0 ? (
          <Review chunks={chunks} setChunks={setChunks} />
        ) : (
          <Chunker chunks={chunks} setChunks={setChunks} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
