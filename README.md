# Tic Tac Toe

Typing in ```node server.js``` into the command line will spin up a site at http://127.0.0.1:1234/index.html 

## HTML
- Basic HTML document with html scaffolding and links for styles and javascript.
- Game board consists of three rows of three cells.

## CSS
- CSS contains all styles for game board as well as styles for player 1 and player two images.

## game.js 
- On document ready, a dummy ajax request is fired to the node server, the server then communicates a success back and you either set up a new game or retrieve the old one.
- Local storage is used to store all game data, but an SQL database could be setup in the node server to GET and POST to. 
- Once a square is clicked, the checkWin function checks several different ways a win can be achieved and either displays a prompt for the winner or congiunes onto the continueGame function.
- The continueGame function fires off another ajax request to the server that saves the game.

## server.js
- A simple server that retrieves the index.html file along with its associated js and css files.
- Also excepts and spits out data into the console.
