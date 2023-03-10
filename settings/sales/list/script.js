const { createApp } = Vue

const main = createApp({
	template: /*html*/ `
	<div class="container">
			<h2>Настройки - Скидочная политика</h2>
			<table class="table w-75 mt-4">
				<thead>
					<th>Наименование категории</th>
					<th>Возраст от</th>
					<th>Возраст до</th>
					<th>&nbsp</th>
					<th>&nbsp</th>
				</thead>
				<tbody>
					<tr v-for="sale in salesCategories" :key="sale.id">
						<td>{{sale.title}}</td>
						<td>{{sale.ageFrom}}</td>
						<td>{{sale.ageTo}}</td>
						<td
							class="cursor-pointer"
							data-bs-toggle="modal"
							data-bs-target="#create-sales"
							@click="selectCategory = {...sale}"
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
						<td class="cursor-pointer" @click="deleteCategory(sale.id)">
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

			<button
				class="btn btn-primary btn-lg"
				data-bs-toggle="modal"
				data-bs-target="#create-sales"
				@click="selectCategory = null"
			>
				+ Добавить категорию
			</button>

			<!-- Modal -->
			<div
				class="modal fade"
				id="create-sales"
				tabindex="-1"
				aria-labelledby="create-sales"
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
								<label class="form-label">Наименование категории</label>
								<input type="text" class="form-control" v-if="selectCategory" v-model="selectCategory.title"/>
								<input type="text" class="form-control" v-else v-model="newCategory.title"/>
							</div>
							<div class="d-flex justify-content-between">
								<div class="mb-3">
									<label class="form-label">Возраст от</label>
									<input type="number" class="form-control" v-if="selectCategory" v-model="selectCategory.ageFrom"/>
									<input type="number" class="form-control" v-else v-model="newCategory.ageFrom"/>
								</div>
								<div class="mb-3">
									<label class="form-label">Возраст до</label>
									<input type="number" class="form-control" v-if="selectCategory" v-model="selectCategory.ageTo"/>
									<input type="number" class="form-control" v-else v-model="newCategory.ageTo"/>
								</div>
							</div>
							<button v-if="selectCategory" class="btn btn-outline-primary d-block ms-auto" @click="editCategory" data-bs-dismiss="modal"
								aria-label="Close">Редактировать</button>
							<button v-else class="btn btn-outline-primary d-block ms-auto" @click="addCategory" data-bs-dismiss="modal"
								aria-label="Close">Добавить</button>
						</div>
					</div>
				</div>
			</div>
			<!-- Modal -->

			<table class="table table-bordered text-center mt-4">
				<thead>
					<th>Категория</th>
					<th>Тип тура</th>
					<th>id тура</th>
					<th>Дата от</th>
					<th>до</th>
					<th>Скидка %</th>
					<th>Активна</th>
					<th>С ночи</th>
				</thead>
				<tbody>
					<tr>
						<td>&nbsp</td>
						<td>1 дн / мн.дн.</td>
						<td>&nbsp</td>
						<td>&nbsp</td>
						<td>&nbsp</td>
						<td>&nbsp</td>
						<td>да / нет</td>
						<td>&nbsp</td>
					</tr>
					<tr>
						<td>&nbsp</td>
						<td>&nbsp</td>
						<td>&nbsp</td>
						<td>&nbsp</td>
						<td>&nbsp</td>
						<td>&nbsp</td>
						<td>&nbsp</td>
						<td>&nbsp</td>
					</tr>
				</tbody>
			</table>
			
		</div>
	`,
	data: () => ({
		salesCategories: [
			{ id: 1, title: 'Инвалиды', ageFrom: '', ageTo: '' },
			{ id: 2, title: 'Пенсионеры', ageFrom: '', ageTo: '' },
			{ id: 3, title: 'Студенты', ageFrom: '', ageTo: '' },
			{ id: 4, title: 'Аспиранты', ageFrom: '', ageTo: '' },
			{ id: 5, title: 'Школьники от 12 лет (вкл.)', ageFrom: '', ageTo: 12 },
			{
				id: 6,
				title: 'дети до 6 лет (вкл.) в сопровождении одного взрослого',
				ageFrom: '',
				ageTo: 6,
			},
			{ id: 7, title: 'дети от 7 до 12 лет (вкл.)', ageFrom: 7, ageTo: 12 },
		],
		selectCategory: null,
		newCategory: {
			title: '',
			ageFrom: '',
			ageTo: '',
		},
	}),
	methods: {
		deleteCategory(id) {
			this.salesCategories = this.salesCategories.filter(s => s.id !== id)
		},
		addCategory() {
			this.salesCategories.push({ ...this.newCategory, id: Date.now() })
		},
		editCategory() {
			this.salesCategories = this.salesCategories.map(sale =>
				sale.id === this.selectCategory.id
					? { ...this.selectCategory }
					: { ...sale }
			)
		},
	},
})

main.mount('#index')
