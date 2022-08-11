
let postLink
let postText
let postUser

console.log('working')
postLink = document.getElementById('post-link').value;
postText = document.getElementById('post-text').value;
postUser = document.getElementById('user-id').value; 

const savePost = (post) => {
    console.log('save post')
fetch('/post', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
})};

document.getElementById('post-submit').addEventListener('click',
()=>{
    console.log('event listener')
    savePost({postUser, postText, postLink});

}
)