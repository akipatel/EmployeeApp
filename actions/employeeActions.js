import { Actions } from '../constants/ActionTypes';
import employees from '../api/employees.json';

export function getEmployeeList() {
  return {
    type    : Actions.EMPLOYEE_LIST,
    payload : employees
  };
}

export function editEmployee( employee ) {
	return {
		type 		: Actions.EDIT_EMPLOYEE,
		payload : employee
	}
}

export function updateEmployee( employee ) {
	return {
		type 		: Actions.UPDATE_EMPLOYEE,
		payload : employee
	}
}

export function searchEmployee( employees ) {
	return {
		type 		: Actions.SEARCH_EMPLOYEE,
		payload : employees
	}
}

export function sortEmployee( employees ) {
	return {
		type 		: Actions.SORT_EMPLOYEE,
		payload : employees
	}
}
