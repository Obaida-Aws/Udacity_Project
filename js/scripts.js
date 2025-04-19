document.addEventListener('DOMContentLoaded', () => {
    fetchAboutMe();
    fetchProjects();

    // Set up form validation
    setupFormValidation();
    

});

function fetchAboutMe() {
    
    console.log('Starting to fetch About Me data...');
    fetch('./data/aboutMeData.json')  
        .then(response => {
            console.log('Response received:', response);  
            if (!response.ok) throw new Error('Failed to fetch About Me data');
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data);  
            populateAboutMe(data);
        })
        .catch(error => {
            console.error('Error loading About Me data:', error);  
        });
}

function populateAboutMe(data) {
    
    const mainHeader = document.querySelector('header h1');
    if (mainHeader && data.name) {
        mainHeader.textContent = data.name;
    }

    const aboutMeContainer = document.getElementById('aboutMe');
    if (!aboutMeContainer) {
        console.error('Element #aboutMe not found in the DOM');
        return;
    }

    
    const bioPara = document.createElement('p');
    bioPara.textContent = data.aboutMe || "No bio available";

    
    const headshotDiv = document.createDocumentFragment();
    const imgContainer = document.createElement('div');
    imgContainer.className = 'headshotContainer';

    const headshotImg = document.createElement('img');
    headshotImg.src = data.headshot || './images/default.jpg';
    headshotImg.alt = "Headshot";

    imgContainer.appendChild(headshotImg);
    headshotDiv.appendChild(imgContainer);

    
    aboutMeContainer.appendChild(bioPara);
    aboutMeContainer.appendChild(headshotDiv);
}

// Fetch projects data 
function fetchProjects(){
    console.log('Starting to fetch projects data...');
    fetch('./data/projectsData.json')
    .then(response =>{
        console.log('Response received:',response);
        if(!response.ok) throw new Error('Failed to fetch projects data');
        return response.json();
    })
    .then(data =>{
        console.log('Projects data received:',data);
        populateProjects(data);
        setupProjectScroll();

    })
    .catch(error =>{
        console.error('Error loading projects data:',error);
    });
}

function populateProjects(projects){
    const projectList =document.getElementById('projectList');
    if(!projectList) return;

    // If no projects are available
    if(projects.length ===0){
        const message=document.createElement('p');
        message.textContent="No projects available at the moment";
        message.style.textAlign="center";
        message.style.padding="1rem";
        message.style.color="#666";
        projectList.appendChild(message);
        return;
    }

    projects.forEach(project => {
        const projectCard =document.createElement('div');
        projectCard.className='projectCard';
        projectCard.id=project.project_id;


        const cardImage =project.card_image;
        projectCard.style.backgroundImage = `url(${cardImage})`;
        projectCard.style.backgroundSize='cover';
        projectCard.style.backgroundPosition ='center';

        const name =document.createElement('h3');
        name.textContent=project.project_name;

        const desc =document.createElement('p');
        desc.textContent=project.short_description || "No description available.";

        projectCard.appendChild(name);
        projectCard.appendChild(desc);

        projectCard.addEventListener('click',()=>{
            populateSpotlight(project);
        });
        projectList.appendChild(projectCard);
    });
    
    // Automatically display the first project in the spotlight
    if(projects.length > 0){
        populateSpotlight(projects[0]);
    }
}

function populateSpotlight(project) {
    const spotlight = document.getElementById('projectSpotlight');
    const spotlightTitles = document.getElementById('spotlightTitles');

    if (!spotlight || !spotlightTitles) return;

    const spotlightImage = project.spotlight_image || './images/default_spotlight.webp';
    spotlight.style.backgroundImage = `url(${spotlightImage})`;
    spotlight.style.backgroundSize = 'cover';
    spotlight.style.backgroundPosition = 'center';

    spotlightTitles.innerHTML = '';

    const name = document.createElement('h2');
    name.textContent = project.project_name;

    const desc = document.createElement('p');
    desc.textContent = project.long_description || "No detailed description available.";

    const link = document.createElement('a');
    link.href = project.url || '#';
    link.target = "_blank";
    link.textContent = "View Project";

    spotlightTitles.appendChild(name);
    spotlightTitles.appendChild(desc);
    spotlightTitles.appendChild(link);
}

// Set up horizontal/vertical scroll
function setupProjectScroll(){

    const projectList=document.getElementById('projectList');
    const leftArrow=document.querySelector('.arrow-left');
    const rightArrow=document.querySelector('.arrow-right');

    if(!projectList || !leftArrow || !rightArrow){
        console.warn("One or more scroll elements are missing.");
        return;
    }
    leftArrow.addEventListener('click',()=>{
        // mobile
        if(window.innerWidth < 768){
            projectList.scrollBy({left: -300,behavior: "smooth"});
        }else{
            //Desktop
            projectList.scrollBy({top: -300, behavior:"smooth"});
        }
    });

    rightArrow.addEventListener('click',()=>{
        if(window.innerWidth < 768){
            projectList.scrollBy({left : 300, behavior:"smooth"});
        }else{
            projectList.scrollBy({top: 300,behavior :"smooth"});
        }
    });
}


//  Contact Form
// Regular expressions for validation

const emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const invalidCharacterRegex=/[^a-zA-Z0-9@._-]/;

function validateEmail(email){
    return emailRegex.test(email);
}

function validateMessage(message){
    return !invalidCharacterRegex.test(message);
}

function updateCharactersLeft(messageInput) {
    const charactersLeft = document.getElementById('charactersLeft');
    const messageError = document.getElementById('messageError');
    const currentLength = messageInput.value.length;
    
    // Update the characters left counter
    charactersLeft.textContent = `Characters: ${currentLength}/300`;

    // Check if the message exceeds the max length
    if (currentLength > 300) {
        messageError.textContent = "Message too long";
        messageError.style.color = "red";
    } else {
        messageError.textContent = "";
    }
}


// Form validation 
function validateContactForm(){
    const emailInput=document.getElementById('contactEmail');
    const messageInput=document.getElementById('contactMessage');
    const emailError=document.getElementById('emailError');
    const messageError=document.getElementById('messageError');
    let vaild=true;

    // Validate email
    if(!validateEmail(emailInput.value)){
        emailError.textContent="Please enter a valid email address";
        vaild=false;
    }else{
        emailError.textContent="";
    }

    // Validate message
    if(messageInput.value.trim()===""){
        messageError.textContent="Message cannot be empty ";
        vaild=false;
    }else if(!validateMessage(messageInput.value)){
        messageError.textContent="Message contains invalid characters";
        vaild=false;
    }else{
        messageError.textContent="";
    }
    return vaild;
}

function setupFormValidation(){
    const form=document.getElementById('formSection');
    const messageInput=document.getElementById('contactMessage');
    const submitButton=document.getElementById('formsubmit');

    form.addEventListener('submit',(event)=>{
        event.preventDefault(); // Prevent the form from submitting

        if(validateContactForm()){
            console.log('Form is valid. Submitting...');
        }else{
            console.log('Form is invalid. Please correct the errors');
        }
    });

    messageInput.addEventListener('input',()=>{
        updateCharactersLeft(messageInput);
    });


}
