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
	this.modelList = [];
}

Drawer.prototype.addModel = function(newModelList){
	this.modelList = this.modelList.concat(newModelList);
}

Drawer.prototype.draw = function(){
	return DRAW(STRUCT(this.modelList));
}


/*
	Object stateless used to set proportion
*/
function Scale(){};

var scale = new Scale();

scale.proportion = 20;


/*
	The main structure
*/

function mainStructure(){

	// Get proportion
	var p = scale.proportion;

	// height foundation step
	var h = 0.16;

	var foundation = [
						SIMPLEX_GRID([[2.24*p],[3.46*p],[h*p]]),
						SIMPLEX_GRID([[-0.18*p,2.2*p],[-0.2*p,3.1*p],[-h*p,0.1*p]]),
						SIMPLEX_GRID([[-2.38*p,0.32*p],[-0.72*p,2.02*p],[(h+0.1)*p]]),
						SIMPLEX_GRID([[-2.7*p,0.22*p],[-0.86*p,1.74*p],[(h+0.1)*p]])
					 ];

	// STAIRS

	// 'hs' (height-step) is the height of a single step
	var hs = 0.01777;

	var controlsStep = [
			[0*p,0*p,hs*p],
			[0*p,0.035*p,hs*p],[0*p,0.035*p,hs*p],[0*p,0.035*p,hs*p],
			[0*p,0.035*p,(hs-0.005)*p],[0*p,0.035*p,(hs-0.005)*p],
			[0*p,0.03*p,(hs-0.005)*p],[0*p,0.03*p,(hs-0.005)*p],[0*p,0.03*p,(hs-0.005)*p],[0*p,0.03*p,(hs-0.005)*p],
			[0*p,0.03*p,0*p]
		];

	var stepProfile = BEZIER(S0)(controlsStep);

	var domain2Dstep = DOMAIN([[0,1],[0,1]])([10,1]);

	// Defines steps with different width
	var step = MAP(CYLINDRICAL_SURFACE(stepProfile)([1.28*p,0,0]))(domain2Dstep);
	var stepLittle = MAP(CYLINDRICAL_SURFACE(stepProfile)([0.28*p,0,0]))(domain2Dstep);

	//delete: DRAW(COLOR([1,0,0])(POLYPOINT([[0,0.035*p]])));

	//var stairs
	//var building
	//var porch
	//var roof

	return step;

}

/*
	Function charged to create an object Drawer and draw the villa
*/
function drawVilla(){
	var drawer = new Drawer();
	drawer.addModel(mainStructure());
	drawer.draw();
}

drawVilla();


