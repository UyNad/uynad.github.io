---
title: 《光环无限》：受击反馈中的关键信息
date: 2021-11-22
categories: 赛博垃圾
tags: 
- 《走近APEX》
- 战斗设计
- 玩法设计
cover: /images/20211122-halo.jpg
toc: true
---
TTK越长的射击游戏，越需要从受击反馈里体现出“信息量”。

<!--more-->

---

*最近写的很多文章都是长文，加入了一堆前言后话和各种分段标题。可能看着会更有条理，但对于写作者本人来说其实很累赘。打算回归“只抛观点”的随笔风格。（即读者看了爱懂不懂）*

《光环无限》有着和APEX相似的长TTK战斗风格，但是在长时间对局里，APEX能通过战斗表现向玩家传递战场信息，而无限则欠缺这种体验。

<br/>

## TTK推导出战斗等式

首先是一个粗暴的等式：**TTK越长→对局时间越长→博弈点越多→玩家暴露的信息越多→玩家需要的信息越多。**

战斗模型需要确保第三环，即设计师需要提供足够多的博弈行为，让玩家能形成对局状态，而非单纯射得越久越好；战场信息需要确保第四环和第五环，即通过某种手段告知玩家当前战况，包括但不限于受击方位UI、文字信息和敌我描边等。

<br/>

## 等式环节中的关键信息

基于上面的等式，再来考虑1V1的最基本模型。对于第四环和第五环，玩家需要知道的关键信息是：

1. 对方当前血量；
2. 对方最大血量；
3. 是否可一击必杀（对应战斗模型的这一行为设计）。

1和2会决定玩家是否从立回进入战斗，1告知风险，2告知收益；而3会决定玩家是否去尝试一击必杀。1和3需要在战斗中不断更新信息，而2仅需要在刚进战时进行告知。

<br/>

## 用关键信息来分析游戏

基于上面的核心信息论，来分析下这两款游戏在第四环和第五环上的差别。

对于《光环无限》：

1. 敌人随着血量下降会有三种状态变化，通过身上特效来体现。
2. 无体现，最大血量基本都是一个值。部分护盾会给身体增加特效。
3. 对应1，碎盾状态下近战可一击必杀。

对于APEX：

1. 敌人有护甲时触发护甲受击特效，不同等级的护甲，受击特效颜色不同。
2. 护甲颜色=护甲等级=告知最大血量。红甲大哥不好打，但打死就能抢红甲。
3. 对应1，碎甲状态下最大100血，是个枪就能一梭子扫死。

APEX相比《光环无限》，有着更复杂的资源系统，因而在战斗中**可以**暴露出更多信息；然后伟大的Respawn，通过**护甲等级颜色**这一创新设计把信息成功给到了玩家。重要的战场信息，通过受击反馈的特效颜色融入到游戏里，甚至让玩家感受不到其存在，所谓春风化雨。不然可以试想，PUBG拥有更复杂的资源系统，但打起架来，玩家有哪几次能清晰估计出对面有多“肥”？

不过APEX的信息更密集，也不代表APEX就一定比《光环无限》好玩。越本真的射击游戏，越需要还原最纯粹的嘴臭…阿不，射击享受。《光环》这一系列一直是老炮儿射击的代表，没必要抛掉特色学别人。*再者说，市面上已经有了多款成功的资源射击游戏，自己去学再学不过人家多尴尬。*1202年的今天还能腰射到爽，这波《光环无限》多人免费真的血赚。

<br/>
