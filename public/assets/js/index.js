let postTitle;
let postText;
let postList;

if (window.location.pathname === '/posts') {
  postTitle = document.querySelector('.post-title');
  postText = document.querySelector('.post-textarea');
  postList = document.querySelectorAll('.post-container');
}


const getPosts = () => 
        fetch('/api/post', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

const getUserPosts = (id) => {
    fetch(`/api/user/${id}`), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
    }
}

const getUsername = (id) => {
    fetch(`/api/user/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(userData => {
      console.log()
        return userData.username;
    }
    )
}

// Render the list of post titles
const renderPostList = async (posts) => {
    let jsonPosts = await posts.json();
    if (window.location.pathname === '/post') {
      postList.forEach((el) => (el.innerHTML = ''));
    }
  
    let postListItems = [];
  
    // Returns HTML element 
    const createLi = (user_id, post_text, post_url) => {
      const liEl = document.createElement('li');
      liEl.classList.add('card');
  
      const spanEl = document.createElement('span');
      spanEl.classList.add('card-title');
      spanEl.innerText = post_text;
      liEl.append(spanEl);

      const brEl = document.createElement('br');
      liEl.append(brEl);

      const linkEl = document.createElement('a');
      linkEl.href = post_url;
      linkEl.innerText = post_url;
      liEl.append(linkEl);

      const userEl = document.createElement('p');
      userEl.innerText = getUsername(user_id);
      liEl.append(userEl);

      return liEl;
    };
  
    jsonPosts.forEach((post) => {
      const li = createLi(post.user_id, post.post_text, post.post_url);
  
      postListItems.push(li);
    });
  
    if (window.location.pathname === '/posts') {
      postListItems.forEach((post) => postList[0].append(post));
      postListItems.forEach((post) => console.log(post));
    }
  };
  


const getAndRenderPosts = () => getPosts().then(renderPostList);

getAndRenderPosts();