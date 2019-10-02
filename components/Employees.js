import React, {Component} from 'react';

import { connect } from 'react-redux';
import { getEmployeeList, editEmployee, sortEmployee } from '../actions/employeeActions';

import  { Table }  from 'react-bootstrap';

import Switch from 'react-switch';
import EmployeesForm from './EmployeesForm';
import EmployeeSearch from './EmployeeSearch';

class Employees extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showPopup: false,
      checked: false,
      order:false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.togglePopup  = this.togglePopup.bind(this);
    this.sorting      = this.sorting.bind(this);
  }

  componentDidMount() {
    this.props.getEmployeeList();
  }

  togglePopup() {
    this.setState({
        showPopup: !this.state.showPopup
    });
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  openEditPopUp( employee ) {
    this.setState({
        showPopup: true
    });

    this.props.editEmployee( employee )
  }

  sorting(column) {
    this.setState({
      order: !this.state.order
    });

    let currentList = [];
    let empList = this.props.employees.employees;
    if ( column === 'name') {
      currentList = (this.state.order) ? empList.sort((a, b) => a.name.localeCompare(b.name)) : empList.sort((a, b) => b.name.localeCompare(a.name));
    } else if( column === 'salary') {
      currentList = (this.state.order) ? empList.sort((a,b) => b.salary - a.salary) : empList.sort((a,b) => a.salary - b.salary);
    } else {
      currentList = (this.state.order) ? empList.sort((a,b) => b.id - a.id) : empList.sort((a,b) => a.id - b.id);
    }

    this.props.sortEmployee(currentList);
  }

  renderList() {
    if(typeof(this.props.employees.employees) === 'undefined') {
      return (
        <tr>
          <td colSpan='3'>Loading...</td>
        </tr>
      );
    }

    return( this.props.employees.employees.map( ( employee, index ) => {
        return (
          <tr key={index}>
            <td>{employee.id}</td>
            <td>{employee.name}</td>
            <td>{employee.salary}</td>
            {this.state.checked ?
              <td>
                <a onClick = {() => this.openEditPopUp( employee )}>Edit</a>
              </td>
              : null
            }
          </tr>
        )
      })
    )
  }

	render() {
		return (
			<div>
				<h4>Employees List</h4>
        <Switch onChange={this.handleChange} checked={this.state.checked} />
        {this.state.showPopup ? <EmployeesForm closePopup={this.togglePopup} /> : null }
        <EmployeeSearch />
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th style={{cursor: 'pointer'}} onClick ={() => this.sorting('id')}>Id</th>
              <th style={{cursor: 'pointer'}} onClick ={() => this.sorting('name')}>Name</th>
              <th style={{cursor: 'pointer'}} onClick ={() => this.sorting('salary')}>Salary(INR)</th>
              {this.state.checked ?
                <th>Action</th>
                : null
              }
            </tr>
          </thead>
          <tbody>
              {this.renderList()}
          </tbody>
        </Table>
			</div>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		employees : state.employees,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
    getEmployeeList: () => {
      dispatch( getEmployeeList() );
    },
    editEmployee : ( employee ) => {
      dispatch ( editEmployee( employee ) );
    },
    sortEmployee : ( employees ) => {
      dispatch ( sortEmployee( employees ) );
    }
	};
};

export default connect( mapStateToProps, mapDispatchToProps )( Employees );
