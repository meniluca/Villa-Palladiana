/*
    ======================
    
    Villa Badoer
    is a villa in Fratta Polesine in the Veneto region;
    it was designed in 1556 by Andrea Palladio for the Venetian noble Francesco Badoer.
    
    ======================

    The villa is decomposed in 4 main parts: the main structure, the porches, the two barchessa and the garden.
    See http://git.prdjs.com/418042/final-project/gitpages... for more information
*/


/*
    Drawer object responsable to draw villa's parts.
*/
function Drawer(){
	this.foundation = undefined;
	this.steps = undefined;
	this.baseComponents = undefined;
	this.buildingWall = undefined;
}


Drawer.prototype.addFoundation = function(foundation){
    this.foundation = foundation;
}

Drawer.prototype.drawFoundation = function(){
    if (this.foundation === undefined){
            alert("Create the model \"foundation\" before draw it!");
            return;
    }
    return DRAW(this.foundation);
}

Drawer.prototype.addSteps = function(steps){
    this.steps = steps;
}

Drawer.prototype.drawSteps = function(){
    if (this.steps === undefined){
            alert("Create the model \"steps\" before draw it!");
            return;
    }
    return DRAW(this.steps);
}

Drawer.prototype.addBaseComponents = function(baseComponents){
    this.baseComponents = baseComponents;
}

Drawer.prototype.drawBaseComponents = function(){
    if (this.baseComponents === undefined){
            alert("Create the model \"baseComponents\" before draw it!");
            return;
    }
    return DRAW(this.baseComponents);
}

Drawer.prototype.addBuildingWall = function(buildingWall){
    this.buildingWall = buildingWall;
}

Drawer.prototype.drawBuildingWall = function(){
    if (this.buildingWall === undefined){
            alert("Create the model \"buildingWall\" before draw it!");
            return;
    }
    return DRAW(this.buildingWall);
}

Drawer.prototype.drawAll = function(){
    return DRAW(STRUCT([this.mainStructure,this.foundation]));
}


/*
    Object stateless used to set proportion
*/

function Scale(){};

var scale = new Scale();

scale.proportion = 10;


/*
	Object stateless used to collect all colors
*/

function Colors(){};

var colors = new Colors();

colors.foundation = [200/255,230/255,240/255,1];
colors.hue = [1/255,230/255,240/255,1];


/*
	Object stateless used to collect all domains
*/

function Domains(){};

var domains = new Domains();

domains.stepDomain = DOMAIN([[0,1],[0,1]])([10,1]);
domains.railTopDomain = DOMAIN([[0,1],[0,1]])([20,1]);
domains.railBaseDomain = DOMAIN([[0,1],[0,1]])([10,1]);
domains.mullionDomain = DOMAIN([[0,1],[0,2*PI]])([20,10]);

/*
    Function that generates villa's foundation
*/

function foundation(){

	// Get proportion
	var p = scale.proportion || 1;

	// define height foundation
	var h1 = 0.16;
	var h2 = 0.08885;

	return STRUCT([
			COLOR(colors.foundation)(SIMPLEX_GRID([[2.24*p],[3.46*p],[h1*p]])), // A
			COLOR(colors.foundation)(SIMPLEX_GRID([[-0.18*p,1.92*p],[-0.18*p,3.1*p],[-h1*p,h2*p]])), // B
			COLOR(colors.hue)(SIMPLEX_GRID([[-2.24*p,0.14*p],[3.46*p],[h1*p]])), // A'
			COLOR(colors.hue)(SIMPLEX_GRID([[-2.1*p,0.28*p],[-0.18*p,3.1*p],[-h1*p,h2*p]])), // B'
			COLOR(colors.hue)(SIMPLEX_GRID([[-2.38*p,0.32*p],[-0.72*p,2.02*p],[(h1+h2)*p]])), // C
			//COLOR(colors.hue)(SIMPLEX_GRID([[-2.38*p,0.32*p],[-0.86*p,1.74*p],[(h1+h2)*p]])), // C da sostituire con la porta :)
			COLOR(colors.hue)(SIMPLEX_GRID([[-2.7*p,0.22*p],[-0.86*p,1.74*p],[(h1+h2)*p]])), // D
			COLOR(colors.hue)(SIMPLEX_GRID([[-3.07*p,0.27*p],[-1.05*p,1.36*p],[h1*p]]))
 		]);

}


/*
	Function that generate all the steps in the villa
*/

