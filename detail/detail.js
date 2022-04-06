import { checkAuth,
    logout,
    getProfile,
    incrementKarma,
    decrementKarma,
    getUser,
    sendMessage, 
    getMessages,
    deleteMessage,
} from '../fetch-utils.js';
import { renderMessagesEl } from '../render-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const form = document.getElementById('message-form');
const upvoteButton = document.getElementById('increment-karma');
const downvoteButton = document.getElementById('decrement-karma');
const emailDisplay = document.getElementById('username-container');
const usernameDisplay = document.getElementById('username');
const messagesDisplay = document.getElementById('message-container');
const avatarImage = document.getElementById('avatar-image');

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
    avatarImage.src = profile.image_url;
    usernameDisplay.textContent = 'Type message for ' + profile.email;
    messagesDisplay.textContent = '';
    let messages = await getMessages(id);
    messagesDisplay.classList.add('messages');
    if (messages.length === 0) {
        messagesDisplay.classList.remove('messages');
    }
    const user = await getUser();
    for (let message of messages) {
        const sender = await getProfile(message.sender_id);
        let messageDiv = renderMessagesEl(sender, message);
        if (user.id === message.user_id) {
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.classList.add('delete');
            deleteButton.addEventListener('click', async () => {
                await deleteMessage(message.id);
                displayProfile();
            });
            messageDiv.append(deleteButton);
        }
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
    await displayProfile();
});



upvoteButton.addEventListener('click', async () => {
    await incrementKarma(id);
    await displayProfile();
});

downvoteButton.addEventListener('click', async () => {
    await decrementKarma(id);
    await displayProfile();
}); 

