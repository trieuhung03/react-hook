import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import React from "react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import "./DetailData.scss"
const DetailContat = () => {
  let { id } = useParams();
  const [detailData, setDetailData] = useState();
  const getDetailData = useCallback(() => {
    return axios.patch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }, []);
  useEffect(() => {
    getDetailData()
      .then((res) => {
        console.log("check res", res);
        if (res.data) {
          setDetailData(res.data);
        }
      })
      .catch((err) => {
        console.log("loi roi", err);
      });
  }, []);
  return (
    <>
      <h1>Hello with ID = {id}</h1>
      <div className="contact-detail">
        {detailData && (
          <>
            <div className="title">ID: {id} --- {detailData.title}</div>
            <div className="content">{detailData.body}</div>
          </>
        )}
      </div>
      <NavLink to="/contact" activeClassName="active" exact={true}>
        Back to Contact
      </NavLink>
    </>
  );
};

export default DetailContat;
