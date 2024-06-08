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
    users.results.forEach((user) => {
      console.log(`${user.name.first} ${user.name.last} ${user.email} ${user.location.city} ${user.location.country} ${user.picture.thumbnail}`);
    });
  }
}

getUsers();
