;(function () {
    var ATTR_TABLE = 'x_2270446_pokenow_attributes'
    var BATTLE_LOG_TABLE = 'x_2270446_pokenow_battle_log'
    var LIMIT = 10

    var WEEK_RANGE = 'This Week@javascript:gs.beginningOfThisWeek()@javascript:gs.endOfThisWeek()'
    var MONTH_RANGE = 'This Month@javascript:gs.beginningOfThisMonth()@javascript:gs.endOfThisMonth()'

    function capitalize(str) {
        if (!str) {
            return str
        }
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    function spriteUrl(spritesJson) {
        try {
            var sprites = JSON.parse(spritesJson || '{}')
            return (
                (sprites.other && sprites.other['official-artwork'] && sprites.other['official-artwork'].front_default) ||
                sprites.front_default ||
                ''
            )
        } catch (e) {
            return ''
        }
    }

    var timeframe = (input && input.timeframe) || 'all'

    var ga = new GlideAggregate(BATTLE_LOG_TABLE)
    ga.addQuery('result', 'win')
    if (timeframe === 'week') {
        ga.addQuery('sys_created_on', 'ON', WEEK_RANGE)
    } else if (timeframe === 'month') {
        ga.addQuery('sys_created_on', 'ON', MONTH_RANGE)
    }
    ga.addAggregate('COUNT')
    ga.groupBy('pokemon')
    ga.query()

    var rows = []
    while (ga.next()) {
        rows.push({
            sys_id: ga.getValue('pokemon'),
            wins: parseInt(ga.getAggregate('COUNT'), 10) || 0,
        })
    }
    rows.sort(function (a, b) {
        return b.wins - a.wins
    })
    rows = rows.slice(0, LIMIT)

    for (var i = 0; i < rows.length; i++) {
        var pgr = new GlideRecord(ATTR_TABLE)
        if (pgr.get(rows[i].sys_id)) {
            rows[i].name = capitalize(pgr.getValue('name'))
            rows[i].sprite = spriteUrl(pgr.getValue('sprites'))
        } else {
            rows[i].name = 'Unknown'
            rows[i].sprite = ''
        }
        rows[i].rank = i + 1
    }

    data.timeframe = timeframe
    data.leaders = rows
})()
