function tokenValidate() {
    const TOKEN = localStorage.getItem('token');
    if(TOKEN !== 'QpwL5tke4Pnpja7X4') {
        location.href = '../index.html';
        return false;
    }
    console.log('Autenticado ', TOKEN);
    return true;
}

function getUsers() {
    if (!tokenValidate()) return;
    
    document.getElementById('cardHeader').innerHTML = '<h4>Listado de usuarios</h4>';
    document.getElementById('info').innerHTML = '<p>Cargando usuarios...</p>';
    
    fetch("https://reqres.in/api/users?page=1", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            'x-api-key': 'reqres-free-v1',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then((result) => {
        return result.json().then(
            data => {
                return {
                    status: result.status,
                    body: data
                }
            }
        )
    })
    .then((response) => {
        if(response.status === 200) {
            let listUsers = `
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Avatar</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            response.body.data.forEach(user => {
                listUsers += `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.first_name}</td>
                        <td>${user.last_name}</td>
                        <td><img src="${user.avatar}" class="img-thumbnail" alt="Avatar del usuario" width="50"></td>
                    </tr>`;
            });
            
            listUsers += `</tbody></table>`;
            document.getElementById('info').innerHTML = listUsers;
        }
        else {
            document.getElementById('info').innerHTML = '<h3>No se encontraron usuarios</h3>';
        }
    })
    .catch(error => {
        document.getElementById('info').innerHTML = `<h3>Error al cargar usuarios: ${error.message}</h3>`;
    });
}

function getProducts() {
    if (!tokenValidate()) return;
    
    document.getElementById('cardHeader').innerHTML = '<h4>Listado de productos</h4>';
    document.getElementById('info').innerHTML = '<p>Cargando productos...</p>';
    
    fetch("https://reqres.in/api/unknown", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            'x-api-key': 'reqres-free-v1',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then((result) => {
        return result.json().then(
            data => {
                return {
                    status: result.status,
                    body: data
                }
            }
        )
    })
    .then((response) => {
        if(response.status === 200) {
            let listProducts = `
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Año</th>
                            <th scope="col">Color</th>
                            <th scope="col">Muestra</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            response.body.data.forEach(product => {
                listProducts += `
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.year}</td>
                        <td>${product.color}</td>
                        <td style="background-color: ${product.color}; width: 50px; height: 20px;"></td>
                    </tr>
                `;
            });
            
            listProducts += `
                    </tbody>
                </table>
                <p class="mt-3">Total de productos: ${response.body.data.length}</p>
            `;
            
            document.getElementById('info').innerHTML = listProducts;
        }
        else {
            document.getElementById('info').innerHTML = '<h3>No se encontraron productos</h3>';
        }
    })
    .catch(error => {
        document.getElementById('info').innerHTML = `<h3>Error al cargar productos: ${error.message}</h3>`;
    });
}

function logout() {
    localStorage.removeItem('token');
    location.href = '../index.html';
}