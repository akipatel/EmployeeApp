import React, {Component} from 'react';
import {Col, Row, Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {editEmployee, updateEmployee} from '../actions/employeeActions';

class EmployeesForm extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     name: '',
     salary: 0
   };

   this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange = (evt) => {
    this.setState({ name: evt.target.value });
  };

  handleSalaryChange = (evt) => {
    this.setState({ salary: evt.target.value });
  };

  handleSubmit(e) {
    const employee = [{
      id          : this.props.employee.id,
      name        : this.state.name,
      salary      : this.state.salary,
    }];

    if( (employee[0].name) !== '' && employee[0].salary !== '') {
      this.props.updateEmployee(employee);
      this.props.closePopup();
    }
  }

  render(){
    return(
          <Well>
            <button onClick={this.props.closePopup}>X</button>
              <h3>Edit Employee</h3>
              <h4>Previous Name: {this.props.employee.name}</h4>
              <h4>Previous Salary: {this.props.employee.salary}</h4>
              <FormGroup>
                <ControlLabel>Enter New Name</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter Name"
                  onChange={this.handleNameChange}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Enter New Salary(INR)</ControlLabel>
                <FormControl
                  type="number"
                  placeholder="Enter Salary"
                  onChange={this.handleSalaryChange}
                />
              </FormGroup>
              <Button
                onClick={this.handleSubmit}
                bsStyle="primary">Update Employee
              </Button>
          </Well>
    )
  }
}

const mapStateToProps = (state) => {
	return {
    employee : state.employees.employee,
	};
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		editEmployee: ( employee ) => {
			dispatch( editEmployee( employee ) );
		},
    updateEmployee: ( employee ) => {
      dispatch( updateEmployee( employee ) );
    },
    searchEmployee: ( name ) => {
      dispatch( searchEmployee( name ) )
    }
	};
};

export default connect( mapStateToProps, mapDispatchToProps )( EmployeesForm );
