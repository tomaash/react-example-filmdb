export default function(app, router) {
	return app
		.use(router.routes())
		.use(router.allowedMethods());
}