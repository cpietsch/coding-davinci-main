// var fs = require("fs"),
// 	xml2js = require("xml2js");

// var parser = new xml2js.Parser();
// fs.readFile(__dirname + "/Objekte.xml", function(err, data) {
// 	parser.parseString(data, function(err, result) {
// 		var records = result.adlibXML.recordList[0].record;
// 		// fs.writeFileSync("Objekte.json", JSON.stringify(records), "utf8");
// 		console.dir(records[0]);
// 		console.log("Done");
// 	});
// });
var fs = require("fs");
var csv = require("fast-csv");
var csvStream = csv.createWriteStream({ headers: true }),
	writableStream = fs.createWriteStream("data.csv");

var arr = [];
var Objekte = require("./Objekte.json");

csvStream.pipe(writableStream);

Objekte.forEach(object => {
	var year = object.Production_date
		? object.Production_date[0]["production.date.start"][0].slice(0, 4)
		: "";
	year = parseInt(year / 10) * 10;
	console.log(year);
	var subjects = object.Associated_subject
		? object.Associated_subject.map(
				o => o["association.subject"][0].term[0]._
		  )
		: ["none"];
	var ids = object.object_number[0]
		.split(";")
		.map(d => d.trim().replace(" ", "_"));

	ids.forEach(id => {
		var entry = { id: id, keywords: subjects, year: year };
		// console.log(entry);
		csvStream.write(entry);
	});
});

csvStream.end();
