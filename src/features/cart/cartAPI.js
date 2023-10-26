export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch('https://localhost:7203/api/Carts', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchItemsByUserId(user) {
  //url wont be hardcoded
  const userId = user.id;
  return new Promise(async (resolve) => {
    const response = await fetch('https://localhost:7203/api/Carts/' + userId);
    const data = await response.json();
    resolve({ data });
  });
}

export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      'https://localhost:7203/api/Carts/' + update.id,
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

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch('https://localhost:7203/api/Carts/' + itemId, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    });
    if (response.status === 204) {
      // 204 status code indicates a successful deletion.
      resolve({ success: true });
    } else {
      const data = await response.json();
      resolve({ success: false, error: data });
    }
  });
}

export function resetCart(user) {
  //get all items of users cart and then delete each
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId(user);
    const items = response.data;
    const deletePromises = items.map((item) => deleteItemFromCart(item.id));

    // Wait for all delete operations to complete
    try {
      await Promise.all(deletePromises);
      resolve({ status: 'success' });
    } catch (error) {
      // Handle any errors that may occur during deletion
      resolve({ status: 'error', error });
    }
  });
}
