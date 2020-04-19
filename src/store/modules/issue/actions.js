export function issueFetchAllRequest(data) {
  return {
    type: '@issue/FETCH_ALL_REQUEST',
    payload: { ...data },
  };
}

export function issueFetchAllSuccess(data) {
  return {
    type: '@issue/FETCH_ALL_SUCCESS',
    payload: { ...data },
  };
}

export function issueFetchAllFailure() {
  return {
    type: '@issue/FETCH_ALL_FAILURE',
  };
}

export function issueCreateRequest(data) {
  return {
    type: '@issue/CREATE_REQUEST',
    payload: { ...data },
  };
}

export function issueCreateSuccess(data) {
  return {
    type: '@issue/CREATE_SUCCESS',
    payload: { ...data },
  };
}

export function issueCreateFailure() {
  return {
    type: '@issue/CREATE_FAILURE',
  };
}
