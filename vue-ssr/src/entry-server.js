import { app, router, store } from './app.js'

const isDev = process.env.NODE_ENV !== 'production'

export default context => {
	const s = isDev && Date.now()

	return new Promise((resolve, reject) => {
		router.push(context.url)

		router.onReady(() => {
			const matchedComponents = router.getMatchedComponents()
			// console.log(matchedComponents)
			if (!matchedComponents.length) {
				reject({code: 404})
			}
			Promise.all(matchedComponents.map(component => {
				return component.asyncData && component.asyncData(store, router.currentRoute)
			})).then(() => {
				isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)

				context.state = store.state
				resolve(app)
			}).catch(reject)
		})
	})
}