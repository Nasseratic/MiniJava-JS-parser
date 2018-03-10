// set of regexps to match reserved words
const  reservedWords = require('./reservedWords');
// set of regexps to match operations
const  operations = require('./operations');
// set of regexps to match types ( string int ..)
const  types = require('./types');
// regexp for ids 
const id = /[a-zA-z]\w*/g;

// array to collect all tokens
let allTokens = [];

// the source code  
let str = "class** if elsemyclass{}; \" jddasj \"  int x5 for i=1\n";


// collect operations
operations.forEach(e =>{
    while (match = e.reg.exec(str)) {
        allTokens.push({index:match.index , type: e.name , token: match.toString() });
    }
});

// collect reserved words
reservedWords.all.forEach(e =>{
    while (match = e.reg.exec(str)) {
        allTokens.push({index:match.index , type: e.name , token: match[2].toString() });
    }
});

// collect ids
while (match = id.exec(str)) {
    if(new RegExp(reservedWords.sum,'g').exec(match.toString()).index != 1){
        allTokens.push({index:match.index, type: 'ID' , token: match.toString() });
    }
}


allTokens.sort( (a,b) => a.index - b.index );

allTokens.forEach( e => {
    console.log( '< '+e.type +' > : \n'+ e.token );
});
