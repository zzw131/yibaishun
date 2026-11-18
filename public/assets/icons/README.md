# 直播间组件图标

来源为 [Figma 组件画板 `0:43851`](https://www.figma.com/design/ESSsVuzonDTacYEI7slHtT?node-id=0-43851)。看[组件画板 PNG](../../../design-reference/frames/patient/0-43851.png)核对样式，看[直播中 `0:27802`](../../../design-reference/frames/patient/0-27802.png)确认页面上的实际位置。下表按独立素材列出 Figma 节点、SVG 导出尺寸和使用方式。

Gemini 在 React 或 HTML 中用 `/assets/icons/<文件名>.svg` 引用。保留原 SVG 的 `viewBox`、比例及留白。 麦克风、清屏刷和底栏点赞的 34 px SVG 已含半透明圆底，直接放进同尺寸点击位即可。交互由按钮承载，纯图标按钮用表中的中文名称作为无障碍标签。评论内容、公告正文、昵称、在线人数和点赞数由页面状态渲染为文本。聊天样式的背景、换行和间距以目标业务画板为准。

## 直播间控制与装饰

| 文件 | Figma 节点 | 尺寸（px） | 含义 | 使用位置或状态 |
| --- | --- | --- | --- | --- |
| [live-room-mic-link.svg](live-room-mic-link.svg) | `0:44359` | 34 × 34 | 发起连麦 | 34 px 底栏麦克风按钮，进入申请连线流程。 |
| [live-room-mic-link-chain.svg](live-room-mic-link-chain.svg) | `0:44718` | 28 × 28 | 连麦状态 | 28 px 渐变链环，用于连麦信息位。底栏发起连麦按钮使用麦克风图标。 |
| [live-room-clear-screen.svg](live-room-clear-screen.svg) | `0:44392` | 34 × 34 | 清屏 | 34 px 底栏彩色刷子，切换聊天浮层的显示。 |
| [live-room-attach-image.svg](live-room-attach-image.svg) | `0:45144` | 23 × 23 | 发送图片 | 23 px 白色相片图标，放在聊天输入条右侧。 |
| [live-room-comment.svg](live-room-comment.svg) | `0:45152` | 42 × 42 | 评论 | 42 px 白色三点对话气泡，打开评论输入。 |
| [live-room-share.svg](live-room-share.svg) | `0:45178` | 42 × 42 | 分享 | 42 px 白色弯箭头，用于直播间分享操作。 |
| [live-room-close.svg](live-room-close.svg) | `0:45223` | 14 × 14 | 关闭 | 14 px 灰色叉号，用于关闭浮层或退出直播间。目标画板如有不同配色，按对应节点核对。 |
| [live-room-topic-label.svg](live-room-topic-label.svg) | `0:44994` | 29 × 13 | 主题 | 蓝色「主题」字标，放在顶部直播主题标题前。标题本身使用真实文本。 |
| [live-room-more-streams.svg](live-room-more-streams.svg) | `0:45003` | 16 × 16 | 更多直播 | 16 px 蓝色星球图标，放在「更多直播」文字前。 |

## 点赞状态与动效

| 文件 | Figma 节点 | 尺寸（px） | 含义 | 使用位置或状态 |
| --- | --- | --- | --- | --- |
| [live-room-like-toolbar.svg](live-room-like-toolbar.svg) | `0:44407` | 34 × 34 | 直播间底栏点赞 | 34 px 房间底栏彩色拇指。具体状态以所在画板为准。 |
| [live-room-like-pressed.svg](live-room-like-pressed.svg) | `0:45160` | 42 × 42 | 点赞按下 | 42 px 彩色放大反馈，源图层标记为「点击状态」。 |
| [live-room-like-inactive.svg](live-room-like-inactive.svg) | `0:45183` | 20 × 20 | 小号点赞 · 未赞 | 20 px 灰色拇指，用于带选中态的紧凑点赞按钮。 |
| [live-room-like-active.svg](live-room-like-active.svg) | `0:45203` | 20 × 20 | 小号点赞 · 已赞 | 20 px 彩色拇指，与同尺寸灰色图标配对。 |
| [live-room-like-burst.svg](live-room-like-burst.svg) | `0:45126` | 66 × 58 | 点赞大反馈 | 66 × 58 px 彩色拇指，作为短时动画反馈层。 |
| [live-room-like-float-small.svg](live-room-like-float-small.svg) | `0:45047` | 17 × 15 | 飘赞 · 小 | 动画粒子素材，保留原稿朝向。 |
| [live-room-like-float-medium.svg](live-room-like-float-medium.svg) | `0:45066` | 21 × 19 | 飘赞 · 中 | 动画粒子素材，自带原稿旋转和透明留白。 |
| [live-room-like-float-large.svg](live-room-like-float-large.svg) | `0:45085` | 25 × 24 | 飘赞 · 大 | 动画粒子素材，自带原稿旋转和透明留白。 |

## 聊天标签与计数

| 文件 | Figma 节点 | 尺寸（px） | 含义 | 使用位置或状态 |
| --- | --- | --- | --- | --- |
| [live-room-chat-badge-announcement.svg](live-room-chat-badge-announcement.svg) | `0:44096` | 35 × 14 | 公告标签 | 蓝色「公告」，置于系统公告开头。 |
| [live-room-chat-badge-host.svg](live-room-chat-badge-host.svg) | `0:44124` | 35 × 14 | 主播标签 | 紫色「主播」，置于主播昵称前。 |
| [live-room-chat-badge-tip.svg](live-room-chat-badge-tip.svg) | `0:44102` | 35 × 14 | 提示标签 | 黄色「提示」，置于系统提示开头。画板聊天示例中的同款标签为 `0:45229`。 |
| [live-room-like-count-background.svg](live-room-like-count-background.svg) | `0:44738` | 34 × 14 | 点赞数底板 | 34 × 14 px 白底圆角胶囊，叠加当前点赞数字，放在底栏点赞图标上方。 |
| [live-room-like-count-sample.svg](live-room-like-count-sample.svg) | `0:44737` | 34 × 14 | 点赞数排版示例 | 内含写死的 `1.5w`，供比对文字尺寸与颜色。实际数字使用底板和实时文本。 |
| [live-room-viewer-count-background.svg](live-room-viewer-count-background.svg) | `0:45044` | 30 × 30 | 在线人数底板 | 30 × 30 px 圆形底板，放在主题行右侧，叠加当前在线人数，如画板中的 `38`。 |
| [live-room-count-wide-background.svg](live-room-count-wide-background.svg) | `0:45040` | 45 × 30 | 宽版计数底板 | 45 × 30 px 计数底板，可叠加较长数字，如 `3823` 或 `12.3w`。`0:45041` 的 SVG 与此相同。 |
| [live-room-badge-background-coral.svg](live-room-badge-background-coral.svg) | `0:44157` | 49 × 15 | 珊瑚红标签底板 | 49 × 15 px 原稿色样。业务用途按目标画板确定。 |
| [live-room-badge-background-blue.svg](live-room-badge-background-blue.svg) | `0:44158` | 28 × 15 | 蓝色标签底板 | 28 × 15 px 原稿色样。业务用途按目标画板确定。 |

画板右侧的多组聊天示例演示透明底与灰底的公告、进场消息、主播消息、系统提示和图片消息。使用对应标签 SVG，按目标画板用文本、容器和本地虚构示例图片组合。
