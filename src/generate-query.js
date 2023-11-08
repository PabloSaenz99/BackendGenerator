const tableName = "table"

function generateQuery(queryStr){
	let splittedStringAux;
	let findConditions;
	let orderConditions;
	if(queryStr.includes("findBy")){
		/*
		let strRes = `db.${tableName}.find(){`;
		queryStr.split("findBy")[1].split("And").forEach((e, i) => strRes += `"${e}": "${arguments[i + 1]}", `);
		strRes = strRes.substr(0 ,strRes.length - 2);
		strRes += "}"
		console.log(strRes);
		*/
		
		//Split by ordenation (an ordenation can contain and
		splittedStringAux = queryStr.split("findBy")[1].split("OrderBy");
		if(splittedStringAux.length == 2) {
			findConditions = splittedStringAux[0];
			if(splittedStringAux[1].includes("Desc")){
				orderConditions = splittedStringAux[1].split("Desc")[1];
			}
			else {
				orderConditions = splittedStringAux[1];
			}
		}
		else{
			findConditions = queryStr;
		}
		console.log(findConditions);
		console.log(orderConditions);
		//Split by and or or
		
		let orArray = findConditions.substr(0, findConditions.indexOf("And", 0)).split("Or");
		let andArray = findConditions.substr(findConditions.indexOf("And") + 3).split("And");
		if(orArray.length > 1 && andArray.length > 1) {
			let resOrAux = "";
			orArray.forEach((str , i)=> resOrAux+= `${str}: ${orStrings[i]}`);
			andArray.push("$or");
			andStrings.push(resOrAux);
			addExpressions("and", andArray, andStrings);
		}
		else if(orArray.length > 1) {
			addExpressions("or", orArray, );
		}
		else if(andArray.length > 1) {
			addExpressions("and", andArray, );
		}
		else{
			
		}
		
	}
}

function addExpressions(operatorStr, arrayKeys, arrayData) {
	let res = `\$${operatorStr}: [`;
	arrayKeys.forEach((str , i)=> res+= `${str}: ${arrayData[i]}`);
	return res + "]";
}

//TODO: NotEquals, mayor, menor, contains, startswith, endswith, NameOrAge, NameAndAge, NameOrAgeAndStudent, orderBy
//{$match: {company: ObjectId(companyId)}},
//$or: [ {}]
//"NameOrStr1OrStr2AndTrueAndFalse".substr(0, "NameOrStr1OrStr2AndTrueAndFalse".lastIndexOf("Or"))

function controller() {
	const {serviceFunctionBody} = require("./generate-backend");
	//(export *async *function *)(.*)(\)( |\n)*{)		//---> regex to find method name (worst)
	//(?<=(export *async *function *))([^\s].[^\(\s]*)	// ---> regex to find ONLY method name (excluding params and identifiers such as function or expors)
	//(?<=(export *async *function *)).[^{]*			// ---> regex to find method name and parameters (excluding identifiers such as function, exports and the {)
	//(?<=(export *async *function *))[^\){]*			// ---> regex to find method name and parameters (excluding identifiers such as function, exports and until ")" or "{" )
	let stringsRes = "export async function f1(p1, p2)   {\nfunction (sa) {}}\nexport async function f2(p3)   {\nfunction (sa) {}}".match(/(?<=(export *async *function *))[^\){]*/g);
	stringsRes.forEach(s => {
		let fnRes = s.replaceAll(" ", "").split("(");
		if(fnRes.length == 2) {
			console.log(fnRes);
			generateQuery()
		}
	})
}