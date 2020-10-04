<?php
	if ( empty( $_GET[ "area" ] ) || !isset( $_GET[ "area" ] ) ||
		 empty( $_GET[ 'level' ] ) || !isset( $_GET[ 'level' ] )
	) {
		echo "<div id = \"demo\"></div>";
	}
?>
<section id = "headArea" class = "main">
	<?php
		$headline = "Beispiel";
		$error    = true;

		if ( !empty( $_GET[ "area" ] ) && isset( $_GET[ "area" ] ) ) {
			switch ( $_GET[ "area" ] ) {
				case "tutorial":
					$headline = "Tutorial";
					$error    = false;
					break;
				case "basics":
					$headline = "Grundlagen";
					$error    = false;
					break;
				case "messages":
					$headline = "Nachrichten";
					$error    = false;
					break;
			}
		}
		$level = "0";
		if ( $error ) {
			$gameContent = $_SERVER[ 'DOCUMENT_ROOT' ] . '/level/demo.txt';
			$level       = "0" . $level;
		} else {
			if ( !empty( $_GET[ 'level' ] ) && isset( $_GET[ 'level' ] ) ) {
				$level = $_GET[ 'level' ];
				if ( $level < 10 ) {
					$level = "0" . $level;
				}
				$gameContent = $_SERVER[ 'DOCUMENT_ROOT' ] . '/level/' . $_GET[ 'area' ] . '/' . $level . '.txt';
			}
		}

		echo "<h1 class='headline'>$level: $headline</h1>";
	?>
	<h2 id = "description" class = "description"></h2>

	<div id = "playArea">
		<canvas id = "playfield" class = "playfield">
		Entschuldigung, aber dein Browser unterstützt leider kein Canvas!
		</canvas>

		<canvas id = "player" class = "playfield">
		Entschuldigung, aber dein Browser unterstützt leider kein Canvas!
		</canvas>
	</div>

	<div id = "gameArea">

		<div id = "div2" class = "targetArea">
			<div>Wahlzone</div>
		</div>

		<div id = "div1" class = "targetArea">
			<div>Laufzone</div>
		</div>

	</div>

	<section id = "startArea">
		<div id = "start" onclick = "game.start()">
			Start
		</div>
	</section>

	<section id = "resetArea" onclick = "game.reset()">
		<div id = "reset">
			Reset
		</div>
	</section>

	<section id = "backwardArea">
		<div id = "backward" onclick = "game.backward()">
			Zurück
		</div>
	</section>

	<section id = "forwardArea" onclick = "game.forward()">
		<div id = "forward">
			Weiter
		</div>
	</section>

</section>

<!--<div style = "background: red" onclick = "game.messageBox.show()">MSG-TEST</div>-->

<section id = "dataArea"
         data-value = "<?php echo file_get_contents ( $gameContent ); ?>">
</section>

<script src = "../javascript/game.js"></script>