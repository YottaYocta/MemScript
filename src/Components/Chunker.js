import React from "react";
import { useState } from "react";

import Toggle from "./Toggle";
import { rechunk } from "../Utils/Chunk";

function Chunker({
  chunkSize,
  chunks,
  setChunks,
  script,
  setScript,
  chunkingProtocol,
  setChunkingProtocol,
}) {
  const [scriptValue, setScriptValue] = useState("");
  const [tempChunkingProtocol, setTempChunkingProtocol] =
    useState(chunkingProtocol);

  const handleChange = (e) => {
    setScriptValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setChunks(rechunk(scriptValue, chunkSize));
    setScript(scriptValue);
    setChunkingProtocol(tempChunkingProtocol);
  };

  return (
    <form className="form-group" onSubmit={handleSubmit}>
      <div className="row">
        <label className="form-label mt-4">Enter Script:</label>
        <div className="col-10">
          <input
            className="form-control"
            placeholder="Copy and paste your script here"
            type="text"
            value={scriptValue}
            onChange={handleChange}
          ></input>
        </div>
        <div className="col-2">
          <Toggle
            value={tempChunkingProtocol}
            setValue={setTempChunkingProtocol}
            firstOption={"lexographic"}
            secondOption={"ideographic"}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button className="btn btn-primary form-control mt-3" type="submit">
            Generate phrases
          </button>
        </div>
      </div>
    </form>
  );
}

export default Chunker;
