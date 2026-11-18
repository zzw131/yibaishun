# 医百顺「发现-小视频」1:1 还原

## 参考文件

- 视觉基准为 `design-reference/original.png`，画板为 Figma `0:41862`，尺寸 375 × 1530 px。
- 先读 `design-reference/FIGMA_SPEC.md`。按需在 `figma-layers.json` 查节点、图层树、精确几何、文字分段和效果，在 `design-tokens.json` 查样式值，在 `assets.json` 查素材及使用节点。上述文件均位于 `design-reference/`。
- 项目使用 React、Vite 和 TypeScript。应用入口为 `src/main.tsx`，页面从 `src/App.tsx` 开始实现。

## 还原规则

1. 保留参考画板的文案、层级、坐标关系、间距、字体、字号、字重、换行、圆角、描边、阴影、不透明度、裁切和层叠次序。隐藏图层及关闭的效果按 Figma 状态处理。
2. 将组件和文字实现为真实 React 节点，允许复用卡片和导航结构。禁止把整张基准 PNG 当作页面背景或替代实现。
3. 使用 `public/assets/` 的原始素材。运行时代码按 `/assets/` 路径引用。禁止重绘、压缩、拉伸、改写源素材或用图标库替换。按 Figma 记录保留图像裁切、SVG viewBox 和原始宽高关系。
4. 精确匹配 375 CSS px 宽、1530 px 内容高。其他尺寸或交互需要对应依据。遇到未定义的原型状态和不可用字体，记录需要确认的范围。
5. 变更后运行 `npm run build`。用真实浏览器在 375 CSS px 宽、DPR 1 下截图，与原始 PNG 逐区对照。验收包含图片加载、裁切、文字断行、元素边界、颜色和层级。
6. 禁止提交凭证、`.env`、访问令牌、临时下载链接和敏感数据。原始设计文件和素材仅供已获授权的私有仓库使用。
