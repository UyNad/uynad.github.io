---
title: 让文章不出现在首页的消失魔法
date: 2023-08-10
categories: Devlog
tags: 
- 网页开发
cover: /images/20230810-index-custom.png
toc: true
---
写功能前先上Github搜搜，搜完基本就不用写了。 

<!--more-->

___

在无人注意的小角落，有一堆文章偷偷消失了。这些文章还会出现在时间线和最新发布里，但是在首页上却找不到。

这些是拼装高达的评测文档。因为数量太多*且没时间做统一风格封面*，堆在首页影响美观，信息熵值也很低。就和所有小众爱好一样，高达是喜欢的人会很喜欢、不喜欢的人毫无认知的题材。评测文成片堆在首页会挤掉其他稍微有点含金量的文档。

<br/>

# 问题分析

萌生上面的念头后，就开始为问题寻找解决方案。从用户*（本人）*的角度出发：

1. 高达文档数量已经很多，而且还要继续写。
2. 希望有个地方归档高达文档。
3. 出现在首页又嫌丑。
4. 不希望改变使用习惯，也不想新建网站。

综上，决定寻找一个既可以继续使用md写文档、又不让这些文档出现在首页的方案。

<br/>

# 功能配置

不想让文档渲染在首页的话有很多做法，而既然有很多做法，就肯定有现成的轮子。在Github搜了下Hexo首页自定义的方案，最后选了[hexo-generator-index-custom](https://github.com/im0o/hexo-generator-index-custom)插件。

## 插件介绍

> 支持置顶与隐藏文章的 [Hexo](http://hexo.io/) 首页生成器插件。在官方的首页生成器的基础上添加了使用 `top` 置顶文章和 `hide` 隐藏文章的功能。
>
> 它会根据您的主题的 `index` 或 `archive` 格式生成首页。



## NPM安装

```
$ npm uninstall hexo-generator-index

$ npm install hexo-generator-index-custom --save
```



## 首页配置

在 _config.yml 中新增或修改如下配置：

```
index_generator:
  path: ''
  per_page: 10
  order_by: -date
  pagination_dir: page
```



## 文章配置

对于每篇文章，可以设置置顶并指定权重：

```
top: 100
```

添加hide参数并设置为true后可以隐藏文章，

```
hide: true
```

但文章依然会出现在时间线和最新发布中。

<br/>