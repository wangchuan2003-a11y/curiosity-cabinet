# 好奇心实验柜 · Curiosity Cabinet

一个轻量作品入口，收录六个可以亲手改变参数的数学、哲学与科学实验。按主题或关键词寻找实验，阅读可以尝试的操作与模型边界，再打开在线版本或源码。

| 主题 | 实验                                                                     | 可以尝试                           |
| ---- | ------------------------------------------------------------------------ | ---------------------------------- |
| 数学 | [Chaos Atlas](https://wangchuan2003-a11y.github.io/chaos-atlas/)         | 改变初值，观察分岔与轨迹分离       |
| 哲学 | [Veil Lab](https://wangchuan2003-a11y.github.io/veil-lab/)               | 先选择分配规则，再揭晓位置         |
| 科学 | [Orbit Forge](https://wangchuan2003-a11y.github.io/orbit-forge/)         | 添加天体，改变初速度并检查守恒量   |
| 数学 | [Paradox Lens](https://wangchuan2003-a11y.github.io/paradox-lens/)       | 比较分组、总体与共同权重           |
| 哲学 | [Cooperation Lab](https://wangchuan2003-a11y.github.io/cooperation-lab/) | 改变执行噪声，观察固定策略互动     |
| 科学 | [Entropy Lab](https://wangchuan2003-a11y.github.io/entropy-lab/)         | 单步倒退重放双箱模型，比较熵与分布 |

主题和关键词同时生效，多个空格分隔关键词按AND匹配；中文、英文名称和关键概念可搜索。按 `/` 或 `Ctrl/⌘ K` 聚焦搜索，空结果可一键恢复全部实验。实验和源码链接分别打开新标签页。

## 内容来源

每条介绍依据对应仓库README（2026-09-07读取），保留简化模型的适用边界，不虚构星数、性能或实证效果。分类是目录的编辑组织方式，不是学科边界的判断。

封面来自六个仓库各自的 `docs/preview.jpg`。目录副本与来源SHA256一致，没有编辑或重新编码图片。CSS控制封面展示。图像懒加载，目录不嵌入或同时运行六个实验，也不采集搜索内容。

## 开发

Node.js 22：

```sh
npm ci
npm run dev
```

开发地址：[http://127.0.0.1:5201](http://127.0.0.1:5201)。

```sh
npm test
npm run build
npx playwright test --list
```

生产预览：[http://127.0.0.1:4201](http://127.0.0.1:4201)。真实桌面/手机浏览器用例由CI安装Chromium后执行 `npm run test:e2e`；包含筛选、搜索、空结果恢复、键盘、图片加载和独立链接导航。链接导航测试截获目标响应以避免依赖外部站点可用性，不冒充远端上线验证。

GitHub Actions通过检查后，仅main非PR部署Pages。Pages来源选择GitHub Actions。无API、账号、后端或追踪。

[MIT](LICENSE) © 2026 wangchuan2003-a11y
