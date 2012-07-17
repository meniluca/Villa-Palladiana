var curvaCapitello_Controls = function(raggioMax) {
	raggioMax = raggioMax || 1;
	var controlPoints = [];

	var i = 0;
	var angolo = PI/3;

	for (i = 0; i < 30; i++) {
		controlPoints.push( [raggioMax * ( COS(i*angolo) + i*SIN(i*angolo)  ), raggioMax * ( SIN(i*angolo) - i*COS(i*angolo)  ), 0] );
	}

	return controlPoints;
};

var generateS0Knots = function(cardP, gradoC) {
	var knotsC = cardP + gradoC + 1;
	var knots = [0,0,0];
	for(var i = 0; i < (knotsC - 3 - 3); i++) {
		knots.push(i+1);
	}

	knots.push(i+1);
	knots.push(i+1);
	knots.push(i+1);

	return knots;
};

var prof1 = NUBS(S1)(2)(generateS0Knots(30,2))(curvaCapitello_Controls());

var prof2 = NUBS(S0)(2)([0,0,0,1,1,1])([[0.01,0,0],[0.02,0,0.5],[0.03,0,0]]);

DRAW(
MAP(PROFILEPROD_SURFACE([prof2,prof1]))(DOMAIN([[0,1],[0,1]])([100,100]))
);

