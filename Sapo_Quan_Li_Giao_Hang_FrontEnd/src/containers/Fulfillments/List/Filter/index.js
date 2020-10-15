/* eslint-disable no-loop-func */
import { ClickAwayListener } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getAllProductRequest } from '../../../../redux/actions/product';
import FilterStatus from '../../../Products/Filter/FilterStatus';
import { connect } from 'react-redux';
import { setSttCheckBox } from '../../../../redux/actions/SetSttCheckBox';
import {
  filterListFulfillmentThunk,
} from '../../../../redux/actions/fulfillment';
const FilterComponent = (props) => {
  const {
    filterFulfillments,
    setStt,
    setProgress,
    setValueInputSreach,
    valueOptionCheck,
    filterComponents,
    search,
    setSearch,
    stateDefault,
    setStateDefault,
    // valueOftion,
    // setValueOption,
    // valueOptionSelected,
    // setValueOptionSelected,
  } = props;
  const [actionFilter, setActionFilter] = useState(false);
  const [valueOftion, setValueOption] = useState([]);
  const [valueOptionSelected, setValueOptionSelected] = useState([]);

  const handleClickAway = () => {
    setActionFilter(false);
  };
  const setActionFilters = () => {
    setActionFilter(!actionFilter);
    setValueOption(valueOptionCheck);
  };
  const changFilterSelected = (e) => {
    console.log(e.target.value);
    let options = [...valueOftion];
    let optionsSelected = [...valueOptionSelected];
    // vi tri options da select
    const index = optionsSelected.findIndex(
      (value) => value.text === e.target.options[0].text
    );
    const optionSelected = optionsSelected[index];
    // vi tri options moi select
    const indexChange = options.findIndex(
      (value) => value.text === e.target.value
    );
    const aca = valueOptionCheck.findIndex(
      (value) => value.text === e.target.options[0].text
    );
    const optionChange = options[indexChange];
    options.splice(indexChange, 1);
    options.splice(aca, 0, optionSelected);
    if (index === optionSelected.length) {
      optionsSelected.splice(index, 1);
      optionsSelected.splice(index, 0, optionChange);
    } else {
      optionsSelected.splice(index + 1, 0, optionChange);
      optionsSelected.splice(index, 1);
    }
    setValueOptionSelected(optionsSelected);
    setValueOption(options);
  };
  const showFilteroptionSelected = () => {
    let rs = null;
    let valueOption = [...valueOftion];
    let valueOptionSelect = [...valueOptionSelected];
    for (var i = 0; i < valueOption.length; i++) {
      if (valueOptionSelect.length > 0) {
        valueOptionSelect.map((value) => {
          if (value.key === valueOption[i].key) {
            valueOption.splice(i, 1);
          }
        });
      }
    }
    if (valueOptionSelected.length > 0) {
      rs = valueOptionSelected.map((optionSelected, index) => {
        return (
          <div className='filter-item d-flex'>
            <div className='filter-item-select'>
              <i
                className='fa fa-sort'
                style={{
                  position: 'absolute',
                  left: '150px',
                }}
              ></i>
              <select
                id='filterSelected'
                className='btn btn-filter float-left'
                onChange={changFilterSelected}
                value={optionSelected.text}
                style={{ width: 175 }}
              >
                <option >{optionSelected.text}</option>
                {valueOption.map((option, index) => {
                  if (option.key !== 'none') {
                    return <option className={`${valueOption.length-1===index ? 'd-none' : 'd-block'}`}>{option.text}</option>;
                  }
                })}
              </select>
            </div>
            {filterComponents.map((filterComponent) => {
              return optionSelected.key === filterComponent.key
                ? filterComponent.component
                : '';
            })}
            <div className='trash'>
              <i
                className='fa fa-trash-o'
                onClick={() => removeSelected(optionSelected.key)}
              ></i>
            </div>
          </div>
        );
      });
    }
    return rs;
  };
  const showFilteroptions = () => {
    let rs = null;
    let valueOption = [...valueOftion];
    let valueOptionSelect = [...valueOptionSelected];
    for (var i = 0; i < valueOption.length; i++) {
      if (valueOptionSelect.length > 0) {
        valueOptionSelect.map((value) => {
          if (value.key === valueOption[i].key) {
            valueOption.splice(i, 1);
          }
        });
      }
    }
    if (valueOption.length > 1) {
      rs = valueOption.map((option, index) => {
        return <option className={`${valueOption.length-1===index ? 'd-none' : 'd-block'}`}>{option.text}</option>;
      });
    }
    return rs;
  };
  useEffect(() => {
    let hidden=true;
    let valueOption = [...valueOptionSelected];
    for (var i = 0; i < valueOption.length; i++) {
      if (valueOption[i].text ==='Trạng thái') {
        hidden=false;
      }
    }
    if(stateDefault.status !== -1 && hidden===true){
      const index = valueOftion.findIndex(
        (value) => value.text === 'Trạng thái'
      );
      if (index > 0) {
        let options = [...valueOftion];
        let optionSelected = [...valueOptionSelected];
        options.splice(index, 1);
        optionSelected.push(valueOftion[index]);
        setValueOption(options);
        setValueOptionSelected(optionSelected);
      }
    }
  },[stateDefault])
  const selectOptions = (e) => {
   
    const index = valueOftion.findIndex(
      (value) => value.text === e.target.value
    );
    if (index > 0) {
      let options = [...valueOftion];
      let optionSelected = [...valueOptionSelected];
      options.splice(index, 1);
      optionSelected.push(valueOftion[index]);
      setValueOption(options);
      setValueOptionSelected(optionSelected);
    }
  };
  const showfilterComonent = (key) => {
    let rs = null;
    rs = valueOptionSelected.map((value) => {
      if (key === 'status') {
        return <FilterStatus />;
      }
    });
    return rs;
  };
  const filters = async () => {
    await setProgress(70);
    await setActionFilter(false);
    setStt(false);
    setTimeout(() => {
      filterFulfillments()
    }, 500);
  };
  useEffect(() => {
    setValueOptionSelected([]);
  }, []);
  const removeSelected = (key) => {
    console.log('valueOftion', valueOftion);
    if(key==="status"){
      setStateDefault({...stateDefault,status:-1})
    }
    if(key==="shipper"){
      setStateDefault({...stateDefault,shipper:''})
    }
    if(key==="customer"){
      setStateDefault({...stateDefault,customer:''})
    }
    if(key==="date"){
      setStateDefault({...stateDefault, fromDate: null,toDate: null})
    }
    if(key==="shippingMethod"){
      setStateDefault({...stateDefault, shippingMethod: -1})
    }
    if(key==="accountingStatus"){
      setStateDefault({...stateDefault, accountingStatus: -1})
    }
    const index = valueOptionSelected.findIndex((value) => value.key === key);
    const indexInitial = valueOptionCheck.findIndex(
      (value) => value.key === key
    );

    if (index > -1) {
      let options = [...valueOftion];
      let optionSelected = [...valueOptionSelected];
      optionSelected.splice(index, 1);
      console.log(optionSelected);
      console.log('index' ,index);
      console.log('indexInitial' ,indexInitial);

      if (indexInitial > 1) {
        options.splice(indexInitial - 1, 0, valueOptionSelected[index]);
      } else {
        options.splice(indexInitial, 0, valueOptionSelected[index]);
      }

      // if (indexInitial >= 1) {
      //   options.splice(indexInitial - 1, 0, valueOptionSelected[index]);
      // }
      console.log('options', options);
      setValueOption(options);
      setValueOptionSelected(optionSelected);
    }
  };
  const onChangeInputSreach = (e) => {
    let { value } = e.target;
    setValueInputSreach(value);
    setSearch({...search,code:value})
  };
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className='table-filter'>
        <div className='filter-product'>
          <button
            className='btn btn-filter dropdown-toggle'
            type='button'
            onClick={setActionFilters}
          >
            Lọc phiếu giao
          </button>
          <div className='input-groupa d-flex'>
            <span className='input-group-span'>
              <i className='fa fa-search' />
            </span>
            <input
              onClick={() => setActionFilter(false)}
              autoComplete='off'
              type='text'
              bind='query'
              class='form form-control'
              placeholder='Tìm kiếm phiếu giao'
              id='query-enter'
              onChange={onChangeInputSreach}
            ></input>
          </div>
        </div>

        <div
          className={`_action_filter bordershadowC ${
            actionFilter === false ? 'd-none-custom' : 'd-block-custom'
          }`}
        >
          <div className='arrow'></div>
          <div className='popover-body'>
            <p>Hiển thị phiếu giao theo :</p>
            <div className='select-filter-option'>
              <div className='option-selected'>
                {showFilteroptionSelected()}
                {showfilterComonent()}
              </div>
              <div className='filter-select' style={{ width: 175 }}>
                <i
                  className={`${valueOftion.length > 1 ? 'fa fa-sort' : ''}`}
                  style={{
                    position: 'absolute',
                    left: '166px',
                    lineHeight: '38px',
                  }}
                ></i>
                <select
                  className={`btn btn-filter ${
                    valueOftion.length > 1 ? 'd-block' : 'd-none'
                  }`}
                  onChange={selectOptions}
                  value={valueOftion[0]}
                >
                  {showFilteroptions()}
                </select>
              </div>
            </div>
            <div
              className={`btn-filter-popover ${
                valueOftion.length === 1 ? '' : ' mg-46-px'
              }`}
            >
              <button
                className='btn btn-primary float-left'
                style={{ marginBottom: '10px' }}
                type='button'
                onClick={filters}
              >
                Lọc
              </button>
            </div>
          </div>
        </div>
      </div>
    </ClickAwayListener>
  );
};
const mapStateToProps = (state) => {
  return {
    fulfillmentSearch: state.fulfillmentSearch,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    filterListFulfillmentThunk: (page, limit, data) => {
      dispatch(filterListFulfillmentThunk(page, limit, data));
    },
    setStt: (data) => {
      dispatch(setSttCheckBox(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FilterComponent);
