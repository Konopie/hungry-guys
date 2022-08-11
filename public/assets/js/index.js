// const {Post} = require('../../../models/index.js')

const searchBar = document.getElementById('search-bar')
const welcome = document.getElementById('welcome');
const wrapper = document.getElementById('wrapper');

let postTitle;
let postText;
let postList;
let postListItems = [];
let postList1 = document.querySelectorAll('.post-container');

  postTitle = document.querySelector('.post-title');
  postText = document.querySelector('.post-textarea');
  postList = postList1[0]
  document.getElementById("search-bar").value = "";

//  get all posts
const getPosts = () => 
        fetch('/api/post', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });


    // get user id from username
const getUserId = (user) => {
    return fetch(`/api/user/username/${user}`)
    .then(res => {
      return res.json()})
    .then(data => {
      return data.id
    })
    }

    // get posts from user id
const getUserPosts = (id) => {
   return fetch(`/api/post/userID/${id}`)
   .then(res => {
    return res.json()})
  .then(data => {
    console.log(data)
    return data
  })
  }

  // get a username from id
const getUsername = (id) => {
    return fetch(`/api/user/${id}`)
      .then( res => res.json())
      .then( data => {
        return data.username;
      })
}


// Render the list of post titles
const renderPostList = async (posts) => {
  let jsonPosts = posts
  console.log(jsonPosts)
    // let jsonPosts = await posts.json();
    if (window.location.pathname === '/post') {
      postList.forEach((el) => (el.innerHTML = ''));
    }


   let postListItems = []

    // Returns HTML element 
    const createLi = async (user_id, post_text, post_url) => {
      console.log(user_id, post_text, post_url)
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
      userEl.innerText = await getUsername(user_id);
      liEl.append(userEl);


      return new Promise((resolve, reject)=>{
        resolve(liEl);
      });
    };
  
  
    for (let i = 0; i < jsonPosts.length; i++) {
      const li = await createLi(jsonPosts[i].user_id, jsonPosts[i].post_text, jsonPosts[i].post_url);
      console.log(postList)
      console.log(li)
      postListItems.push(li);   
    };

      postListItems.forEach((post) =>{
       console.log(post),
       postList.append(post)});
      postListItems.forEach((post) => console.log(post));
   
   };
  

// get all posts and push to page
const getAndRenderPosts = () => getPosts()
  .then((res)=>{
  return res.json()})
  .then( data => { 
    console.log(data)
  renderPostList(data)});

  document.getElementById('posts').addEventListener('click',
  ()=>{
    getAndRenderPosts();
  })

// when you click the search button empty post list and load the searched users posts
document.getElementById('search-btn').addEventListener('click', 
() => {
  console.log(postList)
  while (postList.firstChild){
    postList.removeChild(postList.firstChild)
    wrapper.removeChild(welcome)
  }
  getUserId(searchBar.value)
  .then((id)=>{
    return getUserPosts(id)
  })
  .then((posts)=>{
    renderPostList(posts)
  })
});
