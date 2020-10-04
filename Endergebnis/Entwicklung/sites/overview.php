<section id = "overall" class = "normal">
	<h1 class = "headline">Gesamtfortschritt</h1>
	<canvas id = "chart"></canvas>
</section>

<section id = "topics" class = "normal">
	<h1 class = "headline">Themenabschluss</h1>

	<div id = "tutorial" class = "topicAreas">
	<?php
		$amount = 0;
		echo "<h2>Tutorial:</h2>";
		if ( true == true || !empty( $_SESSION[ "tutorial" ] ) && isset( $_SESSION[ "tutorial" ] ) ) {
			$alledateien = scandir ( $_SERVER[ 'DOCUMENT_ROOT' ] . '/level/tutorial' ); //Ordner "files" auslesen
			$description = "Hierfür gibt es keine Beschreibung!";
			foreach ( $alledateien as $datei ) { // Ausgabeschleife
				if ( $datei != "." && $datei != ".." && $datei != "_notes" ) {
					$topic  = str_split ( $datei, 2 )[ 0 ];
					$level  = intval ( $topic );
					$value  = 0;
					$done   = false;
					$handle = fopen ( $_SERVER[ 'DOCUMENT_ROOT' ] . "/level/tutorial/" . $datei, "r" );
					if ( $handle ) {
						if ( ( $line = fgets ( $handle ) ) !== false ) {
							$description = explode ( ":", $line )[ 1 ];
							$description = str_replace ( ";", "", $description );
						}
						fclose ( $handle );
						?>
						<div class = "listung">
							<a href = "/?site=game&area=tutorial&level=<?php echo $level; ?>" class = "tutorialLink">
								<h3>Level <?php echo $topic; ?>:</h3>
								<article>
									Beschreibung: <?php echo $description; ?>
								</article>
								<article class = "done">
									<div class = "doneText">Abgeschlossen: </div>
									<span class = "tutorial"></span>
								</article>
							</a>
						</div>
						<?php
					}
					$amount++;
				}
			}
		}
	?>
	</div>

	<div id = "basics" class = "topicAreas">
	<?php
		echo "<h2>Grundlagen:</h2>";
		if ( true == true || !empty( $_SESSION[ "basics" ] ) && isset( $_SESSION[ "basics" ] ) ) {
			$alledateien = scandir ( $_SERVER[ 'DOCUMENT_ROOT' ] . '/level/basics' ); //Ordner "files" auslesen
			$description = "Hierfür gibt es keine Beschreibung!";
			foreach ( $alledateien as $datei ) { // Ausgabeschleife
				if ( $datei != "." && $datei != ".." && $datei != "_notes" ) {
					$topic  = str_split ( $datei, 2 )[ 0 ];
					$level  = intval ( $topic );
					$value  = 0;
					$done   = false;
					$handle = fopen ( $_SERVER[ 'DOCUMENT_ROOT' ] . "/level/basics/" . $datei, "r" );
					if ( $handle ) {
						if ( ( $line = fgets ( $handle ) ) !== false ) {
							$description = explode ( ":", $line )[ 1 ];
							$description = str_replace ( ";", "", $description );
						}
						fclose ( $handle );
						?>
						<div class = "listung">
							<a href = "/?site=game&area=basics&level=<?php echo $level; ?>" class = "basicsLink">
								<h3>Level <?php echo $topic; ?>:</h3>
								<article>
									Beschreibung: <?php echo $description; ?>
								</article>
								<article class = "done">
									<div class = "doneText">Abgeschlossen: </div>
									<span class = "basics"></span>
								</article>
							</a>
						</div>
						<?php
					}
					$amount++;
				}
			}
		}
	?>
	</div>

	<div id = "messages" class = "topicAreas">
	<?php
		echo "<h2>Nachrichten:</h2>";
		if ( true == true || !empty( $_SESSION[ "messages" ] ) && isset( $_SESSION[ "messages" ] ) ) {
			$alledateien = scandir ( $_SERVER[ 'DOCUMENT_ROOT' ] . '/level/messages' ); //Ordner "files" auslesen
			$description = "Hierfür gibt es keine Beschreibung!";
			foreach ( $alledateien as $datei ) { // Ausgabeschleife
				if ( $datei != "." && $datei != ".." && $datei != "_notes" ) {
					$topic  = str_split ( $datei, 2 )[ 0 ];
					$level  = intval ( $topic );
					$value  = 0;
					$done   = false;
					$handle = fopen ( $_SERVER[ 'DOCUMENT_ROOT' ] . "/level/messages/" . $datei, "r" );
					if ( $handle ) {
						if ( ( $line = fgets ( $handle ) ) !== false ) {
							$description = explode ( ":", $line )[ 1 ];
							$description = str_replace ( ";", "", $description );
						}
						fclose ( $handle );
						?>
						<div class = "listung">
							<a href = "/?site=game&area=messages&level=<?php echo $level; ?>" class = "messagesLink">
								<h3>Level <?php echo $topic; ?>:</h3>
								<article>
									Beschreibung: <?php echo $description; ?>
								</article>
								<article class = "done">
									<div class = "doneText">Abgeschlossen: </div>
									<span class = "messages"></span>
								</article>
							</a>
						</div>
						<?php
					}
					$amount++;
				}
			}
		}
	?>
	</div>

	<div class = "floatClear"></div>
</section>

<section id = "amount"
         data-value = "<?php echo $amount ?>">
</section>

<script src = "../javascript/charts.js"></script>
