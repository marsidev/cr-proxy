const schema = {
	type: 'object',
	required: ['PORT', 'API_TOKEN', 'API_URL'],
	properties: {
		PORT: {
			type: 'string',
			default: 3001
		},
		API_TOKEN: {
			type: 'string'
		},
		API_URL: {
			type: 'string'
		}
	}
}

export const envOptions = {
	schema,
	dotenv: true,
	data: process.env
}
