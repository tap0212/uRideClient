import React from "react";

const ImageHelper = ({ ItemsList }) => {
  
  return (
    <div className="rounded border border-success p-2">
      <img
        src={ItemsList.img}
        alt=""
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3 rounded"
      />
    </div>
  );
};

export default ImageHelper;