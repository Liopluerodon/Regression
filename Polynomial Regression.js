function rounding(roundee, r) {return Math.round(roundee*Math.pow(10,r))/Math.pow(10,r);};

//Polynomial Regression function, made by Ad (Liopluerodon on GitHub)
function regress(x, y, p /*Degree of the function*/) {
	var w = [];
	var b = 0;
	var cost = 0;
	var a = 0.1;
	var iterations = 100000;
		
	for (let i = 0; i<p; i++) {w[i]=0;}
			
	function dot_product(vect, k, c) {
		let sum = 0;
		for (let i = 0; i<w.length; i++) {sum += vect[i]*x[k]**(i+1);}
		return sum+c;
		}

	function calcCost(vect1, vect2) {
		cost=0;
		for (let i=0; i<y.length; i++) {cost += (dot_product(vect1,i,vect2)-y[i])**2;}	
		return cost/(2*y.length);}

	function descend(newW, newB, length, reg = false) {
		for (let j = 0; j < length; j++) {
			let sumW = [];
			for (let i = 0; i<p; i++) {sumW[i]=0;}
			let sumB = 0;

			for (let k=0; k<p; k++) {for (let i=0; i<y.length; i++) {sumW[k]+=(dot_product(newW,i,newB)-y[i])*x[i]**(k+1);}}
			for (let i=0; i<y.length; i++) {sumB += dot_product(newW,i,newB)-y[i];}

			if (reg) {
				graph(j, calcCost(newW, newB)*500, 50, 400);
				graph(j, 0, 50, 400);
			}

			for (let i = 0; i<p; i++) {newW[i] += -a*sumW[i]/y.length;}
			newB += -a*sumB/y.length;
			b=newB;
		}
	}

	let startCost = calcCost(w, b);
	let optimalA = false;
	
	while (optimalA == false) {
		var A_W = [];
		var A_B = 0;
		for (let i = 0; i<p; i++) {A_W[i]=0;}
		descend(A_W, A_B, 10);
		if (calcCost(A_W, A_B)>startCost) {a=a/(10**(1/6));}
		if (calcCost(A_W, A_B)<startCost) {optimalA=true;}
	}

	descend(w, b, iterations, true);
	console.log("cost = "+calcCost(w, b)*500);
	let output = [b];
	for (let i = 1; i<=p; i++) {output[i]=w[i-1];}
	return output;
}

//Example 
let output = regress([-1,0,1,2], [-5, 5, -5, 5], 3);
	
//Here's a succint way to convert the function into a readable string
function text(z, d) {
	let sum = rounding(z[0],d);
	if (z[1]) {sum += " + "+rounding(z[1],d)+"x";}
	if (z[2]) {sum += " + "+rounding(z[2],d)+"x²";}
	if (z[3]) {sum += " + "+rounding(z[3],d)+"x³";}
	if (z[4]) {sum += " + "+rounding(z[4],d)+"x⁴";}
	return sum;
}
console.log(text(output, 3));
