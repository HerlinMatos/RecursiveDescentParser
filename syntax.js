
const tokenExp = [
	/^if/,
	/^\w+/,
	/^[\+\-]/,
	/^[\>\<]/,
	/^[\>\<]/,
	/^[\(\)]/,
]

let code = "if(a>b)c+d"

function lexer(code){
	let tokensReturn = []
	while(code.length > 0){
		let matchToken = ''
		for(t of tokenExp){
			let mt = code.match(t)
			if(mt)
				matchToken = mt[0]
		}
		if(matchToken){
			tokensReturn.push(matchToken)	
			code = code.slice(matchToken.length)
		}else{
			console.log('lexical error')
			break
		}
	}
	return tokensReturn
}

//------------------------------------------------------------------------

const tokens = lexer(code)

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
const IfId = () => Rule(/^if$/) 

const E = () => Rule(Id,Plus, E) || Rule(Id,Minus, E) || Rule(Op,E,Cp) || Rule(Id)   
const BoolExp = () => Rule(Id, LogicOp, BoolExp) || Rule(Id)
const IfExp = () => Rule(IfId, Op ,BoolExp, Cp, E) 
const Stmt = () => Rule(IfId, Op ,BoolExp, Cp, Stmt) || Rule(E) 

//------------------------------------------------------------------------

let tree = IfExp()
console.log(JSON.stringify(tree))
var treeify = require('treeify');
console.log(
   treeify.asTree(tree, true)
);
