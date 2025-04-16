
export async function fetchAboutMe(){
    try {
        const response =await fetch('../starter/data/aboutMeData.json');
        if(!response.ok) throw new Error('Failed to fetch aboutMe data');

        const data =await response.json();

        populateAboutMe(data);
        
    } catch (error) {
        console.error('Error loading About Me data:',error);
    }

}

function populateAboutMe(data){

    const aboutMeContainer =document.getElementById('aboutMe');

    const bioPara =document.createElement('p');
    bioPara.textContent=data.bio || "No bio available";

    const headshotDiv = document.createDocumentFragment();
    const imgContainer = document.createElement('div');
    imgContainer.className = 'headshotContainer';
  
    const headshotImg = document.createElement('img');
    headshotImg.src = data.headshot || './assets/images/default.jpg';
    headshotImg.alt = "Headshot";
  
    imgContainer.appendChild(headshotImg);
    headshotDiv.appendChild(imgContainer);
  
    aboutMeContainer.appendChild(bioPara);
    aboutMeContainer.appendChild(headshotDiv);
}