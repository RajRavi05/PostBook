class UI{
    constructor(){
        this.posts = document.querySelector('#feeds');
        this.title = document.querySelector('#title');
        this.body = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.name = document.querySelector('#user-name');
        this.postSubmit = document.querySelector('#post-submit');
        this.searchInput = document.querySelector('#search-item');
        this.searchContent = document.querySelector('.searchItems');
        this.searchHead = document.querySelector('.tertiary-text');
        this.formState = 'add';
    }


    showPosts(posts){
        let output = '';
        posts.forEach((post)=>{
            output += `
            
            <div class="card-post" id="card-post">
            <div class="card-body-post">
                <div class="post-title">
                    <h4 class="title-text" id="post-title">${post.title}</h4>
                </div>
                <div class="post-user-name">
                    <p class="user-text" id="name-user"><span class="name">${post.name}</span> says...</p>
                </div>
                <div class="post-content" id="post-body">
                    <p class="post-cont" id="post-cont">${post.body}</p>
                </div>
                <div class="options" id="option">
                    <a href="#" class="edit-btn edit" id="edit" data-id="${post.id}">
                        <i class="fas fa-edit"></i>
                    <a>
                    
                    <a href="#" class="delete" id="delete" data-id="${post.id}">
                        <i class="fas fa-trash-alt"></i>
                    </a>    
                </div>
             </div>   
        </div>
            
        `;
        });

        this.posts.innerHTML = output;

    }

    clearField(){
        this.title.value = '';
        this.name.value = '';
        this.body.value = '';
    }

    // filling the form with data
    fillForm(data){
        this.idInput.value = data.id;
        this.name.value = data.name;
        this.title.value = data.title;    
        this.body.value = data.body;
        
        console.log(data);
        this.changeFormState('edit');
    }

    // clear id input 
    clearIdInput(){
        this.idInput.value = '';
    }

    // change form state
    changeFormState(type){
        if(type === 'edit'){
            this.postSubmit.textContent = 'Update Post';

             // create a cancel button
             const button = document.createElement('button');
             // add class
             button.className = 'post-cancel btn-2';
             // add text
             button.appendChild(document.createTextNode('Cancel edit'));
 
             // get parent
             const cardForm = document.querySelector('.card-body-main');
             // get element to insert before
             const formEnd = document.querySelector('.form-end');
 
             // insert into dom
             cardForm.insertAdjacentElement("beforeend", button);

            //  cardForm.insert(button,formEnd);
        }else{
            this.postSubmit.textContent = 'Post it!';
            this.postSubmit.className = 'post-submit btn-1';

            // remove cancel btn if it is there
            if(document.querySelector('.post-cancel')){
                document.querySelector('.post-cancel').remove();
            }

            // clear id from the hidden
            this.clearIdInput();

            // clear input field
            this.clearField();
            
        }

    }


    showSearchPost(posts){

        this.searchHead.style.display = 'flex';

        let output = '';
        posts.forEach((post)=>{
            output += `
            <div class="card-post" id="card-post">
            <div class="card-body-post">
            <a href="#" class="clear-search" id="clear-search"> &times; <a>
                <div class="post-title">
                    <h4 class="title-text" id="post-title">${post.title}</h4>
                </div>
                <div class="post-user-name">
                    <p class="user-text" id="name-user"><span class="name">${post.name}</span> says...</p>
                </div>
                <div class="post-content" id="post-body">
                    <p class="post-cont" id="post-cont">${post.body}</p>
                </div>
                <!--- <div class="options" id="option">
                    <a href="#" class="edit-btn edit" id="edit" data-id="${post.id}">
                        <i class="fas fa-edit"></i>
                    <a>
                    
                    <a href="#" class="delete" id="delete" data-id="${post.id}">
                        <i class="fas fa-trash-alt"></i>
                    </a>    
                </div>--->
             </div>   
        </div>
            
        `;
        });

        this.searchContent.innerHTML = output;

        console.log(posts);
    }


    clearSearchContent(){
        this.searchHead.style.display = 'none';
        this.searchContent.innerHTML = '';
        this.searchInput.value = '';
        console.log('testing');
    }
}

export const ui = new UI;