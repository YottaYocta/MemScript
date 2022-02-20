import React from "react";
import { useState, useEffect } from "react";
import { sortChunk } from "../Utils/Chunk";
import Differ from "./Motion";

function ChunkReview({ chunks, setChunks }) {
  const [mode, setMode] = useState("review");
  const [startTime, setStartTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(Date.now());
  const [WPM, setWPM] = useState(0);
  const [movement, setMovementCount] = useState(0);

  useEffect(() => {
    setWPM(chunks[0].getWords() / ((endTime - startTime) / 60000));
  }, [endTime]);

  const startTest = () => {
    setMode("test");
    setStartTime(Date.now());
  };

  const endTest = () => {
    setMode("results");
    setEndTime(Date.now());
  };

  const finishCard = (rating) => {
    let chunksCopy = [...chunks];
    let penalty = 0;

    if (movement > chunks[0].getWords() / 2 && movement <= 0) {
      penalty -= 0.5;
    }

    if (WPM > 180) {
      penalty -= Math.abs((WPM - 180) / 20);
    } else if (WPM < 70) {
      penalty -= Math.abs((WPM - 70) / 20);
    }

    if (rating == 0) {
      chunksCopy[0].strength = 0 + penalty;
    } else {
      chunksCopy[0].strength += rating + penalty;
    }
    chunksCopy[0].strength = Math.max(0, Math.min(7, chunksCopy[0].strength));
    chunksCopy[0].nextReview = Math.pow(chunksCopy[0].strength, 1.5);
    chunksCopy.sort(sortChunk);
    setChunks(chunksCopy);
    setMode("review");
  };

  const renderMotion = () => {
    if (movement > chunks[0].getWords()) {
      return (
        <p>
          Hand gestures or other motions: {movement}
          <br />
          Excessive motion can be distracting to audiences. Try to move less so
          audiences can focus on what you are saying more
        </p>
      );
    } else if (movement <= 0) {
      return (
        <p>
          Hand gestures or other motions: {movement}
          <br />
          Some movement when speaking can engage the audience and increase their
          interest in your presentation
        </p>
      );
    } else {
      return <p>Hand gestures or other motions: {movement}</p>;
    }
  };

  const renderWPM = () => {
    if (WPM > 180) {
      return (
        <p>
          Words per minute: {WPM}
          <br />
          You may be talking too fast; try talking a bit slower to make your
          message easier to understand
        </p>
      );
    } else if (WPM < 70) {
      return (
        <p>
          Words per minute: {WPM}
          <br />
          You may be talking to slow; try talking with more speed or energy, as
          it can improve listener's attention
        </p>
      );
    } else {
      return <p>Words per minute: {WPM}</p>;
    }
  };

  const renderCard = () => {
    switch (mode) {
      case "review":
        {
          return (
            <div>
              <p className="blockquote">{chunks[0].text}</p>
              <p>Word count: {chunks[0].getWords()}</p>
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
            <div>
              <Differ setMovementCount={setMovementCount} />
              <button className="btn btn-primary btn-lg" onClick={endTest}>
                Finish test
              </button>
            </div>
          );
        }
        break;
      case "results": {
        return (
          <div className="row">
            <p className="blockquote">{chunks[0].text}</p>
            <p>Word count: {chunks[0].getWords()}</p>
            {renderWPM()}
            {renderMotion()}
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
