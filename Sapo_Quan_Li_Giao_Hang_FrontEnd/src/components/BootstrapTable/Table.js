import React from 'react';

const Table = (props) => {
  const showThead = (thead) => {
    let rs = null;
    if (thead.length > 0) {
      rs = thead.map((th, index) => {
        return (
          <div className='th' index={index} style={{ minWidth: `${th.width}` }}>
            {th.label}
          </div>
        );
      });
    }
    return rs;
  };
  return (
    <div
      className='table-custom'
      style={{
        overflowX: 'auto',
      }}
    >
      <div className='thead'>{showThead(props.thead)}</div>
      <div className='tbody'>{props.children}</div>
    </div>
  );
};

export default Table;
