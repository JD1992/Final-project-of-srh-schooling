// Anlegen des Spieleobjektes
var game = {
	// Deklarieren und teilweise initialisieren von Objektvariablen
	isDemo:          false,
	chooseArea:      {},
	walkArea:        {},
	forwardArea:     {},
	backwardArea:    {},
	isStarted:       false,
	isStopped:       false,
	isFinished:      false,
	levelData:       {},
	level:           0,
	area:            "",
	xTiles:          0,
	yTiles:          0,
	playfield:       {},
	player:          {},
	finish:          {},
	messageBox:      {},
	// Befüllen der restlichen Objekvariablen und Aufruf weiterer Methoden zur restlichen Initialisierung
	init:            function () {
		game.level        = game.getLevel ();
		game.area         = game.getArea ();
		game.xTiles       = 5;
		game.yTiles       = 5;
		game.chooseArea   = document.getElementById ( "div2" );
		game.walkArea     = document.getElementById ( "div1" );
		game.forwardArea  = document.getElementById ( "forward" );
		game.backwardArea = document.getElementById ( "backward" );
		game.isDemo       = document.getElementById ( "demo" ) !== null;
		game.levelData    = document.getElementById ( "dataArea" ).dataset.value.split ( ";" );
		game.resize ();
		game.create ();
		game.initDragables ();
		game.initPlayfield ();
		game.initPlayer ();
		game.initFinish ();
		game.initObstacles ();
		game.initMesssageBox ();
		
		// Auslesen des Fortschritts der einzelnen Areas
		if ( localStorage.getItem ( "tutorial" ) === null ) {
			localStorage.setItem ( "tutorial", 0 );
		}
		if ( localStorage.getItem ( "basics" ) === null ) {
			localStorage.setItem ( "basics", 0 );
		}
		if ( localStorage.getItem ( "messages" ) === null ) {
			localStorage.setItem ( "messages", 0 );
		}
	},
	resize:          function () {
	
	},
	// Auslesen des derzeitigen Spielelevels aus der URL
	getLevel:        function () {
		var level = game.level;
		var param = location.search.split ( "&" );
		if ( param[ 0 ] !== "" ) {
			if ( param.length === 3 ) {
				param = param[ 2 ].split ( "=" );
				if ( param.length === 2 ) {
					level = param[ 1 ]
				}
			}
		}
		return parseInt ( level );
	},
	// Auslesen des derzeitigen Areas aus der URL
	getArea:         function () {
		var area  = game.area;
		var param = location.search.split ( "&" );
		if ( param[ 0 ] !== "" ) {
			if ( param.length === 3 ) {
				param = param[ 1 ].split ( "=" );
				if ( param.length === 2 ) {
					area = param[ 1 ]
				}
			}
		}
		return area;
	},
	// Weiterknopf Auswertung und falls Bedingungen erfüllt sind weiterleiten
	forward:         function () {
		var newLevel  = game.level + 1;
		var completed = parseInt ( localStorage.getItem ( game.area ) );
		if ( game.isFinished || completed >= game.level ) {
			if ( completed < game.level ) {
				localStorage.setItem ( game.area, completed + 1 );
			}
			window.location.replace ( "/?site=game&area=" + game.area + "&level=" + newLevel );
		}
	},
	// Zurückknopf Auswertung und Weiterleitung
	backward:        function () {
		if ( game.level > 1 ) {
			var newLevel = game.level - 1;
			window.location.replace ( "/?site=game&area=" + game.area + "&level=" + newLevel );
		}
	},
	// Erstellen und hinzufügen der Events zu den ziehbaren Bausteinen
	initDragables:   function () {
		function drag ( ev ) {
			// Anhängen von Daten an den Baustein beim ziehen des Baustein
			ev.dataTransfer = undefined;
			ev.dataTransfer.setData ( 'id', ev.target.id );
			ev.dataTransfer.setData ( 'elementid', ev.target.dataset.elementid );
			ev.dataTransfer.setData ( 'parent', ev.target.parentNode.id );
		}
		
		function dropAllow ( ev ) {
			// Standard Event verhalten verhindern beim ziehen des Bausteins über andere Elemente
			ev.preventDefault ();
		}
		
		function drop ( ev ) {
			// Das Drop/Fallen lassen verhalten festlegen
			ev.preventDefault (); // Standard Verhalten verhindern
			var data   = ev.dataTransfer.getData ( 'id' ); // Bekommen der ID des fallengelassenen Bausteins
			var target = ev.target; // Bekommen des elements auf das der fallengelassenen Bausteins liegt
			if ( target.id !== "div1" && target.id !== "div2" ) {
				target = target.parentNode;
			}
			
			// Nur wenn das Elternelement nicht gleich dem Element unter dem fallengelassenen Bausteins ist
			if ( ev.dataTransfer.getData ( 'parent' ) !== target.id ) {
				if ( target.id === "div2" ) { // Wenn der Baustein in die Wahlzone geworfen wird, wird er einfach entfernt
					var elements = document.getElementById ( "div1" ).children; // Elemente in der Laufzone bekommen
					var dataDel  = ev.dataTransfer.getData ( 'elementid' ); // angehängte elementid, vom dragevent, des fallengelassenen
					// Bausteins bekommen
					
					//Durchgehen der Bausteine aus der Laufzone
					for ( var i = 0; i < elements.length; i++ ) {
						// Überprüfen der Laufzonen elementeid mit der elementid des fallengelassenen Steins
						if ( elements[ i ].dataset.elementid === dataDel ) {
							document.getElementById ( "div1" ).removeChild ( elements[ i ] ); // Entferenen des fallengelassenen Steins
							return;
						}
					}
				}
				else {
					var newElement = document.getElementById ( data ).cloneNode ( true ); // fallengelassener Baustein clonen
					
					newElement.dataset.elementid = new Date ().getTime ().toString (); // geclontem element eine einzigartige elementid
					// anhängen
					newElement.addEventListener ( "dragstart", drag ); // drag event dem geclonten element neu anhängen
					target.appendChild ( newElement ); // geclontes element der Laufzone anhängen/hinzufügen
				}
			}
		}
		
		// Nach laden der Seite anhängen der Listener an die Bausteine
		window.addEventListener ( "load", function () {
			var elms = document.querySelectorAll ( ".targetArea" );
			for ( var i = 0; i < elms.length; i++ ) {
				var targetArea = elms[ i ];
				targetArea.addEventListener ( "drop", drop );
				targetArea.addEventListener ( "dragover", dropAllow );
			}
			elms = document.querySelectorAll ( "[draggable=true]" );
			for ( i = 0; i < elms.length; i++ ) {
				var draggable = elms[ i ];
				draggable.addEventListener ( "dragstart", drag );
			}
		} );
	},
	// Initialisieren des Spielfeldes
	initPlayfield:   function () {
		game.playfield = { // Spielfeld objekt erzeugen
			canvas:  {},
			context: {},
			
			image:    new Image (),
			image1:   new Image (),
			image2:   new Image (),
			init:     function () {
				game.playfield.canvas  = document.getElementById ( "playfield" );
				game.playfield.context = game.playfield.canvas.getContext ( "2d" );
				game.playfield.resize ();
				// Aus den leveldaten die Bilder auslesen für den Boden
				var images = game.levelData[ 5 ].split ( ":" )[ 1 ].split ( "," );
				
				// Fest 3 Bilder laden für den Boden
				game.playfield.image.onload = function () {
					game.playfield.image1.onload = function () {
						game.playfield.image2.onload = function () {
							game.playfield.draw ();
						};
						game.playfield.image2.src    = "/pictures/game/" + images[ 2 ] + "?_=" + (new Date ().getTime ());
					};
					game.playfield.image1.src    = "/pictures/game/" + images[ 1 ] + "?_=" + (new Date ().getTime ());
					
				};
				game.playfield.image.src    = "/pictures/game/" + images[ 0 ] + "?_=" + (new Date ().getTime ());
				
			},
			// Canvas width und height setzen, damit die Seitenlängen 1:1 sind
			resize:   function () {
				game.playfield.canvas.setAttribute ( 'width', game.playfield.canvas.clientWidth.toString () );
				game.playfield.canvas.setAttribute ( 'height', game.playfield.canvas.clientWidth.toString () );
			},
			// zeichnen des Spielfeldes mit zufälliger Wahl von den Bodentiles
			draw:     function () {
				var tempWidth  = game.playfield.canvas.width / game.xTiles;
				var tempHeight = game.playfield.canvas.height / game.yTiles;
				for ( var i = 0; i < game.yTiles; i++ ) {
					for ( var k = 0; k < game.xTiles; k++ ) {
						switch ( Math.floor ( (Math.random () * 5) + 1 ) ) {
							case 1:
								game.playfield.context.drawImage ( game.playfield.image1, k * tempWidth,
																   i * tempWidth, tempWidth, tempHeight );
								break;
							case 2:
								game.playfield.context.drawImage ( game.playfield.image2, k * tempWidth, i * tempWidth,
																   tempWidth, tempHeight );
								break;
							default:
								game.playfield.context.drawImage ( game.playfield.image, k * tempWidth,
																   i * tempWidth, tempWidth, tempHeight );
								break;
						}
					}
				}
				game.playfield.drawGrid ();
			},
			// Zeichnen eines Grid/Kachelmuster auf das Spielfeld
			drawGrid: function () {
				var tempWidth  = game.playfield.canvas.width / game.xTiles;
				var tempHeight = game.playfield.canvas.height / game.yTiles;
				
				game.playfield.context.strokeStyle = "#ffffff";
				game.playfield.context.lineWidth   = 2;
				game.playfield.context.beginPath ();
				for ( var i = 0; i < game.xTiles + 1; i++ ) {
					var x = i * tempWidth;
					game.playfield.context.moveTo ( x, 0 );
					game.playfield.context.lineTo ( x, game.playfield.canvas.height );
					game.playfield.context.stroke ();
					
					var y = i * tempHeight;
					game.playfield.context.moveTo ( 0, y );
					game.playfield.context.lineTo ( game.playfield.canvas.width, y );
					game.playfield.context.stroke ();
				}
				game.playfield.context.closePath ();
			}
		};
		game.playfield.init ();
	},
	// Spieler Objekt erzeugen
	initPlayer:      function () {
		game.player = {
			canvas:    {},
			context:   {},
			posX:      2,
			posY:      2,
			speed:     0.02,
			image:     new Image (),
			init:      function () { // Werte für das Spielerobjekt setzen
				game.player.canvas  = document.getElementById ( "player" );
				game.player.context = game.player.canvas.getContext ( "2d" );
				game.player.resize ();
				game.player.image.onload = function () {
					setTimeout ( game.player.draw, 100 );
				};
				game.player.image.src    = "/pictures/game/" + game.levelData[ 1 ].split ( ":" )[ 1 ] + "?_=" + (new Date ().getTime ());
				
				var pos          = game.levelData[ 2 ].split ( ":" )[ 1 ].split ( "," );
				game.player.posX = pos[ 0 ];
				game.player.posY = pos[ 1 ];
			},
			// Canvas width und height setzen, damit die Seitenlängen 1:1 sind
			resize:    function () {
				game.player.canvas.setAttribute ( 'width', game.player.canvas.clientWidth.toString () );
				game.player.canvas.setAttribute ( 'height', game.player.canvas.clientHeight.toString () );
			},
			// Zeichnen des Spielers an seine Position
			draw:      function () {
				if ( game.isStopped ) {
					return;
				}
				var tempWidth  = game.player.canvas.width / game.xTiles;
				var tempHeight = game.player.canvas.height / game.yTiles;
				game.player.context.drawImage ( game.player.image, tempWidth * game.player.posX,
												tempHeight * game.player.posY, tempWidth, tempHeight );
			},
			// Positionsupdate je nach dem was für ein element übergeben wurde
			update:    function ( move ) {
				switch ( move.getAttribute ( "class" ) ) {
					case "up":
						game.player.posY = parseFloat ( game.player.posY ) - game.player.speed;
						break;
					case "down":
						game.player.posY = parseFloat ( game.player.posY ) + game.player.speed;
						break;
					case "right":
						game.player.posX = parseFloat ( game.player.posX ) + game.player.speed;
						break;
					case "left":
						game.player.posX = parseFloat ( game.player.posX ) - game.player.speed;
						break;
				}
				game.player.posY = Math.round ( game.player.posY * 100 ) / 100;
				game.player.posX = Math.round ( game.player.posX * 100 ) / 100;
				game.player.collision ();
			},
			// Spielercollision mit allen möglichen Onjekten
			collision: function () {
				if ( game.isStopped || game.isDemo ) {
					return;
				}
				var message = "Fehler! Bitte Lade die Seite neu und versuche es noch einmal.";
				
				// Spieler collision mit Wand
				if ( game.player.posY < 0.0 || game.player.posY > game.yTiles - 1 ||
					 game.player.posX < 0.0 || game.player.posX > game.xTiles - 1 ) {
					game.isStopped = true;
					game.player.context.clearRect ( 0, 0, game.player.canvas.width, game.player.canvas.height );
					message =
						"Huch! Was ist den hier passiert. Scheinbar hast du Freddi gegen eine Wand laufen lassen. Versuche es am besten gleich noch einmal. Drücke einfach den Reset Knopf und überlege was du verändern musst.";
					game.messageBox.show ( message );
					return;
				}
				
				// Spieler collision mit Ziel
				if ( game.player.posY >= game.finish.posY && game.player.posY < game.finish.posY + 1 &&
					 game.player.posX >= game.finish.posX && game.player.posX < game.finish.posX + 1 ) {
					if ( !game.isFinished ) {
						setTimeout ( function () {
							game.isStopped = true;
							message        =
								"Super! Du hast Freedi zu dem Honig geführt. Nun kann er in Ruhe etwas essen und dann geht es direkt zu nächsten Aufgabe. Unten kannst du zur nächsten Aufgabe springen, in dem du den Weiter Knopf betätigst.";
							game.messageBox.show ( message );
							game.forwardArea.className += " gameActive";
						}, 500 );
						game.isFinished = true;
					}
				}
				
				// Spieler collision mit Hindernis
				for ( var i = 0; i < game.obstacles.objects.length; i++ ) {
					if ( game.player.posY >= game.obstacles.objects[ i ].posY &&
						 game.player.posY < game.obstacles.objects[ i ].posY + 1 &&
						 game.player.posX >= game.obstacles.objects[ i ].posX &&
						 game.player.posX < game.obstacles.objects[ i ].posX + 1 ) {
						game.isStopped = true;
						game.player.context.clearRect ( 0, 0, game.player.canvas.width, game.player.canvas.height );
						message =
							"Huch! Was war das. Freedi hat sich den Fuß an einem Baustumpf gestoßen. Versuche es am besten gleich noch einmal. Drücke einfach den Reset Knopf und überlege was du verändern musst.";
						game.messageBox.show ( message );
					}
				}
				
				
			}
		};
		game.player.init ();
	},
	// Hinderniss Objekt erzeugen
	initObstacles:   function () {
		game.obstacles = {
			isActive: true,
			objects:  [],
			init:     function () {
				// Wenn Hindernisse nicht festgelegt sind, den rest überspringen
				if ( game.levelData[ 7 ] === undefined ) {
					game.obstacles.isActive = false;
					return;
				}
				// Laden der Hindernis Daten aus den Leveldaten
				var elementData = game.levelData[ 7 ].split ( ":" )[ 1 ].split ( "," );
				var count       = elementData.length / 3;
				// Erzeugen eines neues Hindernisses und hinzufügen in das Hinderniss array
				for ( var i = 0; i < count; i++ ) {
					var newObstacle   = {};
					newObstacle.posX  = parseInt ( elementData[ i * 3 ] );
					newObstacle.posY  = parseInt ( elementData[ i * 3 + 1 ] );
					var newImage      = new Image ();
					newImage.src      = "/pictures/game/" + elementData[ i * 3 + 2 ] + "?_=" + (new Date ().getTime ());
					newObstacle.image = newImage;
					game.obstacles.objects.push ( newObstacle );
				}
			},
			// Zeichnen der Hindernisse
			draw:     function () {
				if ( game.isStopped || !game.obstacles.isActive ) {
					return;
				}
				var tempWidth  = game.player.canvas.width / game.xTiles;
				var tempHeight = game.player.canvas.height / game.yTiles;
				for ( var i = 0; i < game.obstacles.objects.length; i++ ) {
					game.player.context.drawImage ( game.obstacles.objects[ i ].image,
													tempWidth * game.obstacles.objects[ i ].posX,
													tempHeight * game.obstacles.objects[ i ].posY,
													tempWidth,
													tempHeight );
					
				}
			}
		};
		game.obstacles.init ();
	},
	// Ziel Objekt erzeugen
	initFinish:      function () {
		game.finish = {
			posX:  0,
			posY:  0,
			image: new Image (),
			init:  function () {
				game.finish.image.onload = function () {
					game.finish.draw ( game.finish )
				};
				game.finish.image.src    = "/pictures/game/" + game.levelData[ 3 ].split ( ":" )[ 1 ] + "?_=" + (new Date ().getTime ());
				
				var pos          = game.levelData[ 4 ].split ( ":" )[ 1 ].split ( "," );
				game.finish.posX = parseInt ( pos[ 0 ] );
				game.finish.posY = parseInt ( pos[ 1 ] );
			},
			draw:  function () {
				if ( game.isStopped ) {
					return;
				}
				game.player.context.clearRect ( 0, 0, game.player.canvas.width, game.player.canvas.height );
				var sizeCorrection = 30; // Verkleinerung des Bildes in Pixel
				var tempWidth      = game.player.canvas.width / game.xTiles;
				var tempHeight     = game.player.canvas.height / game.yTiles;
				game.player.context.drawImage ( game.finish.image,
												tempWidth * game.finish.posX + sizeCorrection / 2,
												tempHeight * game.finish.posY + sizeCorrection / 2,
												tempWidth - sizeCorrection,
												tempHeight - sizeCorrection );
				game.obstacles.draw ();
			}
		};
		game.finish.init ();
	},
	// Messagebox Onjekt erzeugen
	initMesssageBox: function () {
		game.messageBox = {
			image:    new Image (),
			isActive: false,
			message:  "",
			init:     function () {
				game.messageBox.image.src = "/pictures/logo.png?_=" + (new Date ().getTime ());
			},
			show:     function ( message ) {
				if ( game.messageBox.isActive || game.isDemo ) {
					return;
				}
				// Elemente erzeugen für die Message Box (Hintergrund, Bild, Text, Overlay für das Wegklicken) + anhängen an den Body
				var messageBoxBackground   = document.createElement ( "div" );
				messageBoxBackground.id    = "messageBoxBackground";
				game.messageBox.background = messageBoxBackground;
				
				var messageBoxOverlay = document.createElement ( "div" );
				messageBoxOverlay.id  = "messageBoxOverlay";
				messageBoxOverlay.addEventListener ( "click", game.messageBox.hide, false );
				game.messageBox.overlay = messageBoxOverlay;
				
				var messageBox = document.createElement ( "div" );
				messageBox.id  = "messageBox";
				
				game.messageBox.image.id = "messageBoxPicture";
				messageBox.appendChild ( game.messageBox.image );
				
				var messageBoxText       = document.createElement ( "div" );
				messageBoxText.id        = "messageBoxText";
				messageBoxText.innerHTML = message;
				messageBox.appendChild ( messageBoxText );
				
				game.messageBox.box = messageBox;
				document.body.appendChild ( messageBoxBackground );
				document.body.appendChild ( messageBox );
				document.body.appendChild ( messageBoxOverlay );
				
				game.messageBox.isActive = true;
				
			},
			hide:     function () {
				document.body.removeChild ( game.messageBox.background );
				document.body.removeChild ( game.messageBox.box );
				document.body.removeChild ( game.messageBox.overlay );
				game.messageBox.isActive = false;
			}
		};
		game.messageBox.init ();
	},
	// Erzeugen der Lauf Bausteine
	create:          function () {
		// Wenn das aktuelle Level größer als 1 ist, wird der Zurückknopf aktiviert
		if ( game.level > 1 ) {
			game.backwardArea.className += " gameActive";
		}
		// Wenn das aktuelle Level schon abgeschlossen ist, wird der Weiterknopf aktiviert
		var completed = parseInt ( localStorage.getItem ( game.area ) );
		if ( completed >= game.level ) {
			game.forwardArea.className += " gameActive";
		}
		
		// Lauf Bausteone aus den Leveldaten auslesen
		var elements     = game.levelData[ 6 ].split ( ":" )[ 1 ].split ( "," );
		var elementCount = elements.length / 2;
		var id           = 1;
		// Erzeugen von den Lauf Bausteinen nach den Werten aus den Levendaten
		for ( var i = 0; i < elementCount; i++ ) {
			var elementsToCreate = elements[ i * 2 ];
			var pClass           = "";
			var pInner           = "";
			switch ( elements[ i * 2 + 1 ] ) {
				case "up":
					pClass = "up";
					pInner = "Hoch";
					break;
				case "down":
					pClass = "down";
					pInner = "Runter";
					break;
				case "right":
					pClass = "right";
					pInner = "Rechts";
					break;
				case "left":
					pClass = "left";
					pInner = "Links";
					break;
			}
			var isFirst = true;
			for ( var k = 0; k < elementsToCreate; k++ ) {
				var p = document.createElement ( "p" );
				p.setAttribute ( "draggable", "true" );
				p.setAttribute ( "class", pClass );
				p.setAttribute ( "id", "p" + id );
				p.innerHTML = pInner;
				if ( game.isDemo ) {
					if ( isFirst ) {
						var p1 = document.createElement ( "p" );
						p1.setAttribute ( "draggable", "true" );
						p1.setAttribute ( "class", pClass );
						p1.setAttribute ( "id", "p" + id );
						p1.innerHTML = pInner;
						game.chooseArea.appendChild ( p1 );
						isFirst = false;
					}
					game.walkArea.appendChild ( p );
				}
				else {
					game.chooseArea.appendChild ( p );
				}
				
				id++;
			}
			if ( game.isDemo ) {
				setTimeout ( game.demo, 1000 );
			}
		}
		document.getElementById ( "description" ).innerHTML = game.levelData[ 0 ].split ( ":" )[ 1 ];
	},
	// Methode wenn Spiel im Demomodus(Startseite) ist (Endlosschleife mit Wartezeiten)
	demo:            function () {
		setTimeout ( game.start, 1000 );
		setTimeout ( game.reset, 6000 );
		setTimeout ( game.demo, 7000 );
	},
	// Auswertung nach drücken des Startknopfes
	start:           function () {
		if ( game.isStarted || game.isStopped ) {
			return;
		}
		
		// Bekommen der Elemente aus der Laufzone
		var walkArea = document.getElementById ( "div1" );
		var elements = walkArea.children;
		if ( elements.length === 1 ) { // Wenn nur die Überschrift vorhanden nichts machen
			return
		}
		game.isStarted = true;
		
		// Jeden Baustein mit 50 zwischenschritten ausführen, für eine flüssige Animation
		var delay = 0;
		for ( var i = 1; i < elements.length; i++ ) {
			for ( var k = 0; k < 50; k++ ) {
				delay += 10;
				if ( game.isStopped || game.isFinished ) {
					break;
				}
				setTimeout ( game.player.update, delay, elements[ i ] );
				setTimeout ( game.finish.draw, delay );
				setTimeout ( game.obstacles.draw, delay );
				setTimeout ( game.player.draw, delay );
				
			}
		}
	},
	// Auswertung nach drücken des Resetknopfes
	reset:           function () {
		// Zurücksetzen der Spielwerte
		game.isStarted  = false;
		game.isStopped  = false;
		game.isFinished = false;
		
		// Setzen des Spielers auf die Startposition und neuzeichnen
		var pos          = game.levelData[ 2 ].split ( ":" )[ 1 ].split ( "," );
		game.player.posX = pos[ 0 ];
		game.player.posY = pos[ 1 ];
		game.finish.draw ();
		game.player.draw ();
	}
};

game.init ();


