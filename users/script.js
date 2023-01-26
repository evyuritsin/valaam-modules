const { createApp } = Vue

const main = createApp({
	template: /*html*/ `
<div class="container">
	<h2>Пользователи</h2>
	<table className="table text-center">
		<thead>
			<th>Имя</th>
			<th>Роль</th>
			<th>Тел.</th>
			<th>Email</th>
			<th>Тип</th>
			<th></th>
			<th></th>
		</thead>
		<tbody>
			<tr v-for="user in users" :key="user.id">
				<td>{{user.name}}</td>
				<td>{{user.role}}</td>
				<td>{{user.phone}}</td>
				<td>{{user.email}}</td>
				<td>{{user.type}}</td>
				<td class="cursor-pointer" data-bs-toggle="modal" data-bs-target="#create-edit-modal" @click="selectUser = {...user}">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  					<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  					<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
					</svg>
				</td>
				<td class="cursor-pointer" @click="deleteUser(user.id)">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  					<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  					<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
					</svg>
				</td>
			</tr>
		</tbody>
	</table>

				<nav aria-label="Page navigation example">
				<ul class="pagination">
					<li class="page-item">
						<a class="page-link" href="#" aria-label="Previous">
							<span aria-hidden="true">&laquo;</span>
						</a>
					</li>
					<li class="page-item"><a class="page-link" href="#">1</a></li>
					<li class="page-item"><a class="page-link" href="#">2</a></li>
					<li class="page-item"><a class="page-link" href="#">3</a></li>
					<li class="page-item"><button class="page-link">...</button></li>
					<li class="page-item"><a class="page-link" href="#">25</a></li>
					<li class="page-item">
						<a class="page-link" href="#" aria-label="Next">
							<span aria-hidden="true">&raquo;</span>
						</a>
					</li>
				</ul>
			</nav>

	<button class="btn btn-lg btn-primary" data-bs-toggle="modal" data-bs-target="#create-edit-modal" @click="selectUser = null">+ Добавить пользователя</button>

	<!--Modal-->
	<div
				class="modal fade"
				id="create-edit-modal"
				tabindex="-1"
				aria-labelledby="create-edit-modal"
				aria-hidden="true"
			>
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button
								type="button"
								class="btn-close btn-sm"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div class="modal-body">
							<div className="mb-2">
								<label className="form-label">Имя</label>
								<input type="text" className="form-control" v-if="selectUser" v-model="selectUser.name"/>
								<input type="text" className="form-control" v-else v-model="newUser.name"/>
							</div>
							<div className="mb-2">
								<label className="form-label">Роль</label>
								<select class="form-select" v-if="selectUser" v-model="selectUser.role">
									<option v-for="role in roles" :key="role.id">{{role.name}}</option>
								</select>
								<select class="form-select" v-else v-model="newUser.role">
									<option v-for="role in roles" :key="role.id">{{role.name}}</option>
								</select>
							</div>
							<div className="mb-2">
								<label className="form-label">Телефон</label>
								<input type="tel" className="form-control" v-if="selectUser" v-model="selectUser.phone"/>
								<input type="tel" className="form-control" v-else v-model="newUser.phone"/>
							</div>
							<div className="mb-2">
								<label className="form-label">E-mail</label>
								<input type="email" className="form-control" v-if="selectUser" v-model="selectUser.email"/>
								<input type="email" className="form-control" v-else v-model="newUser.email"/>							
							</div>
							<div className="mb-3">
								<label className="form-label">Тип</label>
								<select class="form-select" v-if="selectUser" v-model="selectUser.type">
									<option v-for="type in types" :key="type.id">{{type.name}}</option>
								</select>
								<select class="form-select" v-else v-model="newUser.type">
									<option v-for="type in types" :key="type.id">{{type.name}}</option>
								</select>
							</div>

							<button v-if="selectUser" class="btn btn-outline-primary d-block ms-auto" @click="editUser" data-bs-dismiss="modal"
								aria-label="Close">Редактировать</button>
							<button v-else class="btn btn-outline-primary d-block ms-auto" @click="addUser" data-bs-dismiss="modal"
								aria-label="Close">Добавить</button>
						</div>
					</div>
				</div>
			</div>
	<!--Modal--> 
</div>	
	`,
	data: () => ({
		users: [
			{
				id: 1,
				name: 'Иван',
				role: 'Администратор',
				phone: '+79615673471',
				email: 'ivanort@mail.ru',
				type: 'Админ',
			},
			{
				id: 2,
				name: 'Анна',
				role: 'Администратор',
				phone: '+3245345345',
				email: 'anya@mail.ru',
				type: 'Админ',
			},
			{
				id: 3,
				name: 'Тигран',
				role: 'Пользователь',
				phone: '+123231231231',
				email: 'tikon@mail.ru',
				type: 'Гость',
			},
		],
		types: [
			{ id: 1, name: 'Админ' },
			{ id: 2, name: 'Агент' },
			{ id: 3, name: 'Менеджер' },
			{ id: 4, name: 'Гость' },
		],
		roles: [
			{ id: 1, name: 'Администратор' },
			{ id: 2, name: 'Пользователь' },
		],
		selectUser: null,
		newUser: {
			name: '',
			role: '',
			phone: '',
			email: '',
			type: '',
		},
	}),
	methods: {
		addUser() {
			this.users.push({ ...this.newUser, id: Date.now() })
			this.newUser = {
				name: '',
				role: '',
				phone: '',
				email: '',
				type: '',
			}
		},
		deleteUser(id) {
			this.users = this.users.filter(users => users.id !== id)
		},
		editUser() {
			this.users = this.users.map(user =>
				user.id === this.selectUser.id ? { ...this.selectUser } : { ...user }
			)
		},
	},
})

main.mount('#index')
