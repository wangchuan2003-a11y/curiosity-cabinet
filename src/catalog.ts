export const THEMES = ["全部", "数学", "哲学", "科学", "算法"] as const;
export type Theme = (typeof THEMES)[number];
export type Experiment = {
  slug: string;
  name: string;
  title: string;
  theme: Exclude<Theme, "全部">;
  question: string;
  tryThis: string;
  boundary: string;
  keywords: string[];
  preview: string;
  width: number;
  height: number;
};
export const experiments: Experiment[] = [
  {
    slug: "chaos-atlas",
    preview: "chaos-atlas.jpg",
    name: "Chaos Atlas",
    title: "混沌图谱",
    theme: "数学",
    question: "一点不同，会走向哪里？",
    tryThis:
      "拨动增长参数，比较相距约 10⁻⁷ 的两个初值，再用分岔图和蛛网图追踪它们。",
    boundary: "有限数值轨迹与正 Lyapunov 估计不是混沌证明，也不是现实预测。",
    keywords: ["logistic", "分岔", "初值", "周期", "动力系统", "敏感性"],
    width: 1430,
    height: 1043,
  },
  {
    slug: "veil-lab",
    preview: "veil-lab.jpg",
    name: "Veil Lab",
    title: "无知之幕实验桌",
    theme: "哲学",
    question: "不知道自己是谁，你会怎么分？",
    tryThis: "调整六个虚构位置的需求，选一条分配规则，再揭晓自己被分到哪里。",
    boundary: "简化分配规则不等同于 Rawls 的完整理论；Gini 也不衡量正义。",
    keywords: ["公平", "分配", "Rawls", "无知之幕", "需求", "Gini"],
    width: 1265,
    height: 712,
  },
  {
    slug: "orbit-forge",
    preview: "orbit-forge.jpg",
    name: "Orbit Forge",
    title: "轨道实验室",
    theme: "科学",
    question: "推一下，会绕行还是飞走？",
    tryThis:
      "给新天体设置位置与初速度，切换双星或三体，检查轨迹、能量与总动量。",
    boundary: "二维软化引力近似没有碰撞或相对论，不用于真实天文预测。",
    keywords: ["引力", "轨道", "天体", "三体", "物理", "Verlet"],
    width: 1265,
    height: 712,
  },
  {
    slug: "paradox-lens",
    preview: "paradox-lens.jpg",
    name: "Paradox Lens",
    title: "辛普森悖论透镜",
    theme: "数学",
    question: "每组都更好，合起来却更差？",
    tryThis:
      "先预测总体谁更高，再改变容易与困难任务的比例，比较原始结果和 50/50 重加权。",
    boundary: "统计反转与重加权本身不能证明真实因果效应或偏见。",
    keywords: ["统计", "概率", "辛普森", "Simpson", "混合", "成功率"],
    width: 1265,
    height: 712,
  },
  {
    slug: "cooperation-lab",
    preview: "cooperation-lab.jpg",
    name: "Cooperation Lab",
    title: "合作博弈实验",
    theme: "哲学",
    question: "一次误会，合作还能继续吗？",
    tryThis:
      "让六种固定策略反复相遇，调高执行噪声，查看动作轨迹、对局矩阵与累计得分。",
    boundary: "固定策略的有限轮次排名不是道德评价，也不是对真人行为的建议。",
    keywords: ["合作", "博弈", "囚徒困境", "策略", "噪声", "信任"],
    width: 1265,
    height: 712,
  },
  {
    slug: "entropy-lab",
    preview: "entropy-lab.jpg",
    name: "Entropy Lab",
    title: "熵与时间",
    theme: "科学",
    question: "随机的一步，时间的一个方向？",
    tryThis:
      "看有标签粒子在双箱间变化，单步倒退再重放，对照熵曲线和理论二项分布。",
    boundary: "多重度的对数以 bits 显示；保存事件的倒放不代表自然逆转。",
    keywords: ["熵", "Ehrenfest", "粒子", "随机", "时间", "二项分布", "概率"],
    width: 1265,
    height: 712,
  },
  {
    slug: "emergence-lab",
    preview: "emergence-lab.jpg",
    name: "Emergence Lab",
    title: "涌现实验室",
    theme: "科学",
    question: "简单的局部规则，能长出什么形态？",
    tryThis:
      "切换反应扩散、黏菌轨迹或鸟群，改变参数、播种与单步观察，再保存数值快照。",
    boundary:
      "受自然机制启发的工程模型不是真实生物预测；黏菌模式不保证找到最短路线。",
    keywords: [
      "涌现",
      "人工生命",
      "Gray–Scott",
      "反应扩散",
      "黏菌",
      "Physarum",
      "Boids",
      "鸟群",
    ],
    width: 1425,
    height: 990,
  },
  {
    slug: "pathfinder-arena",
    preview: "pathfinder-arena.jpg",
    name: "Pathfinder Arena",
    title: "寻路竞技场",
    theme: "算法",
    question: "绕远一点，为什么代价反而更低？",
    tryThis:
      "在同一张网格画墙和加权地形，逐步对照 A* 与 Dijkstra 的搜索边界和最低总代价。",
    boundary:
      "模型只允许四方向移动；展开节点数不是运行时间，A* 不保证总比 Dijkstra 展开更少。",
    keywords: [
      "寻路",
      "算法",
      "A*",
      "Dijkstra",
      "迷宫",
      "地形",
      "最短路径",
      "启发式",
    ],
    width: 1425,
    height: 990,
  },
];
export function demoURL(slug: string) {
  return `https://wangchuan2003-a11y.github.io/${slug}/`;
}
export function sourceURL(slug: string) {
  return `https://github.com/wangchuan2003-a11y/${slug}`;
}
const normalize = (value: string) =>
  value.normalize("NFKC").trim().toLowerCase();
/** Themes and all whitespace-separated query words are combined with AND. */
export function filterExperiments(
  items: readonly Experiment[],
  theme: Theme,
  query: string,
): Experiment[] {
  const tokens = normalize(query).split(/\s+/).filter(Boolean);
  return items.filter((item) => {
    if (theme !== "全部" && item.theme !== theme) return false;
    const text = normalize(
      [
        item.name,
        item.title,
        item.question,
        item.tryThis,
        item.boundary,
        ...item.keywords,
      ].join(" "),
    );
    return tokens.every((token) => text.includes(token));
  });
}
