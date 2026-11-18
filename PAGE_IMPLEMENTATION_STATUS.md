# 医百顺患者端小程序 — 页面实现状态清单 (PAGE_IMPLEMENTATION_STATUS)

## 1. 全量统计概览

- **Figma 目录节点总数**：`864` 条记录（`747` 个 `FRAME`、`50` 个 `COMPONENT`、`67` 个辅助/总览节点；含 `834` 张唯一导出参考 PNG）
- **核心业务与交互路由总数**：`76` 个标准业务 `PageKey`（覆盖 4 个一级底部主导航 Tab、12 个一级子分类视图、68+ 个二级及深层业务页面、弹窗与空状态分支）
- **全量画板直达覆盖**：通过 `src/data/frameCatalogMeta.ts` 与 `?frame=<nodeId>` / `FrameViewerPage` 实现全部 `864` 个 Figma 节点与参考图的映射与可追溯返回
- **当前构建与运行状态**：已全部编译通过，无 TypeScript/构建错误

---

## 2. 一级主导航与核心视图实现状态

| 路由 / Tab Key | Figma 画板 ID | 页面名称 | 实现文件 | 实现状态 | 说明 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `activeTab='home'` | `0:53466` | 首页 | `src/pages/HomePage.tsx` | 已完成 (真实 DOM) | 375×1299px 精确还原；城市选择弹层、全局搜索跳转、找医生/去挂号/去开药/实时问诊四大金刚区、专病专科、AI 舌面诊、用药助手、科室 Tab 筛选、名医推荐列表及精选科普视频 |
| `activeTab='discover'` (`video`) | `0:41862` | 发现 - 小视频 | `src/pages/DiscoverPage.tsx` + `TopHeader.tsx` + `DoctorCardList.tsx` + `VideoSection.tsx` | 已完成 (真实 DOM) | 375×1530px 1:1 像素级还原；顶部搜索与分类栏固定吸顶 (`position: fixed`)，医生卡片跳转工作室，视频双列跳转播放详情 |
| `activeTab='discover'` (`live`) | `0:41595` | 发现 - 直播 | `src/pages/DiscoverPage.tsx` | 已完成 (真实 DOM) | 375×1277px；含「直播中」「预播」「回放」角标与开播倒计时/预约态 |
| `activeTab='discover'` (`classroom`) | `0:42181` | 发现 - 讲堂 | `src/pages/DiscoverPage.tsx` | 已完成 (真实 DOM) | 375×1277px；含「Top1」置顶标签与讲堂回放入口 |
| `activeTab='discover'` (`news`) | `0:42409` | 发现 - 资讯 | `src/pages/DiscoverPage.tsx` | 已完成 (真实 DOM) | 375×977px；7条健康科普资讯卡片列表，支持关键词过滤并进入资讯详情 |
| `activeTab='consult'` (`free` / `video` / `phone` / `image`) | `0:16531`, `0:7766`, `0:7620` | 咨询记录（4 子Tab） | `src/pages/ConsultRecordsPage.tsx` | 已完成 (真实 DOM) | 375×667px；免费咨询团队列表与图文/电话/视频问诊记录、未读角标及诊室跳转 |
| `activeTab='mine'` | `0:54931` / `0:47313` | 我的 | `src/pages/MinePage.tsx` | 已完成 (真实 DOM) | 375×778px；个人信息头部、消息红点、订单状态 5 入口、我的工具 9 宫格、其他服务列表与客服电话/在线客服弹窗 |
| `BottomTabBar` | `0:41918`~`0:41959` | 底部四 Tab 导航栏 | `src/components/BottomTabBar.tsx` | 已完成 (真实 DOM) | 已修复「首页」选中图标 (`imgIconSy.svg`) 与「发现」未选中图标 (`imgIconFxHui.svg`) |

---

## 3. 二级及深层业务页面实现状态

