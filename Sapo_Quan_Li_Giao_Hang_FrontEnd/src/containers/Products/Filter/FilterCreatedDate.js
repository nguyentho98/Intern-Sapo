import React, { useRef, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import {
  setFromDateFilter,
  setToDateFilter,
} from '../../../redux/actions/Filter';
import vi from 'date-fns/locale/vi'; // the locale you want
registerLocale('vi', vi);
const FilterCreatedDate = (props) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const refFilter = useRef();
  const handleChangeFromDate = (e) => {
    setStartDate(e);
    let fromDate = new Date(e).getTime();
    props.setFromDate(fromDate);
  };
  const handleChangeToDate = (e) => {
    setEndDate(e);
    let toDate = new Date(e).getTime();
    props.setToDate(toDate);
  };
  return (
    <div className='filter-created-date d-flex' ref={refFilter}>
      <DatePicker
        locale={'vi'}
        selected={startDate}
        onChange={(date) => handleChangeFromDate(date)}
        selectsStart
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
const mapDispatchToProps = (dispatch) => {
  return {
    setFromDate: (data) => {
      dispatch(setFromDateFilter(data));
    },
    setToDate: (data) => {
      dispatch(setToDateFilter(data));
    },
  };
};
export default connect(null, mapDispatchToProps)(FilterCreatedDate);
