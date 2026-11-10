/**
 * 游戏栏目共用的小工具：取游戏页、取某个游戏的文章、引擎徽章。
 * 游戏页 = source/games/<代号>/index.md，front-matter 里 layout: game、game: <代号>。
 * 文章只要在 front-matter 写 game: <代号>，就会被收录进对应游戏页。
 */
const moment = require('moment');
const { Component } = require('inferno');

const ENGINE_CLASS = {
    ue: 'is-ue', ue4: 'is-ue', ue5: 'is-ue', unreal: 'is-ue',
    godot: 'is-godot',
    html: 'is-html', html5: 'is-html', web: 'is-html',
    unity: 'is-unity'
};

function engineClass(engine) {
    return ENGINE_CLASS[String(engine || '').toLowerCase().replace(/\s+/g, '')] || '';
}

function listGames(site) {
    return site.pages.toArray()
        .filter(p => p.layout === 'game' && p.game)
        .sort((a, b) => (a.order || 99) - (b.order || 99));
}

function findGame(site, id) {
    if (!id) {
        return null;
    }
    return site.pages.toArray().find(p => p.layout === 'game' && p.game === id) || null;
}

function postsOfGame(site, id) {
    return site.posts.toArray()
        .filter(p => p.game === id)
        .sort((a, b) => b.date - a.date);
}

function fmtDate(d, helper) {
    if (!d) {
        return '';
    }
    // 交给 Hexo 的 date 助手按站点时区（_config.yml timezone）格式化；用 Node 本地时区会差一天。
    // 注意 versions[].date 这类嵌套日期到这里已变成 ISO 字符串（如 2026-11-10T00:00:00.000Z）
    if (helper) {
        const s = helper.date(d, 'YYYY-MM-DD');
        if (s && s !== 'Invalid date') {
            return s;
        }
    }
    const m = moment(d);
    return m.isValid() ? m.format('YYYY-MM-DD') : String(d);
}

// versions 里第一项视为最新版本
function latestVersion(page) {
    return Array.isArray(page.versions) && page.versions.length ? page.versions[0] : null;
}

class GameTags extends Component {
    render() {
        const { game } = this.props;
        const platforms = Array.isArray(game.platforms) ? game.platforms : (game.platforms ? [game.platforms] : []);
        return <div class="game-tags">
            {game.engine ? <span class={'game-badge ' + engineClass(game.engine)}>{game.engine}</span> : null}
            {platforms.map(p => <span class="game-badge is-platform">{p}</span>)}
            {game.status ? <span class="game-badge is-status">{game.status}</span> : null}
        </div>;
    }
}

// 和 widgets.jsx 一样：默认导出组件，工具函数挂在组件上
module.exports = Object.assign(GameTags, { GameTags, listGames, findGame, postsOfGame, fmtDate, latestVersion, engineClass });
