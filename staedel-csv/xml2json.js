var fs = require("fs"),
	xml2js = require("xml2js");

var parser = new xml2js.Parser();
fs.readFile(__dirname + "/Objekte.xml", function(err, data) {
	parser.parseString(data, function(err, result) {
		var records = result.adlibXML.recordList[0].record;

		fs.writeFileSync("Objekte.json", JSON.stringify(records), "utf8");

		console.dir(records[0]);
		console.log("Done");
	});
});
