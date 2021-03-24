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

function Rule(){
	let save = head 
	let node = {
		t:[]
	}
	for(a of arguments){
		if(typeof a == 'string'){
			const terminal = match(a)
			if(terminal)
				node.t.push(terminal);
			else 
				break
		}else if(typeof a == 'function'){
			const funcName = a.name
			const funcResult = a()
			if(funcResult)
				node[funcName] = funcResult;
			else 
				break
		}
	}
	const nodeLength = Object.keys(node).length
	//realNodeLength = nodeLength - t - t.length
	const realNodeLength = nodeLength - 1 + node.t.length
	if(realNodeLength == arguments.length)
		return node
	head = save
	return null
}

const E = () => Rule('id','+', E) || Rule('id','-', E) || Rule('(',E,')') || Rule('id')   

//------------------------------------------------------------------------

let tree = E()
var treeify = require('treeify');
console.log(
   treeify.asTree(tree, true)
);
