import { http } from './http';
import { ui } from './ui';


// get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// get input from user 
document.querySelector('#post-submit').addEventListener('click', submitPost);

// delete post
document.querySelector('#feeds').addEventListener('click', deletePost);

// enable edit 
document.querySelector('#feeds').addEventListener('click',enableEdit);

// cancel edit
document.querySelector('.card-body-main').addEventListener('click',cancelEdit);

// search function
document.querySelector('#search-item').addEventListener('keyup', searchPost);

// clear search item
document.querySelector('#searchContent').addEventListener('click', clearSearchItem);

// hide search heading
document.querySelector('.tertiary-text').style.display = 'none';




/************* Get posts *************/ 
function getPosts(){
    http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err))
}


/************* Submit post *************/ 
function submitPost(e){

    const title = document.querySelector('#title').value;
    const name = document.querySelector('#user-name').value;
    const body = document.querySelector('#body').value;
    const id = document.querySelector('#id').value;

    const data ={
        title,
        name,
        body
    }

    if(title === '' || name === '' || body === ''){
        confirm('Please fill all the Fields')
    }else{

        if(id === ''){
            http.post('http://localhost:3000/posts',data)
            .then(data =>{
                ui.clearField();
                getPosts()
            })
            .catch(err => console.log(err))
        }else{
            http.put(`http://localhost:3000/posts/${id}`,data)
            .then(data =>{
                ui.changeFormState();
                ui.fillForm(data);
                getPosts();
            })
            .catch(err => console.log(err))
        }

    }

    alert('Posted!');

    e.preventDefault();
}



/*************  Delete Post  *************/ 
function deletePost(e){
    if(e.target.parentElement.classList.contains('delete')){
        const id = e.target.parentElement.dataset.id;

        if(confirm('Are you sure?')){
            http.delete(`http://localhost:3000/posts/${id}`)
            .then(data=>{
                getPosts();
                alert('Post will be deleted');
            })
            .catch(err => console.log(err))
        }
    }

    e.preventDefault();
}



/************* Enable edit *************/ 
function enableEdit(e){
    if(e.target.parentElement.classList.contains('edit')){
        const id = e.target.parentElement.dataset.id;
        const name = e.target.parentElement.textContent;
        const title = e.target.parentElement.textContent;
        const body = e.target.parentElement.textContent;

        const data = {
            id,
            title,
            name,
            body
        }

        ui.fillForm(data);
    }
    e.preventDefault();
}

/************* Cancel edit *************/ 
function cancelEdit(e){
    if(e.target.classList.contains('post-cancel')){
        ui.changeFormState('add');
    }

    e.preventDefault();
}


/************* search posts *************/
function searchPost(e){
    const userText = e.target.value;

    if(id !== ''){
        http.get(`http://localhost:3000/posts?title=${userText}`)
        .then(data =>{
            ui.showSearchPost(data);
            
        })
        .catch(err => console.log(err))
    }    
} 


/************* clear search posts *************/

function clearSearchItem(e){

    if(e.target.classList.contains('clear-search')){
        ui.clearSearchContent();
    }
    e.preventDefault()
}
























// const getData = async (url)=>{
//     const response  = await fetch(url);
//     const resData = await response.json();

//     console.log(resData);
// }
// getData('https://api.github.com/users');
