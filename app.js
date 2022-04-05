import { redirectIfLoggedIn, signInUser, signupUser, uploadImage, makeImageUrl, addImagetoProfile } from './fetch-utils.js';

const signInForm = document.getElementById('sign-in');
const signInEmail = document.getElementById('sign-in-email');
const signInPassword = document.getElementById('sign-in-password');

const signUpForm = document.getElementById('sign-up');
const signUpEmail = document.getElementById('sign-up-email');
const signUpPassword = document.getElementById('sign-up-password');



// if user currently logged in, redirect
redirectIfLoggedIn();

signUpForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const user = await signupUser(signUpEmail.value, signUpPassword.value);
    const data = new FormData(signUpForm);

    const avatarImage = data.get('avatar-image');
    console.log(avatarImage);
    const uploadedAvatar = await uploadImage(avatarImage);
    console.log(uploadedAvatar);
    const url = await makeImageUrl(user.id, uploadedAvatar.Key);
    console.log(url);
    await addImagetoProfile(url);
    if (user) {
        redirectIfLoggedIn();
    } else {
        console.error(user);
    }

    

});



signInForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const user = await signInUser(signInEmail.value, signInPassword.value);

    if (user) {
        redirectIfLoggedIn();
    } else {
        console.error(user);
    }
});
