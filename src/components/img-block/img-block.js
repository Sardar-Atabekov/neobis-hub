import React, { useState } from "react";
import closeImg from "./../../assets/icons/close.png";
import "./img-block.css";

const ImgBlock = ({ src, className = "", alt = "alt image" }) => {
  const [modalImg, setModalImg] = useState(false);

  return (
    <div className="img-block">
      <img
        src={src}
        alt={alt}
        className={`${className} cursor-pointer`}
        onClick={() => setModalImg(src)}
        onBlur={() => setModalImg(false)}
      />
      {modalImg ? (
        <div className="overlay">
          <div className="dialog">
            <div className="d-flex">
              <img src={modalImg} alt={alt} />
              <span
                onClick={() => setModalImg(false)}
                className="imgBlock-closeModal"
              >
                <img src={closeImg} alt="closeImg" />
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default ImgBlock;
