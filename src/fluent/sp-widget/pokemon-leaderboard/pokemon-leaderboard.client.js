api.controller = function () {
    var c = this

    c.timeframe = (c.data && c.data.timeframe) || 'all'
    c.leaders = (c.data && c.data.leaders) || []
    c.loading = false

    c.selectTimeframe = function (tf) {
        if (c.timeframe === tf || c.loading) {
            return
        }
        c.timeframe = tf
        c.loading = true
        c.server.get({ timeframe: tf }).then(function (r) {
            c.leaders = (r.data && r.data.leaders) || []
            c.loading = false
        })
    }
}
