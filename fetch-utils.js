const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwd2Z1YXF2d2x6cnRwYXV1Z290Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc5Njg3MTAsImV4cCI6MTk2MzU0NDcxMH0.sUI1TaJk5GE34Q06B2tduC38-RG8NO-HoqJhGa4wrhg';

const SUPABASE_URL = 'https://cpwfuaqvwlzrtpauugot.supabase.co';

export const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

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

export async function uploadImage(avatarFile){
    const response = await client
        .storage
        .from('avatars')
        .upload(avatarFile.name, avatarFile, {
            cacheControl: '3600',
            upsert: false
        });
    return checkError(response);
}

export async function makeImageUrl(imageKey){
    return `${SUPABASE_URL}/storage/v1/object/public/${imageKey}`;
}

export async function addImagetoProfile(id, url){
    const response = await client
        .from('profiles')
        .insert({ image_url: url })
        .match({ user_id: id });
    return checkError(response);
}

export async function updatePlayer(updatedPlayer){
    const response = await client 
        .from('profiles')
        .update(updatedPlayer)
        .match({ id: updatedPlayer.id })
        .single();

    return checkError(response);
}

export async function getUserProfile(){
    const user = await getUser();

    const response = await client
        .from('profiles')
        .select('*')
        .match({ email: user.email })
        .single();

    return checkError(response);
}

export async function getActivePlayers(){
    const response = await client
        .from('profiles')
        .select('*')
        .match({ playing: true });

    return checkError(response);
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
