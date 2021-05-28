
// const url = 'http://localhost:3000/notes/'

// jeanettes todo example:
// const form = document.querySelector('#todo-form')
// const todoList = document.querySelector('#todo-list')

// function listTodos() {
//     // get request from todos
//     fetch(url)
//     .then((response) => response.json())
//     .then((data) => console.log(data))
// }

// listTodos();

const url =  'http://localhost:3000/notes'
const form = document.querySelector('#noteapp')
const noteList = document.querySelector('#note-list')

// function
// fetch(url)
// .then((response) => response.json())
// .then((data) => {
//     console.log(data[0])
//     const notes = document.createElement('h1')
//     root.appendChild(notes)
//     notes.innerText = `${data.notes.title} " " ${data.notes.body}`
// })

form.addEventListener('submit', event => {
    event.preventDefault()
    const noteText = document.getElementById('note-text').value
    console.log(noteText, "here is my note")
    createNote(noteText)
})

noteList.addEventListener('click', event => {
    if (event.target.classList.contains('delete')) {
        deleteNote(event.target)
    }
})

function listNotes() {
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        for (let note of data) {
            console.log(note)
            renderNoteItem(note)
        }
    })
}

function createNote(noteText) {
    fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: noteText,
            body: noteText,
            create_at: moment().format() 
        })
    })
    .then(response => response.json())
    .then(data => renderNoteItem(data))
}

function deleteNote(element) {
    const noteId = element.parentElement.id
    fetch(url + "/" + `${noteId}`, {
        method: 'DELETE'
    }).then(() => element.parentElement.remove())
}

function updateNote(element) {
    const noteId = element.parentElement.id
    fetch(url + "/" + `${noteId}`, {
        // figure out what i need to do to edit notes
    })
}

function renderNoteItem(noteObj) {
    const itemEl = document.createElement('li')
    itemEl.id = noteObj.id
    itemEl.classList.add(
        'lh-copy',
        'pv3',
        'ba',
        'bl-0',
        'bt-0',
        'br-0',
        'b--dotted',
        'b--black-3') 

        renderNoteText(itemEl, noteObj)
        console.log(itemEl)
        noteList.appendChild(itemEl)
}

function renderNoteText(noteListItem, noteObj) {
    noteListItem.innerHTML = `<span class="dib w-60">${noteObj.body}</sp><i class="ml2 dark-red fas fa-times delete"></i><i class="ml3 fas fa-edit edit"></i>`
}


listNotes();