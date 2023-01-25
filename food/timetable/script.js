const { createApp } = Vue

const main = createApp({
	template: /*html*/ `
<div class="container">
	<h2>Пользователи</h2>
	<button class="btn d-block ms-auto mb-3" :class='[editMode ? "btn-danger" : "btn-outline-primary"]' @click="onClickToEdit">{{editMode ? 'Отменить' : 'Редактировать'}}</button>
	<table class="table table-bordered text-center">
		<thead>
			<tr>
				<th></th>
				<th>Стандартное</th>
				<th></th>
				<th>Постное</th>
				<th></th>
				<th>Детское</th>
			</tr>
			<tr>
				<th></th>
				<th>Вс-птн.</th>
				<th>Сб</th>
				<th>Вс-птн.</th>
				<th>Сб</th>
				<th>Все дни</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th scope="row">Завтрак</th>
				<td>
					<span v-if="!editMode">{{food.breakfast.standard.snFr}}</span>
					<input v-else type="number" class="form-control" v-model="copyFood.breakfast.standard.snFr"/>
				</td>
				<td>
					<span v-if="!editMode">{{food.breakfast.standard.st}}</span>
					<input v-else type="number" class="form-control" v-model="copyFood.breakfast.standard.st"/>				
				</td>
				<td>
					<span v-if="!editMode">{{food.breakfast.lean.snFr}}</span>
					<input v-else type="number" class="form-control" v-model="copyFood.breakfast.lean.snFr"/>				
				</td>
				<td>
					<span v-if="!editMode">{{food.breakfast.lean.st}}</span>
					<input v-else type="number" class="form-control" v-model="copyFood.breakfast.lean.st"/>				
				</td>
				<td>
					<span v-if="!editMode">{{food.breakfast.children}}</span>
					<input v-else type="number" class="form-control" v-model="copyFood.breakfast.children"/>				
				</td>
			</tr>
			<tr>
				<th scope="row">Обед</th>
				<td>
					<span v-if="!editMode">{{food.lunch.standard.snFr}}</span>
					<input v-else type="number" class="form-control" v-model="copyFood.lunch.standard.snFr"/>
				</td>
				<td>
					<span v-if="!editMode">{{food.lunch.standard.st}}</span>
					<input v-else type="number" class="form-control" v-model="copyFood.lunch.standard.st"/>				
				</td>
				<td>
					<span v-if="!editMode">{{food.lunch.lean.snFr}}</span>
					<input v-else type="number" class="form-control" v-model="copyFood.lunch.lean.snFr"/>				
				</td>
				<td>
					<span v-if="!editMode">{{food.lunch.lean.st}}</span>
					<input v-else type="number" class="form-control" v-model="copyFood.lunch.lean.st"/>				
				</td>
				<td>
					<span v-if="!editMode">{{food.lunch.children}}</span>
					<input v-else type="number" class="form-control" v-model="copyFood.lunch.children"/>				
				</td>
			</tr>
			<tr>
				<th scope="row">Ужин</th>
				<td>
					<span v-if="!editMode">{{food.dinner.standard.snFr}}</span>
					<input v-else type="number" class="form-control" v-model="copyFood.dinner.standard.snFr"/>
				</td>
				<td>
					<span v-if="!editMode">{{food.dinner.standard.st}}</span>
					<input v-else type="number" class="form-control" v-model="copyFood.dinner.standard.st"/>				
				</td>
				<td>
					<span v-if="!editMode">{{food.dinner.lean.snFr}}</span>
					<input v-else type="number" class="form-control" v-model="copyFood.dinner.lean.snFr"/>				
				</td>
				<td>
					<span v-if="!editMode">{{food.dinner.lean.st}}</span>
					<input v-else type="number" class="form-control" v-model="copyFood.dinner.lean.st"/>				
				</td>
				<td>
					<span v-if="!editMode">{{food.dinner.children}}</span>
					<input v-else type="number" class="form-control" v-model="copyFood.dinner.children"/>				
				</td>
			</tr>
		</tbody>
	</table>

	<button class="btn btn-lg btn-primary d-block ms-auto" @click="onClickToSave">Сохранить</button>
</div>	
	`,

	data: () => ({
		food: {
			breakfast: {
				standard: {
					snFr: 370,
					st: 420,
				},
				lean: {
					snFr: 290,
					st: 320,
				},
				children: 240,
			},
			lunch: {
				standard: {
					snFr: 580,
					st: 630,
				},
				lean: {
					snFr: 450,
					st: 510,
				},
				children: 440,
			},
			dinner: {
				standard: {
					snFr: 470,
					st: 530,
				},
				lean: {
					snFr: 390,
					st: 430,
				},
				children: 370,
			},
		},
		editMode: false,
		copyFood: {},
	}),
	mounted() {
		this.copyFood = JSON.parse(JSON.stringify(this.food))
	},
	methods: {
		onClickToEdit() {
			this.editMode = !this.editMode
		},
		onClickToSave() {
			this.food = JSON.parse(JSON.stringify(this.copyFood))
			this.editMode = false
		},
	},
})

main.mount('#index')
