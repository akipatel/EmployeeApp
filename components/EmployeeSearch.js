import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {searchEmployee, getEmployeeList} from '../actions/employeeActions';

class EmployeeSearch extends React.Component {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit  = this.onFormSubmit.bind(this);
  }

  onInputChange(e) {
    let currentList = [];
    let newList = [];

    if (e.target.value !== "") {
     currentList = this.props.employees.employees;
     newList = currentList.filter(emp => {
       const lc = emp.name.toLowerCase();
       const filter = e.target.value.toString().toLowerCase();
       return lc.includes(filter);
     });
    this.props.searchEmployee(newList);
   } else {
     this.props.getEmployeeList();
   }
  }

  onFormSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form
        onSubmit={this.onFormSubmit}
        className="input-group">
        <input
          className="form-control"
          placeholder = "Employee Search"
          onChange={this.onInputChange}
        />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">Search</button>
        </span>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		employees : state.employees,
	};
};

const mapDispatchToProps = ( dispatch ) => {
	return {
    getEmployeeList: () => {
      dispatch( getEmployeeList() );
    },
    searchEmployee: ( name ) => {
      dispatch( searchEmployee( name ) )
    }
	};
};

export default connect( mapStateToProps, mapDispatchToProps )( EmployeeSearch );
