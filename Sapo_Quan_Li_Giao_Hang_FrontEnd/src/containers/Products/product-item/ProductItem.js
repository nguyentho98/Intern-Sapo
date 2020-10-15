import { Checkbox } from 'pretty-checkbox-react';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
const CategoryItem = (props) => {
  const [checked, setChecked] = useState(props.stt);
  const { product } = props;
  const handleChange = (e) => {
    setChecked(e.target.checked);
    if (checked !== e.target.checked) {
      props.getItemChecked(product.id, e.target.checked);
    }
  };

  const showDate = (dateStr) => {
    const date = new Date(dateStr);
    return (
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    );
  };

  useEffect(() => {
    if (props.stt && !checked) {
      setChecked(true);
      props.getItemChecked(product.id, true);
    }
    if (!props.stt && checked) {
      setChecked(false);
      props.getItemChecked(product.id, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.stt]);

  return (
    <React.Fragment>
      <tr className='cateItem-h' style={{ lineHeight: '50px' }}>
        <td className='check'>
          <Checkbox
            className='pretty-checkbox'
            shape='curve'
            color='info-o'
            onChange={handleChange}
            checked={checked}
            icon={<i className={`fa fa-check`} />}
          ></Checkbox>
        </td>
        <td>
          {product.picturePath !== null ? (
            <img
              style={{ width: '50px' }}
              src={`https://firebasestorage.googleapis.com/v0/b/quan-li-giao-hang.appspot.com/o/images%2F${product.picturePath}?alt=media&token=a84fcb01-ab59-409b-8ad9-93e8a96332fc`}
              alt=''
            />
          ) : (
            <div className='image-null text-center'>
              <i className='fa fa-picture-o' />
            </div>
          )}
        </td>
        <td style={{ color: 'blue' }}>
          <NavLink
            to={`/admin/product/${product.id}`}
            data-tip
            data-for={`product/${product.id}`}
          >
            {product.name}
          </NavLink>
        </td>
        <td>{product.category}</td>
        <td>{product.brand}</td>
        <td className='text-center'>{product.quantity}</td>
        <td className={product.transactionStatus === true ? 'suc' : 'not'}>
          {product.transactionStatus === true
            ? 'Đang giao dịch'
            : 'Ngừng giao dịch'}
        </td>
        <td>{showDate(product.createdOn)}</td>
      </tr>
      <ReactTooltip id={`product/${product.id}`}> {product.name}</ReactTooltip>
    </React.Fragment>
  );
};
CategoryItem.propTypes = {
  category: PropTypes.object,
};
const mapStateToProps = (state) => {
  return {
    stt: state.statusReducer.sttCheckBox,
  };
};
export default connect(mapStateToProps, null)(CategoryItem);
