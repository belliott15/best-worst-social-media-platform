export function renderProfile(profile) {
    const profileDiv = document.createElement('div');
    const profileName = document.createElement('h3');
    const karmaEl = document.createElement('p');

    profileName.textContent = profile.email;
    karmaEl.textContent = `Karma: ` + profile.karma ;

    profileDiv.append(profileName, karmaEl);
    profileDiv.classList.add('profile');

    return profileDiv;
}