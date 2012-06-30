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
    this.mainStructure = undefined;
    this.porches = undefined;
}

Drawer.prototype.addMainStructure = function(mainStructure){
    this.mainStructure = mainStructure;
}

Drawer.prototype.drawMainStructure = function(){
    if (this.mainStructure === undefined){
            alert("Create the model \"mainStructure\" before draw it!");
            return;
    }
    return DRAW(this.mainStructure);
}


Drawer.prototype.addPorches = function(porches){
    this.porches = porches;
}

Drawer.prototype.drawPorches = function(){
    if (this.porches === undefined){
            alert("Create the model \"porches\" before draw it!");
            return;
    }
    return DRAW(this.porches);
}


Drawer.prototype.drawAll = function(){
    return DRAW(STRUCT([this.mainStructure,this.porches]));
}

/*
    Object stateless used to set proportion
*/
function Scale(){};

var scale = new Scale();

scale.proportion = 10;


/*
    The main structure
*/

function mainStructure(){

    // An empty struct that will be filled and returned
    var modelList = STRUCT([]);

    // Get proportion
    var p = scale.proportion || 1;

    // FOUNDATION

    // height foundation steps
    var h1 = 0.16;
    var h2 = 0.08885;

    var foundation = [
					SIMPLEX_GRID([[2.38*p],[3.46*p],[h1*p]]), // A
					SIMPLEX_GRID([[-0.18*p,2.2*p],[-0.18*p,3.1*p],[-h1*p,h2*p]]), // B
					SIMPLEX_GRID([[-2.38*p,0.32*p],[-0.72*p,2.02*p],[(h1+h2)*p]]), // C
					SIMPLEX_GRID([[-2.7*p,0.22*p],[-0.86*p,1.74*p],[(h1+h2)*p]]), // D
					SIMPLEX_GRID([[-3.07*p,0.27*p],[-1.05*p,1.36*p],[h1*p]])
 			];

    modelList = STRUCT(foundation);

    // STAIRS

    // 'hs' (height-step) is the height of a single step
    var hs = 0.01777;

    var controlsStep = [
                    [0*p,0*p,hs*p],
                    [0.04*p,0*p,hs*p],[0.04*p,0*p,hs*p],[0.04*p,0*p,hs*p],
                    [0.04*p,0*p,(hs-0.005)*p],[0.04*p,0*p,(hs-0.005)*p],
                    [0.035*p,0*p,(hs-0.005)*p],[0.035*p,0*p,(hs-0.005)*p],[0.035*p,0*p,(hs-0.005)*p],[0.035*p,0*p,(hs-0.005)*p],
                    [0.035*p,0*p,0*p]
            ];

    // a single step profile
    var stepProfile = BEZIER(S0)(controlsStep);

    var domain2D = DOMAIN([[0,1],[0,1]])([10,1]);

    // Defines steps with different width
    var step = MAP(CYLINDRICAL_SURFACE(stepProfile)([0,1.28*p,0]))(domain2D);
    var stepLittle = MAP(CYLINDRICAL_SURFACE(stepProfile)([0,0.28*p,0]))(domain2D);

    // Translate and repeat steps
    step = T([0,1])([3.59*p,1.09*p])(step);
    var t = T([0,2])([-0.035*p,hs*p]);
    var t2 = T([0,2])([-0.275*p,hs*p]);
    var t3 = T([0,2])([-0.41*p,hs*p]);
    // To not istance many variables, 'step' now will contains many steps
    step = STRUCT([step, t, step, t, step, t, step, t, step, t, step, t, step, t, step, t, step,
                   t2, step, t, step, t, step, t, step, t, step,
                   t3, step, t, step, t, step, t, step, t, step, t, step, t, step, t, step, t, step, t, step]); // TODO aggiungere gli altri scalini

    // add steps to the final model
    modelList = STRUCT([modelList,step]);

    // generate lateral right stairs
    stepLittle = R([0,1])(PI/2)(stepLittle);
    stepLittle = T([0,1])([(2.38+0.28)*p,3.17*p])(stepLittle);

    t = T([1,2])([-0.035*p,hs*p]);
    // same as 'step' variable now 'stepLittle' contains all steps
    stepLittle = STRUCT([stepLittle, t, stepLittle, t, stepLittle, t, stepLittle, t, stepLittle, t,
                         stepLittle, t, stepLittle, t, stepLittle, t, stepLittle, t, stepLittle, t,
                         stepLittle, t, stepLittle, t, stepLittle, t, stepLittle]);
    
    // lateral left staris
    var stepLittleRigth = T([0,1])([-(2.38*2+0.28)*p,-(2.74+0.265+0.455)*p])(stepLittle);
    stepLittleRigth = R([0,1])(PI)(stepLittleRigth);
    //stepLittleRigth = T([0,1])([(2.38*2+0.04+0.28)*p,(2.02+0.18+0.54+0.54+0.18)*p])(stepLittleRigth);
    
    modelList = STRUCT([modelList,stepLittle,stepLittleRigth]);

    // Lodge floor

    var lodgefloor = SIMPLEX_GRID([[-1.7*p, 0.495*p],[-1.05*p,1.36*p]]);
    lodgefloor = lodgefloor.translate([2],[(h1+h2+10*hs)*p]);

    // BUG: cannot add it in the struct
    DRAW(lodgefloor); //    modelList = STRUCT([modelList,lodgefloor]);


 	// RAILS

function getRailBase(p,hs,lenBase,h,offset){

		var lenBase = lenBase - 0.005*2*p;
		var hs = hs;
		var h = h;

		domain2D = DOMAIN([[0,1],[0,1]])([20,1]);

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
					MAP(BEZIER(S1)([corner1,corner2]))(domain2D),
					MAP(BEZIER(S1)([corner3,corner1]))(domain2D),
					MAP(BEZIER(S1)([corner3,corner4]))(domain2D),
					MAP(BEZIER(S1)([corner2,corner4]))(domain2D),

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

	DRAW(SIMPLEX_GRID([[-2.66*p,0.04*p],[-0.24*p,0.48*p,-2.02*p,0.48*p],[hs*2*p]]));
	DRAW(SIMPLEX_GRID([[-3.34*p,0.29*p],[-1.05*p,0.04*p,-1.28*p,0.04*p],[hs*2*p]]));



	//var stairs
	//var building
	//var porch
	//var roof

	return modelList;

}

/*
	Function charged to create an object Drawer and draw the villa
*/
function drawVilla(){
	var drawer = new Drawer();
	drawer.addMainStructure(mainStructure());
	drawer.drawMainStructure();
}

drawVilla();


// TO DELETE:

//	DRAW(COLOR([0,0,1])(STRUCT([POLYLINE([[3.63*p,0,0],[3.63*p,3.46*p,0]])])));//,POLYPOINT([[3.6*p,1.09*p,0],[3.64*p,1.09*p,0]])])));
