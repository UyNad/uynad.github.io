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
法环Mo制作流程其一：如何解包工程，并查看动画与配置文件。

<!--more-->

___

本篇文档会介绍如何解包法环工程，从而查看并修改游戏数值、角色AI、角色动画、技能配置及关卡场景配置。

<br/>

# 解包工具一览

| 工具                                                         | 功能                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [UXM Selective Unpacker](https://www.nexusmods.com/eldenring/mods/1651) | 对游戏本体进行解包和打包                                     |
| [Yabber](https://github.com/JKAnderson/Yabber)               | 对UXM解包出来的文件进行进一步解包和打包，支持.bnd, .bhd/.bdt, .dcx, .fltparam, .fmg, .gparam, .luagnl, .luainfo, .tpf.这些格式 |
| [DSMapStudio](https://github.com/soulsmods/DSMapStudio)      | 查看并编辑游戏内的.map地图文件、param游戏参数以及角色模型贴图等 |
| [DSAnimStudio](https://github.com/Meowmaritus/DSAnimStudio)  | 查看并编辑游戏内的.tae动画数据文件                           |
| [DSLuaDecompiler](https://github.com/katalash/DSLuaDecompiler) | 对AI lua文件进行反编译                                       |
| [ModEngine2](https://github.com/soulsmods/ModEngine2)        | 应用mod文件夹下的文件修改并启动法环，可建立多份Instance测试不同内容 |

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

DSMapStudio还有个重要用途，就是修改战斗参数param。以下图为例：

{% img "box px-0 py-0 ml-auto mr-auto" /images/20240801-elden-ring-unpack/dsmap-param.png 800 '"dsmap-param" "战灰：二连斩的配置"' %}

<br/>

可以修改该战灰的稀有度、购入售出价格、是否可掉落、可附魔属性、可附魔武器种类等。

在DSMapStudio中修改后保存，文件会存到mod文件夹下。修改内容可以通过ModEngine2启动。

<br/>

# DSAnimStudio：编辑动画

DSAnimStudio可以编辑TAE（TimeAct Editor）文件，从而控制判定帧、取消帧、无敌帧、SPEffect、bullet、SFX、sound等所有由动画帧驱动的内容。

> - Activating invulnerability frames.
> - Parry windows
> - Applying an "SpEffect" (special temporary statuses such as ring effects, poisoning, buffs, AI triggers, etc)
> - Allowing animation cancelling
> - Setting the flag for YOU DIED and respawning
> - Creating "SFX" / "FFX" (both refer to the exact same files: visual effects)
> - Playing sound effects such as footsteps, sword swooshes, etc.
> - Invoking an attack behavior (does damage to opponent, drains stamina from player, etc all in one event)
> - Invoking a "bullet" (projectile) behavior (fires projectile, drains stamina from player, etc all in one event)
> - Invoking a "common" behavior (like attack behaviors but for simpler things such as falling on someone's head causing stagger)
> - Creating motion blur on weapon swings
> - Setting the opacity of a character (used for getting summoned into other worlds, dying, etc)
> - Setting attack aim tracking speed of a character
> - Playing a "RumbleCam" file (relative screen movement e.g. Smough's footsteps shaking screen)
> - Playing additional animation layers (e.g. all of Gwyn's animations have events to play his clothes-blowing-in-wind animation layered on top of the other animations)
> - Adjusting model render masks (showing/hiding specific parts of characters)
> - Many more that we haven't even figured out yet.

*DSAS唯一不支持的FS游戏是《黑暗之魂2》，因为魂2是用其他引擎制作的。*

对于已经解包的工程，可以通过Files→open打开chr.anibnd.dcx，查看该角色的动画数据。

角色的一个行为=动画数据（hkx）+动画帧驱动数据（tae），DSAS可以直接编辑tae，而hkx需要导出到Blender后修改再打回去。

{% img "box px-0 py-0 ml-auto mr-auto" /images/20240801-elden-ring-unpack/dsas.png 800 '"dsas" "DSAnimStudio视图介绍"' %}

- Animation：chr的动画文件。
- Graph：该动画的action数据。
- Parameters：选中action的具体参数。
- Entity：控制Entity的Transform、StateInfo（用来做多阶段）和NPC Param（用来替换模型）。如果自己做了角色模型，可以在这里导入后测试。
- Viewport：查看动画+数据的播放表现，可以逐帧查看。

部分action只有在特定StateInfo下才会apply，如果不apply，会显示为红色×。如果不想设置StateInfo就查看动画的全部action，可以按4（Toggle StateInfo Of Selected Actions 快捷键）打开。

<br/>

# DSLuaDecompiler：编辑AI

通过Yabber解包出的Lua，需要进一步反编译才能被阅读。这一步需要DSLuaDecompiler，对AI Lua文件进行反编译。

{% img "box px-0 py-0 ml-auto mr-auto" /images/20240801-elden-ring-unpack/lua.png 400 '"lua" "2120是玛莲妮亚chrID，212000_battle.lua是玛莲妮亚战斗AI"' %}

<br/>

FS游戏的AI逻辑介绍：[如何设计有“对话感”的BOSS？《只狼》Ai完全拆解。](https://zhuanlan.zhihu.com/p/614731111)

在HTN框架下，以任务（条件→影响）为单位，AI会一直挑选符合条件的任务加入各个计划的任务池。AI有几套优先级不同的计划，在不因优先级发生跳出的情况下，会从该计划的任务池里随机选择一个任务进行执行。计划内可以注册函数、声明计数器、声明计时器等。

*可以通过内容已知的SPEffectID或动画ID反过来慢慢看AI逻辑，直接从头看会比较吃力。*

<br/>

# DSMS→DSAS工作流-梅瑟莫为例

制作Mod，尤其是涉及动画的Mod，需要将DSMapStudio和DSAnimStudio配合使用。接下来以梅瑟莫的投技为例，介绍这一工作流。

梅瑟莫的投技表现和玛莲妮亚非常类似，都是前冲、抬手然后抓取判定，但为什么梅瑟莫的抓取要难躲得多？

针对这一需求，需要查找到梅瑟莫角色的抓取动画，并查看该动画配置的tae数据。

<br/>

## DSMS：查找chrID

查找ID有许多办法，此处提供三种最通用的思路：

1. [Rodan's Juicy Elden Ring Doc](https://docs.google.com/spreadsheets/d/1evpDLAfi1b3cYfGilDtMWXDvynwyN_lbX1chnSSR7Uk)：汇总了VFX、TAE、BEH、HKS和PARTS五类文件的ID和对应内容介绍，但截止到24年8月没有包含DLC内容。

2. DSMS的Model Editor：可以通过角色的英文名查找对应chrID，存在多个时需要分辨哪个是base。*基本是第一个。*<br/>{% img "box px-0 py-0 ml-auto mr-auto" /images/20240801-elden-ring-unpack/dsmschrid2.png 700 '"lua" ""' %}

3. DSMS的Map Editor：不确定要编辑的对象用了哪个chrID时，可以通过map反查。找到物种包藏库这张map，通过英文名查找entity，或者自己手动沿着地图一路“走”过去，找到entity并查看Model Name。<br/>{% img "box px-0 py-0 ml-auto mr-auto" /images/20240801-elden-ring-unpack/dsmschrid.png 700 '"lua" ""' %}

   <br/>

<br/>

## DSAS：查找抓取技配置

查看5130的动画数据，找到投技动画，看到这一配置时，“为什么梅瑟莫投技很难躲”的答案已经呼之欲出——

{% img "box px-0 py-0 ml-auto mr-auto" /images/20240801-elden-ring-unpack/throwtae.png 800 '"throwtae" "a000_003022配置"' %}

<br/>

如果进一步追究，这个attack behavior的BehaviorJudgeID为360，它的判定配置为5130360，即chrID+BehaviorJudgeID。

<br/>

## DSMS：查找atkparam

在DSMS的Param Editor下找到AtkParam_Npc，这一文件管理atk的hitbox&damage。查到5130360配置，它就是梅瑟莫投技判定的“罪魁祸首”——

{% img "box px-0 py-0 ml-auto mr-auto" /images/20240801-elden-ring-unpack/atkparam.png 800 '"atkparam" "5130360配置"' %}

<br/>

atkparam可以配置atk下每个hit的判定大小、受击类型、受击权重、hitbox挂点及形状、击退距离、卡肉时间、附加SPEffect、各类型伤害基础值、多人下各类型伤害基础值、冲击力、对物件伤害、SFX ID、Decal ID和AI Sound ID等。

这里没有列举出所有数值，因为配置项实在太多了。和这一投技最相关的配置，其实只有四项：

- hit0_Radius：第一次hit的半径大小，为1.3。
- hit0_DmyPoly2：第一次hit的第二个挂点，为-1。-1表示没有，即第一次hit为sphere。
- throwTypeId：为4100。配置投技成功后衔接的投机处决动画，即处决动画ID是4100。
- throwFlag：枚举，为1.1表示是Throw transition投技过渡，2为Throw投技处决。

如果继续看4100动画，会发现5130361~5130364就是投机处决动画的四个ThrowAttack Behavior，这类action相比Attack Behavior会同时调整玩家角色位置来做抓取表现。

总之，看到这一步，不仅知道了为什么梅瑟莫投技难躲，还知道了如何调整这一配置。将5130360这一投技判定形状从sphere改为capsule，并修改radius使其符合手部大小，就会减少被梅瑟莫虚空抓取的表现。

<br/>

