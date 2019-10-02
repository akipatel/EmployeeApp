import { Actions } from '../constants/ActionTypes';

const employeesReducer = ( state = {}, action ) => {
	switch( action.type ) {
		case Actions.EMPLOYEE_LIST:
			state = {...state, employees : action.payload}
			break;

		case Actions.EDIT_EMPLOYEE:
		 	state = {...state, employee:action.payload}
    break;

		case Actions.UPDATE_EMPLOYEE:
			let editEmployeesList = state.employees.map((emp) => {
			  return ( action.payload[0].id === emp.id ? action.payload[0] : emp );
			});
			state = {...state, employees:editEmployeesList}
		break;

		case Actions.SEARCH_EMPLOYEE:
			state = {...state, employees:action.payload}
		break;

		case Actions.SORT_EMPLOYEE:
			state = {...state, employees:action.payload}
		break;

		default:
			return state;
	}

	return state;
}

export default employeesReducer;
