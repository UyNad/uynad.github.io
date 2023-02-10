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

本来想支持下Travis，毕竟也用了一年多服务。点开订阅计划，每年高达700+刀，光速关闭网页。

不然，还是换个自动部署方案吧。

<br/>

## Vercel自动部署

<br/>

## Github Actions自动部署



### 创建repo secret 

SSH身份认证

personal access token

<br/>

### 创建workflow yml

<br/>

{% img "box px-0 py-0 ml-auto mr-auto" /images/20230211-github-actions/2.png 800 '"""" ' %}

<br/>

希望起码一年内，不会再有更换部署方案的需求。

<br/>
