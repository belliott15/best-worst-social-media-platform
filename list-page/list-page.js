import { checkAuth, logout, getProfiles } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});


const profile = await getProfiles()
console.log(profile);