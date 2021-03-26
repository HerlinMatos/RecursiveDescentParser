//var tokens = ['a','+','b', '-', 'var','-','(','id','+','id',')'];
var tokens = ['a','>','b', '<', 'c'];

let head = 0
var match = (t) => {
	const currentToken = tokens[head]
	if(t.test(currentToken)){
		head++
		return currentToken
	}
	return null	
}

function Rule(){
	let save = head 
	let node = {}
	for(a of arguments){
		if(typeof a == 'object'){
			const terminal = match(a)
			if(terminal){
				node.t = node.t || []
				node.t.push(terminal);
			}else 
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
	const terminalsLength = node.t ? (node.t.length - 1) : 0 
	const realNodeLength = nodeLength + terminalsLength 
	if(realNodeLength == arguments.length)
		return node
	head = save
	return null
}


//------------------------------------------------------------------------
//Grammar:
//Exp => id + Exp | id - Exp | (Exp) | id 
const Id = () => Rule(/^\w+$/) 
const Plus = () => Rule(/^\+$/) 
const Minus = () => Rule(/^\-$/) 
const LogicOp = () => Rule(/^[\>\<]$/) 
const Op = () => Rule(/^\($/) 
const Cp = () => Rule(/^\)$/) 
const E = () => Rule(Id,Plus, E) || Rule(Id,Minus, E) || Rule(Op,E,Cp) || Rule(Id)   
const BoolExp = () => Rule(Id, LogicOp, BoolExp) || Rule(Id)

//------------------------------------------------------------------------

let tree = BoolExp()
console.log(JSON.stringify(tree))
var treeify = require('treeify');
console.log(
   treeify.asTree(tree, true)
);
