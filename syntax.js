var tokens = ['id','+','id', '-', 'id','-','(','id','+','id',')'];

//Grammar:
//Exp => id + Exp | id - Exp | id 

let accepted = 0
var match = (t, i) => {
	if(t == tokens[i]){
		accepted++
		return true;
	}
	accepted--
	return false;	
}

const Exp1 = (i) => { if(match('id',i++) && match('+',i++) && (e = Exp(i))) return {id:'id', o:'+', e} }
const Exp2 = (i) => { if(match('id',i++) && match('-',i++) && (e = Exp(i))) return {id:'id', o:'-', e} }
const Exp3 = (i) => { if(match('id',i++)) return {id:'id'} }
const Exp = (i) => Exp1(i) || Exp2(i) || Exp3(i)


console.log('------\n',Exp(0));
if(accepted < tokens.length)
	console.log('error 1');
