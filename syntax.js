var tokens = ['(','id','+','id',')'];

//Grammar:
//Exp => id + Exp | id - Exp | (Exp) | id 

let head = 0
var match = (t) => {
	if(t == tokens[head]){
		head++
		return true
	}
	return false	
}

function Exp(tree) { 
	tree.Exp = {}
	let save = head 
	if(match('id') && match('+') && Exp(tree.Exp)) {
		tree.Exp.id = 'id' 
		tree.Exp.o = '+' 
		return true
	}
	head = save
	if(match('id') && match('-') && Exp(tree.Exp)){
		tree.Exp.id = 'id' 
		tree.Exp.o = '-' 
		return true
	} 
	head = save
	if(match('(') && Exp(tree.Exp) && match(')')){
		tree.Exp = {op:'(', cp:')'} 
		tree.Exp.op = '(' 
		tree.Exp.cp = ')' 
		return true
	} 
	head = save
	if(match('id')) {
		tree.Exp.id = 'id' 
		return true
	}
	return false
}

let tree = {}
Exp(tree)
console.log('------\n',JSON.stringify(tree) );
