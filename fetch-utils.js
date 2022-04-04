const SUPABASE_URL = '';
const SUPABASE_KEY = '';

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
    await createProfile();
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
        .select();

    return checkError(response);
}

export async function createProfile() {
    const response = await client
        .from('profiles')
        .insert({});

    return checkError(response);
}


function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
