const rw = require("./rw");
// set of regexps to match reserved words
const reservedWords = require("./reservedWords");
// set of regexps to match operations
const operations = require("./operations");
// set of regexps to match types ( string int ..)
const types = require("./types");
// regexp for ids
const id = /[a-zA-z]\w*/g;

// array to collect all tokens

// helper function
const splitAt = index => x => [x.slice(0, index), x.slice(index)];

let tests = [
  'class class1 {\n	int value = 3;\n	String text = "int x = 1";\n	/*\n		if (num < 1)\n            	num = num +1 ;\n	*/\n	private void print()	\n	{\n		System.out.println("/*hello*/");	\n	}\n};',
  "class Factorial{\npublic static void main(String[] a){ System.out.println(new Fac().ComputeFac(10));\n}\n}\n\nclass Fac {\npublic int ComputeFac(int num){\nint num_aux ;\nif (num < 1)\nnum_aux = 1 ; \nelse\n \n\nnum_aux = num * (this.ComputeFac(num+1)) ; \nreturn num_aux ;\n}\n}",
  "class myclass{\n/* my ultimate comment */\nint var)) XX1 = 0; */\nint 3CC1) = 0; */\n10+5;\n};"
];

let testPaathes = [ 'TESTCASES/TESTCASE1.txt' , 'TESTCASES/TESTCASE2.txt' , 'TESTCASES/TESTCASE3.txt'].forEach(path => {
  // the source code
  rw.getFileContent(path, str => {
    let allTokens = [];

    console.log(
      "\n||||||||||||||||||||||| TEST ||||||||||||||||||||||||||||||||||\n"
    );

    // collect types
    types.forEach(e => {
      while ((match = e.reg.exec(str))) {
        let matched = match[2] ? match[2].toString() : match.toString();
        allTokens.push({ index: match.index, type: e.name, token: matched });
        str = splitAt(match.index)(str);
        str[1] = str[1].replace(matched, " ".repeat(matched.length));
        str = str.join("");
      }
    });

    // collect reserved words
    reservedWords.all.forEach(e => {
      while ((match = e.reg.exec(str))) {
        allTokens.push({
          index: match.index,
          type: e.name,
          token: match[2].toString()
        });
      }
    });

    // collect operations
    operations.forEach(e => {
      while ((match = e.reg.exec(str))) {
        allTokens.push({
          index: match.index,
          type: e.name,
          token: match.toString()
        });
      }
    });

    // collect ids
    while ((match = id.exec(str))) {
      if (
        new RegExp(reservedWords.sum, "g").exec(match.toString()).index != 1
      ) {
        allTokens.push({
          index: match.index,
          type: "ID",
          token: match[0].toString()
        });
      }
    }

    allTokens.sort((a, b) => a.index - b.index);

    allTokens.forEach(e => {
      console.log("< " + e.type + " > : \n" + e.token);
      console.log("----------------------------------");
    });

    rw.saveFile( 'RESULTS/'+path.split('/')[1] , allTokens.map( e => "< " + e.type + " > : -" + e.token + '-' ).join('\n') );

  });
});
