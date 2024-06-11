/* SELECTORS */

const searchContainer = document.querySelector(".search-container");
const gallery = document.querySelector("#gallery");
let usersData = [];

/* HELPER FUNCTIONS */

async function fetchAPI(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

const setBirthday = date => {
  const birthday = new Date(date);
  return `${birthday.getMonth() + 1}/${birthday.getDate()}/${birthday.getFullYear()}`;
}

/* END OF HELPER FUNCTIONS */

async function getUsers() {
  const users = await fetchAPI("https://randomuser.me/api?results=12");
  if (users && users.results) {
    usersData = users.results; // Store the users data for later use
    users.results.forEach((user, index) => {
      displayInfo(
        user.name.first,
        user.name.last,
        user.email,
        user.location.city,
        user.location.country,
        user.picture.thumbnail,
        index // Pass the index to displayInfo
      );
    });
  }
}

function displayInfo(firstName, lastName, email, city, country, picture, index) {
  const card = `
    <div class="card" data-index="${index}">
      <div class="card-img-container">
        <img class="card-img" src="${picture}" alt="profile picture">
      </div>
      <div class="card-info-container">
        <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
        <p class="card-text">${email}</p>
        <p class="card-text cap">${city}, ${country}</p>
      </div>
    </div>
  `;
  gallery.insertAdjacentHTML("beforeend", card);

  // Add click event listener to each card
  document.querySelector(`.card[data-index="${index}"]`).addEventListener('click', () => {
    displayModal(index);
  });
}

function displayModal(index) {
  const user = usersData[index]; // Retrieve the user data using the index
  const modalHTML = `
    <div class="modal-container">
      <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
          <img class="modal-img" src="${user.picture.medium}" alt="profile picture">
          <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
          <p class="modal-text">${user.email}</p>
          <p class="modal-text cap">${user.location.city}</p>
          <hr>
          <p class="modal-text">${user.cell}</p>
          <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.country}, ${user.location.postcode}</p>
          <p class="modal-text">Birthday: ${setBirthday(user.dob.date)}</p>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);
  document.getElementById('modal-close-btn').addEventListener('click', closeModal);
}

function closeModal() {
  const modalContainer = document.querySelector('.modal-container');
  modalContainer.remove();
}

getUsers();
