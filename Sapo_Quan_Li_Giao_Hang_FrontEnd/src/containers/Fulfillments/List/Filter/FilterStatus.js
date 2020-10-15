import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
const FilterStatus = (props) => {
  const { stateDefault,setStateDefault} = props;
  const [active,setSctive]=useState({
    active1:false,
    active2:false,
    active3:false,
    active4:false,
    active5:false,
    active6:false,
  })
  useEffect(() => {
    if(stateDefault.status===1){
      setSctive({active1:true})
    }
    if(stateDefault.status===2){
      setSctive({active2:true})
    }
    if(stateDefault.status===3){
      setSctive({active3:true})
    }
    if(stateDefault.status===4){
      setSctive({active4:true})
    }
    if(stateDefault.status===6){
      setSctive({active6:true})
    }
  },[stateDefault])
  return (
    <div className="filter-status d-flex">
      <button
        className={`btn btn-filters ${active.active1 ? "active" : ""}`}
        type="button"
        onClick={() => {
          setStateDefault({...stateDefault,status:1});
        }}
      >
        Chờ lấy hàng
      </button>

      <button
        className={`btn btn-filters ${active.active2 ? "active" : ""}`}
        style={{ marginLeft: "10px" }}
        type="button"
        onClick={() => {
          setStateDefault({...stateDefault,status:2});
        }}
      >
        Đang trong kho
      </button>
      <button
        className={`btn btn-filters ${active.active3 ? "active" : ""}`}
        style={{ marginLeft: "10px" }}
        type="button"
        onClick={() => {
          setStateDefault({...stateDefault,status:3});
        }}
      >
        Đang giao hàng
      </button>
      <button
        className={`btn btn-filters ${active.active4 ? "active" : ""}`}
        style={{ marginLeft: "10px" }}
        type="button"
        onClick={() => {
          setStateDefault({...stateDefault,status:4});
        }}
      >
        Hoàn thành
      </button>
      <button
        className={`btn btn-filters ${active.active6 ? "active" : ""}`}
        style={{ marginLeft: "10px" }}
        type="button"
        onClick={() => {
          setStateDefault({...stateDefault,status:6});
        }}
      >
        Đã hủy
      </button>
    </div>
  );
};

export default connect(null, null)(FilterStatus);
