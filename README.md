# 医百顺 Figma → AI Studio

这是「发现-小视频」画板的设计资料包和 React + Vite + TypeScript 起始工程。启动页用于验证工程可运行，页面还原以原稿资料为准。

## 本地启动

```sh
npm ci
npm run dev
```

`npm run build` 同时运行 TypeScript 检查和生产构建。工程启动无需密钥或环境变量。

## 设计入口

- [原始画板 375 × 1530](design-reference/original.png)
- [实施规范](design-reference/FIGMA_SPEC.md)
- [图层与组件数据](design-reference/figma-layers.json)
- [设计值](design-reference/design-tokens.json)
- [素材索引](design-reference/assets.json)
- [1:1 还原规则](AGENTS.md)

## 在 AI Studio Build 中使用

在 Build 提示框的加号菜单选择 **Import from GitHub**，用有访问权限的 GitHub 账户选择私有仓库。[Google AI Studio Build 文档](https://ai.google.dev/gemini-api/docs/aistudio-build-mode#how-can-i-use-github-with-my-apps)

导入后可使用以下提示词。

> 先读 AGENTS.md 和 design-reference/FIGMA_SPEC.md。以 design-reference/original.png 为视觉基准，按节点数据、设计值与原素材实现 375 × 1530 的「发现-小视频」画板。将页面实现为可维护的 React 组件，保留原素材的遮罩、裁切和尺寸。完成后运行构建，并在浏览器中对照原稿截图。
