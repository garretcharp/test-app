import type express from 'express'
import http from 'http'

let server: http.Server

export const getServer = (app: express.Express): http.Server => {
	if (!server) {
		server = http.createServer(app)
	}

	return server
}
