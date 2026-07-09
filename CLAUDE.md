# CLAUDE.md

这是一个 Hexo 博客项目（主题 icarus，部署方式为推送 main 后 GitHub Actions 自动构建到 gh-pages）。

## 可执行任务文档

`Claude/` 目录存放可复用的任务文档。当用户提出对应任务时，先阅读对应文档再执行：

- **「刷新 PSN 数据」**：执行 `Claude/PSNBannerUpdate.md`（更新首页 PSN 横幅数据，需要 Chrome 扩展）

## 项目约定

- 面向读者的中文内容（文章、description、标题）一律使用全角标点（：，、——）
- 新文章需在 front-matter 中包含 `description:`（SEO 摘要，60-90 字，含游戏名和品类关键词）
- 未经用户确认不要 git commit / push
- 本地预览：`.claude/launch.json` 已配置 hexo 服务（4001 端口）；本机 preview_screenshot 工具有故障，用 DOM 检查代替截图验证
