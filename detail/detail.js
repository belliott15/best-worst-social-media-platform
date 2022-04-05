import { checkAuth,
    logout,
    getProfile,
    incrementKarma,
    decrementKarma,
    getUser,
    sendMessage } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const form = document.getElementById('message-form');
const upvoteButton = document.getElementById('increment-karma');
const downvoteButton = document.getElementById('decrement-karma');
const emailDisplay = document.getElementById('username-container');
const usernameDisplay = document.getElementById('username');

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

logoutButton.addEventListener('click', () => {
    logout();
});


window.addEventListener('load', () => {
    displayProfile();
});

export async function displayProfile() {
    let profile = await getProfile(id);
    let karmaDiv = document.getElementById('karma-rating');
    karmaDiv.textContent = profile.karma;
    emailDisplay.textContent = profile.email;
    usernameDisplay.textContent = 'Type message for ' + profile.email;
}

//submit form event listener
form.addEventListener('submit', async e => {
    e.preventDefault();
    let data = new FormData(form);
    let messageText = data.get('message');
    let messageFrom = await getUser();
    await sendMessage(id, messageFrom.id, messageText);
    console.log(messageText);
    form.reset();
});

upvoteButton.addEventListener('click', () => {
    incrementKarma(id);
    displayProfile();
});

downvoteButton.addEventListener('click', () => {
    decrementKarma(id);
    displayProfile();
}); 