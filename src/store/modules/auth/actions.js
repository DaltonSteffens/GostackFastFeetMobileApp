export function loginRequest(deliveryman_id) {
  return {
    type: '@auth/LOGIN_REQUEST',
    payload: { deliveryman_id },
  };
}

export function loginSuccess(token, user) {
  return {
    type: '@auth/LOGIN_SUCCESS',
    payload: { token, user },
  };
}

export function loginFailure() {
  return {
    type: '@auth/LOGIN_FAILURE',
  };
}

export function logOut() {
  return {
    type: '@auth/LOGOUT',
  };
}
