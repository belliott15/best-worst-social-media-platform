import { checkAuth, logout, client, updatePlayer, getUserProfile, getActivePlayers 
} from '../fetch-utils.js';


const gameContainerEl = document.getElementById('game-container');
checkAuth();
const logoutButton = document.getElementById('logout');
const playGameButton = document.querySelector('.play-game-button');

let currentPlayer;


playGameButton.addEventListener('click', async () => {
    currentPlayer.playing = !currentPlayer.playing;
    await updatePlayer(currentPlayer);
});

logoutButton.addEventListener('click', () => {
    logout();
});


window.addEventListener('load', async () =>{
    currentPlayer = await getUserProfile();
    fetchAndDisplayActivePlayers();
    await client
        .from('profiles')
        .on('UPDATE', (payload) => {
            fetchAndDisplayActivePlayers();
        })
        .subscribe();
});

const movement = 20;
const game_height = 500;
const game_width = 700;


window.addEventListener('keydown', async (e) => {
    if (e.key === 'w'){
        currentPlayer.y_position -= movement;
        
        if (currentPlayer.y_position < movement){
            currentPlayer.y_position = game_height;
        }
    }
    if (e.key === 'a'){
        currentPlayer.x_position -= movement;

        if (currentPlayer.x_position < movement){
            currentPlayer.x_position = game_width;
        }
    }
    if (e.key === 's'){
        currentPlayer.y_position += movement;
        if (currentPlayer.y_position > game_height){
            currentPlayer.y_position = movement;
        }
    }
    if (e.key === 'd'){
        currentPlayer.x_position += movement;
        if (currentPlayer.x_position > game_width){
            currentPlayer.x_position = movement;
        }
    }

    await updatePlayer(currentPlayer);
});

async function fetchAndDisplayActivePlayers(){
    gameContainerEl.textContent = '';

    const activePlayers = await getActivePlayers();

    for (let player of activePlayers){
        const playerDiv = document.createElement('div');
        playerDiv.textContent = `🧜 ${player.email}`;
        playerDiv.classList.add('player');
        playerDiv.style.transform = `translate(${player.x_position}px, ${player.y_position}px)`;
        gameContainerEl.append(playerDiv);
    }
    
}
