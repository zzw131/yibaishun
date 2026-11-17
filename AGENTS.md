# 医百顺患者端网页实现规则

本仓库是 Figma 全文件设计与产品交接资料。Gemini 根据资料实现本地运行的患者端网页。现有 React 起始入口为 `src/main.tsx`。

## 先读

1. `design-reference/GEMINI_HANDOFF.md` 定义本地运行、模拟数据和验收。
2. `design-reference/PAGE_RELATIONSHIPS.md` 定义一级导航、各模块跳转、返回及业务状态。原稿的原型连线扫描结果为空，文档中的跳转是已获准采用的演示规则。
3. `design-reference/FRAME_CATALOG.json` 按 Figma 节点 ID 定位对应 PNG。按需查 `design-reference/SCREEN_TEXT/` 的文字索引和 `design-reference/SOURCE_ASSETS.json` 的素材路径。
4. `design-reference/FIGMA_SPEC.md`、`figma-layers.json` 和 `design-tokens.json` 是「发现-小视频」单画板的精细参考，其尺寸及样式局限于该节点。

## 实施

- 从四个一级导航组织页面。参考关系表建立列表、详情和返回入口。弹层、草稿、空状态和订单状态用页面内状态表达，组件、注释、备份和大画框总览用于参考。按 Figma 节点 ID 对照。
- 保留参考画板的文案、层级、坐标关系、间距、字体、字号、字重、换行、圆角、描边、阴影、不透明度、裁切和层叠次序。依据逐画板的源尺寸验收。隐藏层和关闭的效果按原稿状态处理。
- 实现可交互的 React 节点和组件。禁止把整张基准 PNG 当作页面背景或替代实现。直接复用原始素材并保持裁切、SVG viewBox 和宽高关系。参考资产保持原始文件，未经授权不得重绘、压缩、拉伸或改写。
- 将初始样例数据和本地演示素材置于项目目录。所有实体使用虚构数据。模拟登录、支付、会话、报告、订单和视频等状态，以同一实体 ID 在各页面共享进度。
- 项目在浏览器本地运行。无需部署、域名、真实医疗服务、外部 API 或真实身份。禁止提交凭证、`.env`、访问令牌、临时下载链接和敏感数据。
- 完成后运行 `npm run build`。在真实浏览器按源画板尺寸逐模块截图对比，并走查提交、取消、返回和空状态。
