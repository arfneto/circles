var paper = require("paper");

var canvas  = null;
var nRows 	= null;
var nSeconds = null;
var animate = null;
var pStatus = null;
var btnGo = null;
var btnStop = null;

var myPaper = null;

//
// control parms
var panelHeight = 800;
var minRadius = 3;
var defRows = 8;
var defSeconds = 10;	// well, x/10 seconds
var pRows = defRows;
var pAnimate = false;
var pSeconds = defSeconds;
var pChangeNumber = false;
var change = null;
var stop = null;

canvas  = document.getElementById("myCanvas");
pStatus = document.getElementById("status");
nRows 	= document.querySelector('input[name="nRows"]');
animate = document.getElementById("animate");
change = document.getElementById("changeNumber");
nSeconds = document.querySelector('input[name="nSeconds"]');
btnGo  	= document.getElementById("go");
btnStop	= document.getElementById("stop");

myPaper = new paper.PaperScope();
myPaper.setup(canvas);

nRows.focus();
pStatus.textContent = "Circles are drawn in N rows by N columns";

	function drawCircles(number)
	{
		var rows = number;
		var nCircles = rows * rows;
		var circles = [];

		// define a random color for a circle
		function getRandomColor()
		{
			var r = Math.floor(Math.random() * 256);
			var g = Math.floor(Math.random() * 256);
			var b = Math.floor(Math.random() * 256);
			return "rgb(" + r + ", " + g + ", " + b + ")";
		}	// end function()
	
		// define a random order for drawing the circles
		function fillCircles(nCircles, circles)
		{
			for(var ix = 0;(ix<nCircles); ix++)	{ circles[ix]=ix; }
			for
			(	
				var temp = 0,
					range = nCircles, 
					target=0;
	
				target<(nCircles-1);
	
				target++, 
				range--
			)
			{
				var origin = target + Math.floor(Math.random() * range);
				temp = circles[target];
				circles[target] = circles[origin];
				circles[origin] = temp;
			}	//	end for 
		}	// end function()
	
		//console.log("drawCircles");
		circles.length = nCircles;
		fillCircles(nCircles,circles);
		var unit = Math.floor(panelHeight/(rows+2));
		var radius = Math.floor(unit/3);
		if(radius < minRadius)
		{
			// check for really small circles
			console.log("circles would be too small to draw. Aborting");
			return;
		}
		else
		{
			// clear canvas
			myPaper.project.activeLayer.removeChildren();
			myPaper.view.draw();
			// then draw them all
			for(var ix=0; ix<nCircles;ix++)
			{
				var x = unit + Math.floor(circles[ix] % rows) * unit;
				var y = unit + Math.floor(circles[ix] / rows) * unit;
				//console.log("circle " + ix + ": (" + x + "," + y + "), radius " + radius);
				new myPaper.Path.Circle(new paper.Point(x, y), radius).fillColor = getRandomColor();
			}	// end for
			myPaper.view.draw();
		}	// end if
	} // end function()

animate.onchange = 
 	function()
 	{
 		if(animate.checked)
 		{
 			pAnimate = true;
 		}
 		else
 		{
 			pAnimate = false;
 			pChangeNumber = false;
 		}
 	};	// end function()
 
change.onchange = 
 	function()
 	{
 		pChangeNumber = change.checked;
 	};	// end function();

btnGo.addEventListener(
	"click",	
 	function()
 	{
 		pRows = Number(nRows.value);
 		if((pRows<2) || (pRows>40)){pRows = defRows}
		pStatus.textContent = "Running...";
		drawCircles(pRows);
		if(pAnimate)
		{
	 		pSeconds = Number(nSeconds.value);
	 		if((pSeconds<10) || (pSeconds>50)){pSeconds = defSeconds}
	 		btnGo.classList.add("disabled");
	 		
	 		btnStop.classList.add("visible");
	 		btnStop.classList.remove("disabled");
	 		btnStop.classList.remove("hide");
	 		
			stop = setInterval(
				function()
				{
					if(pChangeNumber)
					{
						var n = Math.floor(Math.random() * 39) + 2;
						nRows.value = n;
						drawCircles(n);
					}
					else
					{
						drawCircles(pRows);
					}
				}, 
				100*pSeconds);
		}
		else
		{
			pStatus.textContent = "Circles are drawn in N rows by N columns";
		}	// end if
 	}	// end function()
);	// end event...

btnStop.addEventListener(
	"click",	
 	function()
 	{
 		// first of all, stop drawing
		pStatus.textContent = "Stopping...";
 		clearInterval(stop);
		pStatus.textContent = "Circles are drawn in N rows by N columns";
 		btnGo.classList.remove("disabled");
 		
 		btnStop.classList.add("disabled");
 		btnStop.classList.add("hide");
 		
 		var items = document.querySelectorAll(".second");
 		for (var i=0;i<items.length;i++)
 		{
 			items[i].classList.remove("visible");
 		}
 		pAnimate = false;
 		animate.checked = false;
 		pChangeNumber = false;
 		change.checked = false;
 		nRows.value = defRows;
 		nSeconds.value = defSeconds;
 	}	// end function()
);	// end event...