### 3.1 搜索、登录、医生与专病模块
| Route Key | 对应 Figma 节点 | 页面名称 | 实现文件 | 实现状态 |
| :--- | :--- | :--- | :--- | :--- |
| `search` | `0:1114`, `0:1037`, `0:1821`, `0:1510`, `0:1244` | 全局搜索（历史/结果/无结果/清空弹窗） | `src/pages/ConsultAndRegPages.tsx` | 已完成 |
| `login` | `0:2`, `0:323`, `0:249`, `0:548`, `0:175`, `0:612` | 登录认证全流程（微信一键登录/手机验证码/图形验证/遇到问题） | `src/pages/ConsultAndRegPages.tsx` | 已完成 |
| `find-doctor` | `0:2048`, `0:3012` | 找医生（多维度筛选与开药过滤） | `src/pages/DoctorPages.tsx` | 已完成 |
| `doctor-studio` | `0:19126`, `0:18164` | 医生工作室（问诊/挂号/关注/团队与评价） | `src/pages/DoctorPages.tsx` | 已完成 |
| `doctor-bio` | `0:22045` | 医生简介与多点执业信息 | `src/pages/DoctorPages.tsx` | 已完成 |
| `specialty-list` | `0:2275` | 专病专科目录 | `src/pages/DoctorPages.tsx` | 已完成 |
| `specialty-detail` | `0:22525`, `0:22826`, `0:23559`, `0:23366`, `0:23124` | 专病详情（血管瘤简介/专家/讲堂/科普） | `src/pages/DoctorPages.tsx` | 已完成 |

### 3.2 发现详情（视频 / 直播 / 讲堂 / 资讯）
| Route Key | 对应 Figma 节点 | 页面名称 | 实现文件 | 实现状态 |
| :--- | :--- | :--- | :--- | :--- |
| `video-detail` | `0:34368`, `0:36321` | 小视频播放详情（播放/点赞/关注/评论抽屉/分享） | `src/pages/DiscoverDetailPages.tsx` | 已完成 |
| `live-preview` | `0:43677`, `0:43581` | 直播预告（立即预约/取消预约联动） | `src/pages/DiscoverDetailPages.tsx` | 已完成 |
| `live-room` | `0:27802`, `0:24992`, `0:25882`, `0:33046`, `0:25435`, `0:33543` | 直播间与连线互动/弹幕发送 | `src/pages/DiscoverDetailPages.tsx` | 已完成 |
| `live-replay` | `0:33799`, `0:36791`, `0:37334`, `0:38446`, `0:50831` | 直播/讲堂回放（倍速/清晰度/评论） | `src/pages/DiscoverDetailPages.tsx` | 已完成 |
| `article-detail` | `0:43308` | 资讯文章详情（点赞/收藏/评论/去问医生） | `src/pages/DiscoverDetailPages.tsx` | 已完成 |
| `article-comments` | `0:662` | 资讯全部评论列表 | `src/pages/DiscoverDetailPages.tsx` | 已完成 |

### 3.3 预约挂号、在线问诊与诊室会话模块
| Route Key | 对应 Figma 节点 | 页面名称 | 实现文件 | 实现状态 |
| :--- | :--- | :--- | :--- | :--- |
| `reg-hospitals` | `0:17700` | 预约挂号医院列表 | `src/pages/ConsultAndRegPages.tsx` | 已完成 |
| `reg-depts` | `0:4021` | 预约挂号科室选择 | `src/pages/ConsultAndRegPages.tsx` | 已完成 |
| `reg-slots` | `0:4084`, `0:4222`, `0:114616`, `0:46751`, `0:4329` | 号源日期/时段选择（含无号态） | `src/pages/ConsultAndRegPages.tsx` | 已完成 |
| `reg-confirm` | `0:4796`, `0:4845` | 确定挂号信息并生成挂号订单 | `src/pages/ConsultAndRegPages.tsx` | 已完成 |
| `inquiry-image-form` | `0:3257`, `0:3695` | 填写病情（图文问诊表单） | `src/pages/ConsultAndRegPages.tsx` | 已完成 |
| `inquiry-av-form` | `0:3791` | 电话/视频问诊预约表单 | `src/pages/ConsultAndRegPages.tsx` | 已完成 |
| `patient-select` | `0:792`, `0:3949`, `0:114738` | 选择就诊人（含空状态） | `src/pages/ConsultAndRegPages.tsx` | 已完成 |
| `patient-edit` | `0:949`, `0:3873`, `0:10764`, `0:10614` | 新增/编辑就诊人 | `src/pages/ConsultAndRegPages.tsx` | 已完成 |
| `chat-free` | `0:16194`, `0:16337`, `0:45233` | 免费咨询团队会话（含团队成员列表） | `src/pages/ConsultAndRegPages.tsx` | 已完成 |
| `chat-image` | `0:4895`, `0:5505` | 图文/实时问诊聊天诊室（处方/小结入口） | `src/pages/ConsultAndRegPages.tsx` | 已完成 |
| `chat-av` | `0:5041` | 电话/视频问诊会话 | `src/pages/ConsultAndRegPages.tsx` | 已完成 |
| `call-room` | `0:6423`, `0:6490`, `0:6549`, `0:6621` | 实时语音/视频接听呼叫页面 | `src/pages/ConsultAndRegPages.tsx` | 已完成 |
| `consult-summary` | `0:56121` | 问诊小结详情 | `src/pages/ConsultAndRegPages.tsx` | 已完成 |
| `consult-review` | `0:6784`, `0:6908` | 问诊服务星级评价 | `src/pages/ConsultAndRegPages.tsx` | 已完成 |

