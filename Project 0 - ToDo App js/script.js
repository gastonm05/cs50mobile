const classNames = {
	TODO_ITEM: 'todo-container',
	TODO_CHECKBOX: 'todo-checkbox',
	TODO_TEXT: 'todo-text',
	TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

// Generar nuevos items
function newTodo() {
	const text = prompt('Enter the name of the new TO-DO item')
	if (!text) return

	// Declarar los elementos
	const checkbox = document.createElement('input')
	const span = document.createElement('span')
	const li = document.createElement('li')
	const remove = document.createElement('button')
	const id = 'id' + counter

	// Definir propiedades de los elementos
	li.id = 'item' + id
	checkbox.id = 'check' + id
	span.id = 'span' + id
	remove.innerHTML = 'remove'
	checkbox.type = 'checkbox'
	checkbox.classList.add('todo-checkbox')

	// Crear un even listener para cambios en los checkboxes
	checkbox.addEventListener('change', function() {
		changeUnchekedCountSpan(this, document.getElementById('span' + id))
	})
	// Crear un even listener para clicks en los botones de remove
	remove.addEventListener('click', () => {
		itemCount(-1)
		if (!document.getElementById('check' + id).checked) uncheckedCount(-1)
		list.removeChild(document.getElementById('item' + id))
	})

	// Agregar los elementos al documento
	span.appendChild(document.createTextNode(text))
	li.appendChild(checkbox)
	li.appendChild(span)
	list.appendChild(li)
	li.appendChild(remove)

	// Incrementar los contadores
	itemCount(+1)
	uncheckedCount(+1)
	count()
}

// Actualizar el contador de items
function itemCount(changer) {
	itemCountSpan.innerHTML = Number(itemCountSpan.innerHTML) + changer
}

// Actualizar el contador de unchecked items
function uncheckedCount(changer) {
	uncheckedCountSpan.innerHTML = Number(uncheckedCountSpan.innerHTML) + changer
}

// cambiar la fuente a negrita e incrementar e decrecer el contador
function changeUnchekedCountSpan(state, text) {
	if (state.checked === true) {
		text.style.fontWeight = 'bold'
		uncheckedCount(-1)
	} else {
		text.style.fontWeight = null
		uncheckedCount(+1)
	}
}

// iniciar el contador para los ids
var counter = 0;

// funcion para incrementar el contador
function count() {
	counter += 1;
}