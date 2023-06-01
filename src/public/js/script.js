
// Lấy danh sách sản phẩm từ API
function getProductList() {
    axios.get('/admin/editProducts')
        .then(response => {
            const products = response.data;
            console.log(products);
            const productList = document.getElementById('product-list');
            productList.innerHTML = '';
            products.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
              <td>${product.id}</td>
              <td>${product.name}</td>
              <td>${product.price}</td>
              <td>
              <a href="/admin/product/${product.id}"><input type="submit" value="Edit"></a>
                <input type="submit" value="Delete">
              </td>

            `;
                productList.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Tạo sản phẩm mới
const createForm = document.getElementById('create-form');
createForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    axios.post('/admin/editProducts', { name, price })
        .then(response => {
            console.log('Product created successfully');
            getProductList();
            createForm.reset();
        })
        .catch(error => {
            console.error('Error:', error);
        });
});



// Khi tải trang, lấy danh sách sản phẩm và hiển thị
getProductList();