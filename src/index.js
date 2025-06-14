
const form = document.getElementById('guest-form');
const guestInput = document.getElementById('guest-name');
const guestList = document.getElementById('guest-list');

let guests = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = guestInput.value.trim();
  if (!name) return;

  if (guests.length >= 10) {
    alert('Guest limit reached (10 guests max).');
    return;
  }

  const guest = {
    id: Date.now(),
    name,
    attending: false,
    timestamp: new Date().toLocaleTimeString()
  };

  guests.push(guest);
  guestInput.value = '';
  renderGuests();
});

function renderGuests() {
  guestList.innerHTML = '';

  guests.forEach((guest) => {
    const li = document.createElement('li');
    li.className = guest.attending ? 'attending' : '';

    const infoDiv = document.createElement('div');
    infoDiv.className = 'guest-info';
    infoDiv.innerHTML = `<strong>${guest.name}</strong><br><small>Added at: ${guest.timestamp}</small>`;

    const buttonDiv = document.createElement('div');
    buttonDiv.className = 'buttons';

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = () => {
      guests = guests.filter(g => g.id !== guest.id);
      renderGuests();
    };

    const toggleRSVPBtn = document.createElement('button');
    toggleRSVPBtn.textContent = guest.attending ? 'Un-RSVP' : 'RSVP';
    toggleRSVPBtn.onclick = () => {
      guest.attending = !guest.attending;
      renderGuests();
    };

    buttonDiv.append(toggleRSVPBtn, removeBtn);
    li.append(infoDiv, buttonDiv);
    guestList.appendChild(li);
  });
}