
// let formLink
// let formText
// let formUser

// formLink = document.getElementById('form-link').value;
// formText = document.getElementById('form-text').value;
// formUser = document.getElementById('form-id').value; 

const savePost = (post_text, post_url, user_id) => {
fetch('/api/post/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
      },
      body: (post_text, post_url, user_id),
})};

// document.getElementById('form-submit').addEventListener('click',
// ()=>{
//     console.log(formUser, formText, formLink)
//     savePost(formUser, formText, formLink);

// }
// )