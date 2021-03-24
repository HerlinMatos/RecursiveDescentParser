var tokens = ['id','+','id', '-', 'id','-','(','id','+','id',')'];

//Grammar:
//Exp => id + Exp | id - Exp | (Exp) | id 

let head = 0
var match = (t) => {
	if(t == tokens[head]){
		head++
		return t
	}
	return null	
}

function Exp() { 
	let save = head 
	if(match('id') && match('+') && (e=Exp())) {
		return {id:'id', o:'+', e}
	}
	head = save
	if(match('id') && match('-') && (e=Exp())){
		return {id:'id', o:'-', e}
	} 
	head = save
	if(match('(') && (e=Exp()) && match(')')){
		return {op:'(', e, cp:')'}
	} 
	head = save
	if(match('id')) {
		return {id:'id'}
	}
	return null
}

//------------------------------------------------------------------------

let tree = Exp()
var treeify = require('treeify');
console.log(
   treeify.asTree(tree, true)
);

