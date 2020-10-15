import React, { useRef, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';

import vi from 'date-fns/locale/vi'; // the locale you want
registerLocale('vi', vi);
const FilterCreatedDate = ({stateDefault,
  setStateDefault}) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const refFilter = useRef();
  const handleChangeFromDate = (e) => {
    setStartDate(e);
    let fromDate = new Date(e).getTime();
    console.log(fromDate);
    setStateDefault({...stateDefault,fromDate:fromDate})
  };
  const handleChangeToDate = (e) => {
    setEndDate(e);
    let toDate = new Date(e).getTime();
    setStateDefault({...stateDefault,toDate:toDate})
  };
  return (
    <div className='filter-created-date d-flex' ref={refFilter}>
      <DatePicker
        locale={'vi'}
        selected={startDate}
        onChange={(date) => handleChangeFromDate(date)}
        selectsStart
        value={stateDefault.toDate}
        dateFormat='dd/MM/yyyy'
        className='form form-control from-date'
        startDate={startDate}
        endDate={endDate}
      />
      <div class='input-group-append'>
        <span class='input-group-text'>-</span>
      </div>
      <DatePicker
        locale={'vi'}
        selected={endDate}
        onChange={(date) => handleChangeToDate(date)}
        selectsEnd
        dateFormat='dd/MM/yyyy'
        className='form form-control to-date'
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
    </div>
  );
};

export default connect(null, null)(FilterCreatedDate);
