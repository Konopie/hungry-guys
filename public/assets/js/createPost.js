
let formLink
let formText
let formUser

formLink = document.getElementById('form-link').value;
formText = document.getElementById('form-text').value;
formUser = document.getElementById('form-id').value; 

const savePost = (form) => {
fetch('/api/post', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
})};

document.getElementById('form-submit').addEventListener('click',
()=>{
    savePost(formUser, formText, formLink);

}
)