### 3.4 订单、支付、处方、商城、发票与医疗工具模块
| Route Key | 对应 Figma 节点 | 页面名称 | 实现文件 | 实现状态 |
| :--- | :--- | :--- | :--- | :--- |
| `orders` | `0:54446`, `0:114700` | 订单列表（5 状态筛选/合并子订单/取消弹框/开发票入口） | `src/pages/OrderAndToolPages.tsx` | 已完成 |
| `order-detail` | `0:9090`, `0:11242`, `0:12251`, `0:49877`, `0:48568` | 分类订单详情 | `src/pages/OrderAndToolPages.tsx` | 已完成 |
| `payment` / `payment-result` | `0:45709`, `0:45942` | 收银台与支付成功结果页 | `src/pages/OrderAndToolPages.tsx` | 已完成 |
| `order-refund` / `refund-detail` | `0:9829`, `0:9939` | 申请售后与退款详情 | `src/pages/OrderAndToolPages.tsx` | 已完成 |
| `prescription` | `0:7317`, `0:15876`, `0:13420` | 电子处方笺（有效/已过期/院内调配三态） | `src/pages/OrderAndToolPages.tsx` | 已完成 |
| `drug-checkout` / `address-list` / `address-edit` / `logistics` | `0:13581`, `0:55419`, `0:45640`, `0:7169`, `0:16116` | 药品结算、配送方式、地址管理与物流追踪 | `src/pages/OrderAndToolPages.tsx` | 已完成 |
| `mall` / `mall-detail` / `cart` | `0:56181`, `0:57264`, `0:56715`, `0:56809`, `0:56290` | 健康商城、医院切换、商品详情与购物车 | `src/pages/OrderAndToolPages.tsx` | 已完成 |
| `invoice-select` / `invoice-submit` / `my-invoices` / `invoice-detail` | `0:54695`, `0:54803`, `0:54673`, `0:54888`, `0:54563`, `0:54655` | 发票勾选、开票申请、我的发票与详情 | `src/pages/OrderAndToolPages.tsx` | 已完成 |
| `messages` | `0:1559`, `0:1615` | 消息中心（系统消息/订单消息） | `src/pages/OrderAndToolPages.tsx` | 已完成 |
| `my-doctors` / `my-favorites` / `my-family` / `medical-records` / `medical-record-add` / `my-comments` / `my-reviews` | `0:9185`, `0:9349`, `0:10846`, `0:23739`, `0:22121`, `0:17308`, `0:17343` | 我的医生、收藏、家人、病例夹、评论与评价 | `src/pages/OrderAndToolPages.tsx` | 已完成 |
| `reports` / `report-detail` / `report-sheet` | `0:12318`, `0:12387`, `0:7400`, `0:7479` | 报告查询与脱敏检验/检查报告单 | `src/pages/OrderAndToolPages.tsx` | 已完成 |
| `nucleic-acid` / `nucleic-query` / `nucleic-hospitals` | `0:12966`, `0:12543`, `0:11624`, `0:12469` | 核酸检测预约、过期状态、查询与选院 | `src/pages/OrderAndToolPages.tsx` | 已完成 |
| `med-helper` / `med-detail` / `med-add` / `med-remind` | `0:20963`, `0:21211`, `0:20090`, `0:20277` | 用药助手计划、详情、添加与服药提醒 | `src/pages/OrderAndToolPages.tsx` | 已完成 |
| `settings` / `account-settings` / `account-security` / `edit-nickname` / `realname-auth` / `change-password` / `delete-account` / `agreement` / `about` / `help-feedback` / `ai-tongue` | `0:16957`, `0:10148`, `0:46508`, `0:10568`, `0:10465`, `0:17080`, `0:17261`, `0:17287`, `0:17215` | 系统设置、账号安全、协议与 AI 舌诊/反馈 | `src/pages/OrderAndToolPages.tsx` | 已完成 |
| `frame-viewer` | 全部 `864` 节点 | 全量画板精准检视器（支持 `?frame=<nodeId>`） | `src/pages/OrderAndToolPages.tsx` | 已完成 |
