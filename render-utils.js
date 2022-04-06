export function renderProfile(profile) {
    const profileDiv = document.createElement('div');
    const profileName = document.createElement('h3');
    const avatarImg = document.createElement('img');
    const karmaEl = document.createElement('p');

    profileName.textContent = profile.email;
    avatarImg.src = profile.image_url;
    avatarImg.classList.add('avatar');
    karmaEl.textContent = `Karma: ` + profile.karma ;

    profileDiv.append(avatarImg, profileName, karmaEl);
    profileDiv.classList.add('profile');

    return profileDiv;
}

export function renderMessagesEl(profile, message) {
    let messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.textContent = `${profile.email} posted "${message.message}"`;
    
    return messageDiv;
}