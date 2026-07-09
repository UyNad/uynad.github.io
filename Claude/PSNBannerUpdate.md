# PSN 横幅数据更新任务（PSNBannerUpdate）

> **用途**：把博客首页的 PSN 横幅数据刷新为 PSNProfiles 上的最新值。
> **触发方式**：在任意 Claude Code 会话中说「刷新 PSN 数据」或「执行 Claude/PSNBannerUpdate.md」。
> **数据源**：https://psnprofiles.com/megurined
> **数据落点**：`source/_data/psn.yml`（横幅渲染逻辑在 `themes/icarus/layout/layout.jsx`，本任务不碰它）
> **最后更新**：2026-07-09

---

## 1. 任务目标

从 PSNProfiles 个人主页抓取以下最新数据，更新到 `source/_data/psn.yml`，使首页横幅与 PSNProfiles 主页显示一致：

- 等级（level）
- 五色奖杯数（total / platinum / gold / silver / bronze）
- 8 项统计（Games Played、Completed Games、Completion、Unearned Trophies、Trophies Per Day、Views、World Rank、Country Rank）
- 头像图片 URL（avatar）
- 背景大图 URL（background，随最近游玩的游戏变化）

---

## 2. 前置检查

1. **Chrome 扩展必须已连接**：调用 `claude-in-chrome` 的 `tabs_context_mcp` 确认。若未连接，提示用户「请打开装有 Claude 扩展的 Chrome 并登录，然后回复确认」，等用户确认后重试。
2. **禁止用 curl / WebFetch / 任何服务端方式抓 psnprofiles.com**：该站 Cloudflare 拦截一切非真实浏览器的访问（一律 403），已多次验证，不要再试。只有通过 Chrome 扩展走用户浏览器才能访问。
3. 图片 CDN `i.psnprofiles.com` **不受** Cloudflare 拦截，可以用 curl 验证图片 URL 有效性，也可以直接外链，无需下载图片到本地。
4. 确认 `source/_data/psn.yml` 存在且结构完整（如被误删，参考本文档第 5 节的字段说明重建）。

---

## 3. 执行步骤

1. 通过 Chrome 扩展新建标签页，导航到 `https://psnprofiles.com/megurined`。
2. 若页面标题含 "Just a moment"，说明 Cloudflare 挑战还没过，稍等后重试读取。
3. 用 `javascript_tool` 提取数据，参考以下经过验证可用的选择器和代码：

```js
(() => {
  const out = {};
  out.avatar = document.querySelector('.avatar img')?.src;              // 头像
  out.name  = document.querySelector('.username')?.textContent.trim(); // 用户名
  out.motto = document.querySelector('.comment')?.textContent.trim();  // 签名
  out.level = document.querySelector('.level-box')?.textContent.trim(); // 等级（纯数字）
  // 奖杯五数（顺序：total, platinum, gold, silver, bronze）
  out.trophies = [...document.querySelectorAll('ul.profile-bar li')]
    .map(li => li.textContent.trim().replace(/\s+/g, ' ')).slice(0, 5);
  // 8 项统计（value+label 连在一起，如 "738Games Played"）
  out.stats = [...document.querySelectorAll('.stats > *')]
    .map(s => s.textContent.trim().replace(/\s+/g, ' '));
  // 世界/国家排名（在 stats 里可能取不全时用这个补）
  out.ranks = [...document.querySelectorAll('[class*="rank"]')]
    .map(e => e.textContent.trim().replace(/\s+/g, ' ').slice(0, 40));
  // 背景图：取所有带 background-image 的元素
  out.backgrounds = [...document.querySelectorAll('[style*="background"]')]
    .map(e => (e.getAttribute('style') || '').match(/url\(['"]?([^'")]+)['"]?\)/)?.[1])
    .filter(Boolean);
  return JSON.stringify(out, null, 1);
})()
```

