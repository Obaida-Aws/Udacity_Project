document.addEventListener('DOMContentLoaded', () => {
    fetchAboutMe();
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

    })
    .catch(error =>{
        console.error('Error loading projects data:',error);
    });
}

function populateProjects(projects){
    const projectList =document.getElementById('projectList');
    if(!projectList) return;

    projects.array.forEach(project => {
        const projectCard =document.createElement('div');
        projectCard.className='projectCard';
        projectCard.id=project.project_id;


        const cardImage =project.card_image;
        projectCard.style.backgroundImage = `url(${cardImage})`;
        projectCard.style.backgroundSize='cover';
        projectCard.style.backgroundPosition ='center';

        const name =document.createElement('h3');
        name.textContent=project.project_name;

        
    });
}
