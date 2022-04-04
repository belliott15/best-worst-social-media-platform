import { checkAuth, logout, getProfiles } from '../fetch-utils.js';

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
    console.log(profiles);

    for (let profile of profiles){
        const profileDiv = document.createElement('div');
        const profileName = document.createElement('h3');
        const karmaEl = document.createElement('p');

        profileName.textContent = profile.email;
        karmaEl.textContent = `Karma: ` + profile.karma ;

        profileDiv.append(profileName, karmaEl);
        profileDiv.classList.add('profile');
        profileContainerEl.append(profileDiv);
    }
    
}

