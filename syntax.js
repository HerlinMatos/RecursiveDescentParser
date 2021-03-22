var tokens = ['id','+','id', '+', 'id'];

//Grammar:
//Exp => id + Exp 
//Exp => id 

var head = 0;

var move = () => {
	if(head < tokens.length-1)
		head++;
}

var match = (t) => {
	if(t == tokens[head]){
		move();
		return true;
	}
	return false;	
}

var Exp = () => { 
	if(match('id') && match('+') && (e = Exp()))
		return {id:'id', o:'+', e}
	else if(match('id'))
		return {id:'id'}
}


console.log('------\n',Exp());

if(head < tokens.length-1)
	console.log('error1');
