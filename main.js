const apiUrl = "https://api.github.com/users/";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");
const githubLogo = document.querySelector(".github-logo");
const githubLight = document.querySelector(".light");
const githubDark = document.querySelector(".dark");
const githubTitle = document.querySelector(".search-title");
const darkLight = document.getElementById("dark-light");
const githubContainer = document.querySelector(".github-container");

async function getUser(username) {
  try {
    const { data } = await axios(apiUrl + username);
    hiddenGithub();
    createUserCard(data);
    getRepos(username);
  } catch (error) {
    console.log(error);
    createError("Üzgünüz böyle bir kullanıcı bulunamadı... ");
  }
}
const hiddenGithub = () => {
  githubContainer.classList.add("d-none");
};
const createError = (msg) => {
  const cardErrorHTML = `
  
  <div class="card">
    <p><i class="fa-solid fa-triangle-exclamation"></i></p>
    <h3 class="error">${msg} Lütfen kontrol edip tekrar aratınız</h3>
  </div>

  `;
  main.innerHTML = cardErrorHTML;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;

  if (user) {
    getUser(user);
    search.value = "";
  }
});

const createUserCard = (user) => {
  const userName = user.name || user.login;
  const userBio = user.bio ? `<p>${user.bio}</p>` : "";
  const userLocation = user.location
    ? `<i class="fa-solid fa-location-arrow"></i> ${user.location}`
    : "";
  const userSocial = user.twitter_username
    ? `<i class="fa-brands fa-x-twitter"></i> ${user.twitter_username}`
    : "";
  const carthtml = `<div class="card">
            <img class="user-img" src=${user.avatar_url} alt="profile-photo">
            <div class="user-info">
                <div class="user-name">
                    <h2>${userName}</h2>
                    <small>@${user.login}</small>
                    <p>${userLocation}</p>
                    <p>${userSocial}</p>
                </div>
            </div>
            <p class="bio">${userBio}</p>
            <ul>
                <li>
                <i class="fa-solid fa-user-group"> ${user.followers}</i>
                    <strong>Followers</strong>
                </li>
                <li>
                <i class="fa-solid fa-user-group"> ${user.following}</i> 
                     <strong> Following
                    </strong>
                </li>
                <li>
                    <i class="fa-solid fa-bookmark"> ${user.public_repos} </i> <strong>Repostory</strong>
                </li>
            </ul>
            <div class="repos" id="repos"></div>
        </div>`;
  main.innerHTML = carthtml;
};
async function getRepos(username) {
  try {
    const { data } = await axios(apiUrl + username + "/repos");

    createUserRepos(data);
  } catch (error) {
    createError("Üzgünüm repoları çekerken hata oluştu");
  }
}
const createUserRepos = (repos) => {
  const reposHtml = document.getElementById("repos");
  repos.slice(9, 12).forEach((repo) => {
    const reposLink = document.createElement("a");
    reposLink.href = repo.html_url;
    reposLink.target = "_blank";
    reposLink.innerHTML = `<i class="fa-solid fa-book-bookmark"></i> ${repo.name}`;
    reposHtml.appendChild(reposLink);
  });
};
darkLight.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  if (
    darkLight.classList.contains("fa-sun") &&
    githubLight.classList.contains("d-none")
  ) {
    darkLight.classList.add("fa-moon");
    darkLight.classList.remove("fa-sun");
    githubDark.classList.add("d-none");
    githubLight.classList.remove("d-none");
  } else {
    darkLight.classList.add("fa-sun");
    darkLight.classList.remove("fa-moon");
    githubLight.classList.add("d-none");
    githubDark.classList.remove("d-none");
  }
});
