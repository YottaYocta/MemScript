import React from "react";
import { useState } from "react";

import { rechunk } from "../Utils/Chunk";

function Chunker({ chunkSize, chunks, setChunks , script, setScript}) {

  const [scriptValue, setScriptValue] = useState("");

  const handleChange = (e) => {
    setScriptValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setChunks(rechunk(scriptValue, chunkSize));
    setScript(scriptValue);
  };

  return (
    <div className="form-group">
      <form onSubmit={handleSubmit}>
        <label className="form-label mt-4">Enter Script:</label>
        <input
          className="form-control"
          placeholder="Copy and paste your script here"
          type="text"
          value={scriptValue}
          onChange={handleChange}
        ></input>
      </form>
    </div>
  );
}

export default Chunker;
