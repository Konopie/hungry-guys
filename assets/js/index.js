const getPosts = () => {
    fetch('/api/posts', ()=>{

    })
}

const getUserPosts = () => {
    fetch('/api/user/id')
}


const getAndRenderPosts = () => getPosts().then(renderPosts)

getAndRenderPosts();