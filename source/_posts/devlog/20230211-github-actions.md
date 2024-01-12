---
title: 使用Github Actions部署Hexo博客
date: 2023-02-11
categories: Devlog
tags: 
- 网页开发
cover: /images/20230211-github-actions.png
toc: true
---
本网站的自动部署方式从Travis CI更换为Github Actions。

<!--more-->

___

在平平无奇的一天，本人再次发现网站停止了更新，之前写的文章都没刷新出来。本以为是构建又出了什么Bug，点开Travis CI看看日志，一看吓一跳。Travis CI友情提示道，帐号已经用光了所有credits，OSS开源项目将不能再构建，除非花钱。

{% img "box px-0 py-0 ml-auto mr-auto" /images/20230211-github-actions/1.png 600 '"""" ' %}

<br/>

本来想支持下Travis，毕竟也用了一年多服务。点开订阅计划，价格是每年700+刀。

不然，还是换个自动部署方案吧。

<br/>

## Vercel自动部署

网站的Waline插件用的就是Vercel托管，自然第一个想到的就是这个方案。打开Vercel，Import，选择Github Repository，啪的一下，很快呀，光速导入并开始部署了，还没反应过来，人家预览界面都出来了。

因为之前装Waline的时候，Vercel的帐号和Github认证都弄好了，所以节省了很多迁至步骤。

部署之后发现，原本的链接变成了xxxx.github.io.vercel.app，无法改成xxxx.github.io，也无法重定向到这个网页。毕竟github.io不是我的域名，我也改不了A Record。

不想要.vercel.app链接后缀的话，大致有三种做法：

1. 买个新的域名。
2. 尝试Vervel推送到Github Pages，反向操作。
3. 寻找其他部署方案。

<br/>

## Github Actions自动部署

一番思索后，最终选择了方案三。方案一是因为维护域名麻烦*不想掏钱*，方案二是操作比较吊诡*很难找例子抄*，和@Jsky大佬讨论后，大佬告知Github Actions可以创建工作流并自动部署，遂学习之。

Github Actions官方文档：https://docs.github.com/en/actions

### 创建repo secret

访问仓库需要密钥，查阅了他人的方案，一般有两种方法，分别是SSH身份认证和personal access token。SSH密钥需要生成一对私钥和公钥，私钥仓库推送的时候，公钥仓库就会开始拉取、构建并推送。

personal access token是一种classic的做法。至少，Github是这么定义的。使用方法非常简单，添加一个新的token并取名即可。脚本会通过token名字读取到内容，保证两边一致。

网站最后采取了后一种方式。原因无他，使用SSH密钥的workflow都因为各种原因跑不通，最后可以跑通的workflow用的是personal access token。*既然能跑了，那就别动它了吧！*

<br/>

### 创建workflow yml

在存放hexo代码项目根目录的.github/workflows文件夹下创建一个workflow yml，名字随意。这个脚本的目的是，在main分支发生推送时，自动执行更新构建操作并推送到gh-pages分支，以更新静态博客网页。

```
name: Hexo Deploy GitHub Pages
on:
  push:
    branches:
    # 推送到main分支后开始自动更新
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@master

      - name: Build and Deploy
        uses: theme-keep/hexo-deploy-github-pages-action@master
        env:
          # GITHUB TOKEN
          PERSONAL_TOKEN: ${{ secrets.HEXO_KEEP_DEPLOY }}

          #部署到uynad.github.io仓库
          PUBLISH_REPOSITORY: UyNad/uynad.github.io

          # 部署到gh-pages分支
          BRANCH: gh-pages
          PUBLISH_DIR: ./public
```

*学了一晚上，自己写的全都在报错*，最后用了theme-keep下的[actions-gh-pages@v3](https://github.com/peaceiris/actions-gh-pages)，部署成功了。正可谓是学别人走得快，自己学走得远，直接偷别人走得又快又远。

<br/>

### 关注构建结果

在main分支进行推送后，即可在Actions页面查看构建结果了，展开可查看详细日志，Deployment successful终于出现在眼前。

{% img "box px-0 py-0 ml-auto mr-auto" /images/20230211-github-actions/2.png 800 '"""" ' %}

<br/>

希望起码一年内，不会再有更换部署方案的需求。

<br/>
