$(document).ready(function() {
	$.ajax({
		type: 'GET',
		url: 'http://127.0.0.1:1234/data',
		success: function (data) {
			if (!data && !localStorage.getItem('game')) {
				console.log('New Game Started.');
				setGame();
			} else {
				console.log('Found old game.');
				retrieveGame();
			}
		},
		error: function (xhr, status, error) {
		   console.log('error');
		}
	});

	$('td.empty').on('click', function() {
		var game = JSON.parse(localStorage.getItem('game'));
		if (!$(this).hasClass('player1') && !$(this).hasClass('player2')) {
			$(this).removeClass('empty');
			$(this).addClass(game.turn);
			
			var parent = $(this).parent();
			var parentIndex = $('tr').index(parent);

			var thisIndex = $($(parent).children()).index(this);

			game.board[parentIndex]['c' + (thisIndex+1)] = game.turn;

			var space = thisIndex+1

			checkWin(game, parentIndex, space, winner, continueGame);
		}
	});
});

var continueGame = function(game) {
	if (game.turn === 'player1') {
		game.turn = 'player2';
	} else {
		game.turn = 'player1';
	}

	$.ajax({
		type: 'POST',
		url: 'http://127.0.0.1:1234',
		data: JSON.stringify(game),
		success: function (data) {
			console.log('Game Saved');
		    localStorage.setItem("game", JSON.stringify(game));
		},
		error: function (xhr, status, error) {
		    console.log('Error: ' + error.message);
		}
	});

	if($('td.empty').length === 0) {
		alert('Game Over. Board will reset in 5 seconds.');
		setTimeout(function(){
			localStorage.removeItem('game');
			location.reload();
		},5000)
	} else {
		if (game.turn === 'player1') {
			$('.player-display .p1').show();
			$('.player-display .p2').hide();
		} else {
			$('.player-display .p2').show();
			$('.player-display .p1').hide();
		}
	}
}

var winner = function(game) {
	alert(game.turn + ' wins! Board will reset in 5 seconds.');
	setTimeout(function(){
		localStorage.removeItem('game');
		location.reload();
	}, 5000)
}

function setGame() {
	var rows = $('tr');
	var cells = $('td');
	var cellsPerRow = cells.length / rows.length;
	var rowObj = {};
	var game = {'turn': 'player1', 'board': []};

	for (var i = 1; i <= cellsPerRow; i++) {
		rowObj["c" + i] = null;
	}

	for (var i = 0; i < rows.length; i++) {
		game.board.push(rowObj);
	}

	$.ajax({
		type: 'POST',
		url: 'http://127.0.0.1:1234',
		data: JSON.stringify(game),
		success: function (data) {
		    console.log('New Game Saved');
		    localStorage.setItem("game", JSON.stringify(game));
		},
		error: function (xhr, status, error) {
		    console.log('Error: ' + error.message);
		}
	});
}

function retrieveGame() {
	var game = JSON.parse(localStorage.getItem('game'));
	for (var i = 0; i < game.board.length; i++) {
		var cells = $($('tr')[i]).children();
		for (var j = 0; j < cells.length; j++) {
			if (game.board[i]['c'+(j+1)]) {
				$(cells[j]).removeClass('empty');
				$(cells[j]).addClass(game.board[i]['c'+(j+1)]);
			}
		}
	}

	if (game.turn === 'player1') {
		$('.player-display .p1').show();
		$('.player-display .p2').hide();
	} else {
		$('.player-display .p2').show();
		$('.player-display .p1').hide();
	}
}

function checkWin(game, rowIndex, space, winner, continueGame) {
	var game = game;
	var node = node;
	var rows = $('tr').length;
	var player = game.turn;

	//in a row
	for (var i = 0; i < game.board.length; i++) {
		var cells = $($('tr')[i]).children();
		var spaces = 0;
		for (var j = 0; j < cells.length; j++) {
			var className = $(cells[j]).attr('class');
			if (player === className) {
				spaces++;
				if (spaces === cells.length) {
					return winner(game);
				}
			}
		}
	}

	//in a column
	var spaces = 0;
	for (var i = 0; i < game.board.length; i++) {
		var checkAgainst = game.board[i]['c'+space];
		if (checkAgainst === player) {
			spaces++
			if (spaces === rows) {
				return winner(game);
			}
		}
	}

	//diagonal left to right
	var spaces = 0;
	for (var i = 0; i < game.board.length; i++) {
		if (game.board[i]['c'+(i+1)] === player) {
			spaces++
			if (spaces === rows) {
				return winner(game);
			}
		}
	}

	//diagonal right to left
	var spaces = 0;
	var cells = game.board.length;
	for (var i = 0; i < game.board.length; i++) {
		if (game.board[i]['c'+cells] === player) {
			spaces++
			if (spaces === rows) {
				return winner(game);
			}
		}
		cells--;
	}

	continueGame(game);
}