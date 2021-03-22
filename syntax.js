var tokens = ['id','+','id', '-', 'id'];

//Grammar:
//Exp => id + Exp | id - Exp | id 

var match = (t, i) => {
	if(t == tokens[i]){
		return true;
	}
	return false;	
}

const Exp1 = (i) => { if(match('id',i++) && match('+',i++) && (e = Exp(i))) return {id:'id', o:'+', e} }
const Exp2 = (i) => { if(match('id',i++) && match('-',i++) && (e = Exp(i))) return {id:'id', o:'-', e} }
const Exp3 = (i) => { if(match('id',i++)) return {id:'id'} }
const Exp = (i) => Exp1(i) || Exp2(i) || Exp3(i)


console.log('------\n',Exp(0));