function steps(){

	// Get proportion
	var p = scale.proportion || 1;

	// define useful measure
	// 'hs' (height-step) is the height of a single step
    var hs = 0.01777;
	var h1 = 0.16;
	var h2 = 0.08885;

	// Control point of the profile of a single step
	var controlsStep = [
			[0*p,0*p,hs*p],
			[0.04*p,0*p,hs*p],[0.04*p,0*p,hs*p],[0.04*p,0*p,hs*p],
			[0.04*p,0*p,(hs-0.005)*p],[0.04*p,0*p,(hs-0.005)*p],
			[0.035*p,0*p,(hs-0.005)*p],[0.035*p,0*p,(hs-0.005)*p],[0.035*p,0*p,(hs-0.005)*p],[0.035*p,0*p,(hs-0.005)*p],
			[0.035*p,0*p,0*p]];

    // a single step profile
    var stepProfile = BEZIER(S0)(controlsStep);

    // Defines steps with different width
    var frontStep = MAP(CYLINDRICAL_SURFACE(stepProfile)([0,1.28*p,0]))(domains.stepDomain);
    var lateralStep = MAP(CYLINDRICAL_SURFACE(stepProfile)([0,0.28*p,0]))(domains.stepDomain);

    // Translate and repeat steps whit function t, t2, t3
    frontStep = T([0,1])([3.59*p,1.09*p])(frontStep);
    var t = T([0,2])([-0.035*p,hs*p]);
    var t2 = T([0,2])([-0.275*p,hs*p]);
    var t3 = T([0,2])([-0.41*p,hs*p]);
    // To not istance many variables, 'frontStep' now will contains many steps
    frontStep = STRUCT([
    			frontStep, t, frontStep, t, frontStep, t, frontStep, t, frontStep, t, frontStep, t, frontStep, t, frontStep, t, frontStep,
                t2, frontStep, t, frontStep, t, frontStep, t, frontStep, t, frontStep,
                t3, frontStep, t, frontStep, t, frontStep, t, frontStep, t, frontStep, t, frontStep, t, frontStep, t, frontStep, t, frontStep, t, frontStep]);

    // generate lateral right stairs
    lateralStep = R([0,1])(PI/2)(lateralStep);
    lateralStep = T([0,1])([(2.38+0.28)*p,3.17*p])(lateralStep);

    t = T([1,2])([-0.035*p,hs*p]);
    // same as 'frontStep' variable now 'lateralStep' contains all steps
    lateralStep = STRUCT([
    				lateralStep, t, lateralStep, t, lateralStep, t, lateralStep, t, lateralStep, t,
                    lateralStep, t, lateralStep, t, lateralStep, t, lateralStep, t, lateralStep, t,
                    lateralStep, t, lateralStep, t, lateralStep, t, lateralStep]);
    
    // lateral left staris
    var lateralStepRight = T([0,1])([-(2.38*2+0.28)*p,-(2.74+0.265+0.455)*p])(lateralStep);
    lateralStepRight = R([0,1])(PI)(lateralStepRight);
    
    return COLOR(colors.hue)(STRUCT([frontStep,lateralStep,lateralStepRight]));

}

/*
	Function that generates all other pieces componing foundations
*/

