const { createApp } = Vue

const main = createApp({
	template: /*html*/ `
		<div class="container">
			<h2 class="mb-3">Экскурсии- Цены и график</h2>

			<table class="table border mw-fit text-center">
				<thead>
					<th>Дни</th>
					<th>Название</th>
					<th>Паломническая</th>
					<th>Пешая</th>
					<th>При наборе</th>
					<th></th>
					<th></th>
				</thead>
				<tbody>
					<tr v-for="excursion in excursions" :key="excursion.id">
						<td>
							<div v-for="weekDay in weekDays" :key="weekDay">
								<span v-if="excursion.days[weekDay]">{{weekDay}}</span>
							</div>
						</td>
						<td>{{excursion.title}}</td>
						<td>{{excursion.pilgrimagePrice}}</td>
						<td>{{excursion.hikingPrice}}</td>
						<td>
							<input type="checkbox" class="form-check-input" v-model="excursion.onlyFull"/>
						</td>
						<td class="cursor-pointer" @click="deleteExcursion(excursion)">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-x-lg"
								viewBox="0 0 16 16"
							>
								<path
									d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
								/>
							</svg>
						</td>
						<td
							class="cursor-pointer"
							data-bs-toggle="modal"
							data-bs-target="#create-edit-modal"
							@click="selectExcursion = {...excursion}"
						>
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

			<!-- Modal -->
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
							<div class="mb-3">
								<label class="form-label">Название</label>
								<input v-if="selectExcursion" type="text" class="form-control" v-model="selectExcursion.title"/>
								<input v-else type="text" class="form-control" v-model="newExcursion.title"/>
							</div>
							<div class="d-flex justify-content-between">
								<div class="mb-3">
									<label class="form-label">Паломническая цена</label>
									<input v-if="selectExcursion" type="number" class="form-control" v-model="selectExcursion.pilgrimagePrice"/>
									<input v-else type="number" class="form-control" v-model="newExcursion.pilgrimagePrice"/>								</div>
								<div class="mb-3">
									<label class="form-label">Пешая цена</label>
									<input v-if="selectExcursion" type="number" class="form-control" v-model="selectExcursion.hikingPrice"/>
									<input v-else type="number" class="form-control" v-model="newExcursion.hikingPrice"/>								</div>
							</div>

							<label class="form-label">Выбор дней недели</label>

							<div class="d-flex justify-content-between mb-3">
								<div class="form-check" v-for="day in weekDays" :key="day">
									<input v-if="!selectExcursion" class="form-check-input" type="checkbox" v-model='newExcursion.days[day]'/>
									<input v-else class="form-check-input" type="checkbox" v-model='selectExcursion.days[day]'/>
									<label class="form-check-label">{{day}}</label>
								</div>
							</div>
							<button v-if="selectExcursion" class="btn btn-outline-primary d-block ms-auto" @click="editExcursion" data-bs-dismiss="modal"
								aria-label="Close">Редактировать</button>
							<button v-else class="btn btn-outline-primary d-block ms-auto" @click="addExcursion" data-bs-dismiss="modal"
								aria-label="Close">Добавить</button>
						</div>
					</div>
				</div>
			</div>
			<!-- Modal -->

			<button
				class="btn btn-primary mb-3"
				data-bs-toggle="modal"
				data-bs-target="#create-edit-modal"
				@click="selectExcursion = null"
			>
				Добавить экскурсию
			</button>

			<div class="form-check mb-3">
				<input class="form-check-input" type="checkbox" />
				<label class="form-check-label">
					При проживании пиковый тариф не применяем
				</label>
			</div>

			<div class="row align-items-center pb-1">
				<div class="col-auto">
					<p>Дети от</p>
				</div>
				<div class="col-1">
					<input class="form-control" type="text" />
				</div>
				<div class="col-auto">
					<p>до</p>
				</div>
				<div class="col-1">
					<input class="form-control" type="text" />
				</div>
				<div class="col-auto">
					<p>лет</p>
				</div>
				<div class="col-1">
					<input class="form-control" type="text" />
				</div>
				<div class="col-auto">
					<p>% скидки</p>
				</div>
			</div>

			<div class="row align-items-center pb-1">
				<div class="col-auto">
					<p>Дети до</p>
				</div>
				<div class="col-1">
					<input class="form-control" type="text" />
				</div>
				<div class="col-auto">
					<p>лет</p>
				</div>
				<div class="col-1">
					<input class="form-control" type="text" />
				</div>
				<div class="col-auto">
					<p>% скидки на</p>
				</div>
				<div class="col-auto">
					<div class="form-check">
						<input class="form-check-input" type="checkbox" />
						<label class="form-check-label"> паломничекие </label>
					</div>
				</div>
				<div class="col-auto">
					<div class="form-check">
						<input class="form-check-input" type="checkbox" />
						<label class="form-check-label"> пешие </label>
					</div>
				</div>
			</div>
		</div>
	`,
	data: () => ({
		excursions: [
			{
				id: 1,
				title: 'Никольский скит',
				pilgrimagePrice: 650,
				hikingPrice: 650,
				days: {
					Пн: true,
					Вт: false,
					Ср: true,
					Чт: false,
					Пт: false,
					Сб: false,
					Вс: false,
				},
				onlyFull: false,
			},
			{
				id: 2,
				title: 'Центральная усадьба',
				pilgrimagePrice: 850,
				hikingPrice: 850,
				days: {
					Пн: true,
					Вт: false,
					Ср: false,
					Чт: false,
					Пт: false,
					Сб: false,
					Вс: false,
				},
				onlyFull: false,
			},
			{
				id: 3,
				title: 'Скиты Всех Святых и Смоленский',
				pilgrimagePrice: 950,
				hikingPrice: 550,
				days: {
					Пн: false,
					Вт: true,
					Ср: false,
					Чт: false,
					Пт: false,
					Сб: false,
					Вс: false,
				},
				onlyFull: false,
			},
			{
				id: 4,
				title: 'Влад.скит + музей',
				pilgrimagePrice: 950,
				hikingPrice: 550,
				days: {
					Пн: false,
					Вт: false,
					Ср: true,
					Чт: false,
					Пт: false,
					Сб: false,
					Вс: false,
				},
				onlyFull: false,
			},
			{
				id: 5,
				title: 'Валаамское братство в годы военного лихолетия: Скалистый берег',
				pilgrimagePrice: 950,
				hikingPrice: 550,
				days: {
					Пн: false,
					Вт: false,
					Ср: false,
					Чт: true,
					Пт: false,
					Сб: false,
					Вс: false,
				},
				onlyFull: false,
			},
			{
				id: 6,
				title: 'Новый Иерусалим',
				pilgrimagePrice: 950,
				hikingPrice: 550,
				days: {
					Пн: false,
					Вт: false,
					Ср: false,
					Чт: false,
					Пт: true,
					Сб: false,
					Вс: false,
				},
				onlyFull: false,
			},
			{
				id: 7,
				title: 'Коневский озера',
				pilgrimagePrice: 950,
				hikingPrice: 550,
				days: {
					Пн: false,
					Вт: false,
					Ср: false,
					Чт: false,
					Пт: true,
					Сб: false,
					Вс: false,
				},
				onlyFull: false,
			},
			{
				id: 8,
				title: 'Скиты Валаама',
				pilgrimagePrice: 1500,
				hikingPrice: 1100,
				days: {
					Пн: false,
					Вт: false,
					Ср: false,
					Чт: false,
					Пт: true,
					Сб: false,
					Вс: false,
				},
				onlyFull: false,
			},
		],
		selectExcursion: null,
		newExcursion: {
			title: '',
			pilgrimagePrice: 0,
			hikingPrice: 0,
			days: {
				Пн: false,
				Вт: false,
				Ср: false,
				Чт: false,
				Пт: false,
				Сб: false,
				Вс: false,
			},
		},
		weekDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
	}),
	methods: {
		addExcursion() {
			this.excursions.push({ ...this.newExcursion, id: Date.now() })
			this.newExcursion = {
				title: '',
				pilgrimagePrice: 0,
				hikingPrice: 0,
				days: {
					Пн: false,
					Вт: false,
					Ср: false,
					Чт: false,
					Пт: false,
					Сб: false,
					Вс: false,
				},
			}
		},
		deleteExcursion(excursion) {
			this.excursions = this.excursions.filter(e => e.id !== excursion.id)
		},
		editExcursion() {
			this.excursions = this.excursions.map(excursion =>
				excursion.id === this.selectExcursion.id
					? { ...this.selectExcursion }
					: { ...excursion }
			)
		},
	},
})

main.mount('#index')
