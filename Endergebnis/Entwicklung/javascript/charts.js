var charts = {
	canvas:   {},
	context:  {},
	tutorial: {},
	basics:   {},
	messages: {},
	ready:    false,
	// Werte setzen für die Charts
	init:     function () {
		charts.canvas  = document.getElementById ( "chart" );
		charts.context = charts.canvas.getContext ( "2d" );
		charts.ready   = true;
		charts.resize ();
		
		// Setzen des Fortschrittes in dem Localstorage, falls nicht vorhanden
		if ( localStorage.getItem ( "tutorial" ) === null ) {
			localStorage.setItem ( "tutorial", 0 );
		}
		if ( localStorage.getItem ( "basics" ) === null ) {
			localStorage.setItem ( "basics", 0 );
		}
		if ( localStorage.getItem ( "messages" ) === null ) {
			localStorage.setItem ( "messages", 0 );
		}
		
		// Elemente der Bereiche Zählen und auslesen der zugehörigen Fortschrittwerte aus dem Localstorage
		charts.tutorial.count = document.getElementsByClassName ( "tutorial" ).length;
		charts.tutorial.done  = parseInt ( localStorage.getItem ( "tutorial" ) );
		
		charts.basics.count = document.getElementsByClassName ( "basics" ).length;
		charts.basics.done  = parseInt ( localStorage.getItem ( "basics" ) );
		
		charts.messages.count = document.getElementsByClassName ( "messages" ).length;
		charts.messages.done  = parseInt ( localStorage.getItem ( "messages" ) );
		
	
		charts.draw ();
	},
	// Setzen der Client width und height um 1:1 skaliuerung zu gewährleisten
	resize:   function () {
		charts.canvas.setAttribute ( 'width', charts.canvas.clientWidth.toString () );
		charts.canvas.setAttribute ( 'height', charts.canvas.clientHeight.toString () );
		
	},
	// Zeichnen der Charts
	draw:     function () {
		var blankspace = 10;
		var sizing     = 20;
		
		var posX = 20;
		var posY = 20;
		
		var drawingArea = charts.canvas.clientWidth - 40;
		
		var textColor = "#000000";
		
		charts.context.font = "20px Overlock";
		
		var correctedWidth       = drawingArea / charts.tutorial.count * charts.tutorial.done;
		var percentage           = parseInt ( charts.tutorial.done * 100 / charts.tutorial.count );
		charts.context.fillStyle = textColor;
		charts.context.fillText ( "Tutorial: " + percentage + " %", posX, posY );
		
		posY += blankspace;
		charts.context.fillStyle = "#ffe1b6";
		charts.context.fillRect ( posX, posY, correctedWidth, sizing );
		
		posY += sizing + sizing;
		correctedWidth           = drawingArea / charts.basics.count * charts.basics.done;
		percentage               = parseInt ( charts.basics.done * 100 / charts.basics.count );
		charts.context.fillStyle = textColor;
		charts.context.fillText ( "Grundlagen: " + percentage + " %", posX, posY );
		
		posY += blankspace;
		charts.context.fillStyle = "#d0ffc2";
		charts.context.fillRect ( posX, posY, correctedWidth, sizing );
		
		posY += sizing + sizing;
		correctedWidth           = drawingArea / charts.messages.count * charts.messages.done;
		percentage               = parseInt ( charts.messages.done * 100 / charts.messages.count );
		charts.context.fillStyle = textColor;
		charts.context.fillText ( "Nachrichten: " + percentage + " %", posX, posY );
		
		posY += blankspace;
		charts.context.fillStyle = "#99a0ff";
		charts.context.fillRect ( posX, posY, correctedWidth, sizing );
		
		console.log ( correctedWidth );
	}
};

var listing = {
	// Erzeugen des Fortschrittes in der Auflistung
	init: function () {
		// Tutorialelemente auslesen, durchgehen der Elemente und testen ob deren nummer schon abgeschlossen ist
		var elements     = document.getElementsByClassName ( "tutorial" );
		var elementsLink = document.getElementsByClassName ( "tutorialLink" );
		var done         = parseInt ( localStorage.getItem ( "tutorial" ) );
		
		for ( var i = 0; i < elements.length; i++ ) {
			if ( i + 1 <= done ) {
				elements[ i ].className += " done";
				elementsLink[ i ].className += " listActive";
			}
		}
		
		// Basicselemente auslesen, durchgehen der Elemente und testen ob deren nummer schon abgeschlossen ist
		
		elements     = document.getElementsByClassName ( "basics" );
		elementsLink = document.getElementsByClassName ( "basicsLink" );
		done         = parseInt ( localStorage.getItem ( "basics" ) );
		
		for ( i = 0; i < elements.length; i++ ) {
			if ( i + 1 <= done ) {
				elements[ i ].className += " done";
				elementsLink[ i ].className += " listActive";
			}
		}
		
		// Messageselemente auslesen, durchgehen der Elemente und testen ob deren nummer schon abgeschlossen ist
		
		elements     = document.getElementsByClassName ( "messages" );
		elementsLink = document.getElementsByClassName ( "messagesLink" );
		done         = parseInt ( localStorage.getItem ( "messages" ) );
		
		for ( i = 0; i < elements.length; i++ ) {
			if ( i + 1 <= done ) {
				elements[ i ].className += " done";
				elementsLink[ i ].className += " listActive";
			}
		}
	}
};

charts.init ();
listing.init ();
