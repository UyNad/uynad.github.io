const { Component } = require('inferno');
const classname = require('hexo-component-inferno/lib/util/classname');
const Head = require('./common/head');
const Navbar = require('./common/navbar');
const Widgets = require('./common/widgets');
const Footer = require('./common/footer');
const Scripts = require('./common/scripts');
const Search = require('./common/search');

module.exports = class extends Component {
    render() {
        const { site, config, page, helper, body } = this.props;

        const language = page.lang || page.language || config.language;
        const columnCount = Widgets.getColumnCount(config.widgets);

        return <html lang={language ? language.substr(0, 2) : ''}>
            <Head site={site} config={config} helper={helper} page={page} />
            <body class={`is-3-column`}>
                <Navbar config={config} helper={helper} page={page} />
                {(() => {
                    const psn = site.data && site.data.psn;
                    const isHome = page.posts && page.current === 1 && !page.archive && !page.category && !page.tag;
                    if (!psn || !isHome) {
                        return null;
                    }
                    const css = `
                        .psn-header{display:block;position:relative;overflow:hidden;border-radius:4px;box-shadow:0 4px 12px rgba(0,0,0,.2);background:linear-gradient(135deg,#2b2320,#171310 60%,#0d0b09);color:#fff;}
                        .psn-header:hover{color:#fff;}
                        .psn-bg{position:absolute;top:0;left:0;width:100%;height:100%;background-size:cover;background-position:center 25%;}
                        .psn-bg:after{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(to bottom,rgba(0,0,0,.3),rgba(0,0,0,.05) 40%,rgba(0,0,0,.6));}
                        .psn-bar-row{position:relative;display:flex;align-items:center;gap:12px;margin:16px 20px 0;}
                        .psn-avatar{width:56px;height:56px;flex:none;}
                        .psn-bar{flex:1;display:flex;flex-wrap:wrap;align-items:center;gap:8px 16px;padding:8px 16px;background:rgba(16,12,10,.82);border:1px solid rgba(255,255,255,.4);border-radius:2px;}
                        .psn-flag{width:22px;height:16px;margin-right:6px;vertical-align:-2px;}
                        .psn-name{font-size:16px;font-weight:600;line-height:1.2;}
                        .psn-motto{font-size:12px;color:#cfcabe;line-height:1.2;}
                        .psn-right{margin-left:auto;display:flex;flex-wrap:wrap;align-items:center;gap:8px 18px;font-size:15px;font-weight:600;}
                        .psn-lvl{color:#f5c236;border-bottom:2px solid #f5c236;padding-bottom:1px;}
                        .psn-lvl .fas{color:#5c8edc;margin-right:4px;}
                        .psn-right .fas.fa-trophy{margin-right:4px;}
                        .t-plat{color:#7a96d1;}.t-gold{color:#cd9a46;}.t-silver{color:#b5b5b5;}.t-bronze{color:#bf6a3a;}
                        .psn-stats{position:relative;display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 4px;margin-top:130px;padding:12px 24px 14px;text-align:center;}
                        .psn-stat{flex:1 1 11%;min-width:104px;}
                        .psn-stat b{display:block;font-size:22px;font-weight:600;color:#fff;line-height:1.25;}
                        .psn-stat small{font-size:10px;letter-spacing:.5px;color:#d8d3c8;text-transform:uppercase;white-space:nowrap;}
                        .psn-stat.hl b{color:#a7c957;}
                        @media screen and (max-width:768px){.psn-stats{margin-top:60px;}.psn-stat{min-width:88px;}}
                    `;
                    return <section class="section" style={{ 'padding-bottom': '0' }}>
                        <div class="container">
                            <style dangerouslySetInnerHTML={{ __html: css }} />
                            <a class="psn-header" href={psn.profile_url} target="_blank" rel="noopener" title="PSN Profiles - megurined">
                                <div class="psn-bg" style={psn.background ? { 'background-image': `url(${psn.background})` } : {}}></div>
                                <div class="psn-bar-row">
                                    {psn.avatar ? <img class="psn-avatar" src={psn.avatar} alt="PSN avatar" /> : null}
                                    <div class="psn-bar">
                                        <div>
                                            <div class="psn-name">
                                                {psn.flag ? <img class="psn-flag" src={`https://flagcdn.com/44x33/${psn.flag}.png`} alt={psn.flag} /> : null}
                                                {psn.name}
                                            </div>
                                            <div class="psn-motto">{psn.motto}</div>
                                        </div>
                                        <div class="psn-right">
                                            <span class="psn-lvl"><i class="fas fa-shield-alt"></i>{psn.level}</span>
                                            <span class="t-total"><i class="fas fa-trophy"></i>{psn.trophies.total}</span>
                                            <span class="t-plat"><i class="fas fa-trophy"></i>{psn.trophies.platinum}</span>
                                            <span class="t-gold"><i class="fas fa-trophy"></i>{psn.trophies.gold}</span>
                                            <span class="t-silver"><i class="fas fa-trophy"></i>{psn.trophies.silver}</span>
                                            <span class="t-bronze"><i class="fas fa-trophy"></i>{psn.trophies.bronze}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="psn-stats">
                                    {psn.stats.map(s => <div class={'psn-stat' + (s.highlight ? ' hl' : '')}>
                                        <b>{s.value}</b>
                                        <small>{s.label}</small>
                                    </div>)}
                                </div>
                            </a>
                        </div>
                    </section>;
                })()}
                <section class="section">
                    <div class="container">
                        <div class="columns">
                            <div class={classname({
                                column: true,
                                'order-2': true,
                                'column-main': true,
                                'is-12': columnCount === 1,
                                'is-8-tablet is-8-desktop is-9-widescreen': columnCount === 2,
                                'is-8-tablet is-8-desktop is-6-widescreen': columnCount === 3
                            })} dangerouslySetInnerHTML={{ __html: body }}></div>
                            <Widgets site={site} config={config} helper={helper} page={page} position={'left'} />
                            <Widgets site={site} config={config} helper={helper} page={page} position={'right'} />
                        </div>
                    </div>
                </section>
                <Footer config={config} helper={helper} />
                <Scripts site={site} config={config} helper={helper} page={page} />
                <Search config={config} helper={helper} />
            </body>
        </html>;
    }
};
