/**
 * 游戏栏目首页（layout: games），自动列出所有 layout: game 的页面。
 */
const { Component, Fragment } = require('inferno');
const { GameTags, listGames, postsOfGame, fmtDate, latestVersion, engineClass } = require('./common/game_util');

module.exports = class extends Component {
    render() {
        const { site, page, helper } = this.props;
        const { url_for } = helper;
        const games = listGames(site);

        return <Fragment>
            <link rel="stylesheet" href={url_for('/css/games.css')} />
            <div class="card">
                <div class="card-content">
                    <h1 class="title is-3 is-size-4-mobile">{page.title}</h1>
                    {page.content && page.content.trim()
                        ? <div class="content" dangerouslySetInnerHTML={{ __html: page.content }}></div> : null}
                </div>
            </div>
            <div class="columns is-multiline game-grid">
                {games.map(g => {
                    const link = url_for(g.path);
                    const latest = latestVersion(g);
                    const count = postsOfGame(site, g.game).length;
                    return <div class="column is-6-tablet is-6-desktop is-4-widescreen">
                        <div class="card game-card">
                            <a class={'game-card-cover ' + engineClass(g.engine)} href={link}>
                                {g.cover ? <img src={url_for(g.cover)} alt={g.title} loading="lazy" />
                                    : <span class="game-card-placeholder">{g.engine || 'GAME'}</span>}
                            </a>
                            <div class="card-content">
                                <h2 class="game-card-title"><a class="link-muted" href={link}>{g.title}</a></h2>
                                {g.tagline ? <p class="game-card-tagline">{g.tagline}</p> : null}
                                <GameTags game={g} />
                                <div class="game-card-meta">
                                    {latest ? <span>{latest.version}{latest.date ? ' · ' + fmtDate(latest.date, helper) : ''}</span> : <span>尚未发布版本</span>}
                                    <span>{count} 篇文档</span>
                                </div>
                                <div class="buttons">
                                    {g.play && g.play.url ? <a class="button is-small is-link" href={link}><i class="fas fa-play"></i><span>在线试玩</span></a> : null}
                                    {Array.isArray(g.downloads) && g.downloads.length ? <a class="button is-small is-link is-light" href={link}><i class="fas fa-download"></i><span>下载</span></a> : null}
                                    <a class="button is-small" href={link}><span>进入主页</span></a>
                                </div>
                            </div>
                        </div>
                    </div>;
                })}
            </div>
        </Fragment>;
    }
};
