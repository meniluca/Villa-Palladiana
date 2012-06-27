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

scale.proportion = 2;


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
	//var stairs
	//var building
	//var porch
	//var roof

	return foundation;

}

/*
	Function charged to create an object Drawer and draw the villa
*/
function drawVilla(){
	var drawer = new Drawer();
	//drawer.addModel(mainStructure());
	drawer.draw();
}

drawVilla();


//POLYPOINT

/*

var domain = INTERVALS(1)(20);
var controls = [[0,0],[-1,2],[1,4],[2,3],[1,1],[1,2],[2.5,1],[2.5,3],[4,4],[5,0]];
var nubs = NUBS(S0)(3)([0,0,0,0,1,2,3,4,5,6,7,7,7,7])(controls);
var model = MAP(nubs)(domain);
DRAW(model);
DRAW(POLYPOINT(controls));

var controls = [[0,0],[-1,2],[1,4],[2,3],[1,1],[1,2],[2.5,1],[2.5,3],[4,4],[5,0]];
var knots = [0,0,0,0,1,2,3,4,5,6,7,7,7,7];
var nubspline = NUBSPLINE(3)(knots)(controls);
DRAW(nubspline);
DRAW(POLYPOINT(controls));



//CERCHIO
var _p = Math.sqrt(2)/2.0;
var controls = [[-1,0,1], [-_p,_p,_p], [0,1,1], [_p,_p,_p],[1,0,1], [_p,-_p,_p], [0,-1,1], [-_p,-_p,_p], [-1,0,1]];
var knots = [0,0,0,1,1,2,2,3,3,4,4,4];
var nurbs = NURBSPLINE(2)(knots)(controls);
DRAW(nurbs);
DRAW(POLYPOINT(controls));
*/


/*
var domain = PROD1x1([INTERVALS(1)(20),INTERVALS(1)(6)]);
var ncpVector = [0,0,1];
var funProfile = BEZIER(S0)([[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0]]);
var out = MAP(CYLINDRICAL_SURFACE(funProfile)(ncpVector))(domain);
DRAW(out); 




*/

var dom1D = INTERVALS(1)(10);
var Su0 = BEZIER(S0)([[1,0,0],[1,0,3]]);
var curve0 = MAP(Su0)(dom1D);
DRAW(COLOR([0,0,1])(curve0));

var p = 10;
var controls = [[0*p,0*p],[0*p,0.03*p],[0.025*p,0.035*p],[0.05*p,0.03*p],[0.14*p,0.03*p]];
DRAW(POLYPOINT(controls));
var Su1 = BEZIER(S0)(controls);
var curve0 = MAP(Su1)(dom1D);
DRAW(COLOR([1,0,1])(curve0));

var Su0 = BEZIER(S1)(controls);

var dom2D = DOMAIN([[0,1],[0,1]])([20,20]);
var out = MAP(PROFILEPROD_SURFACE([Su0,Su1]))(dom2D);
DRAW(out); 