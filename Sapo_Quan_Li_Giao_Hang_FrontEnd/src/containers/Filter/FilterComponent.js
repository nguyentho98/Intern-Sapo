/* eslint-disable no-loop-func */
import { ClickAwayListener } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getAllProductRequest } from '../../redux/actions/product';
import FilterStatus from '../Products/Filter/FilterStatus';
import { connect } from 'react-redux';
import { setSttCheckBox } from '../../redux/actions/SetSttCheckBox';
import { clearFilter, setStatusFilter } from '../../redux/actions/Filter';
const FilterComponent = (props) => {
  const [actionFilter, setActionFilter] = useState(false);
  const [valueOftion, setValueOption] = useState([]);

  const [valueOptionSelected, setValueOptionSelected] = useState([]);
  const { valueOptionCheck, filterComponents } = props;
  const handleClickAway = () => {
    setActionFilter(false);
  };
  const setActionFilters = () => {
    setActionFilter(!actionFilter);
    setValueOption(valueOptionCheck);
  };
  const changFilterSelected = (e) => {
    const option = e.target.options[0].value;

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
                <option>{optionSelected.text}</option>
                {valueOption.map((option, index) => {
                  if (option.key !== 'none') {
                    return <option>{option.text}</option>;
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
        return <option>{option.text}</option>;
      });
    }
    return rs;
  };
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
  const filterProducts = async () => {
    await props.setProgress(70);
    await setActionFilter(false);
    props.setStt(false);
    setTimeout(() => {
      props.getAllProduct(1, 10, props.filter);
      props.setSeachingStatus(true);
    }, 500);
  };
  useEffect(() => {
    // setValueOptionSelected([]);
  }, [props.search]);
  const removeSelected = (key) => {
    const index = valueOptionSelected.findIndex((value) => value.key === key);
    const indexInitial = valueOftion.findIndex((value) => value.key === key);
    valueOptionCheck.map((value) => {
      if (key === value.key) {
        console.log(value.key);
        value.clearF();
      }
    });
    if (index > -1) {
      let options = [...valueOftion];
      let optionSelected = [...valueOptionSelected];
      optionSelected.splice(index, 1);
      if (indexInitial === -1) {
        options.splice(1, 0, valueOptionSelected[index]);
      } else {
        options.splice(indexInitial, 0, valueOptionSelected[index]);
      }
      setValueOption(options);
      setValueOptionSelected(optionSelected);
    }
  };
  const [name, setName] = useState('');
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className='table-filter'>
        <div className='filter-product'>
          <button
            className='btn btn-filter dropdown-toggle'
            type='button'
            onClick={setActionFilters}
          >
            {'Lọc ' + props.label}
          </button>
          <div className='input-groupa d-flex'>
            <span className='input-group-span'>
              <i className='fa fa-search' />
            </span>
            <input
              autoComplete='off'
              type='text'
              bind='query'
              onChange={(e) => {
                setName(e.target.value);
              }}
              onBlur={() => {
                props.getAllProduct(1, 10, { name: name });
                props.setProgress(70);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  props.getAllProduct(1, 10, { name: name });
                  props.setProgress(70);
                }
              }}
              class='form form-control'
              placeholder={`Tìm kiếm ${props.label}`}
              id='query-enter'
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
            <p>Hiển thị sản phẩm theo :</p>
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
                onClick={filterProducts}
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
    filter: state.filter,
    products: state.productReducer.products.products,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllProduct: (page, limit, data) => {
      dispatch(getAllProductRequest(page, limit, data));
    },
    setStt: (data) => {
      dispatch(setSttCheckBox(data));
    },
    setSttFilter: (data) => {
      dispatch(setStatusFilter(data));
    },
    clearFilter: () => {
      dispatch(clearFilter());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FilterComponent);
