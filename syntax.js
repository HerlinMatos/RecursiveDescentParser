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

const Exp1 = () => { if(match('id') && match('+') && (e = Exp())) return {id:'id', o:'+', e} }
const Exp2 = () => { if(match('id')) return {id:'id'} }
const Exp = () => Exp1() || Exp2()


console.log('------\n',Exp());

if(head < tokens.length-1)
	console.log('error1');
