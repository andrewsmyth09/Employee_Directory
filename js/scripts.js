/* SELECTORS */

const searchContainer = document.querySelector(".search-container");
const gallery = document.querySelector("#gallery");
let cardStack;

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

const collectCards = () => document.querySelectorAll(".card");

const setBirthday = date => {
  const birthday = new Date(date);
  return `${birthday.getMonth()}/${birthday.getDate()}/${birthday.getYear()}`;
}

/* END OF HELPER FUNCTIONS */

async function getUsers() {
  const users = await fetchAPI("https://randomuser.me/api?results=12");
  if (users && users.results) {
    users.results.forEach((user) => {
      displayInfo(
        user.name.first,
        user.name.last,
        user.email,
        user.location.city,
        user.location.country,
        user.picture.thumbnail
      );

      displayModal(
        user.picture.medium,
        user.name.first,
        user.name.last,
        user.email,
        user.location.city,
        user.cell,
        user.location.street.name,
        user.location.street.number,
        user.location.country,
        user.location.postcode,
        setBirthday(user.dob.date)
      );
    });
  }
}

function displayInfo(firstName, lastName, email, city, country, picture) {
  const cards = `
          <div class="card">
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
  gallery.insertAdjacentHTML("beforeend", cards);
  cardStack = collectCards();
}

function displayModal(
  image,
  firstName,
  lastName,
  email,
  city,
  cell,
  street,
  streetNumber,
  country,
  postcode,
  birthday
) {
  const modal = `
  <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${image}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${firstName} ${lastName}</h3>
                        <p class="modal-text">${email}</p>
                        <p class="modal-text cap">${city}</p>
                        <hr>
                        <p class="modal-text">${cell}</p>
                        <p class="modal-text">${streetNumber} ${street}, ${city}, ${country}, ${postcode}</p>
                        <p class="modal-text">Birthday: ${birthday}</p>
                    </div>
                </div>
  `;
  gallery.insertAdjacentHTML("beforeend", modal);
}

getUsers();
