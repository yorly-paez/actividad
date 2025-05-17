function getUsers(page) {
    if (!tokenValidate()) return;

    document.getElementById('cardHeader').innerHTML = '<h4>Listado de usuarios</h4>';
    document.getElementById('info').innerHTML = '<p>Cargando usuarios...</p>';

    fetch("https://reqres.in/api/users?page=" + page, {
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
            if (response.status === 200) {
                let listUsers = `
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Avatar</th>
                        <th scope="col">Acción</th>
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
                        <td><button type="button" class="btn btn-outline-primary btn-sm" onclick="getUser('${user.id}')">Ver más</button></td>
                    </tr>`;
                });

                listUsers += `</tbody></table>
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#usersPage1" oneclick="getUsers('1')">1</a></li>
                        <li class="page-item"><a class="page-link" href="#usersPage2" oneclick="getUsers('2')">2</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                `;
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

function getUser(idUser) {
    fetch("https://reqres.in/api/users/" + idUser, {
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
            if (response.status === 200) {
                const user = response.body.data
                showModalUser(user)
            } else {
                document.getElementById('info').innerHTML =
                    '<h3> No se encontro el usuario en la app </h3>'
            }
        })
}

function showModalUser(user) {
    const modalUser =
        `
        <div class="modal fade" id="showModalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Ver Usuario</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <img src="${user.avatar}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Correo: ${user.email}</p>
            <p class="card-text">Correo: ${user.first_name}</p>
            <p class="card-text">Correo: ${user.last_name}</p>
        </div>
</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `
    document.getElementById('modalUser').innerHTML = modalUser
    const modal = new bootstrap.Modal(document.getElementById('showModalUser'))
    modal.show()
}