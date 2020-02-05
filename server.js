const express = require('express')
const fetch = require('node-fetch')

const API_ENDPOINT = require('./conf.json').API_ENDPOINT
const DEV_PORT = require('./conf.json').DEV_PORT

const port = process.env.PORT || DEV_PORT
const server = express()

async function fetchPlayersData () {
	try {
		const response = await fetch(API_ENDPOINT)
		const data = await response.json()
		return data.players
	} catch(error) {
		// log error
		return []
	}
}

server.get('/players', function(req, res, next){
	fetchPlayersData().then(
		players => {
			if(players.length){
				return res.status(200).json(
					players.sort((a,b) => { return (a.id - b.id)})
				)
			} else {
				return res.status(204).json([])
			}
		}
	)
})

server.listen(port, (err) => {
  if (err) {
    console.error(err)
  }
  console.info('==> 🌎 Listening on port ', port);
})