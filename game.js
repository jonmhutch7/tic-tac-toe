//game

//Handle clicks depending on player
//Handle board logic to define who wins

// {
// 	'board': {'11': null, '12': null, '13': null, '21': null, '22': null, '23': null, '31': null, '32': null, '33': null}
// }

$(document).ready(function() {

	if (!localStorage.getItem('game')) {
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
	} else {
		setGame();
	}

	$('td.empty').on('click', function() {
		
	});
});

function setGame() {
	var game = JSON.parse(localStorage.getItem('game'));
}