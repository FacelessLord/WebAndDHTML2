var http = require('http');
var url = require('url');
var server = new http.Server((req, res) => {
	console.log(req.headers);

	var urlParsed = url.parse(req.url, true);
	console.log(urlParsed);

	let userMess = [];

	function getForm() {
		let form = `
	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <title>Book</title>
	</head>
	<body>
	    <h1>Guest Book</h1>
	    <div id='posts'></div>
	    <p>Hello, </p>`

		let mess = userMess.join('<br>');

		let form2 = `
	    <form action='/submitForm' method='post'>
	        <input type="text" name="username" placeholder="Name"/><br>
	        <input type="submit"/>
	    </form>
	</body>
	</html>
	`
		return form + mess + form2;
	}



	if (urlParsed.pathname == '/echo' && urlParsed.query.message) {
		res.setHeader('Cache-control', 'no-cache');
		res.setHeader("Set-Cookie", "login=ok");
		res.end(urlParsed.query.message);
	} else if (urlParsed.pathname == '/form') {
		res.setHeader("Set-Cookie", "code=7142");
		res.end(getForm());
	} else if (urlParsed.pathname == '/submitForm') {
		userMess.push(urlParsed.query.username);
		res.end(getForm());
	} else {
		res.statusCode = 404; // Not Found
		res.end("Это не та страница, которую вы ищете *джедайские звуки*");
	}
});


server.listen(3000, '127.0.0.1');