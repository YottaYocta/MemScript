import React from "react";
import { useState, useEffect } from "react";

import Chunk from "../Utils/Chunk";

function Chunker({ chunks, setChunks }) {
  const [script, setScript] = useState("");

  const handleChange = (e) => {
    setScript(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (script.length > 0) {
      setChunks([]);
      let sentences = script.split(".");
      let count = 0;
      let newChunks = [];
      for (let i = 0; i < sentences.length; i += 2) {
        let text;
        if (i + 1 < sentences.length) {
          text = sentences[i] + sentences[i + 1];
        } else {
          text = sentences[i];
        }
        newChunks.push(new Chunk(count, text));
        count += 1;
      }
      setChunks(newChunks);
      setScript("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Script:
          <input type="text" value={script} onChange={handleChange}></input>
        </label>
      </form>
    </div>
  );
}

export default Chunker;
