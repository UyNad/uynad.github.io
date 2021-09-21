---
title: 关卡设计指导规范：白模制作
date: 2021-09-21
categories: 闸总自白
tags: 
- 关卡设计
cover: /images/20210921-blockmesh.png
toc: true
---

本文将聚焦于关卡制作管线的第二环：白模制作的指导规范。

<!--more-->

---

## Level Design Pipeline

关卡制作管线可以粗略分为三大环节：流程规划、白模制作和游玩迭代。在之前一篇文章里，总结了自己对于[流程规划的思考过程](https://uynad.github.io/2021/09/09/ldesign/20210910-how-to-ship/)。近日回顾了一个[Level Design方向的GDC视频](https://www.youtube.com/watch?v=09r1B9cVEQY)，顽皮狗的David Shaver分享了自己对于Blockmesh（白模制作）的思考角度，收益颇丰。

实际上，之前的流程规划思考，在Level Design Pipeline里就对应着Level Requirements环节。而这个GDC视频，主题是第二环节的Build Blockmesh Layout。*正巧和优秀设计师的思路接上轨，把别人的视角拿来利用，真妙。*

{% img "box px-0 py-0 ml-auto mr-auto" /images/20210921-blockmesh/pipeline.png 700 '"Level Design Pipeline" "Level Design Pipeline"' %}

<br/>

日后会针对Playtest编写第三篇文章，就此由三部曲组成完整的关卡设计指南。希望在日后实操里不要忘本，同时要不断进化。

## Blockmesh Guidance Principles

David在开头列举了所有Blockmesh制作时的设计角度，结论放最前。

{% img "box px-0 py-0 ml-auto mr-auto" /images/20210921-blockmesh/sum.png 700 '"Blockmesh Principles" "Blockmesh Principles"' %}

<br/>

下面的分条说明，会截取PPT原文作为留档，但文章部分是个人想法而非原文内容，请注意。

<br/>

### Affordance

Affordance是个设计领域的自创词，是Donald Norman在《设计心理学》里引入的一个心理学概念。这个词是afford（可提供）的名词变种。

> （Affordance）示能这个词，是指一个物理对象与人之间的关系。无论是动物还是人类，甚至是机器和机器人，他们之间发生的任何交互作用。
>
> 示能的体现，由物品的品质，和与之交互的主体的能力共同决定。

{% img "box px-0 py-0 ml-auto mr-auto" /images/20210921-blockmesh/affordance.png 700 '"Affordance in Game" "Affordance in Game"' %}

<br/>

可以将示能理解为场景关卡交互，但其含义远不止“有交互功能”，还包括“统一的交互原则”。例如有裂痕的墙壁是可破坏交互物，血量归零后自我销毁；那么这种墙壁的外观、摆放逻辑等，要在整个游戏里保持一致，不能这次普攻能打碎，下次就得靠炸弹来打碎。

制作Blockmesh时，可以靠颜色和形状做出几个prototype去摆放，哪怕没写程序功能。例如我在自己的白模设计里，会用颜色深浅来区别不同高度的掩体，表示其功能的变化。

<br/>

### Denying Affordance

反示能（拒绝示能？负示能？），字面意思，是示能的反面。示能让主体意识到可交互及交互结果，反示能让主体意识到不可交互，从而主动远离。*当然，游戏界最经典的反示能就是空气墙*

{% img "box px-0 py-0 ml-auto mr-auto" /images/20210921-blockmesh/deny.png 700 '"Denying Affordance in Game" "Affordance in Game"' %}

<br/>

contextualize是件易懂难做的事。有多种方法可以达到反示能效果，但有些方法会比其他方法分数更高。例如，不想让玩家去攀爬的缺口墙壁，会在缺口设计一些木刺和挡板，以表示“此路不通”。在一个房间存在多个入口，但设计师只希望玩家从特定口进入时，其他口应处于封闭状态。

这一节出现了个有趣的点。顽皮狗内部CE时，会**用不可见mesh圈定“不想让玩家去的反示能区”**，日后可以和游玩数据比对，以及更有效地向别人展示设计意图。

<br/>

### Visual Language - Shape

形状与颜色的使用有着相似准则，例如要在整个游戏里（或者起码本关卡）保持统一性，同时可以传达设计信息给其他设计师，作为图例来使用。

{% img "box px-0 py-0 ml-auto mr-auto" /images/20210921-blockmesh/shape.png 700 '"Visual Language - Shape" "Visual Language - Shape"' %}

<br/>

不同形状存在着不同的心理暗示，例如圆体是安全，方体是稳定，尖刺是危险。利用不同形状，可以有效示能。

<br/>

### Visual Language - Color

除去上述的形状功能，颜色还拥有自己的用法。

{% img "box px-0 py-0 ml-auto mr-auto" /images/20210921-blockmesh/color.png 700 '"Visual Language - Shape" "Visual Language - Shape"' %}

<br/>

稍微可变性：颜色要适应环境美术，突出即可，不必强求同一颜色。例如可攀爬的黄色，在部分场景里可能会变为浅绿色。

场景叙事性：在白模阶段，颜色比形状的叙事功能更突出。想要设定白模舞台为学园、绿林等，可以通过简单上色来展现效果。

<br/>

### Landmarks

地标，顾名思义的存在。在这里发现了一个差异，个人会把所有用来指引路线的特殊景色都称为地标，但演讲特意指明了是“多个角度都可见的遥远对象”。鉴于演讲者的细分程度比我的要丰富得多，之后也打算划清概念，只用来指代远处对象。

{% img "box px-0 py-0 ml-auto mr-auto" /images/20210921-blockmesh/landmark.png 700 '"Landmark" "Landmark"' %}

<br/>

要设计地标是所有关卡的共识，实际设计效果却大相径庭。近年来最喜欢的地标设计风格是《对马岛之鬼》，制作组曾在GDC视频中表示，他们的地标设计期望是“玩家每十秒就要看到一样新东西”。*显然，对马岛对地标的定义又宽泛了起来。*在系统玩法相对空荡的情况下，主要靠地标景观去打造一个世界，不论这一设计目标如何，Sucker Punch算是完美做到了。

<br/>

### Openings Attract

<br/>

### Gates & Valves

<br/>

### Leading Lines

<br/>

### Pinching

<br/>

### Framing & Composition

<br/>

### Breadcrumbs

<br/>

### Textures

<br/>

### Movement

<br/>

### Light & God Rays

<br/>

## Epilogue：为何写，如何用



<br/>

