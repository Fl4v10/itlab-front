const fs = require("fs");
const path = require("path");

const jsPaths = [path.resolve("./src/repository/productApi.ts")];

jsPaths.forEach(jsPath => {
	const utf8BOM = "\ufeff";
	const content = fs.readFileSync(jsPath, "utf-8");

	const newContent = content.replace(
		"import * as moment from 'moment';",
		"import moment from 'moment';"
	);

	fs.writeFileSync(jsPath, newContent);
});
