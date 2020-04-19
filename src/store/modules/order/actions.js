export function orderFetchAllRequest(data) {
  return {
    type: '@order/FETCH_ALL_REQUEST',
    payload: { ...data },
  };
}

export function orderFetchAllSuccess(data) {
  return {
    type: '@order/FETCH_ALL_SUCCESS',
    payload: { ...data },
  };
}

export function orderFetchAllFailure() {
  return {
    type: '@order/FETCH_ALL_FAILURE',
  };
}

export function orderFetchRequest(id) {
  return {
    type: '@order/FETCH_REQUEST',
    payload: { id },
  };
}

export function orderFetchSuccess(data) {
  return {
    type: '@order/FETCH_SUCCESS',
    payload: { ...data },
  };
}

export function orderFetchFailure() {
  return {
    type: '@order/FETCH_FAILURE',
  };
}

export function orderIssuesFetchRequest(id) {
  return {
    type: '@order/FETCH_ISSUES_REQUEST',
    payload: { id },
  };
}

export function orderIssuesFetchSuccess(data) {
  return {
    type: '@order/FETCH_ISSUES_SUCCESS',
    payload: data,
  };
}

export function orderIssuesFetchFailure(data) {
  return {
    type: '@order/FETCH_ISSUES_FAILURE',
  };
}

export function orderUpdateRequest(type, data) {
  return {
    type: '@order/UPDATE_REQUEST',
    payload: { type, ...data },
  };
}

export function orderUpdateSuccess() {
  return {
    type: '@order/UPDATE_SUCCESS',
  };
}

export function orderUpdateFailure() {
  return {
    type: '@order/UPDATE_FAILURE',
  };
}
