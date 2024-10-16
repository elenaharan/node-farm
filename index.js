const fs = require('fs')
const http = require("http");
const url = require("url");

/////////////////////////////////////////////////////
// Files
//Sync way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
// console.log(textIn)

// const textOut = `This is what we know about the avocado: ${textIn}. \n Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut)

//Async way with callback
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
// 	fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
// 		console.log(data2)
// 		fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
// 			console.log(data3);
// 			fs.writeFile('./txt/final1.txt', `${data2}\n${data3}`, 'utf-8', err => {
// 				console.log('Your file has been written 😃')
// 			})
// 		})
// 	})
// })

/////////////////////////////////////////
//SERVER
const server = http.createServer((req, res) => {
  const pathname = req.url;

  if (pathname === "/overview" || pathname === "/") {
    res.writeHead(200, {
      "my-header :)": "hi there!",
    });
    res.end("This is overview");
  } else if (pathname === "/product") {
    res.end("This is product");
  } else if (pathname === "/api") {
    fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
      const productData = JSON.parse(data);
      res.writeHead(200, {
        'Content-type': 'application/json'
      });
      res.end(data)
    })
  } else {
    //We can only send headers before the response
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    //Response follows the header ^
    res.end("<h1>This page cannot be found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});