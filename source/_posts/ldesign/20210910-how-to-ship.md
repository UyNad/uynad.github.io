---
title: 《如何做船》：游轮副本关卡的设计过程总结
date: 2021-09-10
categories: 闸总自白
tags: 
- 关卡设计
- 叙事设计
- 玩法设计
cover: /images/20210918-ship.png
toc: true
---

关卡制作管线的第一环：概念设定及流程规划。

<!--more-->

---

*在欧洲时为了省钱，做过好几趟客轮。没想到日后有一天会做进游戏里。*

<br/>

## 确定舞台的三要素

   

### Who：核对叙事剧本

仔细检查叙事剧本，抽出所有关卡相关的重要元素。

**基本叙事：**最基础的是人与事。人略过不谈，事经常被抽象为脚本动画与关卡互动事件。对于事件的分类，要和文案在规划上达成一致。

**关卡叙事：**其次是剧本感情与氛围。故事有自己的发生情感，关卡在规划主题时需要以此为出发点。

**玩法叙事：**最后是可抽象出来的玩法。剧本一般不会写明要做什么玩法，但一些故事是可以做成玩法类型的，由此还能引出多选择/多结局/多重奖励。如果有可以抽象出来的玩法事件，可以在设计后和文案核对，双方一起确定最终方案。

<br/>

### Where：选择船只种类的思考

在此环节，关卡一般已经有了主题或粗略地点，*如果这都没有，建议快跑*，但需要进行具体的层与点设计。

对于做船这个需求，**船**是确定的，但**船是什么**需要由关卡来设计。不幸的是，文案方面没有找到“敌人为什么在这艘船上”的内容，因此叙事线索断了。

那么，在文案没有解释的情况下，要如何考虑去选择船只呢？

{% img "box px-0 py-0 ml-auto mr-auto" /images/20210910-ship/ship-select.png 700 '"船只种类选择Xmind" "船只种类选择Xmind"' %}

<br/>

最后选择了关卡自由度最高*且最容易做场景叙事*的游轮。游轮是个容易混淆的词（油轮、邮轮……），后续经常称呼为Ferry。

<br/>

### When：昼夜天气的结合

无论项目存不存在昼夜天气变化系统，这一点都要纳入考虑。

先确定能否动态变化*（大概率是不可以的，因为昼夜变化会影响光照）*，再确定哪些不能做，最后在剩下选项里选到最好的。

当然，前提是叙事剧本没有强制要求，否则大概率要按照叙事来走。

对于游轮关卡，我的思考出发点是**突出游轮相对于“会跑的楼房”的特别之处**。最大的不同当然是，游轮四周都是海，而楼房再怎么会走依然是在陆地上。考虑到关卡动线（多数在船内）和关卡尺寸（大型游轮）的问题，海的存在感并不高。

那么，假如周围在下着雷雨，游轮像一座孤岛一样在海中沉沦，海的存在感是否就会提高呢？

在对同类题材的调研里，发现不少船上故事都发生在雨中。或许创作者们都很喜欢雨中波荡的大海，起码我很喜欢，也觉得这会让游轮关卡更有记忆点。

于是，黄昏~夜晚，中雨~大雨（附雷电）的时间点，就愉快地定下了！

<br/>

### What：确定关卡的Gameplay主题

看似是基本操作，实际上不很早确定并反复重提，在大型副本的设计里，很容易在讨论中慢慢走偏。

个人习惯为关卡取一个核心词，然后将主题细分为四个方面，分别是玩法主题、关卡走向、战斗谜题和美术氛围。

至于这个关卡的核心词是什么？那当然是**《雷雨游轮》**拉！

<br/>

## 设计演出的具体内容

### Prologue：引用可利用的库

即便制作的是项目第一个标杆关卡，也应该有了一定的设计库储备。为了保持项目整体的设计调性，尽量基于前人的肩膀去发散设计，不要完全白手起家。个人习惯将库分为三类：

#### 玩法主题

关卡策划自己规划和管理的设计库。该Block的主要目标，例如漫威蜘蛛侠里常见的玩法变种：追车、救人质、破解电脑和抓人等。这些玩法模块里应该配备好了一定参数，便于设计师调整具体流程。

