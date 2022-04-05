import { checkAuth,
    logout,
    getProfile,
    incrementKarma,
    decrementKarma,
    getUser,
    sendMessage, 
    getMessages
} from '../fetch-utils.js';

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
    messagesDisplay.textContent = '';
    for (let message of messages) {
        const sender = await getProfile(message.sender_id);
        let messageDiv = document.createElement('div');
        messageDiv.classList.add('messages');
        messageDiv.textContent = `${sender.email} posted "${message.message}"`;
        messagesDisplay.append(messageDiv);
        messagesDisplay.classList.add('messages');
    }
}

form.addEventListener('submit', async e => {
    e.preventDefault();
    let data = new FormData(form);
    let messageText = data.get('message');
    let messageFrom = await getUser();
    await sendMessage(id, messageFrom.id, messageText);
    form.reset();
    displayProfile();
});

upvoteButton.addEventListener('click', async () => {
    await incrementKarma(id);
    displayProfile();
});

downvoteButton.addEventListener('click', async () => {
    await decrementKarma(id);
    displayProfile();
}); 