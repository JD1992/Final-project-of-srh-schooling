<section id = "tutorial">
	<a href = "/?site=game&area=tutorial&level=1">
		<figure class = "clearfix">
			<figcaption>Tutorial</figcaption>
			<div class = "wrapContent">
				<img src = "../pictures/game/player.png">
				<div id = "descriptionHow">
				Hier ist der Tutorial Bereich. Doch was bedeutet das Wort "Tutorial" nun. In einem Tutorial wird einem erklärt wie man
				etwas macht bzw. wie man etwas bedient. Dieser Begriff ist in der Spielebranche ein sehr beliebter Begriff und wird dort
				in so gut wie jedem Spiel genutzt. Das Tutorial auf dieser Seite wird dir erklären was es für Bausteine gibt, wie man sie
				auswählt, wie man die Aufgaben löst und das alles in einem einfachen Ablauf.
				</div>
			</div>
		</figure>
	</a>
</section>

<section id = "basics" class = "notActive">
	<a href = "/?site=game&area=basics&level=1">
		<figure>
			<figcaption>Grundlagen</figcaption>
			<div class = "wrapContent">
				<img src = "../pictures/game/obstacle.png">
				<div id = "descriptionBasics">
				Bei den Grundlagen folgen die ersten richtigen Aufgaben ohne weitere Hilfestellungen. Nach Abschließen der ersten
				Aufgaben werden mehr Freiheiten gegeben und die Aufgaben erfordern mehr von dir. Es kommen mehr Bausteine dazu und diese
				kannst du frei zusammenwürfeln um die Aufgaben zu lösen wie du es möchtest. Auch wirst du hier nicht mehr gerade Wege
				vorfinden und gelegentlich wird dir etwas in dem Weg sein.
				</div>
			</div>
		</figure>
	</a>
</section>


<section id = "messages" class = "notActive">
	<a href = "/?site=game&area=messages&level=1">
		<figure>
			<figcaption>Nachrichten</figcaption>
			<div class = "wrapContent">
				<img src = "../pictures/tutorial.png">
				<div id = "descriptionTutorial">
				Hast du dich jemals gefragt wie deine Nachrichten vom PC, dem Handy oder einem anderen Elektronischen Gerät um die ganze
				Welt wandert und trotzdem bei der Person ankommt an die du diese Nachricht senden wolltest. Hier wird dir gezeigt wie
				diese Nachrichten ihren Weg an ihr Ziel finden. Auch wird dir grob gezeigt welche Wege und welche Techniken dahinter
				stecken.
				</div>
			</div>
		</figure>
	</a>
</section>

<script>
	var basics = document.getElementById ( "basics" );
	var done   = localStorage.getItem ( "tutorial" );
	if ( done !== null ) {
		if ( done >= 1 ) {
			basics.removeAttribute ( "class" );
		}
	}
</script>

