// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  //url wont be hardcoded
  return new Promise(async (resolve) => {
    const response = await fetch('https://localhost:7203/api/Medicines');
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductById(id) {
  //url wont be hardcoded
  return new Promise(async (resolve) => {
    const response = await fetch('https://localhost:7203/api/Medicines/' + id);
    const data = await response.json();
    resolve({ data });
  });
}

export function createProduct(product) {
  //url wont be hardcoded
  return new Promise(async (resolve) => {
    const response = await fetch('https://localhost:7203/api/Medicines/', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      'https://localhost:7203/api/Medicines/' + update.id,
      {
        method: 'PUT',
        body: JSON.stringify(update),
        headers: { 'content-type': 'application/json' },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters({ filter, sort, pagination }) {
  //filter = {"category":["homeopathy","allopathy"]}
  //sort = {_sort:"price",_order="desc"}
  //pagination = {_page:1,_limit=10}
  //TODO: on server we will support multiple values
  let queryString = '';
  for (let key in filter) {
    if (
      filter.hasOwnProperty(key) &&
      Array.isArray(filter[key]) &&
      filter[key].length
    ) {
      const categoryValues = filter[key];
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  //url wont be hardcoded
  return new Promise(async (resolve) => {
    const response = await fetch(
      'http://localhost:8000/products?' + queryString
    );
    const data = await response.json();
    const totalItems = await response.headers.get('X-Total-Count');
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}

export function fetchAllCategories() {
  //url wont be hardcoded
  return new Promise(async (resolve) => {
    const response = await fetch('https://localhost:7203/api/Categories');
    const data = await response.json();
    resolve({ data });
  });
}

export function createCategory(category) {
  //url wont be hardcoded
  return new Promise(async (resolve) => {
    const response = await fetch('https://localhost:7203/api/Categories/', {
      method: 'POST',
      body: JSON.stringify(category),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateCategory(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      'https://localhost:7203/api/Categories/' + update.id,
      {
        method: 'PUT',
        body: JSON.stringify(update),
        headers: { 'content-type': 'application/json' },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchCategoryById(id) {
  //url wont be hardcoded
  return new Promise(async (resolve) => {
    const response = await fetch('https://localhost:7203/api/Categories/' + id);
    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
}
