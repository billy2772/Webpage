const STORAGE_KEY = 'events';

const eventForm = document.getElementById('event-form');
const eventIdInput = document.getElementById('event-id');
const callTimeInput = document.getElementById('call-time');
const personNameInput = document.getElementById('person-name');
const addPersonBtn = document.getElementById('add-person-btn');
const currentPersonList = document.getElementById('current-person-list');
const savedEventsBody = document.getElementById('saved-events-body');
const formMessage = document.getElementById('form-message');

let currentPersons = [];

function loadEvents() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveEvents(events) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

function renderCurrentPersonList() {
  currentPersonList.innerHTML = '';

  if (currentPersons.length === 0) {
    const empty = document.createElement('li');
    empty.textContent = 'No persons added yet.';
    empty.className = 'empty-state';
    currentPersonList.appendChild(empty);
    return;
  }

  currentPersons.forEach((person, index) => {
    const li = document.createElement('li');
    li.className = 'person-list-item';

    const nameSpan = document.createElement('span');
    nameSpan.textContent = person;

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';
    removeBtn.addEventListener('click', () => {
      currentPersons.splice(index, 1);
      renderCurrentPersonList();
    });

    li.append(nameSpan, removeBtn);
    currentPersonList.appendChild(li);
  });
}

function renderSavedEvents() {
  const events = loadEvents();
  savedEventsBody.innerHTML = '';

  if (events.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = '<td colspan="4" class="empty-state">No events saved yet.</td>';
    savedEventsBody.appendChild(row);
    return;
  }

  events.forEach((event, index) => {
    const row = document.createElement('tr');

    const idCell = document.createElement('td');
    idCell.textContent = event.id;

    const callTimeCell = document.createElement('td');
    callTimeCell.textContent = event.callTime;

    const personsCell = document.createElement('td');
    personsCell.textContent = Array.isArray(event.persons) ? event.persons.join(', ') : '';

    const actionsCell = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'delete-event-btn';
    deleteBtn.textContent = 'Delete Event';
    deleteBtn.addEventListener('click', () => {
      const updatedEvents = loadEvents();
      updatedEvents.splice(index, 1);
      saveEvents(updatedEvents);
      renderSavedEvents();
    });

    actionsCell.appendChild(deleteBtn);
    row.append(idCell, callTimeCell, personsCell, actionsCell);
    savedEventsBody.appendChild(row);
  });
}

function showMessage(message, isError = true) {
  formMessage.textContent = message;
  formMessage.style.color = isError ? '#b91c1c' : '#15803d';
}

addPersonBtn.addEventListener('click', () => {
  const name = personNameInput.value.trim();

  if (!name) {
    showMessage('Please enter a person name before adding.');
    return;
  }

  const normalized = name.toLowerCase();
  const duplicateExists = currentPersons.some((person) => person.toLowerCase() === normalized);

  if (duplicateExists) {
    showMessage('Duplicate names are not allowed for the same event.');
    return;
  }

  currentPersons.push(name);
  personNameInput.value = '';
  showMessage('Person added.', false);
  renderCurrentPersonList();
});

eventForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const id = eventIdInput.value.trim();
  const callTime = callTimeInput.value;

  if (!id || !callTime) {
    showMessage('Event ID and Call Time are required.');
    return;
  }

  if (currentPersons.length === 0) {
    showMessage('Add at least one person before saving the event.');
    return;
  }

  const events = loadEvents();
  events.push({
    id,
    callTime,
    persons: [...currentPersons],
  });

  saveEvents(events);
  showMessage('Event saved successfully.', false);

  eventForm.reset();
  currentPersons = [];
  renderCurrentPersonList();
  renderSavedEvents();
});

renderCurrentPersonList();
renderSavedEvents();
