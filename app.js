"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

window.addEventListener("load", initApp); // When the page is loaded, run initApp function

// Function to initialize the Web App
async function initApp() {
  console.log("initApp: app.js is running 🎉"); // Log to the console that the app is running
  const posts = await getPosts(); //Call the getPosts function
  posts.sort((a, b) => new Date(a.Date).getTime() - new Date(b.date).getTime());
  console.log(posts); //Log the posts to the console
  displayPostsGrid(posts); //Call the displayPosts function with the posts
}

async function getPosts() {
  const response = await fetch(
    "https://examprep.draftsbybea.dk/wp-json/wp/v2/projects?acf_format=standard"
  );
  const data = await response.json();
  return data;
}

function displayPostsGrid(posts) {
  const postsGrid = document.querySelector("#posts-grid");

  for (const post of posts) {
    postsGrid.insertAdjacentHTML(
      "beforeend",
      `
      <article class="grid-item">
        <img src="${post.acf.image}" alt="${post.title.rendered}" />
        <h2>${post.title.rendered}</h2>
        <p> ${post.acf.type}</p>
        <br>
        <p><strong>Project description:</strong> ${post.acf.description}</p>
        <p><strong>Client:</strong> ${post.acf.client}</p>
        <a href="${post.acf.link}" target="_blank">View Project</a>
      </article>
      `
    );
  }
}
