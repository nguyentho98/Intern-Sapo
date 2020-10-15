import React, { useEffect, useState } from 'react';
import { setTagsFilter } from '../../../redux/actions/Filter';
import { connect } from 'react-redux';
import { getTagsRequest } from '../../../redux/actions/product';
import { ClickAwayListener } from '@material-ui/core';
const FilterTags = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [tags, setTags] = useState([]);
  const [valueTag, setValueTag] = useState('');
  const forcusGetTags = () => {
    props.getTag(valueTag);
    document.getElementById('i-tag').focus();
    setShowModal(true);
  };
  const setTagValue = (tag) => {
    let tagValue = [...tags];
    if (!tags.includes(tag)) {
      tagValue.push(tag);
    }

    setTags(tagValue);
    document.getElementById('i-tag').blur();
    setShowModal(false);
  };
  const showTag = (t) => {
    let rs = null;

    if (tags !== undefined) {
      rs = t.map((cate, index) => {
        return (
          <div
            className='tag-item'
            key={index}
            onClick={() => setTagValue(cate)}
          >
            <span>{cate}</span>
          </div>
        );
      });
    } else {
      return (
        <div
          className='justify-content-center d-flex'
          style={{ position: 'sticky', left: '58%', marginTop: 25 }}
        >
          <div class='spinner-border text-primary'></div>
        </div>
      );
    }
    return rs;
  };
  const removeTag = (tag) => {
    let tagValue = [...tags];
    const index = tagValue.findIndex((t) => t === tag);
    if (index >= 0) {
      tagValue.splice(index, 1);
    }
    setTags(tagValue);
  };
  const showTagSelected = (tags) => {
    let rs = null;
    if (tags.length > 0) {
      rs = tags.map((tag, index) => {
        return (
          <span className='tag-item-span' key={index}>
            {tag}
            <span className='remove' onClick={() => removeTag(tag)}>
              <i className='fa fa-times' />
            </span>
          </span>
        );
      });
    }
    return rs;
  };
  const clickForcusGetTags = () => {
    document.getElementById('i-tag').focus();
  };
  const handleChange = (e) => {
    let value = e.target.value;
    setValueTag(value);
    setTimeout(() => {
      props.getTag(value);
    }, 400);
  };
  const clickAway = () => {
    setShowModal(false);
  };
  useEffect(() => {
    props.setTagsFilter(tags);
  });
  return (
    <ClickAwayListener onClickAway={clickAway}>
      <div
        className='filter-category'
        style={{ paddingLeft: 10, width: 238, position: 'relative' }}
      >
        <div
          className='tag-filter form form-control'
          onClick={clickForcusGetTags}
          style={{ padding: 0 }}
        >
          {showTagSelected(tags)}
          <input
            autoComplete='off'
            type='text'
            id='i-tag'
            className='form-tag'
            onFocus={forcusGetTags}
            onChange={handleChange}
            size='4'
          />
        </div>

        <div
          className={`modal-filter card bordershadowC  ${
            showModal === false ? 'd-none-custom' : 'd-block-custom'
          }`}
          style={{ width: '96%', top: 36 }}
        >
          <div className='card-body' style={{ padding: '0' }}>
            {showTag(props.tags)}
          </div>
        </div>
      </div>
    </ClickAwayListener>
  );
};
const mapStateToProps = (state, ownProps) => {
  return {
    tags: state.productReducer.tag,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getTag: (value) => {
      dispatch(getTagsRequest(value));
    },
    setTagsFilter: (data) => {
      dispatch(setTagsFilter(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FilterTags);
