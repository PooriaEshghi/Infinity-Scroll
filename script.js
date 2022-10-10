const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totaleImages = 0;
let photosArray = [];

const count = 30;
const apiKey ='81F8C9Nl06aJr_qUimz8n6nj6h6s6yjazdgHjnHk-LY';
const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
// Check if all images were loaded
const imageLoaded = function(){
    imagesLoaded++;
    if(imagesLoaded === totaleImages){
        ready = true;
        loader.hidden = true;
    }
}
// Helper function Create atribute
const setAttributes = function(element,attributs){
    for (const key in attributs){
        element.setAttribute(key,attributs[key])
    }
}

// Create Element For Link & Photos, Add to DOM
const displayPhotos = function(){
    imagesLoaded = 0;

    totaleImages = photosArray.length;
    
    // Run function for each object in photosArray
    photosArray.forEach(photo => {
     //Create <a> to link to Unsplash </a>
     const item = document.createElement('a');
     setAttributes(item,{
        href:photo.links.html,
        target:'_blank'
    });
     // Create <img> for photo
     const img = document.createElement('img');
     setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description
    });
    // Event Listener, check when each is finished loading
    img.addEventListener('load',imageLoaded);
     // Put <img>inside <a>,then put both inside imageContainer Element
     item.appendChild(img);
     imageContainer.appendChild(item);
    })
}
// Get photos unsplash API
async function getPhotos(){
    try {
        const request = await fetch(apiUrl);
        photosArray = await request.json();
        displayPhotos();        
    } catch (error) {
        console.error(error)
    }
};
window.addEventListener('scroll',() => {
   if(window.innerHeight + window.scrollY >= document.body.offsetHeight -1000 && ready){
    ready = false;
    getPhotos();
   }
})
// On Load
getPhotos();