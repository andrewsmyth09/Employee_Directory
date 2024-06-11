/* SELECTORS */

const searchContainer = document.querySelector(".search-container");
const gallery = document.querySelector("#gallery");
let usersData = [];

/* HELPER FUNCTIONS */

/**
 * Fetches data from an API.
 * @param {string} url Retrieves the url of a fetch API call.
 * @returns {Promise<any>} Resolves and parses the API reponse or rejects it with an error message.
 *  
 **/

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

/**
 * Sets the date format as month/day/year.
 * @param {Date} date Retrieves the date object from API.
 * @returns {string} Returns the formatted date.
 *  
 **/

const setBirthday = date => {
  const birthday = new Date(date);
  return `${birthday.getMonth() + 1}/${birthday.getDate()}/${birthday.getFullYear()}`;
}

/* END OF HELPER FUNCTIONS */

/**
 * Retrieves user API data.
 * Sends the data and an index number the displayInfo function.
 *
 * @async
 */

async function getUsers() {
  const users = await fetchAPI("https://randomuser.me/api?results=12");
  if (users && users.results) {
    usersData = users.results; 
    users.results.forEach((user, index) => displayInfo(user,index));
    };
  };

/**
 * Creates and displays a user card from the user data.
 * 
 * @param {Object} user Contains the user information to display.
 * @param {number} index The index number of the user in the data set.
 */
function displayInfo(user, index) {
  const card = `
    <div class="card" data-index="${index}">
      <div class="card-img-container">
        <img class="card-img" src="${user.picture.thumbnail}" alt="profile picture">
      </div>
      <div class="card-info-container">
        <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
        <p class="card-text">${user.email}</p>
        <p class="card-text cap">${user.location.city}, ${user.location.country}</p>
      </div>
    </div>
  `;
  gallery.insertAdjacentHTML("beforeend", card);

  document.querySelector(`.card[data-index="${index}"]`).addEventListener('click', () => {
    displayModal(index);
  });
};

/**
 * Displays a modal with more detailed user information.
 * Uses the index number to identify the correct user data to display.
 * 
 * @param {number} index The user index number from the `usersData` array.
 */

function displayModal(index) {
  const user = usersData[index];
  const modal = `
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
  document.body.insertAdjacentHTML("beforeend", modal);
  document.getElementById('modal-close-btn').addEventListener('click', closeModal);
};

/**
 * Removes the modal.
 */

function closeModal() {
  const modalContainer = document.querySelector('.modal-container');
  modalContainer.remove();
};

getUsers();