4. **背景图必须选大图**（关键，踩过坑）：
   - `backgrounds` 里会出现两类 URL：`games/xxx/XSHxxxx.png`（**92x25 模糊占位缩略图，禁止使用**）和 `games/xxx/LHxxxx.jpg`（**约 1920x520 的原图，用这个**）。
   - 如果只抓到 XSH 占位图，说明页面没加载完，等几秒重新执行提取。
   - 拿不准时用 `new Image()` 检查 naturalWidth，取宽度 ≥ 1000 的那张。
5. 用 curl 验证 avatar 和 background 两个 URL 返回 200。
6. 更新 `source/_data/psn.yml` 对应字段：
   - 数字一律写成**带千分位逗号的字符串**（如 `'11,374'`），和页面显示保持一致；
   - 保留文件里的所有注释和结构；
   - `flag` 字段**保持空字符串**（用户明确要求不显示旗帜，且 flagcdn 在国内加载不了）；
   - `stats` 列表里 World Rank 和 Country Rank 两项保留 `highlight: true`（绿色高亮）。

---

## 4. 修改范围

- **只允许修改**：`source/_data/psn.yml`
- **禁止改动**：`themes/icarus/layout/layout.jsx`（横幅渲染代码）、`_config*.yml`、其他任何文件
- **禁止 git commit / push**：改动留在工作区，由用户审阅后自行提交推送（推送到 main 后 GitHub Actions 自动构建上线）

---

## 5. psn.yml 字段说明

| 字段 | 说明 | 示例 |
|------|------|------|
| profile_url | 跳转链接，固定不变 | https://psnprofiles.com/megurined |
| name / motto | 用户名 / 签名 | megurined / Here comes nothing! |
| flag | 固定留空（不显示旗帜） | '' |
| avatar | 头像 URL | https://i.psnprofiles.com/avatars/m/Gf9e57bdfe.png |
| background | 背景大图 URL（LHxxxx.jpg） | https://i.psnprofiles.com/games/59d66b/LHfccd3c.jpg |
| level | 等级，字符串 | '542' |
| trophies.* | 五色奖杯数，带逗号字符串 | total: '11,374' |
| stats | 8 项统计，value/label/可选 highlight | value: '30,840' label: World Rank highlight: true |

---

## 6. 验证（推荐）

1. 用 `.claude/launch.json` 里的 `hexo` 配置启动本地预览（4001 端口）。注意：`_data` 或主题 JSX 变更后**必须重启**服务才生效。
2. 检查首页 `.psn-header` 元素：数字与 PSNProfiles 一致、背景图为清晰大图（可查 `performance.getEntriesByType('resource')` 确认 LH 图加载成功）、头像正常。
3. 本机的 preview_screenshot 工具有故障（一直超时），用 DOM 检查代替截图验证，或请用户浏览器打开 http://localhost:4001 目视确认。

---

## 7. 完成后的输出

1. 向用户报告**新旧数据对比**（哪些数字变了、背景图是否换了游戏）。
2. 提醒用户：改动在工作区，审阅后推送 main 才会上线。

---

## 8. 已知坑与历史决策记录

- **XSH 占位图坑**：PSNProfiles 的背景在 DOM 里有占位缩略图和原图两个版本，抓错会导致横幅背景模糊（2026-07-09 踩过）。
- **flagcdn.com 国内不可用**：旗帜图会裂，所以 flag 留空、横幅不渲染旗帜元素。
- **Cloudflare 全面拦截**：本机 curl、Anthropic WebFetch、GitHub Actions 构建机全部 403，自动化抓取不可行，这就是为什么更新必须走浏览器扩展 + 手动触发。
- **layout.jsx 里 url() 不要加双引号**：inferno 渲染 style 属性时双引号会截断 HTML 属性导致背景失效（已修复，改布局时注意）。
- **图片直接外链**：i.psnprofiles.com 无防盗链，不需要把图片下载到本地仓库。
