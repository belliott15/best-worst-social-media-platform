import { checkAuth, logout, getProfiles, 
    // deleteProfile 
} from '../fetch-utils.js';
import { renderProfile } from '../render-utils.js';

const profileContainerEl = document.getElementById('profiles-container');

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});


window.addEventListener('load', async () =>{
    fetchAndDisplayProfiles();
});

async function fetchAndDisplayProfiles(){
    profileContainerEl.textContent = '';

    const profiles = await getProfiles();
    for (let profile of profiles){
        const profileDiv = renderProfile(profile);
        profileDiv.addEventListener('click', async () => {
            // await deleteProfile(profile.id);
            // fetchAndDisplayProfiles();
            location.replace(`../detail/?id=${profile.id}`);
        });
        profileContainerEl.append(profileDiv);
    }
    
}

