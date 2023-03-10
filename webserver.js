const express = require("express")
const app = express()

const fs = require("fs")

function send(file, loc) {
	fs.readFile(file, "utf-8", (error, data) => {
		if (error) {
			console.error(error)

			fs.readFile("content/errors/500.html", (error, data) => {
				if (error) { loc.send("Error 500: Error while displaying message in response to previous error") }
				else { loc.send(data) }
			})
		}
		else {
			loc.send(data)
		}
	})
}

app.get("/", (req, res) => {
	res.set("Content-Type", "text/html")
	send("content/index.html", res)
})
app.get("/style.css", (req, res) => {
	res.set("Content-Type", "text/css")
	send("content/style.css", res)
})
app.get("/script.js", (req, res) => {
	res.set("Content-Type", "application/javascript")
	send("content/script.js", res)
})
app.get("/favicon.png", (req, res) => {
	res.set("Content-Type", "image/png")
	res.sendFile(`${__dirname}/content/favicon.png`)
})

//app.use(express.static("content/"))
app.use((req, res) => {
	fs.readFile("content/errors/404.html", "utf-8", (error, data) => {
		if (error) { console.error(error) }
		else { res.status(404).send(data) }
	})
})

app.listen(8000, () => console.log("Listening on port 8000"))