function baseComponents(){

	// An empty struct that will be filled and returned
	var modelList = STRUCT([]);

	// Get proportion
	var p = scale.proportion || 1;

	// height foundation steps
    var h1 = 0.16;
    var h2 = 0.08885;
    var hs = 0.01777;

    /*
		Function that generate the BASE of a rail with length 'lenBase' skewed so as to reach height 'h'.
		Parametes 'p' and 'hs' are needed to maintain proportion with other models
		Besides 'offset' is a little measure used to correct approssimation error derived from inclination
    */

	function getRailBase(p,hs,lenBase,h,offset){

		var lenBase = lenBase - 0.005;
		var hs = hs;
		var h = h;

		// hs**p

		var corner1 = BEZIER(S0)([[0.0025*p,0.0025*p,(hs+offset)*p],
								 [-0.0025*p,-0.0025*p,(0.0025+hs)*p],
								 [0.0025*p,0.0025*p,(0.005+hs+offset)*p]]);
		var corner2 = BEZIER(S0)([[0.0025*p,(lenBase+0.0025)*p,(hs+h-offset)*p],
								 [-0.0025*p,(lenBase+0.0075)*p,(0.0025+hs+h)*p],
								 [0.0025*p,(lenBase+0.0025)*p,(0.005+hs+h-offset)*p]]);
		var corner3 = BEZIER(S0)([[0.0375*p,0.0025*p,(hs+offset)*p],
								 [(0.0075+0.035)*p,-0.0025*p,(0.0025+hs)*p],
								 [0.0375*p,0.0025*p,(0.005+hs+offset)*p]]);
		var corner4 = BEZIER(S0)([[0.0375*p,(lenBase+0.0025)*p,(hs+h-offset)*p],
								 [(0.0075+0.035)*p,(lenBase+0.0075)*p,(0.0025+hs+h)*p],
								 [0.0375*p,(lenBase+0.0025)*p,(0.005+hs+h-offset)*p]]);


		return STRUCT([
				MAP(BEZIER(S1)([corner1,corner2]))(domains.railBaseDomain),
				MAP(BEZIER(S1)([corner3,corner1]))(domains.railBaseDomain),
				MAP(BEZIER(S1)([corner3,corner4]))(domains.railBaseDomain),
				MAP(BEZIER(S1)([corner2,corner4]))(domains.railBaseDomain),

				TRIANGLE_DOMAIN(1,[[0,0,(hs)*p],[0.04*p,0,(hs)*p],[0.04*p,(lenBase+0.005)*p,(hs+h)*p]]), //copertura sotto
				TRIANGLE_DOMAIN(1,[[0,0,(hs)*p],[0,(lenBase+0.005)*p,(hs+h)*p],[0.04*p,(lenBase+0.005)*p,(hs+h)*p]]),
				TRIANGLE_DOMAIN(1,[[0.0025*p,0.0025*p,(0.005+hs+offset)*p],[0.0025*p,(lenBase+0.0025)*p,(0.005+hs+h-offset)*p],
									[0.0375*p,(lenBase+0.0025)*p,(0.005+hs+h-offset)*p]]), //copertura sopra
				TRIANGLE_DOMAIN(1,[[0.0025*p,0.0025*p,(0.005+hs+offset)*p],[0.0375*p,0.0025*p,(0.005+hs+offset)*p],
									[0.0375*p,(lenBase+0.0025)*p,(0.005+hs+h-offset)*p]]),
				// bordo
				TRIANGLE_DOMAIN(1,[[0,0,0],[0,0,hs*p],[0.04*p,0,0]]), //A
				TRIANGLE_DOMAIN(1,[[0.04*p,0,hs*p],[0,0,hs*p],[0.04*p,0,0]]),
				TRIANGLE_DOMAIN(1,[[0.04*p,0,hs*p],[0.04*p,(lenBase+0.005)*p,(hs+h)*p],[0.04*p,0,0]]), //B
				TRIANGLE_DOMAIN(1,[[0.04*p,0,0],[0.04*p,(lenBase+0.005)*p,h*p],[0.04*p,(lenBase+0.005)*p,(hs+h)*p]]),
				TRIANGLE_DOMAIN(1,[[0,(lenBase+0.005)*p,h*p],[0,(lenBase+0.005)*p,(hs+h)*p],[0.04*p,(lenBase+0.005)*p,h*p]]), //C
				TRIANGLE_DOMAIN(1,[[0.04*p,(lenBase+0.005)*p,(hs+h)*p],[0,(lenBase+0.005)*p,(hs+h)*p],[0.04*p,(lenBase+0.005)*p,h*p]]),
				TRIANGLE_DOMAIN(1,[[0,0,hs*p],[0,(lenBase+0.005)*p,(hs+h)*p],[0,0,0]]), //D
				TRIANGLE_DOMAIN(1,[[0,0,0],[0,(lenBase+0.005)*p,h*p],[0,(lenBase+0.005)*p,(hs+h)*p]]),
		]);

    }


    /*
		Function that generate the TOP of a rail with length 'lenBase' and width 'widBase',
		skewed so as to reach height 'height'.
		Parametes 'p' and 'hs' are needed to maintain proportion with other models
		Besides 'offset' is a little measure used to correct approssimation error derived from inclination
    */

    function getRailTop(p, hs, lenBase, widBase, height, offset){

		var lenBase = lenBase - 0.005*2;
		var widBase = widBase - 0.005*2;

		var h = hs+hs*0.5;

		var corner1 = BEZIER(S0)([[0.005*p,0.005*p,offset*p],
							 [0,0,0.0025*p],[0,0,0.0025*p],
							 [0.0075*p,0.0075*p,h/4*p],[0.0075*p,0.0075*p,h/4*p],
							 [0.005*p,0.005*p,(h/2+offset)*p],[0.005*p,0.005*p,(h/2+offset)*p],
							 [0.0025*p,0.0025*p,h/2*p], [0.0025*p,0.0025*p,h/2*p], [0.0025*p,0.0025*p,h/2*p], [0.0025*p,0.0025*p,h/2*p], [0.0025*p,0.0025*p,h/2*p],
							 	[0.0025*p,0.0025*p,h/2*p], [0.0025*p,0.0025*p,h/2*p], [0.0025*p,0.0025*p,h/2*p], [0.0025*p,0.0025*p,h/2*p], [0.0025*p,0.0025*p,h/2*p],
							 [0.0025*p,0.0025*p,(h-0.005)*p], [0.0025*p,0.0025*p,(h-0.005)*p], [0.0025*p,0.0025*p,(h-0.005)*p],
							 	[0.0025*p,0.0025*p,(h-0.005)*p], [0.0025*p,0.0025*p,(h-0.005)*p], [0.0025*p,0.0025*p,(h-0.005)*p],
							 [0,0,(h-0.0025)*p], [0,0,(h-0.0025)*p], [0,0,(h-0.0025)*p], [0,0,(h-0.0025)*p],
							 [0,0,h*p],[0,0,h*p],
							 [0.005*p,0.005*p,(h+offset)*p]]);

		var corner2 = BEZIER(S0)([[0.005*p,(0.005+lenBase)*p,(height-offset)*p],
							 [0,(lenBase+2*0.005)*p,(0.0025+height)*p],	[0,(lenBase+2*0.005)*p,(0.0025+height)*p],
							 [0.0075*p,(lenBase-0.005+0.0075)*p,(height+h/4)*p], [0.0075*p,(lenBase-0.005+0.0075)*p,(height+h/4)*p],
							 [0.005*p,(0.005+lenBase)*p,(height+h/2-offset)*p],	[0.005*p,(0.005+lenBase)*p,(height+h/2-offset)*p],
							 [0.0025*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p], [0.0025*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p],
							 	[0.0025*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p],	[0.0025*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p],
							 	[0.0025*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p], [0.0025*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p],
							 	[0.0025*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p],	[0.0025*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p],
							 	[0.0025*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p],	[0.0025*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p],
							 [0.0025*p,(0.005+lenBase+0.0025)*p,(height+h-0.005)*p], [0.0025*p,(0.005+lenBase+0.0025)*p,(height+h-0.005)*p],
							 	[0.0025*p,(0.005+lenBase+0.0025)*p,(height+h-0.005)*p], [0.0025*p,(0.005+lenBase+0.0025)*p,(height+h-0.005)*p],
							 	[0.0025*p,(0.005+lenBase+0.0025)*p,(height+h-0.005)*p],	[0.0025*p,(0.005+lenBase+0.0025)*p,(height+h-0.005)*p],
							 [0,(lenBase+2*0.005)*p,(height+h-0.0025)*p], [0,(lenBase+2*0.005)*p,(height+h-0.0025)*p],
							 	[0,(lenBase+2*0.005)*p,(height+h-0.0025)*p], [0,(lenBase+2*0.005)*p,(height+h-0.0025)*p],
							 [0,(lenBase+2*0.005)*p,(height+h)*p], [0,(lenBase+2*0.005)*p,(height+h)*p],
							 [0.005*p,(0.005+lenBase)*p,(height+h-offset)*p]]);


		var corner3 = BEZIER(S0)([[(0.005+widBase)*p,0.005*p,offset*p],
							 [(0.005*2+widBase)*p,0,0.0025*p],[(0.005*2+widBase)*p,0,0.0025*p],
							 [(0.0075+widBase-0.005)*p,0.0075*p,h/4*p],[(0.0075+widBase-0.005)*p,0.0075*p,h/4*p],
							 [(0.005+widBase)*p,0.005*p,(h/2+offset)*p],[(0.005+widBase)*p,0.005*p,(h/2+offset)*p],
							 [(0.005+widBase+0.0025)*p,0.0025*p,h/2*p],[(0.005+widBase+0.0025)*p,0.0025*p,h/2*p],[(0.005+widBase+0.0025)*p,0.0025*p,h/2*p],
							 	[(0.005+widBase+0.0025)*p,0.0025*p,h/2*p], [(0.005+widBase+0.0025)*p,0.0025*p,h/2*p], [(0.005+widBase+0.0025)*p,0.0025*p,h/2*p],
							 	[(0.005+widBase+0.0025)*p,0.0025*p,h/2*p], [(0.005+widBase+0.0025)*p,0.0025*p,h/2*p], [(0.005+widBase+0.0025)*p,0.0025*p,h/2*p],
							 	[(0.005+widBase+0.0025)*p,0.0025*p,h/2*p],
							 [(0.005+widBase+0.0025)*p,0.0025*p,(h-0.005)*p], [(0.005+widBase+0.0025)*p,0.0025*p,(h-0.005)*p], [(0.005+widBase+0.0025)*p,0.0025*p,(h-0.005)*p],
							 	[(0.005+widBase+0.0025)*p,0.0025*p,(h-0.005)*p], [(0.005+widBase+0.0025)*p,0.0025*p,(h-0.005)*p], [(0.005+widBase+0.0025)*p,0.0025*p,(h-0.005)*p],
							 [(0.005*2+widBase)*p,0,(h-0.0025)*p],[(0.005*2+widBase)*p,0,(h-0.0025)*p],[(0.005*2+widBase)*p,0,(h-0.0025)*p],[(0.005*2+widBase)*p,0,(h-0.0025)*p],
							 [(0.005*2+widBase)*p,0,h*p],[(0.005*2+widBase)*p,0,h*p],
							 [(0.005+widBase)*p,0.005*p,(h+offset)*p]]);

		var corner4 = BEZIER(S0)([[(0.005+widBase)*p,(0.005+lenBase)*p,(height-offset)*p],
							 [(0.005*2+widBase)*p,(lenBase+2*0.005)*p,(0.0025+height)*p], [(0.005*2+widBase)*p,(lenBase+2*0.005)*p,(0.0025+height)*p],
							 [(0.0075+widBase-0.005)*p,(lenBase-0.005+0.0075)*p,(height+h/4)*p], [(0.0075+widBase-0.005)*p,(lenBase-0.005+0.0075)*p,(height+h/4)*p],
							 [(0.005+widBase)*p,(0.005+lenBase)*p,(height+h/2-offset)*p], [(0.005+widBase)*p,(0.005+lenBase)*p,(height+h/2-offset)*p],
							 [(0.005+widBase+0.0025)*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p], [(0.005+widBase+0.0025)*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p],
							 	[(0.005+widBase+0.0025)*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p], [(0.005+widBase+0.0025)*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p],
							 	[(0.005+widBase+0.0025)*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p], [(0.005+widBase+0.0025)*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p],
							 	[(0.005+widBase+0.0025)*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p], [(0.005+widBase+0.0025)*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p],
							 	[(0.005+widBase+0.0025)*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p], [(0.005+widBase+0.0025)*p,(0.005+lenBase+0.0025)*p,(height+h/2)*p],
							 [(0.005+widBase+0.0025)*p,(0.005+lenBase+0.0025)*p,(height+h-0.005)*p], [(0.005+widBase+0.0025)*p,(0.005+lenBase+0.0025)*p,(height+h-0.005)*p],
							 	[(0.005+widBase+0.0025)*p,(0.005+lenBase+0.0025)*p,(height+h-0.005)*p], [(0.005+widBase+0.0025)*p,(0.005+lenBase+0.0025)*p,(height+h-0.005)*p],
							 	[(0.005+widBase+0.0025)*p,(0.005+lenBase+0.0025)*p,(height+h-0.005)*p], [(0.005+widBase+0.0025)*p,(0.005+lenBase+0.0025)*p,(height+h-0.005)*p],
							 [(0.005*2+widBase)*p,(lenBase+2*0.005)*p,(height+h-0.0025)*p], [(0.005*2+widBase)*p,(lenBase+2*0.005)*p,(height+h-0.0025)*p],
							 	[(0.005*2+widBase)*p,(lenBase+2*0.005)*p,(height+h-0.0025)*p], [(0.005*2+widBase)*p,(lenBase+2*0.005)*p,(height+h-0.0025)*p],
							 [(0.005*2+widBase)*p,(lenBase+2*0.005)*p,(height+h)*p], [(0.005*2+widBase)*p,(lenBase+2*0.005)*p,(height+h)*p],
							 [(0.005+widBase)*p,(0.005+lenBase)*p,(height+h-offset)*p]]);



		return STRUCT([
						MAP(BEZIER(S1)([corner1,corner2]))(domains.railTopDomain),
						MAP(BEZIER(S1)([corner3,corner1]))(domains.railTopDomain),
						MAP(BEZIER(S1)([corner3,corner4]))(domains.railTopDomain),
						MAP(BEZIER(S1)([corner2,corner4]))(domains.railTopDomain),
						TRIANGLE_DOMAIN(1,[[0.005*p,0.005*p,offset*p],[(0.005+widBase)*p,0.005*p,offset*p],[(0.005+widBase)*p,(0.005+lenBase)*p,(height-offset)*p]]),
						TRIANGLE_DOMAIN(1,[[0.005*p,0.005*p,offset*p],[0.005*p,(0.005+lenBase)*p,(height-offset)*p],[(0.005+widBase)*p,(0.005+lenBase)*p,(height-offset)*p]]),
						TRIANGLE_DOMAIN(1,[[0.005*p,0.005*p,(h+offset)*p],[(0.005+widBase)*p,0.005*p,(h+offset)*p],[(0.005+widBase)*p,(0.005+lenBase)*p,(height+h-offset)*p]]),
						TRIANGLE_DOMAIN(1,[[0.005*p,0.005*p,(h+offset)*p],[0.005*p,(0.005+lenBase)*p,(height+h-offset)*p],[(0.005+widBase)*p,(0.005+lenBase)*p,(height+h-offset)*p]]),
						]);

	}


	/*
		Function that generate a single mullion with setted height
		calcolated since hs
	*/

	function getMullion(p, hs){

		var h = 7.05*hs;

		var hz = 0.035;

		var cube = CUBOID([0.0325*p,0.0325*p,(hz)*p]);

		var profile = BEZIER(S0)([ [0.016*p,0,(hz)*p], [0.016*p,0,(hz+0.008)*p], [0,0,(hz)*p],
			[0,0,(hz+0.008)*p],	[0,0,(hz+0.008)*p],	[0,0,(hz+0.008)*p], [0.0363*p,0,(hz+h/2-0.025)*p], [0.0361*p,0,(hz+h/2-0.018)*p],
			[0,0,(hz+h/2-0.035)*p],	[0.005*p,0,(hz+h-h/7.3)*p],	[0,0,(hz+h-h/7.3)*p], [0,0,(hz+h-h/7.3)*p],
			[0.0112*p,0,(hz+h-h/5.4)*p], [0.0112*p,0,(hz+h-h/5.4)*p], [0.0112*p,0,(hz+h-h/5.4)*p], [0.0112*p,0,(hz+h)*p]
			]);

	 	var profile = ROTATIONAL_SURFACE(profile);
		var surface = MAP(profile)(domains.mullionDomain);

		return STRUCT([T([0,1])([0.016*p,0.016*p])(surface),cube]);

	}

	//
	// RAILS
	//

	// Rail left divided in parts, from the bottom till the top one (look at the plant)
	var railLeft1 = getRailBase(p,hs,0.29,h1,0.0015);
	var railLeftTop1 = getRailTop(p,hs,0.29,0.04,h1,0.0025);
	railLeft1 = T([0,1])([3.63*p,1.05*p])(R([0,1])(PI/2)(railLeft1));
	railLeftTop1 = T([0,1,2])([3.62*p,1.05*p,(8*hs+0.005)*p])(R([0,1])(PI/2)(railLeftTop1));

	var railLeft2 = getRailBase(p,hs,0.27,0,0);
	var railLeftTop2 = getRailTop(p,hs,0.26,0.04,0,0);
	railLeft2 = T([0,1,2])([3.34*p,1.05*p,h1*p])(R([0,1])(PI/2)(railLeft2));
	railLeftTop2 = T([0,1,2])([3.34*p,1.05*p,(h1+8*hs+0.005)*p])(R([0,1])(PI/2)(railLeftTop2));

	var railLeft3 = getRailBase(p,hs,0.15,h2,0.0015);
	var railLeftTop3 = getRailTop(p,hs,0.155,0.04,h2,0.0025);
	railLeft3 = T([0,1,2])([3.07*p,1.05*p,h1*p])(R([0,1])(PI/2)(railLeft3));
	railLeftTop3 = T([0,1,2])([3.0725*p,1.05*p,(h1+8*hs+0.005)*p])(R([0,1])(PI/2)(railLeftTop3));

	var railLeft4 = getRailBase(p,hs,0.23,0,0);
	var railLeftTop4 = getRailTop(p,hs,0.23,0.04,0,0);
	railLeft4 = T([0,1,2])([2.88*p,0.86*p,(h2+h1)*p])(railLeft4);
	railLeftTop4 = T([0,1,2])([2.88*p,0.86*p,(h1+h2+8*hs+0.005)*p])(railLeftTop4);

	var railLeft5 = getRailBase(p,hs,0.26,0,0);
	var railLeftTop5 = getRailTop(p,hs,0.225,0.04,0,0);
	railLeft5 = T([0,1,2])([2.92*p,0.86*p,(h2+h1)*p])(R([0,1])(PI/2)(railLeft5));
	railLeftTop5 = T([0,1,2])([2.92*p,0.86*p,(h1+h2+8*hs+0.005)*p])(R([0,1])(PI/2)(railLeftTop5));

	var railLeft6 = getRailBase(p,hs,0.18,0,0);
	var railLeftTop6 = getRailTop(p,hs,0.18,0.04,0,0);
	railLeft6 = T([0,1,2])([2.66*p,0.72*p,(h2+h1)*p])(railLeft6);
	railLeftTop6 = T([0,1,2])([2.66*p,0.72*p,(h1+h2+8*hs+0.005)*p])(railLeftTop6);

	var railLeft7 = getRailBase(p,hs,0.48,(h1+h2),0.0015);
	var railLeftTop7 = getRailTop(p,hs,0.455,0.04,(h1+h2),0.0025);
	railLeft7 = T([0,1])([2.66*p,0.25*p])(railLeft7);
	railLeftTop7 = T([0,1,2])([2.66*p,0.25*p,(8*hs+0.005)*p])(railLeftTop7);

	var railLeft8 = getRailBase(p,hs,0.32,10*hs,0.0015);
	var railLeftTop8 = getRailTop(p,hs,0.27,0.04,10.05*hs,0.0026);
	railLeft8 = T([0,1,2])([2.52*p,1.05*p,(h1+h2)*p])(R([0,1])(PI/2)(railLeft8));
	railLeftTop8 = T([0,1,2])([2.51*p,1.05*p,(h1+h2+8*hs+0.005)*p])(R([0,1])(PI/2)(railLeftTop8));

	var railLeft9 = getRailBase(p,hs,0.52,0,0);
	var railLeftTop9 = getRailTop(p,hs,0.52,0.04,0,0);
	railLeft9 = T([0,1,2])([2.34*p,0.18*p,(h1+h2)*p])(railLeft9);
	railLeftTop9 = T([0,1,2])([2.34*p,0.18*p,(h1+h2+8*hs+0.005)*p])(railLeftTop9);


	// Generate rail's struct to generate right side
	var modelRailsLeft = STRUCT([
				railLeft1,railLeftTop1, railLeft2,railLeftTop2, railLeft3,railLeftTop3, railLeft4,railLeftTop4, railLeft5,railLeftTop5, 
				railLeft6,railLeftTop6, railLeft7,railLeftTop7, railLeft8,railLeftTop8, railLeft9,railLeftTop9]);

	var modelRailsRight = T([1])([3.46*p])(S([1])([-1])(modelRailsLeft));

    modelList = STRUCT([modelRailsLeft,modelRailsRight]);


    //
    // PILLARS
    //

    // A single pillar
    var pillar = SIMPLEX_GRID([[0.04*p],[0.04*p],[((8*hs+0.005)+0.04)*p]]);
	pillar = T([0,1])([3.59*p,1.05*p])(pillar);
	var pillarBaseFrieze = getRailBase(p,hs,0.04,0,0);
	var pillarEnv = T([0,1])([3.595*p,1.055*p])(SIMPLEX_GRID([[0.03*p],[0.03*p],[((8*hs+0.005)+0.04)*p]]));
	pillarBaseFrieze = S([0,1])([1.25,1.25])(pillarBaseFrieze);
	pillarBaseFrieze = T([0,1,2])([3.585*p,1.045*p,hs*p])(pillarBaseFrieze);
	var pillarBase = SIMPLEX_GRID([[0.05*p],[0.05*p],[hs*p]]);
	pillarBase = T([0,1])([3.585*p,1.045*p])(pillarBase);
	var pillarTop = getRailTop(p,hs,0.05,0.05,0,0);
	pillarTop = T([0,1,2])([3.585*p,1.045*p,((9*hs+0.005))*p])(pillarTop);
	var pillarStructStair = STRUCT([pillar,pillarTop,pillarBaseFrieze]);
	var pillarStruct = STRUCT([pillarStructStair,pillarBase]);

	// all pillars in a struct
	var modelPillarsLeft = STRUCT([pillarStruct,
				 T([0,2])([-0.30*p,(h1-hs)*p])(pillarStructStair), T([0,2])([-0.29*p,(h1-hs)*p])(pillarEnv), T([0,2])([-0.31*p,(h1-hs)*p])(pillarEnv),
				 T([0,2])([-0.52*p,(h1-hs)*p])(pillarStructStair), T([0,2])([-0.51*p,(h1-hs)*p])(pillarEnv), T([0,2])([-0.53*p,(h1-hs)*p])(pillarEnv),
				 T([0,2])([-0.71*p,(h1+h2-hs)*p])(pillarStructStair), T([0,1,2])([-0.71*p,-0.19*p,(h1+h2-hs)*p])(pillarStructStair), 
				 T([0,1,2])([-0.93*p,-0.19*p,(h1+h2-hs)*p])(pillarStructStair), T([0,1,2])([-0.93*p,-0.35*p,(h1+h2-hs)*p])(pillarStructStair),
				 T([0,1,2])([-0.93*p,-0.81*p,0])(pillarStruct), T([0,2])([-1.39 *p,(h1+h2+9*hs)*p])(pillarStruct), T([0,2])([-1.11*p,(h1+h2)*p])(pillarStruct),
				 T([0,1,2])([-1.25*p,-0.37*p,(h1+h2-hs)*p])(pillarStruct), T([0,1,2])([-1.25*p,-0.87*p,(h1+h2-hs)*p])(pillarStructStair) ]);

	var modelPillarsRight = T([1])([3.46*p])(S([1])([-1])(modelPillarsLeft));

	// Adding pillar to the general struct
	modelList = STRUCT([modelList,modelPillarsLeft,modelPillarsRight]);

	//
	// MULLIONS
	//

	var mullion = getMullion(p,hs);

	var simplePillar = SIMPLEX_GRID([[0.03*p],[0.03*p],[((9*hs+0.005))*p]]);

	// There are all mullions from the frontal stairs till the farest one
	var modelMullionsLeft= STRUCT([
		T([0,1,2])([3.545*p,1.055*p,(hs+1.4*hs/2)*p])(mullion),
		T([0,1,2])([3.505*p,1.055*p,(hs+4*hs/2)*p])(mullion),
		T([0,1,2])([3.465*p,1.055*p,(hs+6.6*hs/2)*p])(mullion),
		T([0,1,2])([3.425*p,1.055*p,(hs+9.2*hs/2)*p])(mullion),
		T([0,1,2])([3.385*p,1.055*p,(hs+12*hs/2)*p])(mullion),
		T([0,1,2])([3.345*p,1.055*p,(hs+14.4*hs/2)*p])(mullion),
		//h1 : middle
		T([0,1,2])([3.245*p,1.055*p,(h1+hs/2.8)*p])(mullion),
		T([0,1,2])([3.203*p,1.055*p,(h1+hs/2.8)*p])(mullion),
		T([0,1,2])([3.1625*p,1.055*p,(h1+hs/2.8)*p])(mullion),
		T([0,1,2])([3.12*p,1.055*p,(h1+hs/2.8)*p])(mullion),
		//h2
		T([0,1,2])([3.025*p,1.055*p,(h1+hs)*p])(mullion),
		T([0,1,2])([2.98*p,1.055*p,(h1+5*hs/2)*p])(mullion),
		T([0,1,2])([2.935*p,1.055*p,(h1+8*hs/2)*p])(mullion),
		// h1+h2
		T([0,1,2])([2.8825*p,1.0025*p,(h1+h2+hs/2.8)*p])(mullion),
		T([0,1,2])([2.8825*p,0.9575*p,(h1+h2+hs/2.8)*p])(mullion),
		T([0,1,2])([2.8825*p,0.913*p,(h1+h2+hs/2.8)*p])(mullion),
		T([0,1,2])([2.84*p,0.8635*p,(h1+h2+hs/2.8)*p])(mullion),
		T([0,1,2])([2.7975*p,0.8635*p,(h1+h2+hs/2.8)*p])(mullion),
		T([0,1,2])([2.7525*p,0.8635*p,(h1+h2+hs/2.8)*p])(mullion),
		T([0,1,2])([2.71*p,0.8635*p,(h1+h2+hs/2.8)*p])(mullion),
		T([0,1,2])([2.663*p,0.82*p,(h1+h2+hs/2.8)*p])(mullion),
		T([0,1,2])([2.663*p,0.7825*p,(h1+h2+hs/2.8)*p])(mullion),
		T([0,1,2])([2.663*p,0.745*p,(h1+h2+hs/2.8)*p])(mullion),
		// lateral stairs
		T([0,1,2])([2.663*p,0.65*p,(12.5*hs)*p])(mullion),
		T([0,1,2])([2.663*p,0.605*p,(11.3*hs)*p])(mullion),
		T([0,1,2])([2.663*p,0.56*p,(10*hs)*p])(simplePillar),
		T([0,1,2])([2.663*p,0.515*p,(8.6*hs)*p])(mullion),
		T([0,1,2])([2.663*p,0.470*p,(7.1*hs)*p])(mullion),
		T([0,1,2])([2.663*p,0.425*p,(6*hs)*p])(mullion),
		T([0,1,2])([2.663*p,0.380*p,(4.5*hs)*p])(simplePillar),
		T([0,1,2])([2.663*p,0.335*p,(3*hs)*p])(mullion),
		T([0,1,2])([2.663*p,0.290*p,(1.5*hs)*p])(mullion),
		// lateral above stairs
		T([0,1,2])([2.3425*p,0.6375*p,(h1+h2+hs/2.8)*p])(mullion),
		T([0,1,2])([2.3425*p,0.5925*p,(h1+h2+hs/2.8)*p])(mullion),
		T([0,1,2])([2.3425*p,0.5475*p,(h1+h2+hs/2.8)*p])(mullion),
		T([0,1,2])([2.3425*p,0.5025*p,(h1+h2+hs/2.8)*p])(simplePillar),
		T([0,1,2])([2.3425*p,0.4575*p,(h1+h2+hs/2.8)*p])(mullion),
		T([0,1,2])([2.3425*p,0.4125*p,(h1+h2+hs/2.8)*p])(mullion),
		T([0,1,2])([2.3425*p,0.3675*p,(h1+h2+hs/2.8)*p])(simplePillar),
		T([0,1,2])([2.3425*p,0.3225*p,(h1+h2+hs/2.8)*p])(mullion),
		T([0,1,2])([2.3425*p,0.2775*p,(h1+h2+hs/2.8)*p])(mullion),
		T([0,1,2])([2.3425*p,0.2325*p,(h1+h2+hs/2.8)*p])(mullion),
		// lodge stairs
		T([0,1,2])([2.4445*p,1.055*p,(h1+h2+4*hs/2)*p])(mullion),
		T([0,1,2])([2.4045*p,1.055*p,(h1+h2+6.5*hs/2)*p])(mullion),
		T([0,1,2])([2.3645*p,1.055*p,(h1+h2+10*hs/2)*p])(mullion),
		T([0,1,2])([2.3245*p,1.055*p,(h1+h2+12.5*hs/2)*p])(mullion),
		T([0,1,2])([2.2845*p,1.055*p,(h1+h2+15.4*hs/2)*p])(mullion),
		T([0,1,2])([2.2445*p,1.055*p,(h1+h2+18*hs/2)*p])(mullion),
		]);


	var modelMullionsRight = T([1])([3.46*p])(S([1])([-1])(modelMullionsLeft));

	modelList = STRUCT([modelList,modelMullionsLeft,modelMullionsRight]);

	// WALLS

    var wallsLeft = STRUCT([
    					TRIANGLE_DOMAIN(1,[[2.7*p,0.24*p,0],[2.7*p,0.72*p,0],[2.7*p,0.72*p,(h1+h2)*p]]), //lateral stairs
    					TRIANGLE_DOMAIN(1,[[3.63*p,1.05*p,0],[3.34*p,1.05*p,0],[3.34*p,1.05*p,(h1)*p]]), // lateral
    					TRIANGLE_DOMAIN(1,[[3.07*p,1.05*p,0],[2.92*p,1.05*p,0],[2.92*p,1.05*p,(h1+h2)*p]]), // lateral
    					TRIANGLE_DOMAIN(1,[[3.07*p,1.05*p,0],[3.07*p,1.05*p,h1*p],[2.92*p,1.05*p,(h1+h2)*p]]), // stairs
    					TRIANGLE_DOMAIN(1,[[2.52*p,1.05*p,(h1+h2)*p],[2.195*p,1.05*p,(h1+h2+10.2*hs)*p],[2.195*p,1.05*p,(h1+h2)*p]]) //lodge stairs
    					]);

	var wallsRight = T([1])([3.46*p])(S([1])([-1])(wallsLeft));

	return COLOR(colors.hue)(STRUCT([modelList, wallsLeft, wallsRight]));


}


