<html lang = "de">
<head>
	<title>Lernanwendung</title>
	<meta charset = "utf-8" />
	<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
	<link rel="icon" href="/favicon.ico" type="image/x-icon">
	<meta name = "viewport" content = "width=device-width, initial-scale=1.0" />
	<link rel = "stylesheet" href = "/css/style.css" />
	<link href="https://fonts.googleapis.com/css?family=Overlock" rel="stylesheet">
	<?php
		if ( !empty( $_GET[ 'site' ] ) && isset( $_GET[ 'site' ] ) ) {
			$style = "/css/sites/" . $_GET[ "site" ] . ".css";

		} else {
			$style = "/css/sites/game.css";
		}
		echo "<link rel = \"stylesheet\" href = \"$style\" />";
	?>
</head>
<body>
	<div id = "wrapper">
