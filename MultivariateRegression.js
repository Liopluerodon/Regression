function rounding(roundee, r) {return Math.round(roundee*Math.pow(10,r))/Math.pow(10,r);};

//Multivariate Regression program, by Ad (Liopluerodon on GitHub)
function regress(x, y) {
	var w = [];
	var b = 0;
	var cost = 0;
	var a = 0.1;
	var iterations = 100000; //What's the max iterations of Gradient Descent
	var threshold = 0.00001; //What's the most cost you're willing to tolerate

	for (let i = 0; i<x[0].length; i++) {w[i]=0;}
			
	function dot_product(vect, k, c) {
		let sum = 0;
		for (let i = 0; i<w.length; i++) {sum += vect[i]*x[k][i];}
		return sum+c;
	}

	function calcCost(vect1, vect2) {
		cost=0;
		for (let i=0; i<y.length; i++) {cost += (dot_product(vect1,i,vect2)-y[i])**2;}	
		return cost/(2*y.length);}

	function descend(newW, newB, length, reg = false) {
		for (let j = 0; j < length; j++) {
			let sumW = [];
			for (let i = 0; i<w.length; i++) {sumW[i]=0;}
			let sumB = 0;

			for (let k = 0; k<x[0].length; k++) {for (let i=0; i<y.length; i++) {sumW[k] += (dot_product(newW,i,newB)-y[i])*x[i][k];}}

			for (let i=0; i<y.length; i++) {sumB += dot_product(newW,i,newB)-y[i];}

			for (let i = 0; i<w.length; i++) {newW[i] += -a*sumW[i]/y.length;}
			newB += -a*sumB/y.length;
			b=newB;
			if (calcCost(newW, newB)<threshold && reg) {console.log("Iterations: " + j); break;}
		} 
		if (reg && calcCost(newW, newB)>=threshold) {console.log("Iterations: "+length);}
	}


	let startCost = calcCost(w, b);
	let optimalA = false;
			
	while (optimalA == false) {
		var A_W = [];
		var A_B = 0;
		for (let i = 0; i<w.length; i++) {A_W[i]=0;}
		descend(A_W, A_B, 30);
		if (calcCost(A_W, A_B)>startCost) {a=a/(10**(1/6));}
		if (calcCost(A_W, A_B)<startCost) {optimalA=true;}
	}

			
	descend(w, b, iterations, true);
	console.log("cost = "+calcCost(w, b));
	let output = [b];
	for (let i = 1; i<=w.length; i++) {output[i]=w[i-1];}
	return output;
}

let output = regress([[0,1,0,1,0,1,0,1,0], [1,1,1,1,0,1,1,1,1],[0,1,0,0,1,0,0,1,0]], [0,0,1]);

function stringify(coeffs) {
	let string = rounding(coeffs[0], 3);
		for (let i = 1; i<coeffs.length; i++) {string += " + "+rounding(coeffs[i], 3)+"*x"+i;}
		return string;
	}

console.log(stringify(output));