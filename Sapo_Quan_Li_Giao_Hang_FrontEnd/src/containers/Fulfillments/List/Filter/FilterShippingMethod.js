import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
const FilterShippingMethod = (props) => {
  const { stateDefault,setStateDefault} = props;
  const [active,setSctive]=useState({
    active1:false,
    active2:false,
  })
  useEffect(() => {
    if(stateDefault.shippingMethod===0){
      setSctive({active1:true})
    }
    if(stateDefault.shippingMethod===1){
      setSctive({active2:true})
    }
  },[stateDefault])
  return (
    <div className="filter-status d-flex">
      <button
        className={`btn btn-filters ${active.active1 ? "active" : ""}`}
        type="button"
        onClick={() => {
          setStateDefault({...stateDefault,shippingMethod:0});
        }}
      >
        Chuyển hàng về kho rồi đi giao
      </button>

      <button
        className={`btn btn-filters ${active.active2 ? "active" : ""}`}
        style={{ marginLeft: "10px" }}
        type="button"
        onClick={() => {
          setStateDefault({...stateDefault,shippingMethod:1});
        }}
      >
       Đi giao luôn
      </button>
    </div>
  );
};

export default connect(null, null)(FilterShippingMethod);
