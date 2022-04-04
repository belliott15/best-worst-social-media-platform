import { checkAuth,
    logout,
    getProfile,
    incrementKarma,
    decrementKarma,
    getUser,
    sendMessage } from './fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const form = document.getElementById('message-form');
const upvoteButton = document.getElementById('increment-karma');
const downvoteButton = document.getElementById('decrement-karma');

logoutButton.addEventListener('click', () => {
    logout();
});


window.addEventListener('load', async () => {
    displayProfile();
});

export async function displayProfile() {
    let profile = getProfile(); //id?
    renderKarma(profile);

    //display t h e p r o f i l e
}

//takes in profile: object representing person with
//email, karma, id properties
//update karma display div to appropriate number
async function renderKarma(profile) {
    let karmaDiv = document.getElementById('karma-rating');
    karmaDiv.textContent = profile.karma;
}

//submit form event listener
form.addEventListener('submit', async e => {
    e.preventDefault();
    let data = new FormData(form);
    let messageText = data.get('message');
    let messageFrom = await getUser();
    await sendMessage({
        text: messageText,
        from_email: messageFrom.email,
        recipient_id: 0 //uhhhh
    });
    form.reset();
    location.replace('../profiles/index.html');
});

upvoteButton.addEventListener('click', () => {
    incrementKarma();
});

downvoteButton.addEventListener('click', () => {
    decrementKarma();
}); 