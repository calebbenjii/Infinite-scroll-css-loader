const loading = document.querySelector('.loader');
const filter = document.querySelector('#filter');
const postsContainer = document.querySelector('#posts-container');

let limit = 3;
let page = 1;

// fetch post from API
async function getPosts() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

  const data = await res.json();

  return data;
}

// show post in DOM
async function showPosts() {
  const posts =  await getPosts();

  posts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
      </div>
    `;

    postsContainer.appendChild(postEl);
  });
}

// Filter posts by input

const filterPosts = (e) => {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach((post) => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();

    if(title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex'
    } else {
      post.style.display = 'none';
    }
  })
}

// show loader & fetch more posts
const showLoading = () => {
  loading.classList.add('show');

  setTimeout(()=> {
    loading.classList.remove('show');


    setTimeout(()=> {
      page+1;
      showPosts();
    }, 300)
  }, 1000)
}

// Show initial posts
showPosts();


window.addEventListener('scroll', ()=> {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if(scrollTop + clientHeight >= scrollHeight - 3) {
    showLoading();
  }
});

filter.addEventListener('input', filterPosts);

