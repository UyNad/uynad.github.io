const { Component, Fragment } = require('inferno');
const Article = require('./common/article');
const { findGame } = require('./common/game_util');

module.exports = class extends Component {
    render() {
        const { site, config, page, helper } = this.props;
        const { url_for } = helper;
        // front-matter 写了 game: <代号> 的文章，顶部显示所属游戏
        const game = site && page.game ? findGame(site, page.game) : null;

        return <Fragment>
            {game ? <a class="game-series-bar" href={url_for(game.path)}>
                <i class="fas fa-gamepad"></i>
                <span>本文属于游戏开发系列《{game.title}》</span>
                <span class="game-series-go">试玩 / 下载 / 全部文档 <i class="fas fa-chevron-right"></i></span>
            </a> : null}
            <Article config={config} page={page} helper={helper} index={false} />
        </Fragment>;
    }
};
