
import {fetchAboutMe} from './aboutMe';
import {fetchProjects} from './projects';
import {initializeFormValidation} from './formValidation';


document.addEventListener('DOMContentLoaded',()=>{

    fetchAboutMe();
    fetchProjects();
    initializeFormValidation();
});