#### 战斗主题

战斗与关卡共同规划的设计库。战斗和关卡结合紧密的类型*（其实就是点名射击游戏）*，关卡参与比例越高。一个具体的战斗主题由战斗倾向+兵种组合组成，可以任意排列组合。不同组合难度不同，一些组合可能难以成立，最好进行规避。

#### 关卡主题

关卡与战斗共同规划的设计库。战斗和关卡结合紧密的类型*（其实就是点名射击游戏）*，战斗参与比例越高。一个具体的关卡主题由高低分布+结构类型组成，可以任意排列组合。关卡主题和战斗主题的搭配会产生各种火花，如果关卡调不出想要的战斗，可以向战斗请求帮助，或者直接更换主题。

<br/>

### Criteria Matrix：罗列Beats的重要参数

熟悉了项目的设计库后，就可以细化具体的流程规划了。之前学习过的[室内设计视频](https://uynad.github.io/2021/09/07/ldesign/20210908-floor-plan/)有一点非常吸引我，那就是一开始先列出所有数据参数。关卡体验是抽象的，但设计师要将目标具体化，从而对着蓝图进行施工。

我会在Beats表格里填写以下参数：

**NO./发生地点/最小联通/最大联通/玩法主题/关卡主题/战斗主题/关卡尺寸/战斗尺寸/预期难度/预期时间**

日后细化具体设计时，会将Number或发生地点作为代号，来明确讨论对象。

最小和最大联通是指该Beats会联通哪些Beats。最小联通是最低目标，最大联通是期望目标。前者要满足最基本的剧本流程设计，而后者就是关卡自由度的体现。

玩法、关卡和战斗主题是从上面的库里引用出来的，如果创造了新的主题，可以丰富原本的设计库，但尽量不要生造一个不存在于库里的主题。

关卡尺寸是按照关卡与战斗主题估算出来的，日后白模做好后要记得修改成准确尺寸。战斗尺寸单独抽出来，是因为两者并不一定相等。关卡美术更关心前者，战斗更关心后者。为了他人方便，外加更直观地看到空间利用效率，我个人反正……*拆出来试试看嘛。*

另：每个Beats之间都有通路，主要作用是**资源补充、地标观景和兴趣点**。因为作用单一，并没有放进Beats表格。*下次可能会单独整理个通路表格。*

<br/>

### Bubble Diagram：相对位置与联通关系

一个大前提是，先确定关卡地基在哪儿。如果是在已有大世界上进行设计，地基尺寸大致确定，动线次序会相当受限制。如果是凭地起一个关卡，动线次序就只能受到想象力的限制www

把所有Beats做成bubble，大小比例按照关卡尺寸来大致画下，然后放入地基形状内。按照最小联通和最大联通的目标去画连接线，然后查看交叉情况。室内设计会尽量规避交叉，但游戏关卡更加自由，只要处理好路线交叉时的引导问题，个人觉得交叉是可以接受的。

{% img "box px-0 py-0 ml-auto mr-auto" /images/20210910-ship/bubble.png 500 '"Bubble Diagram" "Bubble Diagram"' %}

<br/>

可以画2~4份来场竞标比赛*（我竞标我自己）*，以防止思路受到限制。

<br/>

### Block Diagram：具体布局及通路

确定好了bubble方案后，需要将bubble升级成拥有确定尺寸的Block。此时我们要确定Block间的关卡通路。

不同项目对通路有着不同定义，有些可能附带了预设结构和尺寸。总之，设计师要尽量满足Bubble方案的连接线设计。

相比现实的室内设计，游戏关卡的通路可以更加天马行空。不仅可以摆脱平面限制，还可以利用各种游戏机制，例如上升气流和弹簧等。

很多关卡设计师喜欢“兜兜转转回到原路”的高利用率设计，我个人认为这其实只是手段，其目标是“让玩家时刻意识到自己所处位置”。如果玩家回到原路时意识不到自己刚刚走了条联通路，那这个回到原路的意义并不大。要实现这一目标，通路本身不能太绕，还需借助机制与美术的引导。这是另一个大话题，此处不再赘述，*毕竟本人也还在实践中。*

<br/>

### 调色：添加兴趣点与出入口分流

布局通路全部确定好后，就可以开始锦上添花了。个人目前的主要切入点只有两个，根据项目不同可能会增加。

兴趣点：可以粗暴分为能看的和能玩的。能看的顾名思义，能玩的是主要流程之外的交互物品，例如[打气球玩法](https://uynad.github.io/2021/09/22/cyborg/20210923-function/#%E4%B8%80%E4%B8%AA%E5%B0%8F%E4%BE%8B%E5%AD%90%EF%BC%9A%E6%89%93%E6%B0%94%E7%8E%A9%E6%B3%95)和爆炸物等。兴趣点本身也可以作为路线引导，可以和通路连接相结合。

出入口分流：多人关卡更加需要。Block的出入口可以不止一个，从而进行人员分流，尤其是在关卡出入口狭窄时，设计多出入口也能稍微提高自由感。*但别太过了，不要搞得Block四敞大开*

<br/>

### Finale：具体白模及对应文档

上述设计流程后，应该起码有三份施工蓝图，其中Block Diagram完成度最高。在自己常用的*或项目要求的*建模软件里，画出具体白模，用各种颜色、形状或文字去标记特殊点，甚至可以直接从资源商店里下合适的模型。

白模（Whitebox，Greybox，Blockmesh，或其他说法）具体设计上有极多心得事项，日后会单开一篇文章。

至于建模操作中的教训与悔恨，[已经尝过很多](https://uynad.github.io/2021/09/15/ldesign/20210916-sktup-faceproblem/)，只能说下次起码会换个尝。

白模画好后，一般需要产出关卡PPT进行归档，此时全部设计早已想清楚，搬砖就完事儿了。

<br/>

## 做船的特别之处在于……

上面的思考过程，对于所有关卡都是适用的。那么这次做了个船，相比之前有什么特别之处吗？

<br/>

### 船与“会跑的楼房”的区别点

上面也提到了，根据叙事剧本，大部分流程发生在船内。对于大型游轮，内部其实和楼房差距不大。在这个关卡里，我分别用了昼夜天气、3C颠簸体验、船外动线和尽量贴近真实的关卡美术设定去打造区别点，希望玩家能清楚意识到”这是艘船“。

<br/>

### 贴近真实的关卡美术限制

为了让船像船，在设计关卡分层和分间主题时，大量采用了现实存在的设定。但这也带来了限制：现实里的游轮，关卡动线相当单一，毕竟其用途是旅游购物，不是让游客来当波斯猴子的。虽然在动线上尽量增加了船外场景，但整体动线还是螺旋上升，没有花费心思去打通船层，算是这次的一个遗憾。

<br/>

### 本质上是个超大封闭空间

油轮的基础尺寸定下后，就完全无法再更改了。最开始就意识到了这件事，特意选了大型游轮的尺寸并稍微魔改变大。后续如果要二次利用，无论是老路重走还是设计新结构，都要限制在船体尺寸内，不能擅自打通隔壁或挖地下层。

为了日后用起来方便，这次虽然只用了船体的1/3面积，但在关卡设定里，对整艘船的全部分层与分间进行了详细设计，并与相关设计师进行了同步。*毕竟个人不喜欢顾头不顾腚的设计行为。*

<br/>

## 附录：关卡文档的逻辑结构

以后会不断丰富，或根据关卡需求进行修改。

1. 概念设定
   1. 整体概念
   2. 分层概念
   3. 分间概念
2. 体验规划
   1. 体验主题
   2. 路线总览
   3. Beats表格
   4. 流程曲线

3. 玩法机制

   ​	1.（关卡特性玩法，有多少列多少）

4. 流程设计

   1. Beats No.1
      1. Art：美术氛围及需求（按理来说应该单独出一份文档，不然PPT爆炸）
      2. Level：结构、布局及动线说明
      3. Gameplay：玩法类型及具体设计，战斗需要写清敌人规划，解谜需要写清谜面谜底，etc
      
   2. 同上

      ……

5. 需求统计

6. 参考对象

<br/>

