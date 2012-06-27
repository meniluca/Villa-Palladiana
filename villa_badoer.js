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

Drawer.prototype.addModel = function(newModel){
	this.modelList.push(newModel);
}

Drawer.prototype.draw = function(){
	return DRAW(STRUCT(this.modelList));
}

/*
	Object used to set proportion
*/
function Scale(){}

var scale = new Scale();

scale.proportion = 1;

console.log(scale.proportion);


/*
	The main structure
*/

function mainStructure(){

	//var 

	return 

}

/*
	Function charged to create an object Drawer and draw the villa
*/
function drawVilla(){
	var drawer = Drawer();
	drawer.addModel(mainStructure());
	drawer.draw();
}

drawVilla();