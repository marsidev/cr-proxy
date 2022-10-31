import 'isomorphic-fetch'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import fastifyEnv from '@fastify/env'
import sensible from '@fastify/sensible'
import { envOptions } from './env.mjs'
const fastify = Fastify()

await fastify.register(cors, {
	origin: '*'
})
await fastify.register(sensible)
await fastify.register(fastifyEnv, envOptions)

fastify.get('/*', async (request, reply) => {
	const url = `${fastify.config.API_URL}/v1/${request.url.substring(1)}`
	const opts = {
		headers: {
			Authorization: `Bearer ${fastify.config.API_TOKEN}`
		}
	}

	try {
		return fetch(url, opts)
			.then(res => {
				if (!res.ok) return reply.badGateway()
				return res.json()
			})
			.then(data => reply.send(data))
	} catch (error) {
		return reply.badGateway()
	}
})

fastify.listen({ port: fastify.config.PORT }, async (err, address) => {
	if (err) return console.log(err)
	console.log(`Server running on ${address}`)
})
