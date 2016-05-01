//game

//Handle clicks depending on player
//Handle board logic to define who wins

// {
// 	'board': {'11': null, '12': null, '13': null, '21': null, '22': null, '23': null, '31': null, '32': null, '33': null}
// }

$(document).ready(function() {
	if (!localStorage.getItem('game')) {
		setGame();
	} else {
		retrieveGame();
	}

	$('td.empty').on('click', function() {
		var game = JSON.parse(localStorage.getItem('game'));

		$(this).removeClass('empty');
		$(this).addClass(game.turn);
		
		var parent = $(this).parent();
		var parentIndex = $('tr').index(parent);

		var thisIndex = $($(parent).children()).index(this);

		game.board[parentIndex]['c' + (thisIndex+1)] = game.turn;

		if (game.turn === 'player1') {
			game.turn = 'player2';
		} else {
			game.turn = 'player1';
		}

		localStorage.setItem("game", JSON.stringify(game));

		if($('td.empty').length === 0) {
			localStorage.removeItem('game');
			location.reload();
		}
	});
});

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
	localStorage.setItem("game", JSON.stringify(game));
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
}

function checkWin() {
	
}