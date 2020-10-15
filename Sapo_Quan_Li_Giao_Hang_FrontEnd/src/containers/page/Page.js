import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import { connect } from 'react-redux';
import { getAllProductRequest } from '../../redux/actions/product';
import { setSttCheckBox } from '../../redux/actions/SetSttCheckBox';

class Page extends Component {
  state = {
    activePage: 1,
  };
  componentWillMount() {
    this.setState({
      activePage: 1,
    });
  }
  render() {
    return (
      <div>
        <div className='float-left'>
          <div className='col-lg-12 col-md-12 col-12'></div>
        </div>
        <div className='float-right'>
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.props.item}
            totalItemsCount={this.props.totalItems}
            pageRangeDisplayed={5}
            itemClass='page-item'
            linkClass='page-link'
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
  handleChange = (e) => {
    this.setState({
      activePage: e,
    });
    this.props.setStt(false);
    this.props.changePage(e);
  };
}
const mapStateToProps = (state) => {
  return {
    filter: state.filter,
    total: state.productReducer.products.totalProducts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllCategory: (page, limit, data) => {
      dispatch(getAllProductRequest(page, limit, data));
    },
    setStt: (data) => {
      dispatch(setSttCheckBox(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Page);
