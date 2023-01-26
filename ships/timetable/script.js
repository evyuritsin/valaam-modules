const { createApp } = Vue

const main = createApp({
	template: /*html*/ `
<div class="container">
			<h2>Теплоходы - Формирование расписания</h2>
			<table class="table mt-4">
				<thead>
					<th>id</th>
					<th>Причал от</th>
					<th>Причал к</th>
					<th>Диапазон дат</th>
					<th>Время</th>
					<th>Судно</th>
					<th>Вс.-птн.</th>
					<th>Сб</th>
				</thead>
				<tbody>
					<tr v-for="ship in ships" :key="ship.id">
						<td>{{ship.id}}</td>
						<td>
							<select class="form-select" v-model="ship.berthFrom">
								<option selected></option>
							</select>
						</td>
						<td>
							<select class="form-select" v-model="ship.berthTo">
								<option selected></option>
							</select>
						</td>
						<td class="d-flex align-items-center gap-2">
							<input type="date" class="form-control" v-model="ship.dates.from"/>
							<span>-</span>
							<input type="date" class="form-control" v-model="ship.dates.to"/>
						</td>
						<td>{{ship.time}}</td>
						<td>{{ship.type}}</td>
						<td>{{ship.snFr}}</td>
						<td>{{ship.st}}</td>
						<td class="cursor-pointer" data-bs-toggle="modal" data-bs-target="#create-edit-modal" @click="selectShip = {...ship}">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-pencil-square"
								viewBox="0 0 16 16"
							>
								<path
									d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
								/>
								<path
									fill-rule="evenodd"
									d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
								/>
							</svg>
						</td>
						<td class="cursor-pointer" @click="deleteShip(ship)">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-trash3"
								viewBox="0 0 16 16"
							>
								<path
									d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"
								/>
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

			<button class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#create-edit-modal" @click="selectShip = null">Добавить рейс</button>

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
							<div class="d-flex gap-2 mb-3">
								<div class="w-100">
									<label class="form-label">Время</label>
									<input v-if="selectShip" type="time" class="form-control w-100" v-model="selectShip.time"/>
									<input v-else type="time" class="form-control w-100" v-model="newShip.time"/>
								</div>
								<div class="w-100">
									<label class="form-label">Тип судна</label>
									<select className="form-select w-100" v-if="selectShip" v-model="selectShip.type">
										<option>ОМ</option>
										<option>ОМ +</option>
										<option>Метеор</option>
									</select>
										<select className="form-select w-100" v-else v-model="newShip.type">
										<option>ОМ</option>
										<option>ОМ +</option>
										<option>Метеор</option>
									</select>
								</div>
							</div>
							<div class="d-flex gap-2 mb-3">
								<div class="w-100">
									<label class="form-label">Вс.-птн.</label>
									<input v-if="selectShip" type="number" class="form-control" v-model="selectShip.snFr"/>
									<input v-else type="number" class="form-control" v-model="newShip.snFr"/>								
								</div>
								<div class="w-100">
									<label class="form-label">Сб.</label>
									<input v-if="selectShip" type="number" class="form-control" v-model="selectShip.st"/>
									<input v-else type="number" class="form-control" v-model="newShip.st"/>								
								</div>
							</div>

							<button v-if="selectShip" class="btn btn-outline-primary d-block ms-auto" @click="editShip" data-bs-dismiss="modal"
								aria-label="Close">Редактировать</button>
							<button v-else class="btn btn-outline-primary d-block ms-auto" @click="addShip" data-bs-dismiss="modal"
								aria-label="Close">Добавить</button>
						</div>
					</div>
				</div>
			</div>

			<!--Modal-->
		</div>	
	`,
	data: () => ({
		ships: [
			{
				id: 1,
				berthFrom: '',
				berthTo: '',
				dates: { from: '', to: '' },
				time: '11:00',
				type: 'ОМ +',
				snFr: '1950',
				st: '2150',
			},
			{
				id: 2,
				berthFrom: '',
				berthTo: '',
				dates: { from: '', to: '' },
				time: '8:00',
				type: 'Метеор',
				snFr: '1600',
				st: '1800',
			},
			{
				id: 3,
				berthFrom: '',
				berthTo: '',
				dates: { from: '', to: '' },
				time: '9:00',
				type: 'ОМ',
				snFr: '1400',
				st: '1550',
			},
			{
				id: 4,
				berthFrom: '',
				berthTo: '',
				dates: { from: '', to: '' },
				time: '11:00',
				type: 'Метеор',
				snFr: '1400',
				st: '1550',
			},
			{
				id: 5,
				berthFrom: '',
				berthTo: '',
				dates: { from: '', to: '' },
				time: '10:00',
				type: 'Метеор',
				snFr: '1150',
				st: '1250',
			},
		],
		selectShip: null,
		newShip: {
			berthFrom: '',
			berthTo: '',
			dates: { from: '', to: '' },
			time: '',
			type: '',
			snFr: '',
			st: '',
		},
	}),
	methods: {
		addShip() {
			this.ships.push({ ...this.newShip, id: Date.now() })
			this.newShip = {
				berthFrom: '',
				berthTo: '',
				dates: { from: '', to: '' },
				time: '',
				type: '',
				snFr: '',
				st: '',
			}
		},
		deleteShip(ship) {
			this.ships = this.ships.filter(s => s.id !== ship.id)
		},
		editShip() {
			this.ships = this.ships.map(ship =>
				ship.id === this.selectShip.id ? { ...this.selectShip } : { ...ship }
			)
		},
	},
})

main.mount('#index')
