import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
const FilterAccounting = (props) => {
  const { stateDefault,setStateDefault} = props;
  const [active,setSctive]=useState({
    active1:false,
    active2:false,
  })
  useEffect(() => {
    if(stateDefault.accountingStatus===0){
      setSctive({active1:true})
    }
    if(stateDefault.accountingStatus===1){
      setSctive({active2:true})
    }
  },[stateDefault])
  return (
    <div className="filter-item d-flex">
      <button
        className={`btn btn-filters ${active.active1 ? "active" : ""}`}
        type="button"
        onClick={() => {
          setStateDefault({...stateDefault,accountingStatus:0});
        }}
      >
        Chưa đối soát
      </button>

      <button
        className={`btn btn-filters ${active.active2 ? "active" : ""}`}
        style={{ marginLeft: "10px" }}
        type="button"
        onClick={() => {
          setStateDefault({...stateDefault,accountingStatus:1});
        }}
      >
      Đã đối soát
      </button>
    </div>
  );
};

export default connect(null, null)(FilterAccounting);
