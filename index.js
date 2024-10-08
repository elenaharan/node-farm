const fs = require('fs')

//Sync way
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
console.log(textIn)

const textOut = `This is what we know about the avocado: ${textIn}. \n Created on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut)

//Async way with callback
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
	fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
		console.log(data2)
		fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
			console.log(data3);
			fs.writeFile('./txt/final1.txt', `${data2}\n${data3}`, 'utf-8', err => {
				console.log('Your file has been written 😃')
			})
		})
	})
})
