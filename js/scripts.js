document.addEventListener('DOMContentLoaded', () => {
    fetchAboutMe();
    fetchProjects();
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

    })
    .catch(error =>{
        console.error('Error loading projects data:',error);
    });
}

function populateProjects(projects){
    const projectList =document.getElementById('projectList');
    if(!projectList) return;

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
