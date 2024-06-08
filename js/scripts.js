/* SELECTORS */

const searchContainer = document.querySelector(".search-container");
const gallery = document.querySelector("#gallery");

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

async function getUsers() {
  const users = await fetchAPI("https://randomuser.me/api?results=12");
  if (users && users.results) {
    users.results.forEach((user) => displayInfo(user.name.first, user.name.last, user.email, user.location.city, user.location.country, user.picture.thumbnail));
  }
}

function displayInfo(firstName, lastName, email, city, country, picture) {
    const employeeCard = [];
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
        employeeCard.push(document.querySelector('.card'));
        employeeCard.forEach(item => {
            console.log(item) // Retains the same card each time...
        });
}

getUsers();

