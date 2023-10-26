// A mock function to mimic making an async request for data
export function fetchLoggedInUser(user) {
  return new Promise(async (resolve) => {
    const response = await fetch('https://localhost:7203/api/Users/' + user.id);
    const data = await response.json();
    resolve({ data });
  });
}


export function fetchAllUsers() {
  return new Promise(async (resolve) => {
    const response = await fetch('https://localhost:7203/api/Users');
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch('https://localhost:7203/api/Orders/' + userId);
    const data = await response.json();
    resolve({ data });
  });
}


