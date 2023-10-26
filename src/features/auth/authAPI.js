// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      'https://localhost:7203/api/Authentication/signup',
      {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: { 'content-type': 'application/json' },
      }
    );
    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
}

export function userLogin(loginInfo) {
  return new Promise(async (resolve, reject) => {
    //const email = loginInfo.email;
    //const password = loginInfo.password;
    const response = await fetch(
      'https://localhost:7203/api/Authentication/signin',
      {
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: { 'content-type': 'application/json' },
      }
    );
    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
}

export function signOut(userId) {
  return new Promise(async (resolve) => {
    resolve({ data: 'success' });
  });
}
