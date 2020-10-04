<?php
	$isActive   = "class = \"active\"";
	$isIndex    = "";
	$isAreas    = "";
	$isOverview = "";
	$isAbout    = "";
	if ( !empty( $_GET[ "site" ] ) && isset( $_GET[ "site" ] ) ) {
		switch ( $_GET[ "site" ] ) {
			case "areas":
			case "game":
				$isAreas = $isActive;
				break;
			case "overview":
				$isOverview = $isActive;
				break;
			case "contact":
				$isAbout = $isActive;
				break;
		}
	} else {
		$isIndex = $isActive;
	}
?>
<nav>
	<ul>
		<li><a href = "/" <?php echo $isIndex; ?> >Start</a></li>
		<li><a href = "/?site=areas" <?php echo $isAreas; ?>>Lernbereich</a></li>
		<li><a href = "/?site=overview" <?php echo $isOverview; ?>>Lernstand</a></li>
		<li><a href = "/?site=about" <?php echo $isAbout; ?>>Über uns</a></li>
	</ul>
</nav>
<main>