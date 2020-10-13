import React from "react";
import "./test-block.css";
import fineSmile from "./../../assets/test-block/2764 1.png";
import goodSmile from "./../../assets/test-block/1f609 1.png";
import badlySmile from "./../../assets/test-block/2639 1.png";
import veryBadSmile from "./../../assets/test-block/1f621 2.png";
import normallySmile from "./../../assets/test-block/1f610 1.png";
const TestsBlock = ({ tests, className = "" }) => {
  const checkSmile = (point) => {
    if (point <= 20) {
      return veryBadSmile;
    } else if (point <= 40) {
      return badlySmile;
    } else if (point <= 60) {
      return normallySmile;
    } else if (point <= 80) {
      return goodSmile;
    } else {
      return fineSmile;
    }
  };
  return (
    <div className={`${className} tests-block`}>
      {tests.map((test) => (
        <div key={test.id} className="test-block">
          <div className="test_name">{test.test_name}</div>
          <div className="points-block">
            <img src={checkSmile(test.points)} alt={test.test_name} />
            <span>{test.points}/100</span>
          </div>
        </div>
      ))}
    </div>
  );
};
export default TestsBlock;
