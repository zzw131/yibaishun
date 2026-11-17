# 医百顺患者端 Figma 设计包

源文件涵盖「患者端-线上」「缺省」「组件」三个 Figma 页面。画板目录有 864 个可定位的 PNG 参考项，包含 747 个 Frame、50 个组件，以及画布上下文。此仓库用于把画板、素材、页面结构和模拟业务流程交给 Gemini。网页在浏览器本地演示，数据存放于项目目录，无需部署。

## Gemini 阅读顺序

1. [实施说明](design-reference/GEMINI_HANDOFF.md)
2. [页面层级与点击跳转](design-reference/PAGE_RELATIONSHIPS.md)
3. [全文件画板目录](design-reference/FRAME_CATALOG.json)
4. [分页面文字索引](design-reference/SCREEN_TEXT)
5. [源素材索引](design-reference/SOURCE_ASSETS.json)
6. [画布层级盘点](design-reference/FIGMA_INVENTORY.json)和 [1:1 实现规则](AGENTS.md)

大尺寸独立原图通过同一私有仓库的 [源素材附件](https://github.com/zzw131/yibaishun/releases/tag/figma-source-v1) 提供。素材索引记录解压路径，所有画板图像可在 `main` 直接读取。

「发现-小视频」精细样例包括[原始画板](design-reference/original.png)、[逐层规范](design-reference/FIGMA_SPEC.md)、[图层数据](design-reference/figma-layers.json)和[设计值](design-reference/design-tokens.json)。

## 导入 Google AI Studio

在 Build 提示框的加号菜单选择 **Import from GitHub**，选择有权访问的私有仓库 `zzw131/yibaishun`。[Google AI Studio Build 文档](https://ai.google.dev/gemini-api/docs/aistudio-build-mode#how-can-i-use-github-with-my-apps)

> 先读 AGENTS.md 和 design-reference/GEMINI_HANDOFF.md，按 PAGE_RELATIONSHIPS.md 理解业务与导航。用 FRAME_CATALOG.json 的本地 PNG 路径和文字索引分模块读图。实现可本地运行的患者端网页，使用项目内的虚构数据串联完整演示流程。对照原图完成走查和构建。

仓库保留先前的 React + Vite + TypeScript 起始入口。用 `npm ci` 安装、`npm run dev` 启动，`npm run build` 检查和构建。业务实现以交接资料为依据，由 Gemini 完成。
