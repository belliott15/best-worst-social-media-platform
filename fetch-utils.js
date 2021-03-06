const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3YXF1aGF3cXl0dHhkcmNiaHh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc1NTE5ODEsImV4cCI6MTk2MzEyNzk4MX0.FnfsYqPR7GPz5COh7itHiDt6as7-F__iU57NyG7IKyE';
const SUPABASE_URL = 'https://zwaquhawqyttxdrcbhxx.supabase.co';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}


export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./list-page');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

export async function getProfiles() {
    const response = await client
        .from('profiles')
        .select()
        .order('karma', { ascending: false });

    return checkError(response);
}

export async function getProfile(id) {
    const response = await client
        .from('profiles')
        .select('*')
        .match({ id })
        .single();

    return checkError(response);
}

export async function sendMessage(recipient_id, id, message) {
    let sender_id = await getSenderProfile(id);
    const response = await client
        .from('messages')
        .insert({
            recipient_id: recipient_id,
            sender_id: sender_id.id,
            message: message,
        });

    return checkError(response);
}

export async function getSenderProfile(id) {
    const response = await client
        .from('profiles')
        .select('*')
        .match({ user_id: id })
        .single();

    return checkError(response);
}

export async function incrementKarma(id) {
    const profileId = await getProfile(id); 
    const response = await client
        .from('profiles')
        .update({ karma: profileId.karma + 1 })
        .match({ id });
    return checkError(response);
}

export async function decrementKarma(id) {
    const profileId = await getProfile(id); 
    const response = await client
        .from('profiles')
        .update({ karma: profileId.karma - 1 })
        .match({ id });
    return checkError(response);
}

export async function deleteMessage(id) {
    const response = await client
        .from('messages')
        .delete()
        .match({ id });

    return checkError(response);
}

export async function deleteProfile(id) {
    const response = await client
        .from('profiles')
        .delete()
        .match({ id });

    return checkError(response);
}

export async function getMessages(id) {
    const response = await client
        .from('messages')
        .select('*')
        .match({ recipient_id: id });
    return checkError(response);
}

export async function createProfile() {
    const response = await client
        .from('profiles')
        .insert({});
    return checkError(response);
}

// export async function uploadImage(avatarFile){
//     const response = await client
//         .storage
//         .from('images')
//         .upload(avatarFile.name, avatarFile, {
//             cacheControl: '3600',
//             upsert: false
//         });
//     return checkError(response);
// }

// export async function makeImageUrl(imageKey){
//     return `${SUPABASE_URL}/storage/v1/object/public/${imageKey}`;
// }

// export async function addImagetoProfile(id, url){
//     const response = await client
//         .from('profiles')
//         .insert({ image_url: url })
//         .match({ user_id: id });
//     return checkError(response);
// }

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
