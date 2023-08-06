module.exports = {

	async getAll (ctx) {
		try{
			let allMoon = await global.Redis.get(`MOON`);
			ctx.body = {
				status: true,
				data: {
					pool: allMoon
				}
			}
			return;
		}
		catch(e){
			ctx.body = {status: false};
			return;
		}
	}
};
