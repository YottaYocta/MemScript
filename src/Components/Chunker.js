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
    <div className="form-group">
      <form onSubmit={handleSubmit}>
        <label className="form-label mt-4">Enter Script:</label>
        <input
          className="form-control"
          placeholder="Copy and paste your script here"
          type="text"
          value={script}
          onChange={handleChange}
        ></input>
      </form>
    </div>
  );
}

export default Chunker;
