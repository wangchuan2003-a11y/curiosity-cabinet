# 公开仓库总览

核对日期：2026-09-19。这里按用途整理本账号公开可见的15个仓库，帮助读者找到作品、源码与学习工具。上游Fork单独列出，避免把参考副本当作自有实现。目录是核对时的快照，不代表所有仓库都有在线应用。

## 交互实验与作品入口 · 9个

[好奇心实验柜](https://wangchuan2003-a11y.github.io/curiosity-cabinet/)提供八个实验的主题筛选、搜索、真实预览与模型边界。各实验独立运行；目录不加载它们的模拟引擎。

| 仓库                                                                         | 用途                                                    | 从哪里开始                                                          |
| ---------------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------- |
| [curiosity-cabinet](https://github.com/wangchuan2003-a11y/curiosity-cabinet) | 八个交互实验的导航入口；也是本总览的所在仓库            | [浏览目录](https://wangchuan2003-a11y.github.io/curiosity-cabinet/) |
| [emergence-lab](https://github.com/wangchuan2003-a11y/emergence-lab)         | 反应扩散、轨迹网络和鸟群；画笔、数值快照、图片/视频导出 | [打开实验](https://wangchuan2003-a11y.github.io/emergence-lab/)     |
| [pathfinder-arena](https://github.com/wangchuan2003-a11y/pathfinder-arena)   | 绘制障碍与加权地形，对照A*与Dijkstra的最低代价搜索      | [打开实验](https://wangchuan2003-a11y.github.io/pathfinder-arena/)  |
| [chaos-atlas](https://github.com/wangchuan2003-a11y/chaos-atlas)             | Logistic映射、分岔、蛛网与初值敏感性                    | [打开实验](https://wangchuan2003-a11y.github.io/chaos-atlas/)       |
| [veil-lab](https://github.com/wangchuan2003-a11y/veil-lab)                   | 固定预算与六个位置的分配思想实验                        | [打开实验](https://wangchuan2003-a11y.github.io/veil-lab/)          |
| [orbit-forge](https://github.com/wangchuan2003-a11y/orbit-forge)             | 二维软化引力、天体初始条件与守恒量                      | [打开实验](https://wangchuan2003-a11y.github.io/orbit-forge/)       |
| [cooperation-lab](https://github.com/wangchuan2003-a11y/cooperation-lab)     | 重复囚徒困境、执行噪声与单次失误对照                    | [打开实验](https://wangchuan2003-a11y.github.io/cooperation-lab/)   |
| [paradox-lens](https://github.com/wangchuan2003-a11y/paradox-lens)           | 由整数计数探索辛普森悖论与共同权重                      | [打开实验](https://wangchuan2003-a11y.github.io/paradox-lens/)      |
| [entropy-lab](https://github.com/wangchuan2003-a11y/entropy-lab)             | Ehrenfest双箱随机过程、宏观熵与事件重放                 | [打开实验](https://wangchuan2003-a11y.github.io/entropy-lab/)       |

## AI学习工具 · 2个

这些仓库提供Agent Skill与阅读方法，不是上述实验的后端或依赖。安装前先阅读各自说明和来源边界。

| 仓库                                                                                 | 用途                                                                       | 入口                          |
| ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- | ----------------------------- |
| [book-dialogue-skill](https://github.com/wangchuan2003-a11y/book-dialogue-skill)     | 基于用户提供文本重建作者论证，通过一次一问的对话学习；区分原文、释义与综合 | 仓库README与SKILL.md          |
| [book-to-action-skills](https://github.com/wangchuan2003-a11y/book-to-action-skills) | 把书中的方法整理为中文优先、带来源与行为案例的可调用Skills                 | README、docs/choose-a-book.md |

## 上游参考Fork · 3个

本账号的Fork是参考和跟踪入口；原项目归属、授权和上游更新以原仓库为准，不将其全部内容称为本账号原创。

| 本账号副本                                                               | 上游                                                      | 主要内容                   |
| ------------------------------------------------------------------------ | --------------------------------------------------------- | -------------------------- |
| [skills](https://github.com/wangchuan2003-a11y/skills)                   | [openai/skills](https://github.com/openai/skills)         | Codex Skills目录及相关工具 |
| [skills.claude](https://github.com/wangchuan2003-a11y/skills.claude)     | [anthropics/skills](https://github.com/anthropics/skills) | Agent Skills示例和编写规范 |
| [skills.claude_1](https://github.com/wangchuan2003-a11y/skills.claude_1) | [mattpocock/skills](https://github.com/mattpocock/skills) | 软件工程工作流相关Skills   |

## 练习与起步记录 · 1个

[my-first-dem](https://github.com/wangchuan2003-a11y/my-first-dem)当前包含简短README与截图，没有可运行应用代码。适合保留为早期练习记录，不能按已实现产品介绍。

## 维护这个入口

- 实验介绍与主题：修改`src/catalog.ts`，同步README与模型边界说明。
- 实验封面：使用来源仓库现有预览，原样复制，更新[来源与摘要](preview-sources.json)并运行目录测试。
- 新增或调整公开仓库：先核对可见性、用途与上游关系，再更新本页。只收录公开仓库。
- 在线卡片测试验证导航接线；目标站点是否可访问需要单独实测。这里不展示未经核对的运行指标或星数。
