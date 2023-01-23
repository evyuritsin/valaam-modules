const addTripButton = document.querySelector('.add-trip-btn')
const tripsContainer = document.querySelector('.trips-container')
const newTripModal = `
<div class="border p-3 mb-3">
	<div class="row align-items-center mb-2">
		<div class="col-2">
			<input type="text" class="form-control first-date-input" />
		</div>
		<span class="d-block mw-fit p-0">-</span>
		<div class="col-2">
			<input type="text" class="form-control second-date-input" />
		</div>
	  <div class="col-auto">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
  			<path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
			</svg>
		</div>
		<div class="col-2">
			<input type="text" class="form-control first-time-input" />
		</div>
		<span class="col-auto mw-fit p-0">-</span>
		<div class="col-2">
			<input type="text" class="form-control second-time-input" />
		</div>
		<div class="col-auto">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				class="bi bi-clock"
				viewBox="0 0 16 16"
			>
				<path
					d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"
				/>
				<path
					d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"
				/>
			</svg>
		</div>
		<div class="col-auto ms-auto">
			<select class="form-select">
				<option>причал отправления</option>
			</select>
		</div>
	</div>
	<div class="row mb-2">
		<div class="col-auto">
			<label class="form-check-label me-1" for="race1">
				25.05 11:00 Сортавала - Валаам Метеор
			</label>
			<input
				class="form-check-input"
				type="checkbox"
				value=""
				id="race1"
			/>
		</div>
	</div>
	<div class="row">
	<div class="col-auto">
			<label class="form-check-label me-1" for="race2">
				25.05 15:00 Сортавала - Валаам ОМ-1
			</label>
			<input
				class="form-check-input"
				type="checkbox"
				value=""
				id="race2"
			/>
		</div>
	</div>
</div>
`
let newTripModalIsOpened = false
const newTripContainer = document.querySelector('.new-trip-container')

let deleteTripButtons
let editTripButtons

let trips = [
	{
		id: 1,
		date: {
			first: '25.05',
			second: '25.05',
		},
		time: {
			first: '11:00',
			second: '15:00',
		},
	},
	{
		id: 2,
		date: {
			first: '25.05',
			second: '25.05',
		},
		time: {
			first: '11:00',
			second: '15:00',
		},
	},
	{
		id: 3,
		date: {
			first: '25.05',
			second: '25.05',
		},
		time: {
			first: '11:00',
			second: '15:00',
		},
	},
]

function addTrip() {
	if (!newTripModalIsOpened) {
		newTripContainer.innerHTML = newTripModal
		newTripModalIsOpened = true
	} else {
		const firstDateInput = document.querySelector('.first-date-input')
		const secondDateInput = document.querySelector('.second-date-input')
		const firstTimeInput = document.querySelector('.first-time-input')
		const secondTimeInput = document.querySelector('.second-time-input')

		const newTrip = {
			id: Date.now(),
			date: {
				first: firstDateInput.value,
				second: secondDateInput.value,
			},
			time: {
				first: firstTimeInput.value,
				second: secondTimeInput.value,
			},
		}
		trips.push(newTrip)
	}
	showTrips()
}

function deleteTrip(tripId) {
	trips = trips.filter((trip, i) => trip.id != tripId)
	showTrips()
}

function editTrip(tripId) {
	newTripContainer.innerHTML = showEditContainer(tripId)
	newTripModalIsOpened = true
	showTrips()
}

function traceButtons() {
	deleteTripButtons = document.querySelectorAll('.delete-trip-btn')
	editTripButtons = document.querySelectorAll('.edit-trip-btn')

	deleteTripButtons.forEach(btn =>
		btn.addEventListener('click', () => deleteTrip(btn.dataset.id))
	)

	editTripButtons.forEach(btn =>
		btn.addEventListener('click', e => {
			e.stopPropagation()
			editTrip(btn.dataset.id)
		})
	)
}

function showTrips() {
	tripsContainer.innerHTML = trips
		.map(
			trip =>
				`
		<tr>
						<td>${trip.date.first} ${trip.time.first} Сортавала -  Валаам - Метеор</td>
						<td>${trip.date.second} ${trip.time.second} Валаам - Сортавала - ОМ-1</td>
						<td class="cursor-pointer delete-trip-btn mw-fit" data-id=${trip.id}>
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
						<td class="cursor-pointer edit-trip-btn mw-fit" data-id=${trip.id}>
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
		`
		)
		.join('')
	traceButtons()
}

function showEditContainer(tripId) {
	const trip = trips.find(t => t.id == tripId)
	return `
		<div class="border p-3 mb-3">
			<div class="row align-items-center mb-2">
				<div class="col-2">
					<input type="text" class="form-control first-date-input" value=${trip.date.first}/>
				</div>
				<span class="d-block mw-fit p-0">-</span>
				<div class="col-2">
					<input type="text" class="form-control second-date-input" value=${trip.date.second}/>
				</div>
				<div class="col-auto">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
						<path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
					</svg>
				</div>
				<div class="col-2">
					<input type="text" class="form-control first-time-input" value=${trip.time.first}/>
				</div>
				<span class="col-auto mw-fit p-0">-</span>
				<div class="col-2">
					<input type="text" class="form-control second-time-input" value=${trip.time.second}/>
				</div>
				<div class="col-auto">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="bi bi-clock"
						viewBox="0 0 16 16"
					>
						<path
							d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"
						/>
						<path
							d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"
						/>
					</svg>
				</div>
				<div class="col-auto ms-auto">
					<select class="form-select">
						<option>причал отправления</option>
					</select>
				</div>
			</div>
			<div class="row mb-2">
				<div class="col-auto">
					<label class="form-check-label me-1" for="race1">
						25.05 11:00 Сортавала - Валаам Метеор
					</label>
					<input
						class="form-check-input"
						type="checkbox"
						value=""
						id="race1"
					/>
				</div>
			</div>
			<div class="row">
			<div class="col-auto">
					<label class="form-check-label me-1" for="race2">
						25.05 15:00 Сортавала - Валаам ОМ-1
					</label>
					<input
						class="form-check-input"
						type="checkbox"
						value=""
						id="race2"
					/>
				</div>
			</div>
		</div>
`
}

addTripButton.addEventListener('click', e => {
	e.stopPropagation()
	addTrip()
})

window.addEventListener('load', () => {
	showTrips()
})

window.addEventListener('click', () => {
	newTripModalIsOpened = false
	newTripContainer.innerHTML = ''
})

window.addEventListener('keydown', () => {
	console.log(111)
	showTrips()
})

newTripContainer.addEventListener('click', e => e.stopPropagation())
