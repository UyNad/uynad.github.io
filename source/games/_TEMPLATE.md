---
# 游戏页模板（文件名以 _ 开头，Hexo 不会渲染它）
#
# 新建一个游戏：复制本文件到 source/games/<代号>/index.md，改 front-matter 即可。
# 栏目首页 /games/ 会自动出现这个游戏。
#
# 写这个游戏的文档 / 心得：照常在 source/_posts 写文章，front-matter 加一行
#   game: <代号>
# 文章就会自动列进游戏页，文章顶部也会出现「本文属于游戏开发系列」的跳转条。
#
# 网页试玩文件：放在 source/games/<代号>/play/ 下，入口 index.html。
# 该目录已在 _config.yml 的 skip_render 里，Hexo 原样复制不做处理。
#
# 安装包不要放进本仓库（GitHub 单文件上限 100MB），放 GitHub Releases / 网盘，这里只填链接。

title: 游戏名
layout: game
game: my-game            # 代号，英文小写，和文件夹名一致
order: 9                 # 栏目首页里的排序，小的在前
tagline: 一句话介绍
description: SEO 摘要，60-90 字，含游戏名和品类关键词，全角标点。
engine: Godot            # UE / Godot / HTML5 / Unity（决定徽章颜色）
platforms:
  - PC
status: 开发中           # 开发中 / 已发布 / 原型 ……
cover: /games/my-game/cover.jpg   # 可选，16:9 封面
widgets: []              # 去掉侧边栏，游戏页全宽显示，保留这行

# 顶部展示，三选一（优先级 play > trailer > cover）
play:                    # 网页可玩
  url: /games/my-game/play/index.html
  orientation: landscape # landscape 横屏 / portrait 竖屏手机框
  ratio: 16/9            # 可选，默认横屏 16/9、竖屏 9/16
  tip: 操作说明
trailer: /games/my-game/trailer.mp4   # 不能网页玩：放视频 mp4 或 gif / 图片

downloads:               # 下载按钮，可多个
  - label: Windows 版
    url: https://github.com/UyNad/xxx/releases/latest
    size: 500 MB
    note: GitHub
  - label: 百度网盘
    url: https://pan.baidu.com/s/xxx
    note: 提取码 xxxx

versions:                # 第一项视为最新版本，显示在顶部
  - version: v0.2
    date: 2026-12-01
    notes: 新增 xxx
  - version: v0.1
    date: 2026-11-10
    notes: 第一个可玩版本
---

游戏介绍（markdown 正文）。
