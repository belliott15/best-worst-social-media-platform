import { checkAuth,
    logout,
    getProfile,
    incrementKarma,
    decrementKarma,
    getUser,
    sendMessage, 
    getMessages} from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const form = document.getElementById('message-form');
const upvoteButton = document.getElementById('increment-karma');
const downvoteButton = document.getElementById('decrement-karma');
const emailDisplay = document.getElementById('username-container');
const usernameDisplay = document.getElementById('username');
const messagesDisplay = document.getElementById('message-container');

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
    let messages = await getMessages(id);
    for (let message of messages) {
        let messageDiv = document.createElement('div');
        messageDiv.textContent = message.message;
        messagesDisplay.append(messageDiv);
    }
}

form.addEventListener('submit', async e => {
    e.preventDefault();
    let data = new FormData(form);
    let messageText = data.get('message');
    let messageFrom = await getUser();
    await sendMessage(id, messageFrom.id, messageText);
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