function buildingWall(){

	function getWall(p,controlPoints){
		return COLOR(colors.hue)(
				STRUCT([
					TRIANGLE_DOMAIN(1,[PROD([p,controlPoints[0]]),PROD([p,controlPoints[1]]),PROD([p,controlPoints[3]])]),
					TRIANGLE_DOMAIN(1,[PROD([p,controlPoints[1]]),PROD([p,controlPoints[3]]),PROD([p,controlPoints[2]])])
					]));
	}

	// Get proportion
	var p = scale.proportion || 1;

	// height foundation steps
    var h1 = 0.16;
    var h2 = 0.08885;
    var hs = 0.01777;

	// Lodge floor

	var lodgeFloor = SIMPLEX_GRID([[-0.42*p,1.72*p],[-0.42*p,2.62*p],[-(h1+h2+10*hs-2*hs)*p,2*hs*p]]);

   // var lodgefloor = SIMPLEX_GRID([[-1.7*p, 0.495*p],[-1.05*p,1.36*p]]);
   // lodgefloor = lodgefloor.translate([2],[(h1+h2+10*hs)*p]);
//
   // // BUG: cannot add it in the struct
   // DRAW(lodgefloor); //    modelList = STRUCT([modelList,lodgefloor]);

   return lodgeFloor;

}

function buildingRoof(){

}

function colums(){

}

function buildingComponents(){

}

    

/*
	Function charged to create an object Drawer and draw the villa
*/
function drawVilla(){
	var drawer = new Drawer();

	drawer.addFoundation(foundation());
	drawer.drawFoundation();
	drawer.addSteps(steps());
	drawer.drawSteps();
	drawer.addBaseComponents(baseComponents());
	drawer.drawBaseComponents();
	drawer.addBuildingWall(buildingWall());
	drawer.drawBuildingWall();

	//drawer.all();
}

drawVilla();



// TO DELETE:

//	DRAW(COLOR([0,0,1])(STRUCT([POLYLINE([[3.63*p,0,0],[3.63*p,3.46*p,0]])])));//,POLYPOINT([[3.6*p,1.09*p,0],[3.64*p,1.09*p,0]])])));
