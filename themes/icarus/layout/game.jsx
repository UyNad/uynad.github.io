/**
 * 单个游戏的主页（layout: game）。
 * 结构：顶部试玩 / 预告 + 下载 → 游戏介绍（markdown 正文）→ 版本记录 → 开发文档与心得 → 评论
 * 字段说明见 source/games/_TEMPLATE.md
 */
const { Component, Fragment } = require('inferno');
const Comment = require('./common/comment');
const { GameTags, postsOfGame, fmtDate, latestVersion } = require('./common/game_util');

const START_SCRIPT = `
document.querySelectorAll('.game-start').forEach(function (btn) {
    btn.addEventListener('click', function () {
        var frame = btn.closest('.game-frame');
        var iframe = frame.querySelector('iframe');
        iframe.src = iframe.getAttribute('data-src');
        frame.classList.add('is-playing');
        iframe.focus();
    });
});`;

function isVideo(url) {
    return /\.(mp4|webm|ogg)(\?|$)/i.test(url || '');
}

class Hero extends Component {
    render() {
        const { page, helper } = this.props;
        const { url_for } = helper;
        const play = page.play && page.play.url ? page.play : null;

        if (play) {
            const portrait = play.orientation === 'portrait';
            const ratio = play.ratio || (portrait ? '9/16' : '16/9');
            return <div class={'game-stage' + (portrait ? ' is-portrait' : '')}>
                <div class="game-frame" style={{ 'aspect-ratio': ratio }}>
                    <iframe data-src={url_for(play.url)} title={page.title} allow="fullscreen; autoplay; gamepad" allowfullscreen></iframe>
                    <button class="game-start" type="button"
                        style={page.cover ? { 'background-image': `url(${url_for(page.cover)})` } : {}}>
                        <span><i class="fas fa-play"></i>开始试玩</span>
                    </button>
                </div>
                <div class="game-stage-tip">
                    {play.tip ? <span>{play.tip}</span> : null}
                    <a href={url_for(play.url)} target="_blank" rel="noopener"><i class="fas fa-expand"></i>新窗口全屏打开</a>
                </div>
            </div>;
        }
        if (page.trailer) {
            return <div class="game-stage">
                {isVideo(page.trailer)
                    ? <video class="game-media" src={url_for(page.trailer)} controls preload="metadata"
                        poster={page.cover ? url_for(page.cover) : undefined}></video>
                    : <img class="game-media" src={url_for(page.trailer)} alt={page.title} />}
            </div>;
        }
        if (page.cover) {
            return <div class="game-stage"><img class="game-media" src={url_for(page.cover)} alt={page.title} /></div>;
        }
        return null;
    }
}

module.exports = class extends Component {
    render() {
        const { site, config, page, helper } = this.props;
        const { url_for } = helper;
        const latest = latestVersion(page);
        const downloads = Array.isArray(page.downloads) ? page.downloads : [];
        const versions = Array.isArray(page.versions) ? page.versions : [];
        const posts = postsOfGame(site, page.game);

        return <Fragment>
            <link rel="stylesheet" href={url_for('/css/games.css')} />
            <nav class="breadcrumb game-crumb" aria-label="breadcrumbs">
                <ul>
                    <li><a href={url_for('/games/')}>游戏开发</a></li>
                    <li class="is-active"><a href="#" aria-current="page">{page.title}</a></li>
                </ul>
            </nav>

            {/* 顶部：标题 + 试玩/预告 + 下载 */}
            <div class="card game-hero">
                <div class="card-content">
                    <h1 class="title is-3 is-size-4-mobile">{page.title}</h1>
                    {page.tagline ? <p class="game-tagline">{page.tagline}</p> : null}
                    <GameTags game={page} />
                </div>
                <Hero page={page} helper={helper} />
                {!(page.play && page.play.url) && !page.trailer && !page.cover && !downloads.length
                    ? <div class="card-content game-release"><p class="game-empty">试玩版本与下载整理中，敬请期待。</p></div> : null}
                {latest || downloads.length ?<div class="card-content game-release">
                    {latest ? <div class="game-latest">
                        <span class="game-version">最新版本 {latest.version}</span>
                        {latest.date ? <span class="game-date">{fmtDate(latest.date, helper)}</span> : null}
                        {latest.notes ? <span class="game-notes">{latest.notes}</span> : null}
                    </div> : null}
                    {downloads.length ? <div class="buttons game-downloads">
                        {downloads.map(d => <a class="button is-link is-light" href={d.url} target="_blank" rel="noopener">
                            <i class="fas fa-download"></i>
                            <span>{d.label}</span>
                            {d.size ? <small>{d.size}</small> : null}
                            {d.note ? <small>{d.note}</small> : null}
                        </a>)}
                    </div> : null}
                </div> : null}
            </div>

            {/* 游戏介绍：游戏页 markdown 正文 */}
            {page.content && page.content.trim() ? <div class="card">
                <div class="card-content">
                    <h2 class="game-section-title">游戏介绍</h2>
                    <div class="content" dangerouslySetInnerHTML={{ __html: page.content }}></div>
                </div>
            </div> : null}

            {/* 开发文档与心得：front-matter 里 game 字段相同的文章 */}
            <div class="card">
                <div class="card-content">
                    <h2 class="game-section-title">开发文档与心得<small>{posts.length ? `${posts.length} 篇` : ''}</small></h2>
                    {posts.length ? <ul class="game-posts">
                        {posts.map(p => <li>
                            <a href={url_for(p.path)}>
                                <time>{fmtDate(p.date, helper)}</time>
                                <span class="game-post-title">{p.title}</span>
                            </a>
                            {p.description ? <p>{p.description}</p> : null}
                        </li>)}
                    </ul> : <p class="game-empty">还没有文章，开发记录整理中……</p>}
                </div>
            </div>

            {/* 版本记录 */}
            {versions.length > 1 ? <div class="card">
                <div class="card-content">
                    <details class="game-versions">
                        <summary class="game-section-title">版本记录<small>{versions.length} 个版本</small></summary>
                        <ul>
                            {versions.map(v => <li>
                                <b>{v.version}</b>
                                {v.date ? <time>{fmtDate(v.date, helper)}</time> : null}
                                {v.notes ? <span>{v.notes}</span> : null}
                            </li>)}
                        </ul>
                    </details>
                </div>
            </div> : null}

            <Comment config={config} page={page} helper={helper} />
            <script dangerouslySetInnerHTML={{ __html: START_SCRIPT }}></script>
        </Fragment>;
    }
};
