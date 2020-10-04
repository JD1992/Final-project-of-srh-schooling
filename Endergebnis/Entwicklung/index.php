<?php

	include_once ( $_SERVER[ 'DOCUMENT_ROOT' ] . "/structure/beforeContent.php" );

	include_once ( $_SERVER[ 'DOCUMENT_ROOT' ] . "/content/header.php" );

	include_once ( $_SERVER[ 'DOCUMENT_ROOT' ] . "/content/nav.php" );

	if ( !empty( $_GET[ 'site' ] ) && isset( $_GET[ 'site' ] ) ) {
		$content = $_SERVER[ 'DOCUMENT_ROOT' ] . "/sites/" . $_GET[ 'site' ] . ".php";
	} else {
		$content = $_SERVER[ 'DOCUMENT_ROOT' ] . "/sites/game.php";
	}
	include_once ( $content );

	include_once ( $_SERVER[ 'DOCUMENT_ROOT' ] . "/content/footer.php" );

	include_once ( $_SERVER[ 'DOCUMENT_ROOT' ] . "/structure/afterContent.php" );