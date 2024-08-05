---
title: 《艾尔登法环》Mod：解包工程篇
date: 2024-08-01
categories: Devlog
tags: 
- 游戏开发
- 战斗设计
cover: /images/20240801-elden-ring-unpack.png
toc: true
---
法环Mo制作流程其一：如何解包工程。

<!--more-->

___

本篇文档会介绍如何解包法环工程，从而查看并修改游戏数值、角色AI、角色动画、技能配置及关卡场景配置。

<br/>

# 解包工具一览

| 工具                   | 功能                                                         |
| ---------------------- | ------------------------------------------------------------ |
| UXM Selective Unpacker | 对游戏本体进行解包和打包                                     |
| Yabber                 | 对UXM解包出来的文件进行进一步解包和打包，支持.bnd, .bhd/.bdt, .dcx, .fltparam, .fmg, .gparam, .luagnl, .luainfo, .tpf.这些格式 |
| DSMapStudio            | 查看并编辑游戏内的.map地图文件、param游戏参数以及角色模型贴图等 |
| DSAnimStudio           | 查看并编辑游戏内的.tae动画文件                               |
| DSLuaDecompiler        | 对AI lua文件进行反编译                                       |

<br/>

# 必要：使用UXM解包本体

<br/>

{% img "box px-0 py-0 ml-auto mr-auto" /images/20240801-elden-ring-unpack/uxm.png 700 '"uxm" "UXM工具"' %}

在Executable Path里索引游戏本体的运行exe，可以在View Files里进一步选择解包范围。

点击Unpack后会开始解包，解出如下文件结构。

{% img "box px-0 py-0 ml-auto mr-auto" /images/20240801-elden-ring-unpack/struc.png 400 '"struc" "文件夹及对应内容"' %}

<br/>

# Yabber：单文件解包

Yabber可以对UXM解包出来的.dcx文件进一步解包，编辑完之后再打包。我主要用来做两件事：

1. msg编辑：从dcx解包出xml文件，修改后打包回去，用来处理冲突或者做汉化。
2. AI编辑：从.dcx解包出lua文件，再反编译后查看AI配置。*暂时还没自己魔改过AI*

以msg/engus/item_dlc02-msgbnd.dcx为例，Yabber解包后会在该路径生成item_dlc02-msgbnd-dcx文件夹：

{% img "box px-0 py-0 ml-auto mr-auto" /images/20240801-elden-ring-unpack/yabber1.png 300 '"yabber1" ""' %}

<br/>

再次对WeaponName_dlc01.fmg进行解包，可以得到WeaponName_dlc01.fmg.xml文件：

{% img "box px-0 py-0 ml-auto mr-auto" /images/20240801-elden-ring-unpack/yabber2.png 300 '"yabber2" ""' %}

<br/>

这个文件就是dlc01黄金树幽影的武器名文本。

```
<?xml version="1.0" encoding="utf-8"?>
<fmg>
<compression>None</compression>
<version>DarkSouls3</version>
<bigendian>False</bigendian>
<entries>
<text id="1500000">Main-gauche</text>
<text id="1500100">Heavy Main-gauche</text>
<text id="1500200">Keen Main-gauche</text>
<text id="1500300">Quality Main-gauche</text>
<text id="1500400">Fire Main-gauche</text>
<text id="1500500">Flame Art Main-gauche</text>
<text id="1500600">Lightning Main-gauche</text>
<text id="1500700">Sacred Main-gauche</text>
<text id="1500800">Magic Main-gauche</text>
<text id="1500900">Cold Main-gauche</text>
<text id="1501000">Poison Main-gauche</text>
<text id="1501100">Blood Main-gauche</text>
<text id="1501200">Occult Main-gauche</text>
<text id="1510000">Fire Knight's Shortsword</text>
<text id="1510100">Fire Knight's Heavy Shortsword</text>
<text id="1510200">Fire Knight's Keen Shortsword</text>
<text id="1510300">Fire Knight's Quality Shortsword</text>
<!-- more until 68510000-->
</entries>
</fmg>
```

<br/>

# DSMapStudio：编辑地图

对于解包后的文件，DSMapStudio可以以Map为单位，索引地图模型及对应的游戏参数，查看并编辑地图数值。

{% img "box px-0 py-0 ml-auto mr-auto" /images/20240801-elden-ring-unpack/dsmap.png 1100 '"dsmap" "m11→9000→11000389"' %}

<br/>

如上图，M11是王城罗德尔，load map后可以查看map配置。图中选中的entity就是王城罗德尔大道上的腐败化身enemy。

<br/>

# DSAnimStudio：编辑动画



<br/>

# DSLuaDecompiler：编辑AI



<br/>