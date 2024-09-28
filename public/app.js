const apiUrl = 'http://localhost:5000/api/products';

// Fetch and display products
async function fetchProducts() {
    const response = await fetch(apiUrl);
    const products = await response.json();
    const productsDiv = document.getElementById('products');
    productsDiv.innerHTML = '';
    products.forEach(product => {
        productsDiv.innerHTML += `
            <div>
                <h2>${product.name} - $${product.price}</h2>
                <p>${product.description}</p>
                <button class="update-button" onclick="updateProduct('${product._id}')">Update</button>
                <button class="delete-button" onclick="deleteProduct('${product._id}')">Delete</button>
            </div>
        `;
    });
}

// Add a new product
async function addProduct() {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price, description })
    });
    const product = await response.json();
    console.log('Product added:', product);
    showNotification('Product added successfully!');  // Popup for adding product
    fetchProducts();
}

// Delete a product
async function deleteProduct(id) {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    showNotification('Product deleted successfully!');  // Popup for deleting product
    fetchProducts();
}

// Update a product
async function updateProduct(id) {
    const name = prompt('Enter new name:');
    const price = prompt('Enter new price:');
    const description = prompt('Enter new description:');

    await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price, description })
    });
    showNotification('Product updated successfully!');  // Popup for updating product
    fetchProducts();
}

// Show notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    notification.style.opacity = 1; // Show the notification
    setTimeout(() => {
        notification.style.opacity = 0; // Hide after 3 seconds
    }, 3000);
}

// Fetch products on page load
fetchProducts();
