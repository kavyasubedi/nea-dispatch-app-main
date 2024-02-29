// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import api from "../Axios.jsx";

const ShowImg = (props) => {
  const [file, setFile] = useState(null);
  const { src, ...attrs } = props;

  useEffect(() => {
    api
      .get("v1/file/" + src)
      .then((res) => {
        setFile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {file ? (
        <img
          style={{ width: "100%", height: "20vh" }}
          src={`data:${file.type};base64,${file.file}`}
          alt="image"
          {...attrs}
        />
      ) : (
        "No File"
      )}
    </>
  );
};

export default ShowImg;
