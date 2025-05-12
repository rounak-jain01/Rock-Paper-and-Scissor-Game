document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const welcomeScreen = document.getElementById('welcome-screen');
    const gameScreen = document.getElementById('game-screen');
    const resultScreen = document.getElementById('result-screen');
    const loadingScreen = document.getElementById('loading-screen');
    const gameOverScreen = document.getElementById('game-over-screen');
    const playerNameInput = document.getElementById('player-name');
    const displayName = document.getElementById('display-name');
    const startGameBtn = document.getElementById('start-game');
    const choices = document.querySelectorAll('.choice');
    const playerChoiceText = document.getElementById('player-choice-text');
    const computerChoiceText = document.getElementById('computer-choice-text');
    const playerChoiceEmoji = document.getElementById('player-choice-emoji');
    const computerChoiceEmoji = document.getElementById('computer-choice-emoji');
    const resultText = document.getElementById('result-text');
    const playAgainBtn = document.getElementById('play-again');
    const newGameBtn = document.getElementById('new-game');
    const playerScoreDisplay = document.getElementById('player-score');
    const computerScoreDisplay = document.getElementById('computer-score');
    const finalPlayerScoreDisplay = document.getElementById('final-player-score');
    const finalComputerScoreDisplay = document.getElementById('final-computer-score');
    const finalResultText = document.getElementById('final-result');
    
    let playerName = '';
    let playerScore = 0;
    let computerScore = 0;
    const winningScore = 5;
    
    // Event Listeners
    startGameBtn.addEventListener('click', startGame);
    choices.forEach(choice => {
        choice.addEventListener('click', makeChoice);
    });
    playAgainBtn.addEventListener('click', playAgain);
    newGameBtn.addEventListener('click', resetGame);
    
    // Functions
    function startGame() {
        playerName = playerNameInput.value.trim();
        
        if (!playerName) {
            alert('Please enter your name to start the game!');
            return;
        }
        
        displayName.textContent = playerName;
        welcomeScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
    }
    
    function makeChoice() {
        const choice = this.getAttribute('data-choice');
        
        // Disable all choices to prevent multiple selections
        choices.forEach(c => c.style.pointerEvents = 'none');
        
        // Show loading animation
        loadingScreen.classList.remove('hidden');
        
        // Add a delay to simulate computer thinking
        setTimeout(() => {
            // Send choice to server
            fetch('/play', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    choice: choice,
                    name: playerName
                }),
            })
            .then(response => response.json())
            .then(data => {
                // Hide loading screen
                loadingScreen.classList.add('hidden');
                
                // Display results
                playerChoiceText.textContent = data.player_choice;
                computerChoiceText.textContent = data.computer_choice;
                
                // Set emojis based on choices
                const emojiMap = {
                    'Rock': '✊',
                    'Paper': '✋',
                    'Scissor': '✌️'
                };
                playerChoiceEmoji.textContent = emojiMap[data.player_choice];
                computerChoiceEmoji.textContent = emojiMap[data.computer_choice];
                
                resultText.textContent = data.result;
                
                // Update scores
                if (data.result.includes('WINNER')) {
                    playerScore++;
                    playerScoreDisplay.textContent = playerScore;
                } else if (data.result.includes('Computer WON')) {
                    computerScore++;
                    computerScoreDisplay.textContent = computerScore;
                }
                
                // Check if game is over
                if (playerScore >= winningScore || computerScore >= winningScore) {
                    // Prepare game over screen
                    finalPlayerScoreDisplay.textContent = playerScore;
                    finalComputerScoreDisplay.textContent = computerScore;
                    
                    if (playerScore >= winningScore) {
                        finalResultText.textContent = `Congratulations ${playerName}! You won the game!`;
                    } else {
                        finalResultText.textContent = `The Computer won the game! Better luck next time, ${playerName}!`;
                    }
                    
                    // Show game over screen after a short delay
                    setTimeout(() => {
                        resultScreen.classList.add('hidden');
                        gameOverScreen.classList.remove('hidden');
                    }, 2000);
                } else {
                    // Show result screen
                    resultScreen.classList.remove('hidden');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
                loadingScreen.classList.add('hidden');
                // Re-enable choices
                choices.forEach(c => c.style.pointerEvents = 'auto');
            });
        }, 1500); // 1.5 second delay for animation
    }
    
    function playAgain() {
        resultScreen.classList.add('hidden');
        // Re-enable choices
        choices.forEach(c => c.style.pointerEvents = 'auto');
    }
    
    function resetGame() {
        // Reset scores
        playerScore = 0;
        computerScore = 0;
        playerScoreDisplay.textContent = '0';
        computerScoreDisplay.textContent = '0';
        
        // Hide game over screen
        gameOverScreen.classList.add('hidden');
        
        // Re-enable choices
        choices.forEach(c => c.style.pointerEvents = 'auto');
    }
});
