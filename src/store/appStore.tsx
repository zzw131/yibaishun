import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import doctorFemaleAvatar from '../assets/images/doctor_female_avatar_1794965243647.jpg'
import doctorFemaleYoung from '../assets/images/doctor_female_young_1794965235903.jpg'
import doctorMaleSenior from '../assets/images/doctor_male_senior_1794965250626.jpg'
import laserDermatologyCover from '../assets/images/laser_dermatology_care_1794965706467.jpg'
import pediatricCheckupCover from '../assets/images/pediatric_health_checkup_1794965709142.jpg'
import pharmacyGuideCover from '../assets/images/pharmacy_medication_guide_1794965708416.jpg'
import tcmWellnessCover from '../assets/images/tcm_herbal_wellness_1794965228624.jpg'

export type PrimaryTab = 'home' | 'discover' | 'consult' | 'mine'
export type DiscoverSubTab = 'video' | 'live' | 'classroom' | 'news'
export type ConsultSubTab = 'free' | 'video' | 'phone' | 'image'

export type PageKey =
  | 'root'
  | 'search'
  | 'find-doctor'
  | 'doctor-studio'
  | 'doctor-bio'
  | 'specialty-list'
  | 'specialty-detail'
  | 'login'
  | 'reg-hospitals'
  | 'reg-depts'
  | 'reg-slots'
  | 'reg-confirm'
  | 'inquiry-image-form'
  | 'inquiry-av-form'
  | 'patient-select'
  | 'patient-edit'
  | 'chat-free'
  | 'chat-image'
  | 'chat-av'
  | 'call-room'
  | 'consult-summary'
  | 'consult-review'
  | 'video-detail'
  | 'live-preview'
  | 'live-room'
  | 'live-replay'
  | 'article-detail'
  | 'article-comments'
  | 'orders'
  | 'order-detail'
  | 'payment'
  | 'payment-result'
  | 'order-refund'
  | 'refund-detail'
  | 'prescription'
  | 'drug-checkout'
  | 'address-list'
  | 'address-edit'
  | 'logistics'
  | 'mall'
  | 'mall-detail'
  | 'cart'
  | 'invoice-select'
  | 'invoice-submit'
  | 'my-invoices'
  | 'invoice-detail'
  | 'messages'
  | 'my-doctors'
  | 'my-favorites'
  | 'my-family'
  | 'medical-records'
  | 'medical-record-add'
  | 'my-comments'
  | 'my-reviews'
  | 'reports'
  | 'report-detail'
  | 'report-sheet'
  | 'nucleic-acid'
  | 'nucleic-query'
  | 'nucleic-hospitals'
  | 'med-helper'
  | 'med-detail'
  | 'med-add'
  | 'med-remind'
  | 'settings'
  | 'account-settings'
  | 'account-security'
  | 'edit-nickname'
  | 'realname-auth'
  | 'change-password'
  | 'delete-account'
  | 'agreement'
  | 'about'
  | 'help-feedback'
  | 'ai-tongue'
  | 'frame-viewer'

export interface RouteEntry {
  page: PageKey
  params?: Record<string, any>
}

export interface PatientProfile {
  id: string
  name: string
  gender: '男' | '女'
  age: number
  idCard: string
  phone: string
  relation: string
  isDefault: boolean
  insuranceType: '医保' | '自费'
}

export interface DoctorProfile {
  id: string
  name: string
  title: string
  dept: string
  subDept: string
  hospital: string
  level: string
  multiHospitals: string[]
  avatar: string
  goodAt: string
  bio: string
  followed: boolean
  imageFee: number
  phoneFee: number
  videoFee: number
  regFee: number
  canPrescribe: boolean
}

export interface VideoComment {
  id: string
  user: string
  avatar: string
  content: string
  date: string
  likes: number
  liked: boolean
}

export interface ShortVideoItem {
  id: string
  title: string
  authorId: string
  authorName: string
  authorAvatar: string
  cover: string
  views: number
  likes: string
  liked: boolean
  commentsCount: number
  favorited: boolean
  description: string
  comments: VideoComment[]
}

export interface LiveItem {
  id: string
  title: string
  doctorId: string
  doctorName: string
  dept: string
  avatar: string
  cover: string
  views: number
  status: 'live' | 'upcoming' | 'replay'
  badgeText: string
  scheduleText?: string
  countdownText?: string
  reserved?: boolean
  topRank?: boolean
  category: 'live' | 'classroom'
}

export interface ArticleItem {
  id: string
  title: string
  detailTitle: string
  doctorId: string
  doctorName: string
  doctorTitle: string
  doctorDept: string
  date: string
  likes: number
  liked: boolean
  favorites: number
  favorited: boolean
  views: number
  thumb: string
  summary: string
  paragraphs: string[]
  comments: VideoComment[]
}

export interface ChatMessage {
  id: string
  sender: 'doctor' | 'assistant' | 'patient' | 'system'
  senderName: string
  avatar?: string
  text: string
  time: string
  type?: 'text' | 'prescription' | 'summary' | 'image'
  prescriptionId?: string
}

export interface ConsultationRecord {
  id: string
  type: ConsultSubTab
  doctorId: string
  doctorName: string
  doctorTitle: string
  hospital: string
  avatar: string
  patientId: string
  patientName: string
  patientPhone: string
  teamTitle?: string
  lastMessage: string
  date: string
  unread: number
  status: '已完成' | '进行中' | '待接诊'
  feeTag: '自费' | '医保' | '免费'
  realtimeTag?: boolean
  symptom: string
  messages: ChatMessage[]
  prescriptionId?: string
  summaryDiagnosis?: string
  summaryAdvice?: string
  reviewed?: boolean
  rating?: number
  reviewContent?: string
  orderId?: string
}

export interface OrderSubItem {
  id: string
  title: string
  amount: number
  time: string
}

export interface OrderRecord {
  id: string
  category: '西药药品' | '检查检验' | '中药药品' | '图文问诊' | '视频问诊' | '电话问诊' | '门诊挂号' | '核酸检测'
  status: '待付款' | '进行中' | '已完成' | '已取消'
  patientName: string
  hospital: string
  doctorName?: string
  dept?: string
  amount: number
  time: string
  subOrders?: OrderSubItem[]
  consultationId?: string
  prescriptionId?: string
  deliveryMode?: '配送到家' | '到院自取' | '外配处方'
  addressId?: string
  cancelReason?: string
  refundStatus?: 'none' | '申请中' | '已退款' | '已拒绝'
  refundReason?: string
  invoiced?: boolean
}

export interface PrescriptionRecord {
  id: string
  code: string
  date: string
  patientName: string
  gender: string
  age: number
  dept: string
  diagnosis: string
  doctorName: string
  pharmacistName: string
  hospital: string
  status: 'valid' | 'expired' | 'offline-only'
  amount: number
  medicines: {
    id: string
    name: string
    spec: string
    quantity: string
    usage: string
    price: number
  }[]
}

export interface MallProduct {
  id: string
  name: string
  subtitle: string
  hospital: string
  price: number
  originalPrice: number
  sales: number
  cover: string
  isPackage: boolean
  specs: string[]
}

export interface CartItem {
  id: string
  productId: string
  name: string
  spec: string
  price: number
  quantity: number
  checked: boolean
  cover: string
}

export interface AddressItem {
  id: string
  name: string
  phone: string
  region: string
  detail: string
  isDefault: boolean
}

export interface MedicationPlan {
  id: string
  drugName: string
  spec: string
  dosage: string
  frequency: string
  times: string[]
  days: number
  startDate: string
  enabled: boolean
  takenToday: boolean
}

export interface ReportRecord {
  id: string
  title: string
  type: '检验报告' | '检查报告' | '核酸报告'
  patientId: string
  patientName: string
  hospital: string
  dept: string
  date: string
  status: '已出报告' | '检测中'
  items: { name: string; result: string; ref: string; unit: string; flag?: string }[]
}

export interface MedicalCaseRecord {
  id: string
  patientName: string
  hospital: string
  dept: string
  visitDate: string
  diagnosis: string
  notes: string
}

export interface InvoiceRecord {
  id: string
  title: string
  taxNo: string
  amount: number
  date: string
  status: '已开票' | '开票中' | '已冲红'
  orderIds: string[]
  email: string
}

const INITIAL_DOCTORS: DoctorProfile[] = [
  {
    id: 'doc-luoding',
    name: '罗定',
    title: '主治医师',
    dept: '血管瘤科',
    subDept: '肾病科',
    hospital: '北京长峰医院',
    level: '二级医院',
    multiHospitals: ['长沙长峰医院', '上海长峰医院'],
    avatar: '/assets/extracted/doc-luoding-avatar.png',
    goodAt: '擅长：婴幼儿血管瘤、浅表脉管畸形及脉冲染料激光微创治疗',
    bio: '具有多年婴幼儿血管瘤畸形的临床诊治经验，擅长各类型婴幼儿血管瘤、脉管畸形、混合型血管瘤及激光微创综合治疗，主持多项临床科研课题。',
    followed: false,
    imageFee: 25,
    phoneFee: 25,
    videoFee: 300,
    regFee: 80,
    canPrescribe: true,
  },
  {
    id: 'doc-liudan',
    name: '刘丹',
    title: '主任医师',
    dept: '血管外科',
    subDept: '妇科',
    hospital: '安徽医科大学第一附属医院',
    level: '三级甲等',
    multiHospitals: ['安徽医科大学第一附属医院', '北京长峰医院'],
    avatar: doctorFemaleAvatar,
    goodAt: '擅长：血管瘤微创介入、下肢静脉曲张及疑难脉管病综合诊治',
    bio: '主任医师，教授，刘丹专家团队带头人，从事临床工作20余年，专注难治性脉管畸形与血管外科微创介入治疗，发表核心期刊论文30余篇。',
    followed: true,
    imageFee: 50,
    phoneFee: 60,
    videoFee: 360,
    regFee: 100,
    canPrescribe: true,
  },
  {
    id: 'doc-wangyafei',
    name: '王亚飞',
    title: '副主任医师',
    dept: '皮肤激光',
    subDept: '内科',
    hospital: '北京长峰医院',
    level: '二级医院',
    multiHospitals: ['北京长峰医院', '合肥长峰医院'],
    avatar: doctorMaleSenior,
    goodAt: '擅长：鲜红斑痣光电联合治疗、激光术后皮肤修护及慢病管理',
    bio: '长期从事皮肤光电美容与脉管疾病诊疗工作，对复杂性血管瘤、鲜红斑痣光电参数调控及术后创面修护具有丰富经验。',
    followed: true,
    imageFee: 30,
    phoneFee: 35,
    videoFee: 280,
    regFee: 60,
    canPrescribe: true,
  },
  {
    id: 'doc-chenwei',
    name: '陈微',
    title: '主治医师',
    dept: '小儿科',
    subDept: '中医儿科',
    hospital: '上海长峰医院',
    level: '二级医院',
    multiHospitals: ['上海长峰医院', '长沙长峰医院'],
    avatar: doctorFemaleYoung,
    goodAt: '擅长：儿童脾胃积食调理、婴幼儿血管瘤早期筛查与温和外治',
    bio: '专注儿科常见病与婴幼儿体表血管异常早筛，擅长结合温和外敷用药与儿童日常膳食调养，耐心细致深受家长信赖。',
    followed: false,
    imageFee: 20,
    phoneFee: 30,
    videoFee: 240,
    regFee: 50,
    canPrescribe: true,
  },
  {
    id: 'doc-zhoumingyuan',
    name: '周明远',
    title: '副主任医师',
    dept: '全科',
    subDept: '肾病科',
    hospital: '长沙长峰医院',
    level: '二级医院',
    multiHospitals: ['长沙长峰医院'],
    avatar: doctorMaleSenior,
    goodAt: '擅长：慢性肾脏病随访、三伏天体质调养及居家合理用药指导',
    bio: '从事内科及全科慢病管理工作十余年，擅长肾病营养支持、季节性体质调理与处方合理用药安全核查。',
    followed: false,
    imageFee: 25,
    phoneFee: 28,
    videoFee: 260,
    regFee: 60,
    canPrescribe: true,
  },
]

const INITIAL_PATIENTS: PatientProfile[] = [
  {
    id: 'pat-1',
    name: '张晓靖',
    gender: '女',
    age: 28,
    idCard: '34010219960518****',
    phone: '138****8821',
    relation: '本人',
    isDefault: true,
    insuranceType: '医保',
  },
  {
    id: 'pat-2',
    name: '李可可',
    gender: '女',
    age: 26,
    idCard: '11010519980912****',
    phone: '139****6610',
    relation: '家属',
    isDefault: false,
    insuranceType: '自费',
  },
  {
    id: 'pat-3',
    name: '张明远',
    gender: '男',
    age: 56,
    idCard: '11010119680214****',
    phone: '136****3092',
    relation: '父母',
    isDefault: false,
    insuranceType: '医保',
  },
]

const INITIAL_VIDEOS: ShortVideoItem[] = [
  {
    id: 'vid-1',
    title: '血管瘤，激光可以祛除吗？',
    authorId: 'doc-luoding',
    authorName: '罗定',
    authorAvatar: '/assets/images/img2.png',
    cover: '/assets/images/imgWebp1.png',
    views: 1567,
    likes: '23.0w',
    liked: false,
    commentsCount: 5835,
    favorited: false,
    description: '脉冲染料激光如何精准作用于浅表血管瘤？治疗间隔与皮肤反应一分钟讲清。',
    comments: [
      { id: 'c1', user: '高**', avatar: '/assets/images/img2.png', content: '谢谢罗医生的详细解答，非常有帮助！', date: '2022.02.18 12:18:00', likes: 128, liked: false },
      { id: 'c2', user: '李**', avatar: doctorFemaleYoung, content: '非常耐心的医生，讲解通俗易懂，孩子治疗后消退得很理想。', date: '2022.02.19 09:42:00', likes: 86, liked: true },
    ],
  },
  {
    id: 'vid-2',
    title: '三伏天祛湿养脾汤怎么煮更有效',
    authorId: 'doc-liudan',
    authorName: '刘丹',
    authorAvatar: doctorFemaleAvatar,
    cover: tcmWellnessCover,
    views: 2840,
    likes: '18.5w',
    liked: true,
    commentsCount: 3420,
    favorited: true,
    description: '赤小豆、炒薏米配陈皮莲子，温脾而不伤正，适合夏末初秋全家人清淡调养。',
    comments: [
      { id: 'c3', user: '周**', avatar: doctorFemaleAvatar, content: '按刘主任的配方炖了一周，胃口好多了，收藏了！', date: '2022.02.16 20:15:00', likes: 45, liked: false },
    ],
  },
  {
    id: 'vid-3',
    title: '激光术后护理：防晒与忌口指南',
    authorId: 'doc-wangyafei',
    authorName: '王亚飞',
    authorAvatar: doctorMaleSenior,
    cover: laserDermatologyCover,
    views: 3125,
    likes: '12.4w',
    liked: false,
    commentsCount: 1920,
    favorited: false,
    description: '激光术后7天内冷水洁面、避免摩擦结痂以及物理硬防晒的核心细节演示。',
    comments: [
      { id: 'c4', user: '张**', avatar: doctorMaleSenior, content: '刚做完第二次治疗，防晒要点太实用了。', date: '2022.02.14 15:20:00', likes: 32, liked: false },
    ],
  },
  {
    id: 'vid-4',
    title: '慢病日常用药漏服了该怎么补？',
    authorId: 'doc-chenwei',
    authorName: '陈微',
    authorAvatar: doctorFemaleYoung,
    cover: '/assets/illustrations/imgWebp2.png',
    views: 1982,
    likes: '9.8w',
    liked: false,
    commentsCount: 842,
    favorited: false,
    description: '忘记按时吃药千万别直接翻倍补服！教你用“时间中点法”安全处理漏服情况。',
    comments: [],
  },
  {
    id: 'vid-5',
    title: '婴幼儿血管瘤早期信号如何识别',
    authorId: 'doc-chenwei',
    authorName: '陈微',
    authorAvatar: doctorFemaleYoung,
    cover: pediatricCheckupCover,
    views: 2419,
    likes: '15.2w',
    liked: false,
    commentsCount: 1120,
    favorited: false,
    description: '区分新生儿蚊虫叮咬红点与早期草莓状血管瘤，把握前3个月黄金观察窗。',
    comments: [],
  },
  {
    id: 'vid-6',
    title: '外用敷料湿敷的正确温度与时长',
    authorId: 'doc-zhoumingyuan',
    authorName: '周明远',
    authorAvatar: doctorMaleSenior,
    cover: pharmacyGuideCover,
    views: 1763,
    likes: '21.1w',
    liked: false,
    commentsCount: 2630,
    favorited: false,
    description: '噻吗洛尔外敷每次建议15分钟左右，如何裁剪纱布并保护周边正常皮肤。',
    comments: [],
  },
]

const INITIAL_LIVES: LiveItem[] = [
  {
    id: 'live-1',
    title: '浅表血管瘤分级诊疗专场答疑',
    doctorId: 'doc-luoding',
    doctorName: '罗定',
    dept: '血管瘤科',
    avatar: '/assets/images/img2.png',
    cover: '/assets/images/imgWebp1.png',
    views: 2340,
    status: 'live',
    badgeText: '直播中',
    category: 'live',
  },
  {
    id: 'live-2',
    title: '脉管畸形微创介入方案解读',
    doctorId: 'doc-liudan',
    doctorName: '刘丹',
    dept: '血管外科',
    avatar: doctorFemaleAvatar,
    cover: laserDermatologyCover,
    views: 1895,
    status: 'live',
    badgeText: '直播中',
    category: 'live',
  },
  {
    id: 'live-3',
    title: '激光术后色素沉着预防直播课',
    doctorId: 'doc-wangyafei',
    doctorName: '王亚飞',
    dept: '皮肤激光',
    avatar: doctorMaleSenior,
    cover: '/assets/illustrations/imgWebp2.png',
    views: 1620,
    status: 'upcoming',
    badgeText: '预播',
    scheduleText: '今天 19:30',
    countdownText: '距离开播3小时10分钟',
    reserved: false,
    category: 'live',
  },
  {
    id: 'live-4',
    title: '长夏小儿健脾食疗与积食推拿',
    doctorId: 'doc-chenwei',
    doctorName: '陈微',
    dept: '小儿科',
    avatar: doctorFemaleYoung,
    cover: tcmWellnessCover,
    views: 2780,
    status: 'upcoming',
    badgeText: '预播',
    scheduleText: '明天 09:00',
    countdownText: '距离开播16小时20分钟',
    reserved: true,
    category: 'live',
  },
  {
    id: 'live-5',
    title: '慢性肾病日常低盐低脂饮食示范',
    doctorId: 'doc-zhoumingyuan',
    doctorName: '周明远',
    dept: '肾病科',
    avatar: doctorMaleSenior,
    cover: pediatricCheckupCover,
    views: 1412,
    status: 'replay',
    badgeText: '回放',
    category: 'live',
  },
  {
    id: 'live-6',
    title: '居家备药与电子处方配药流程讲解',
    doctorId: 'doc-liudan',
    doctorName: '刘丹',
    dept: '全科',
    avatar: doctorFemaleAvatar,
    cover: pharmacyGuideCover,
    views: 3105,
    status: 'replay',
    badgeText: '回放',
    topRank: true,
    category: 'classroom',
  },
]

const ARTICLE_SEEDS: Array<{
  title: string
  detailTitle: string
  doctorId: string
  doctorName: string
  doctorTitle: string
  doctorDept: string
  date: string
  likes: number
  favorites: number
  views: number
  thumb: string
  summary: string
  paragraphs: string[]
}> = [
  {
    title: '血管瘤，激光可以祛除吗？术后会留疤吗',
    detailTitle: '血管瘤，激光可以祛除吗？浅表型与混合型治疗差异详解',
    doctorId: 'doc-luoding',
    doctorName: '罗定',
    doctorTitle: '主治医师',
    doctorDept: '血管瘤科',
    date: '2022-02-24',
    likes: 1234,
    favorites: 1567,
    views: 3567,
    thumb: '/assets/extracted/news-thumb.png',
    summary: '针对新生儿常见的浅表型血管瘤，脉冲染料激光可精准封闭异常毛细血管，通常治疗温和且不易留疤。',
    paragraphs: [
      '临床上很多家长在宝宝出生两周后发现皮肤表面出现小红点，逐渐隆起成草莓状斑块。对于表浅层病灶，脉冲染料激光能够利用选择性光热作用精准萎缩畸形血管网。',
      '若病灶已向皮下深层发展，单纯激光穿透深度有限，通常需配合外用马来酸噻吗洛尔湿敷或口服普萘洛尔进行联合序贯干预。',
      '术后48小时内保持局部清洁干燥，避免热水烫洗或揉搓结痂，绝大多数患儿在规范疗程后皮肤外观都能接近正常。',
    ],
  },
  {
    title: '湿热三伏天，这碗汤比红豆薏米水还祛湿',
    detailTitle: '湿热三伏天，这碗汤比红豆薏米水还祛湿健脾',
    doctorId: 'doc-liudan',
    doctorName: '刘丹',
    doctorTitle: '主任医师',
    doctorDept: '中医调理',
    date: '2022-02-21',
    likes: 982,
    favorites: 1410,
    views: 4215,
    thumb: tcmWellnessCover,
    summary: '长夏湿困脾土易出现乏力没胃口，用赤小豆、炒薏米搭配健脾山药与理气陈皮，温和祛湿不伤阳气。',
    paragraphs: [
      '中医认为“入夏无病三分虚”，长夏暑湿交蒸，脾胃运化功能首当其冲，儿童和老人尤其容易出现积食腹胀、舌苔厚腻、午后困倦等表现。',
      '单纯生薏米性质偏寒，直接煮水久服容易损伤脾阳。建议先将薏米干锅小火炒至微黄，再搭配赤小豆、莲子与陈皮同炖。',
      '每周饮用2至3次即可，同时日常少食冰饮油腻，配合晚上十一点前规律睡眠，湿热体质能得到稳步改善。',
    ],
  },
  {
    title: '宝宝面部红斑何时干预？把握增殖黄金期',
    detailTitle: '宝宝面部血管瘤何时开始干预？把握前三个月黄金窗口',
    doctorId: 'doc-chenwei',
    doctorName: '陈微',
    doctorTitle: '主治医师',
    doctorDept: '小儿科',
    date: '2022-02-18',
    likes: 856,
    favorites: 1120,
    views: 2890,
    thumb: pediatricCheckupCover,
    summary: '出生后1至6个月是血管瘤快速增殖期，眼周、口周及鼻翼部位建议尽早专科评估。',
    paragraphs: [
      '部分家长误以为胎记会随年龄自然消退而盲目等待，实际上位于眼睑、鼻尖、唇部等特殊功能区的血管瘤如果快速增大，可能压迫器官或破溃出血。',
      '建议在发现红斑明显增厚或面积扩大时，先由专科医生通过高频皮肤彩超测量皮下浸润深度，再制定温和干预方案。',
      '早期介入所需治疗周期更短、用药剂量更低，护理难度也大幅降低。',
    ],
  },
  {
    title: '外用凝胶与滴眼液湿敷，顺序千万别用反',
    detailTitle: '血管瘤外用湿敷与修复凝胶搭配使用时有哪些讲究？',
    doctorId: 'doc-wangyafei',
    doctorName: '王亚飞',
    doctorTitle: '副主任医师',
    doctorDept: '皮肤激光',
    date: '2022-02-15',
    likes: 743,
    favorites: 964,
    views: 2150,
    thumb: laserDermatologyCover,
    summary: '先湿敷药物等待吸收，再薄涂皮肤修护凝胶隔离摩擦，两者间隔15分钟效果更稳。',
    paragraphs: [
      '在联合治疗期间，许多患者同时使用外敷滴眼液和表皮生长因子修复凝胶，若涂抹顺序颠倒，凝胶会在皮肤表面形成保护膜从而阻碍药液渗透。',
      '正确步骤是清洁局部后，将药液浸湿双层无菌纱布贴敷15分钟，取下待皮肤自然风干，再涂抹薄层修护凝胶。',
      '若局部出现轻微脱屑或干燥，可减少单次湿敷时间，并及时线上联系主诊医生微调频次。',
    ],
  },
  {
    title: '慢性肾脏病随访：血常规与尿常规重点看哪几项',
    detailTitle: '体检及复查化验单看不懂？三分钟看懂关键炎症与代谢指标',
    doctorId: 'doc-zhoumingyuan',
    doctorName: '周明远',
    doctorTitle: '副主任医师',
    doctorDept: '肾病科',
    date: '2022-02-11',
    likes: 618,
    favorites: 830,
    views: 1945,
    thumb: pharmacyGuideCover,
    summary: '复查报告上的↑和↓箭头不必过度焦虑，结合白细胞、hs-CRP与动态趋势综合判断更科学。',
    paragraphs: [
      '拿到检验报告单后，单次轻度超出参考范围并不一定代表急性感染或病情加重，饮水不足、熬夜或检验前剧烈运动都可能引起一过性波动。',
      '肾病随访患者应重点关注连续3个月的尿蛋白肌酐比值与血压记录，把历次报告保存在电子档案中便于医生横向对比。',
      '在本平台“报告查询”中可随时调阅近期化验数值，并一键发起图文复诊请医生解读。',
    ],
  },
  {
    title: '鲜红斑痣与草莓状血管瘤，外观上怎么分辨',
    detailTitle: '都是红色胎记：鲜红斑痣与草莓状血管瘤的核心区别',
    doctorId: 'doc-luoding',
    doctorName: '罗定',
    doctorTitle: '主治医师',
    doctorDept: '血管瘤科',
    date: '2022-02-08',
    likes: 1105,
    favorites: 1380,
    views: 3120,
    thumb: '/assets/images/imgWebp1.png',
    summary: '出生即有、平贴皮肤且按压褪色多为鲜红斑痣；出生后新发且快速凸起则偏向婴幼儿血管瘤。',
    paragraphs: [
      '两种病变虽然在早期都呈现粉红或鲜红色斑片，但病理本质与自然病程截然不同。',
      '鲜红斑痣属于毛细血管畸形，不会自行消退，往往随患儿身体等比例扩大；而婴幼儿血管瘤具有增殖期与缓慢消退期。',
      '明确分型后再选择对应波长的光电或药物治疗，才能事半功倍。',
    ],
  },
  {
    title: '线上复诊开药指南：电子处方配送与院内制剂区别',
    detailTitle: '足不出户续方买药：线上电子处方开具与配送全攻略',
    doctorId: 'doc-liudan',
    doctorName: '刘丹',
    doctorTitle: '主任医师',
    doctorDept: '血管外科',
    date: '2022-02-03',
    likes: 539,
    favorites: 742,
    views: 1788,
    thumb: '/assets/illustrations/imgWebp2.png',
    summary: '慢病及术后复诊患者可通过图文问诊开具电子处方，常规西药支持冷链配送到家。',
    paragraphs: [
      '对于病情稳定、近期线下就诊过的复诊患者，在上传既往病历或清晰患处照片后，经执业医师审核即可在线开具正规电子处方。',
      '常规外用滴眼液与修护凝胶支持在线结算并配送到家；部分院内自制协定方剂因监管要求需凭处方到院药房取药。',
      '收药后可同步在“用药助手”开启每日服药外敷闹钟提醒，避免漏用影响疗效。',
    ],
  },
]

const INITIAL_ARTICLES: ArticleItem[] = ARTICLE_SEEDS.map((seed, idx) => ({
  id: `art-${idx + 1}`,
  title: seed.title,
  detailTitle: seed.detailTitle,
  doctorId: seed.doctorId,
  doctorName: seed.doctorName,
  doctorTitle: seed.doctorTitle,
  doctorDept: seed.doctorDept,
  date: seed.date,
  likes: seed.likes,
  liked: idx === 0,
  favorites: seed.favorites,
  favorited: idx === 0,
  views: seed.views,
  thumb: seed.thumb,
  summary: seed.summary,
  paragraphs: seed.paragraphs,
  comments: [
    {
      id: `ac-${idx}-1`,
      user: idx % 2 === 0 ? '高**' : '陈**',
      avatar: '/assets/design-source/raster/c49b9abf711c397bfea172a91e21100ea33d5cb0.png',
      content: `感谢${seed.doctorName}医生的耐心科普，非常清晰实用！`,
      date: `${seed.date} 12:18:00`,
      likes: 12 + idx * 5,
      liked: false,
    },
    {
      id: `ac-${idx}-2`,
      user: '李**',
      avatar: doctorFemaleYoung,
      content: '讲解细致全面，按方法护理确实心里有底多了。',
      date: `${seed.date} 16:40:00`,
      likes: 28 + idx * 3,
      liked: idx === 0,
    },
  ],
}))

const INITIAL_CONSULTATIONS: ConsultationRecord[] = [
  {
    id: 'con-free-1',
    type: 'free',
    doctorId: 'doc-liudan',
    doctorName: '刘丹专家团队',
    doctorTitle: '专家团队',
    hospital: '安徽医科大学第一附属医院',
    avatar: '/assets/extracted/consult-team-avatar.png',
    patientId: 'pat-1',
    patientName: '张晓靖',
    patientPhone: '138****8821',
    teamTitle: '刘丹专家团队 · 血管瘤初诊筛查',
    lastMessage: '罗定医生: 建议上传清晰照片以便评估',
    date: '02/24',
    unread: 2,
    status: '进行中',
    feeTag: '免费',
    symptom: '发现皮肤表面小红点两周，咨询是否属于婴幼儿血管瘤。',
    messages: [
      { id: 'm1', sender: 'assistant', senderName: '医助', avatar: '/assets/extracted/studio-assistant.png', text: '您好，您哪里不舒服？', time: '09:30' },
      { id: 'm2', sender: 'assistant', senderName: '医助', avatar: '/assets/extracted/studio-assistant.png', text: '患者多大年龄？', time: '09:31' },
      { id: 'm3', sender: 'patient', senderName: '张晓靖', text: '宝宝目前4个月，手臂上有块红色斑片，按压会褪色。', time: '09:33' },
      { id: 'm4', sender: 'doctor', senderName: '罗定 主治医师', avatar: '/assets/images/avatar-fill-original.png', text: '根据您的描述，初步考虑浅表性婴幼儿血管瘤增殖早期，建议上传局部清晰照片或预约门诊面诊评估。', time: '09:35' },
    ],
  },
  {
    id: 'con-free-2',
    type: 'free',
    doctorId: 'doc-wangyafei',
    doctorName: '王亚飞激光护理团队',
    doctorTitle: '护理团队',
    hospital: '北京长峰医院',
    avatar: doctorMaleSenior,
    patientId: 'pat-1',
    patientName: '张晓靖',
    patientPhone: '138****8821',
    teamTitle: '王亚飞团队 · 激光术后护理咨询',
    lastMessage: '医助: 治疗第5天避免热水烫洗',
    date: '02/21',
    unread: 0,
    status: '已完成',
    feeTag: '免费',
    symptom: '激光治疗后局部护理咨询',
    messages: [
      { id: 'm21', sender: 'assistant', senderName: '医助', avatar: '/assets/extracted/studio-assistant.png', text: '您好，请问治疗后第几天了？', time: 'Yesterday' },
      { id: 'm22', sender: 'patient', senderName: '张晓靖', text: '已经第五天了，恢复良好。', time: 'Yesterday' },
    ],
  },
  {
    id: 'con-free-3',
    type: 'free',
    doctorId: 'doc-chenwei',
    doctorName: '陈微儿科随访组',
    doctorTitle: '儿科团队',
    hospital: '上海长峰医院',
    avatar: doctorFemaleYoung,
    patientId: 'pat-2',
    patientName: '李可可',
    patientPhone: '139****6610',
    teamTitle: '陈微团队 · 小儿复诊号源预约',
    lastMessage: '已为您登记周四上午复查门诊',
    date: '02/18',
    unread: 0,
    status: '已完成',
    feeTag: '免费',
    symptom: '复查号源咨询',
    messages: [
      { id: 'm31', sender: 'assistant', senderName: '医助', avatar: '/assets/extracted/studio-assistant.png', text: '您好，陈微医生周二、周四上午均有专家门诊。', time: '02/18' },
    ],
  },
  {
    id: 'con-free-4',
    type: 'free',
    doctorId: 'doc-zhoumingyuan',
    doctorName: '周明远慢病药师组',
    doctorTitle: '全科团队',
    hospital: '长沙长峰医院',
    avatar: '/assets/extracted/studio-assistant.png',
    patientId: 'pat-3',
    patientName: '张明远',
    patientPhone: '136****3092',
    teamTitle: '周明远团队 · 慢病续方用药指导',
    lastMessage: '健脾祛湿颗粒温水饭后冲服',
    date: '02/14',
    unread: 0,
    status: '已完成',
    feeTag: '免费',
    symptom: '慢病用药续方咨询',
    messages: [
      { id: 'm41', sender: 'assistant', senderName: '医助', avatar: '/assets/extracted/studio-assistant.png', text: '您好，已为您登记团队医生随访。', time: '02/14' },
    ],
  },
  {
    id: 'con-vid-1',
    type: 'video',
    doctorId: 'doc-luoding',
    doctorName: '罗定',
    doctorTitle: '主治医师',
    hospital: '北京长峰医院',
    avatar: '/assets/images/avatar-fill-original.png',
    patientId: 'pat-1',
    patientName: '张晓靖',
    patientPhone: '138****8821',
    lastMessage: '手臂红色斑片做激光前要检查哪些项目？',
    date: '2022/02/24 12:04:04',
    unread: 0,
    status: '已完成',
    feeTag: '自费',
    realtimeTag: true,
    symptom: '手臂红色斑片做激光前要检查哪些项目？',
    prescriptionId: 'rx-1',
    summaryDiagnosis: '浅表型血管瘤（增殖早期）',
    summaryAdvice: '按医嘱规律外用马来酸噻吗洛尔滴眼液湿敷，保持局部清洁干燥，1个月后复诊。',
    reviewed: false,
    orderId: 'ord-4',
    messages: [
      { id: 'v1', sender: 'patient', senderName: '张晓靖', text: '手臂红色斑片做激光前要检查哪些项目？', time: '12:00' },
      { id: 'v2', sender: 'doctor', senderName: '罗定', avatar: '/assets/images/avatar-fill-original.png', text: '您好，已通过视频详细查看您的情况，为您开具了电子处方与问诊小结，请查收。', time: '12:03' },
      { id: 'v3', sender: 'doctor', senderName: '罗定', text: '电子处方笺', time: '12:04', type: 'prescription', prescriptionId: 'rx-1' },
      { id: 'v4', sender: 'doctor', senderName: '罗定', text: '问诊小结', time: '12:04', type: 'summary' },
    ],
  },
  {
    id: 'con-vid-2',
    type: 'video',
    doctorId: 'doc-wangyafei',
    doctorName: '王亚飞',
    doctorTitle: '副主任医师',
    hospital: '北京长峰医院',
    avatar: doctorMaleSenior,
    patientId: 'pat-1',
    patientName: '张晓靖',
    patientPhone: '138****8821',
    lastMessage: '激光术后第七天轻微脱痂需要涂药膏吗？',
    date: '2022/02/21 16:30:12',
    unread: 2,
    status: '已完成',
    feeTag: '医保',
    symptom: '激光术后第七天轻微脱痂需要涂药膏吗？',
    prescriptionId: 'rx-1',
    summaryDiagnosis: '皮肤浅表脉管畸形随访',
    summaryAdvice: '注意物理防晒，避免抓挠患处，早晚各涂抹一次表皮修复凝胶。',
    messages: [
      { id: 'v21', sender: 'patient', senderName: '张晓靖', text: '激光术后第七天轻微脱痂需要涂药膏吗？', time: '16:20' },
      { id: 'v22', sender: 'doctor', senderName: '王亚飞', avatar: doctorMaleSenior, text: '属于正常结痂脱落过程，切勿撕扯，每日两次薄涂重组人表皮生长因子凝胶即可。', time: '16:30' },
    ],
  },
  {
    id: 'con-vid-3',
    type: 'video',
    doctorId: 'doc-liudan',
    doctorName: '刘丹',
    doctorTitle: '主任医师',
    hospital: '安徽医科大学第一附属医院',
    avatar: doctorFemaleAvatar,
    patientId: 'pat-1',
    patientName: '张晓靖',
    patientPhone: '138****8821',
    lastMessage: '小腿静脉团块微创介入术后多久可散步？',
    date: '2022/02/18 10:15:40',
    unread: 0,
    status: '已完成',
    feeTag: '自费',
    symptom: '小腿静脉团块微创介入术后多久可散步？',
    messages: [
      { id: 'v31', sender: 'patient', senderName: '张晓靖', text: '小腿静脉团块微创介入术后多久可散步？', time: '10:15' },
    ],
  },
  {
    id: 'con-vid-4',
    type: 'video',
    doctorId: 'doc-chenwei',
    doctorName: '陈微',
    doctorTitle: '主治医师',
    hospital: '上海长峰医院',
    avatar: doctorFemaleYoung,
    patientId: 'pat-1',
    patientName: '张晓靖',
    patientPhone: '138****8821',
    lastMessage: '宝宝脾胃弱积食伴低热如何清淡喂养？',
    date: '2022/02/12 19:22:08',
    unread: 1,
    status: '已完成',
    feeTag: '医保',
    symptom: '宝宝脾胃弱积食伴低热如何清淡喂养？',
    messages: [
      { id: 'v41', sender: 'patient', senderName: '张晓靖', text: '宝宝脾胃弱积食伴低热如何清淡喂养？', time: '19:22' },
    ],
  },
  {
    id: 'con-phone-1',
    type: 'phone',
    doctorId: 'doc-luoding',
    doctorName: '罗定',
    doctorTitle: '主治医师',
    hospital: '北京长峰医院',
    avatar: '/assets/images/avatar-fill-original.png',
    patientId: 'pat-1',
    patientName: '张晓靖',
    patientPhone: '138****8821',
    lastMessage: '电话沟通激光治疗频率与湿敷间隔时间',
    date: '2022/02/22 14:18:00',
    unread: 0,
    status: '已完成',
    feeTag: '自费',
    symptom: '电话咨询激光治疗方案与注意事项',
    prescriptionId: 'rx-1',
    summaryDiagnosis: '婴幼儿血管瘤（浅表型）',
    summaryAdvice: '建议外敷加脉冲染料激光联合干预，四周后复查。',
    messages: [
      { id: 'p1', sender: 'system', senderName: '系统提示', text: '电话问诊已完成，通话时长 08分26秒', time: '14:18' },
      { id: 'p2', sender: 'doctor', senderName: '罗定', avatar: '/assets/images/avatar-fill-original.png', text: '通话中沟通的护理要点已整理至问诊小结，可随时查看。', time: '14:19' },
    ],
  },
  {
    id: 'con-phone-2',
    type: 'phone',
    doctorId: 'doc-liudan',
    doctorName: '刘丹',
    doctorTitle: '主任医师',
    hospital: '安徽医科大学第一附属医院',
    avatar: doctorFemaleAvatar,
    patientId: 'pat-1',
    patientName: '张晓靖',
    patientPhone: '138****8821',
    lastMessage: '复查彩超血流信号变化解读',
    date: '2022/02/15 11:05:32',
    unread: 1,
    status: '已完成',
    feeTag: '医保',
    symptom: '复查彩超血流信号变化解读',
    messages: [
      { id: 'p21', sender: 'system', senderName: '系统提示', text: '电话问诊已完成，通话时长 06分12秒', time: '11:05' },
    ],
  },
  {
    id: 'con-img-1',
    type: 'image',
    doctorId: 'doc-luoding',
    doctorName: '罗定',
    doctorTitle: '主治医师',
    hospital: '北京长峰医院',
    avatar: '/assets/images/avatar-fill-original.png',
    patientId: 'pat-1',
    patientName: '张晓靖',
    patientPhone: '138****8821',
    lastMessage: '激光术后第7天局部轻微发红，请复核照片',
    date: '2022/02/24 12:04:04',
    unread: 0,
    status: '已完成',
    feeTag: '自费',
    realtimeTag: true,
    symptom: '血管瘤激光术后第7天局部轻微发红，上传患处照片请罗医生复核。',
    prescriptionId: 'rx-1',
    summaryDiagnosis: '血管瘤激光术后正常反应期',
    summaryAdvice: '局部轻微红斑属激光术后正常吸收反应，继续使用医用修复敷料及处方药物。',
    orderId: 'ord-4',
    messages: [
      { id: 'i1', sender: 'patient', senderName: '张晓靖', text: '罗医生您好，这是今天拍的照片，局部还有点红，需要调整用药吗？', time: '11:58' },
      { id: 'i2', sender: 'doctor', senderName: '罗定', avatar: '/assets/images/avatar-fill-original.png', text: '您好，照片看恢复得很顺利，没有感染迹象，继续按电子处方外敷即可。', time: '12:01' },
      { id: 'i3', sender: 'doctor', senderName: '罗定', text: '电子处方笺', time: '12:02', type: 'prescription', prescriptionId: 'rx-1' },
      { id: 'i4', sender: 'doctor', senderName: '罗定', text: '问诊小结', time: '12:04', type: 'summary' },
    ],
  },
  {
    id: 'con-img-2',
    type: 'image',
    doctorId: 'doc-chenwei',
    doctorName: '陈微',
    doctorTitle: '主治医师',
    hospital: '上海长峰医院',
    avatar: doctorFemaleYoung,
    patientId: 'pat-2',
    patientName: '李可可',
    patientPhone: '139****6610',
    lastMessage: '血常规报告与外用药膏购买确认',
    date: '2022/02/19 09:45:10',
    unread: 2,
    status: '进行中',
    feeTag: '医保',
    symptom: '上传血常规检查单，咨询是否可继续按原剂量外涂。',
    messages: [
      { id: 'i21', sender: 'patient', senderName: '李可可', text: '陈医生您好，血常规指标均正常，外敷药物还需要继续吗？', time: '09:42' },
      { id: 'i22', sender: 'doctor', senderName: '陈微', avatar: doctorFemaleYoung, text: '各项数值都很平稳，建议继续巩固外敷两周后拍照复查。', time: '09:45' },
    ],
  },
]

const INITIAL_PRESCRIPTIONS: PrescriptionRecord[] = [
  {
    id: 'rx-1',
    code: 'NO.2022022400891',
    date: '2022-02-24 15:40',
    patientName: '张晓靖',
    gender: '女',
    age: 28,
    dept: '血管瘤科',
    diagnosis: '浅表型血管瘤；长夏脾虚湿困调理',
    doctorName: '罗定',
    pharmacistName: '陈静',
    hospital: '安徽医科大学第一附属医院',
    status: 'valid',
    amount: 45.0,
    medicines: [
      { id: 'm-1', name: '马来酸噻吗洛尔滴眼液 (0.5%)', spec: '5ml:25mg × 1支/盒', quantity: 'x2', usage: '外用湿敷，每日2次，每次15分钟', price: 25.0 },
      { id: 'm-2', name: '重组人表皮生长因子凝胶', spec: '20g/支', quantity: 'x1', usage: '外涂患处，每日早晚各1次', price: 20.0 },
    ],
  },
  {
    id: 'rx-2',
    code: 'NO.2021081500312',
    date: '2021-08-15 10:20',
    patientName: '张晓靖',
    gender: '女',
    age: 28,
    dept: '血管瘤科',
    diagnosis: '婴幼儿血管瘤随访复查',
    doctorName: '罗定',
    pharmacistName: '陈静',
    hospital: '北京长峰医院',
    status: 'expired',
    amount: 45.0,
    medicines: [
      { id: 'm-3', name: '普萘洛尔口服溶液', spec: '120ml:450mg', quantity: 'x1', usage: '口服，每日2次', price: 45.0 },
    ],
  },
  {
    id: 'rx-3',
    code: 'NO.2022022000519',
    date: '2022-02-20 09:15',
    patientName: '张晓靖',
    gender: '女',
    age: 28,
    dept: '内科',
    diagnosis: '院内特配中药协定方（仅限院内药房调配）',
    doctorName: '刘丹',
    pharmacistName: '周明',
    hospital: '安徽医科大学第一附属医院',
    status: 'offline-only',
    amount: 90.0,
    medicines: [
      { id: 'm-4', name: '院内制剂·健脾祛湿颗粒', spec: '10g × 14袋', quantity: 'x2', usage: '温水冲服，一日2次', price: 45.0 },
    ],
  },
]

const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: 'ord-1',
    category: '西药药品',
    status: '待付款',
    patientName: '张晓靖',
    hospital: '安徽医科大学第一附属医院',
    doctorName: '罗定',
    dept: '血管瘤科',
    amount: 135.0,
    time: '2022-02-24 15:40:34',
    prescriptionId: 'rx-1',
    deliveryMode: '配送到家',
    addressId: 'addr-1',
    subOrders: [
      { id: 'sub-1', title: '订单一', amount: 45.0, time: '2022-02-24 15:40:34' },
      { id: 'sub-2', title: '订单二', amount: 45.0, time: '2022-02-24 15:40:34' },
      { id: 'sub-3', title: '订单三', amount: 45.0, time: '2022-02-24 15:40:34' },
    ],
  },
  {
    id: 'ord-2',
    category: '检查检验',
    status: '待付款',
    patientName: '张晓靖',
    hospital: '安徽医科大学第一附属医院',
    doctorName: '罗定',
    dept: '血管瘤科',
    amount: 45.0,
    time: '2022-02-24 15:40:34',
  },
  {
    id: 'ord-3',
    category: '中药药品',
    status: '进行中',
    patientName: '张晓靖',
    hospital: '安徽医科大学第一附属医院',
    doctorName: '刘丹',
    dept: '中医科',
    amount: 45.0,
    time: '2022-02-24 15:40:34',
    prescriptionId: 'rx-1',
    deliveryMode: '配送到家',
    addressId: 'addr-1',
  },
  {
    id: 'ord-4',
    category: '图文问诊',
    status: '已完成',
    patientName: '张晓靖',
    hospital: '安徽医科大学第一附属医院',
    doctorName: '罗定',
    dept: '血管瘤科',
    amount: 45.0,
    time: '2022-02-24 15:40:34',
    consultationId: 'con-img-1',
    prescriptionId: 'rx-1',
    invoiced: false,
  },
  {
    id: 'ord-5',
    category: '西药药品',
    status: '已取消',
    patientName: '张晓靖',
    hospital: '安徽医科大学第一附属医院',
    doctorName: '罗定',
    dept: '血管瘤科',
    amount: 135.0,
    time: '2022-02-24 15:40:34',
    cancelReason: '临时不需要了',
    subOrders: [
      { id: 'sub-51', title: '订单一', amount: 45.0, time: '2022-02-24 15:40:34' },
      { id: 'sub-52', title: '订单二', amount: 45.0, time: '2022-02-24 15:40:34' },
      { id: 'sub-53', title: '订单三', amount: 45.0, time: '2022-02-24 15:40:34' },
    ],
  },
  {
    id: 'ord-6',
    category: '门诊挂号',
    status: '已完成',
    patientName: '张晓靖',
    hospital: '北京长峰医院',
    doctorName: '罗定',
    dept: '血管瘤科',
    amount: 80.0,
    time: '2022-02-20 09:30:00',
    invoiced: false,
  },
  {
    id: 'ord-7',
    category: '核酸检测',
    status: '已完成',
    patientName: '张晓靖',
    hospital: '北京长峰医院',
    dept: '核酸采样点',
    amount: 35.0,
    time: '2022-02-18 14:10:00',
    invoiced: true,
  },
]

const INITIAL_MALL_PRODUCTS: MallProduct[] = [
  {
    id: 'prod-1',
    name: '医用冷敷贴（血管瘤激光术后修护专享）',
    subtitle: '温和舒缓 创面保护 无菌独立包装 5片/盒',
    hospital: '北京长峰医院便民药房',
    price: 68.0,
    originalPrice: 98.0,
    sales: 1260,
    cover: '/assets/design-source/raster/2536bf16682e901131bf786a6ba5011c24d7d3be.png',
    isPackage: false,
    specs: ['标准装 5片/盒', '疗程装 15片/3盒'],
  },
  {
    id: 'prod-2',
    name: '三伏天健脾祛湿调理茶饮包（名医配方）',
    subtitle: '赤小豆茯苓山药陈皮草本配伍 15袋/盒',
    hospital: '北京长峰医院中药房',
    price: 45.0,
    originalPrice: 65.0,
    sales: 890,
    cover: '/assets/design-source/raster/7fcd9d406942487e100f556be26603bff23bdf43.png',
    isPackage: false,
    specs: ['15袋/盒', '30袋/2盒'],
  },
  {
    id: 'prod-3',
    name: '血管瘤专科术后居家护理全套健康套餐',
    subtitle: '含医用修复敷料2盒 + 生长因子凝胶1支 + 随访指导',
    hospital: '北京长峰医院',
    price: 158.0,
    originalPrice: 216.0,
    sales: 540,
    cover: '/assets/design-source/raster/2536bf16682e901131bf786a6ba5011c24d7d3be.png',
    isPackage: true,
    specs: ['基础术后修护套餐', '加强激光联合套餐'],
  },
]

const INITIAL_CART: CartItem[] = [
  {
    id: 'cart-1',
    productId: 'prod-1',
    name: '医用冷敷贴（血管瘤激光术后修护专享）',
    spec: '标准装 5片/盒',
    price: 68.0,
    quantity: 1,
    checked: true,
    cover: '/assets/design-source/raster/2536bf16682e901131bf786a6ba5011c24d7d3be.png',
  },
  {
    id: 'cart-2',
    productId: 'prod-2',
    name: '三伏天健脾祛湿调理茶饮包（名医配方）',
    spec: '15袋/盒',
    price: 45.0,
    quantity: 2,
    checked: true,
    cover: '/assets/design-source/raster/7fcd9d406942487e100f556be26603bff23bdf43.png',
  },
]

const INITIAL_ADDRESSES: AddressItem[] = [
  {
    id: 'addr-1',
    name: '张晓靖',
    phone: '13888210918',
    region: '北京市丰台区靛厂路',
    detail: '291号院3号楼1单元802室',
    isDefault: true,
  },
  {
    id: 'addr-2',
    name: '李可可',
    phone: '13966102831',
    region: '北京市朝阳区建国路',
    detail: '88号现代城B座1205',
    isDefault: false,
  },
]

const INITIAL_MEDICATIONS: MedicationPlan[] = [
  {
    id: 'med-1',
    drugName: '马来酸噻吗洛尔滴眼液',
    spec: '5ml:25mg',
    dosage: '每次湿敷15分钟',
    frequency: '每日2次',
    times: ['08:30', '20:00'],
    days: 30,
    startDate: '2022-02-20',
    enabled: true,
    takenToday: true,
  },
  {
    id: 'med-2',
    drugName: '阿莫西林胶囊',
    spec: '0.25g × 24粒',
    dosage: '每次2粒',
    frequency: '每日3次',
    times: ['08:00', '13:00', '19:00'],
    days: 7,
    startDate: '2022-02-22',
    enabled: true,
    takenToday: false,
  },
]

const INITIAL_REPORTS: ReportRecord[] = [
  {
    id: 'rep-1',
    title: '血常规五分类 + CRP 检验报告单',
    type: '检验报告',
    patientId: 'pat-1',
    patientName: '张晓靖',
    hospital: '北京长峰医院',
    dept: '血管瘤科',
    date: '2022-02-24 14:20',
    status: '已出报告',
    items: [
      { name: '白细胞计数 (WBC)', result: '6.42', ref: '3.50-9.50', unit: '10^9/L' },
      { name: '血红蛋白 (HGB)', result: '132', ref: '115-150', unit: 'g/L' },
      { name: '血小板计数 (PLT)', result: '218', ref: '125-350', unit: '10^9/L' },
      { name: '超敏C反应蛋白 (hs-CRP)', result: '1.2', ref: '0.0-3.0', unit: 'mg/L' },
    ],
  },
  {
    id: 'rep-2',
    title: '浅表软组织高频彩超检查报告',
    type: '检查报告',
    patientId: 'pat-1',
    patientName: '张晓靖',
    hospital: '北京长峰医院',
    dept: '超声医学科',
    date: '2022-02-20 11:05',
    status: '已出报告',
    items: [
      { name: '皮下病变厚度', result: '3.2', ref: '<5.0', unit: 'mm' },
      { name: '内部血流信号 (CDFI)', result: '少许星点状', ref: '未见明显异常', unit: '-' },
    ],
  },
  {
    id: 'rep-3',
    title: '新型冠状病毒核酸检测报告（咽拭子）',
    type: '核酸报告',
    patientId: 'pat-1',
    patientName: '张晓靖',
    hospital: '北京长峰医院',
    dept: '分子诊断实验室',
    date: '2022-02-18 18:30',
    status: '已出报告',
    items: [
      { name: '新冠病毒核酸 (ORF1ab/N基因)', result: '阴性 (-)', ref: '阴性 (-)', unit: '-' },
    ],
  },
]

const INITIAL_CASES: MedicalCaseRecord[] = [
  {
    id: 'case-1',
    patientName: '张晓靖',
    hospital: '北京长峰医院',
    dept: '血管瘤科',
    visitDate: '2022-02-20',
    diagnosis: '浅表型血管瘤（增殖期消退阶段）',
    notes: '已完成第2次脉冲染料激光治疗，局部色泽明显变淡，嘱继续外敷噻吗洛尔并注意防晒。',
  },
  {
    id: 'case-2',
    patientName: '李可可',
    hospital: '安徽医科大学第一附属医院',
    dept: '中医内科',
    visitDate: '2022-01-15',
    diagnosis: '脾虚湿盛证',
    notes: '给予健脾祛湿中药颗粒2周调理，睡眠与食欲明显改善。',
  },
]

const INITIAL_INVOICES: InvoiceRecord[] = [
  {
    id: 'inv-1',
    title: '张晓靖（个人）',
    taxNo: '-',
    amount: 35.0,
    date: '2022-02-19 10:15',
    status: '已开票',
    orderIds: ['ord-7'],
    email: 'zhangxiaojing@example.com',
  },
]

export interface AppState {
  user: {
    loggedIn: boolean
    name: string
    phone: string
    avatar: string
    realNameVerified: boolean
    city: string
    unreadSystem: number
    unreadOrder: number
  }
  activeTab: PrimaryTab
  discoverSubTab: DiscoverSubTab
  consultSubTab: ConsultSubTab
  homeDeptTab: string
  routeStack: RouteEntry[]
  selectedPatientId: string
  patients: PatientProfile[]
  doctors: DoctorProfile[]
  videos: ShortVideoItem[]
  lives: LiveItem[]
  articles: ArticleItem[]
  consultations: ConsultationRecord[]
  prescriptions: PrescriptionRecord[]
  orders: OrderRecord[]
  mallProducts: MallProduct[]
  cart: CartItem[]
  addresses: AddressItem[]
  medications: MedicationPlan[]
  reports: ReportRecord[]
  medicalCases: MedicalCaseRecord[]
  invoices: InvoiceRecord[]
  searchHistory: string[]
  toast: string | null
}

const STORAGE_KEY = 'yibaishun_full_state_v2'

function createInitialState(): AppState {
  return {
    user: {
      loggedIn: true,
      name: '李可可',
      phone: '138****8821',
      avatar: '/assets/extracted/mine-avatar.png',
      realNameVerified: true,
      city: '北京市',
      unreadSystem: 1,
      unreadOrder: 1,
    },
    activeTab: 'discover',
    discoverSubTab: 'video',
    consultSubTab: 'free',
    homeDeptTab: '综合',
    routeStack: [{ page: 'root' }],
    selectedPatientId: 'pat-1',
    patients: INITIAL_PATIENTS,
    doctors: INITIAL_DOCTORS,
    videos: INITIAL_VIDEOS,
    lives: INITIAL_LIVES,
    articles: INITIAL_ARTICLES,
    consultations: INITIAL_CONSULTATIONS,
    prescriptions: INITIAL_PRESCRIPTIONS,
    orders: INITIAL_ORDERS,
    mallProducts: INITIAL_MALL_PRODUCTS,
    cart: INITIAL_CART,
    addresses: INITIAL_ADDRESSES,
    medications: INITIAL_MEDICATIONS,
    reports: INITIAL_REPORTS,
    medicalCases: INITIAL_CASES,
    invoices: INITIAL_INVOICES,
    searchHistory: ['血管瘤', '罗定', '北京长峰医院', '激光祛除'],
    toast: null,
  }
}

export interface AppContextValue extends AppState {
  currentRoute: RouteEntry
  switchPrimaryTab: (tab: PrimaryTab) => void
  setDiscoverSubTab: (sub: DiscoverSubTab) => void
  setConsultSubTab: (sub: ConsultSubTab) => void
  setHomeDeptTab: (dept: string) => void
  navigate: (page: PageKey, params?: Record<string, any>) => void
  goBack: () => void
  openFrameById: (frameId: string) => void
  showToast: (msg: string) => void
  toggleFollowDoctor: (doctorId: string) => void
  toggleVideoLike: (videoId: string) => void
  toggleVideoFavorite: (videoId: string) => void
  addVideoComment: (videoId: string, content: string) => void
  toggleLiveReserve: (liveId: string) => void
  toggleArticleLike: (articleId: string) => void
  toggleArticleFavorite: (articleId: string) => void
  addArticleComment: (articleId: string, content: string) => void
  sendChatMessage: (consultationId: string, text: string) => void
  submitConsultReview: (consultationId: string, rating: number, content: string) => void
  createInquiryOrderAndConsult: (payload: {
    type: ConsultSubTab
    doctorId: string
    patientId: string
    symptom: string
    feeType: '自费' | '医保'
    amount: number
  }) => { orderId: string; consultationId: string }
  createRegistrationOrder: (payload: {
    doctorId: string
    patientId: string
    hospital: string
    dept: string
    slotTime: string
    amount: number
  }) => string
  payOrder: (orderId: string) => void
  cancelOrder: (orderId: string, reason: string) => void
  confirmReceiveOrder: (orderId: string) => void
  applyOrderRefund: (orderId: string, reason: string) => void
  savePatient: (patient: Omit<PatientProfile, 'id'> & { id?: string }) => string
  setSelectedPatientId: (id: string) => void
  addToCart: (productId: string, spec: string, quantity?: number) => void
  toggleCartItem: (cartId: string) => void
  toggleAllCart: (checked: boolean) => void
  deleteCheckedCart: () => void
  checkoutCartOrDrug: (payload: {
    category: '西药药品' | '中药药品'
    amount: number
    deliveryMode: '配送到家' | '到院自取' | '外配处方'
    addressId?: string
    prescriptionId?: string
  }) => string
  saveAddress: (addr: Omit<AddressItem, 'id'> & { id?: string }) => string
  saveMedication: (med: Omit<MedicationPlan, 'id'> & { id?: string }) => void
  toggleMedicationReminder: (medId: string) => void
  deleteMedication: (medId: string) => void
  addMedicalCase: (item: Omit<MedicalCaseRecord, 'id'>) => void
  submitInvoice: (orderIds: string[], title: string, email: string) => void
  updateUserProfile: (patch: Partial<AppState['user']>) => void
  addSearchHistory: (keyword: string) => void
  clearSearchHistory: () => void
  resetDemoState: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        return { ...createInitialState(), ...parsed, toast: null }
      }
    } catch {
      // ignore storage errors
    }
    return createInitialState()
  })

  useEffect(() => {
    try {
      const { toast, ...persisted } = state
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted))
    } catch {
      // ignore storage errors
    }
  }, [state])

  const showToast = useCallback((msg: string) => {
    setState((prev) => ({ ...prev, toast: msg }))
    window.setTimeout(() => {
      setState((prev) => (prev.toast === msg ? { ...prev, toast: null } : prev))
    }, 2200)
  }, [])

  const openFrameById = useCallback((frameId: string) => {
    const cleanId = frameId.replace('-', ':')
    setState((prev) => {
      const next = { ...prev }
      if (cleanId === '0:53466') {
        next.activeTab = 'home'
        next.routeStack = [{ page: 'root' }]
      } else if (cleanId === '0:41862') {
        next.activeTab = 'discover'
        next.discoverSubTab = 'video'
        next.routeStack = [{ page: 'root' }]
      } else if (cleanId === '0:41595') {
        next.activeTab = 'discover'
        next.discoverSubTab = 'live'
        next.routeStack = [{ page: 'root' }]
      } else if (cleanId === '0:42181') {
        next.activeTab = 'discover'
        next.discoverSubTab = 'classroom'
        next.routeStack = [{ page: 'root' }]
      } else if (cleanId === '0:42409') {
        next.activeTab = 'discover'
        next.discoverSubTab = 'news'
        next.routeStack = [{ page: 'root' }]
      } else if (cleanId === '0:16531') {
        next.activeTab = 'consult'
        next.consultSubTab = 'free'
        next.routeStack = [{ page: 'root' }]
      } else if (cleanId === '0:7766') {
        next.activeTab = 'consult'
        next.consultSubTab = 'video'
        next.routeStack = [{ page: 'root' }]
      } else if (cleanId === '0:7620') {
        next.activeTab = 'consult'
        next.consultSubTab = 'image'
        next.routeStack = [{ page: 'root' }]
      } else if (cleanId === '0:54931' || cleanId === '0:47313') {
        next.activeTab = 'mine'
        next.routeStack = [{ page: 'root' }]
      } else if (cleanId === '0:19126') {
        next.routeStack = [...prev.routeStack, { page: 'doctor-studio', params: { doctorId: 'doc-luoding' } }]
      } else if (cleanId === '0:22045') {
        next.routeStack = [...prev.routeStack, { page: 'doctor-bio', params: { doctorId: 'doc-luoding' } }]
      } else if (cleanId === '0:2048') {
        next.routeStack = [...prev.routeStack, { page: 'find-doctor' }]
      } else if (cleanId === '0:2275') {
        next.routeStack = [...prev.routeStack, { page: 'specialty-list' }]
      } else if (['0:22525', '0:22826', '0:23559', '0:23366', '0:23124'].includes(cleanId)) {
        next.routeStack = [...prev.routeStack, { page: 'specialty-detail', params: { frameId: cleanId } }]
      } else if (['0:34368', '0:36321'].includes(cleanId)) {
        next.routeStack = [...prev.routeStack, { page: 'video-detail', params: { videoId: 'vid-1', liked: cleanId === '0:36321' } }]
      } else if (['0:43677', '0:43581'].includes(cleanId)) {
        next.routeStack = [...prev.routeStack, { page: 'live-preview', params: { liveId: cleanId === '0:43581' ? 'live-4' : 'live-3' } }]
      } else if (['0:27802', '0:24992', '0:25882', '0:33046', '0:25435', '0:33543'].includes(cleanId)) {
        next.routeStack = [...prev.routeStack, { page: 'live-room', params: { liveId: 'live-1', frameId: cleanId } }]
      } else if (['0:33799', '0:36791', '0:37334', '0:38446', '0:50831'].includes(cleanId)) {
        next.routeStack = [...prev.routeStack, { page: 'live-replay', params: { liveId: 'live-5', frameId: cleanId } }]
      } else if (cleanId === '0:43308') {
        next.routeStack = [...prev.routeStack, { page: 'article-detail', params: { articleId: 'art-1' } }]
      } else if (cleanId === '0:662') {
        next.routeStack = [...prev.routeStack, { page: 'article-comments', params: { articleId: 'art-1' } }]
      } else if (['0:54446', '0:114700'].includes(cleanId)) {
        next.routeStack = [...prev.routeStack, { page: 'orders', params: { status: '全部', empty: cleanId === '0:114700' } }]
      } else if (['0:1114', '0:1037', '0:1337', '0:1424', '0:1821', '0:1510', '0:1244'].includes(cleanId)) {
        next.routeStack = [...prev.routeStack, { page: 'search', params: { frameId: cleanId } }]
      } else if (['0:2', '0:323', '0:249', '0:548', '0:175', '0:612'].includes(cleanId)) {
        next.routeStack = [...prev.routeStack, { page: 'login', params: { frameId: cleanId } }]
      } else if (cleanId === '0:17700') {
        next.routeStack = [...prev.routeStack, { page: 'reg-hospitals' }]
      } else if (cleanId === '0:4021') {
        next.routeStack = [...prev.routeStack, { page: 'reg-depts' }]
      } else if (['0:4084', '0:4222', '0:114616', '0:46751', '0:4329'].includes(cleanId)) {
        next.routeStack = [...prev.routeStack, { page: 'reg-slots', params: { frameId: cleanId } }]
      } else if (cleanId === '0:4796') {
        next.routeStack = [...prev.routeStack, { page: 'reg-confirm' }]
      } else if (cleanId === '0:3257') {
        next.routeStack = [...prev.routeStack, { page: 'inquiry-image-form', params: { doctorId: 'doc-luoding' } }]
      } else if (cleanId === '0:3791') {
        next.routeStack = [...prev.routeStack, { page: 'inquiry-av-form', params: { doctorId: 'doc-luoding', type: 'video' } }]
      } else if (['0:792', '0:3949', '0:114738'].includes(cleanId)) {
        next.routeStack = [...prev.routeStack, { page: 'patient-select', params: { empty: cleanId === '0:114738' } }]
      } else if (['0:949', '0:3873', '0:10764', '0:10614'].includes(cleanId)) {
        next.routeStack = [...prev.routeStack, { page: 'patient-edit', params: { patientId: cleanId === '0:3873' || cleanId === '0:10614' ? 'pat-1' : undefined } }]
      } else if (['0:16194', '0:16337', '0:45233'].includes(cleanId)) {
        next.routeStack = [...prev.routeStack, { page: 'chat-free', params: { consultationId: 'con-free-1', showTeam: cleanId === '0:45233' } }]
      } else if (['0:4895', '0:5505'].includes(cleanId)) {
        next.routeStack = [...prev.routeStack, { page: 'chat-image', params: { consultationId: 'con-img-1', realtime: cleanId === '0:5505' } }]
      } else if (['0:5041'].includes(cleanId)) {
        next.routeStack = [...prev.routeStack, { page: 'chat-av', params: { consultationId: 'con-vid-1' } }]
      } else if (['0:6423', '0:6490', '0:6549', '0:6621'].includes(cleanId)) {
        next.routeStack = [...prev.routeStack, { page: 'call-room', params: { frameId: cleanId } }]
      } else if (cleanId === '0:56121') {
        next.routeStack = [...prev.routeStack, { page: 'consult-summary', params: { consultationId: 'con-img-1' } }]
      } else if (['0:6784', '0:6908'].includes(cleanId)) {
        next.routeStack = [...prev.routeStack, { page: 'consult-review', params: { consultationId: 'con-img-1', done: cleanId === '0:6908' } }]
      } else if (['0:7317', '0:13352', '0:16013', '0:15876', '0:13420'].includes(cleanId)) {
        const rxId = cleanId === '0:15876' ? 'rx-2' : cleanId === '0:13420' ? 'rx-3' : 'rx-1'
        next.routeStack = [...prev.routeStack, { page: 'prescription', params: { prescriptionId: rxId } }]
      } else if (['0:13581', '0:47943', '0:55419'].includes(cleanId)) {
        next.routeStack = [...prev.routeStack, { page: 'drug-checkout', params: { prescriptionId: 'rx-1' } }]
      } else if (['0:56181', '0:57264'].includes(cleanId)) {
        next.routeStack = [...prev.routeStack, { page: 'mall', params: { showHospitalModal: cleanId === '0:57264' } }]
      } else if (['0:56715', '0:56809', '0:57141', '0:57018', '0:56921'].includes(cleanId)) {
        next.routeStack = [...prev.routeStack, { page: 'mall-detail', params: { productId: cleanId === '0:56809' ? 'prod-3' : 'prod-1' } }]
      } else if (['0:56290', '0:56416', '0:56546'].includes(cleanId)) {
        next.routeStack = [...prev.routeStack, { page: 'cart' }]
      } else if (['0:54695', '0:54803', '0:54673'].includes(cleanId)) {
        next.routeStack = [...prev.routeStack, { page: 'invoice-select', params: { empty: cleanId === '0:54673' } }]
      } else if (cleanId === '0:54888') {
        next.routeStack = [...prev.routeStack, { page: 'invoice-submit' }]
      } else if (cleanId === '0:54563') {
        next.routeStack = [...prev.routeStack, { page: 'my-invoices' }]
      } else if (cleanId === '0:54655') {
        next.routeStack = [...prev.routeStack, { page: 'invoice-detail', params: { invoiceId: 'inv-1' } }]
      } else if (['0:1559', '0:1615'].includes(cleanId)) {
        next.routeStack = [...prev.routeStack, { page: 'messages', params: { tab: cleanId === '0:1615' ? 'order' : 'system' } }]
      } else if (['0:9185', '0:9263'].includes(cleanId)) {
        next.routeStack = [...prev.routeStack, { page: 'my-doctors' }]
      } else if (['0:9349', '0:9477'].includes(cleanId)) {
        next.routeStack = [...prev.routeStack, { page: 'my-favorites' }]
      } else if (['0:10846', '0:10683'].includes(cleanId)) {
        next.routeStack = [...prev.routeStack, { page: 'my-family' }]
      } else if (['0:23739'].includes(cleanId)) {
        next.routeStack = [...prev.routeStack, { page: 'medical-records' }]
      } else if (['0:22121', '0:22197', '0:22279'].includes(cleanId)) {
        next.routeStack = [...prev.routeStack, { page: 'medical-record-add' }]
      } else if (cleanId === '0:17308') {
        next.routeStack = [...prev.routeStack, { page: 'my-comments' }]
      } else if (cleanId === '0:17343') {
        next.routeStack = [...prev.routeStack, { page: 'my-reviews' }]
      } else if (['0:12318', '0:12358'].includes(cleanId)) {
        next.routeStack = [...prev.routeStack, { page: 'reports' }]
      } else if (cleanId === '0:12387') {
        next.routeStack = [...prev.routeStack, { page: 'report-detail', params: { reportId: 'rep-1' } }]
      } else if (['0:7400', '0:7479'].includes(cleanId)) {
        next.routeStack = [...prev.routeStack, { page: 'report-sheet', params: { reportId: 'rep-1', frameId: cleanId } }]
      } else if (['0:12966', '0:12543'].includes(cleanId)) {
        next.routeStack = [...prev.routeStack, { page: 'nucleic-acid', params: { expiredChannel: cleanId === '0:12543' } }]
      } else if (['0:11624', '0:11719', '0:11581', '0:11864'].includes(cleanId)) {
        next.routeStack = [...prev.routeStack, { page: 'nucleic-query', params: { frameId: cleanId } }]
      } else if (['0:20963'].includes(cleanId)) {
        next.routeStack = [...prev.routeStack, { page: 'med-helper' }]
      } else if (['0:21211'].includes(cleanId)) {
        next.routeStack = [...prev.routeStack, { page: 'med-detail', params: { medId: 'med-1' } }]
      } else if (['0:20090'].includes(cleanId)) {
        next.routeStack = [...prev.routeStack, { page: 'med-add' }]
      } else if (['0:20277'].includes(cleanId)) {
        next.routeStack = [...prev.routeStack, { page: 'med-remind' }]
      } else if (cleanId === '0:16957' || cleanId === '0:17015') {
        next.routeStack = [...prev.routeStack, { page: 'settings' }]
      } else {
        next.routeStack = [...prev.routeStack, { page: 'frame-viewer', params: { frameId: cleanId } }]
      }
      return next
    })
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const frameParam = params.get('frame')
    const tabParam = params.get('tab') as PrimaryTab | null
    if (frameParam) {
      openFrameById(frameParam)
    } else if (tabParam && ['home', 'discover', 'consult', 'mine'].includes(tabParam)) {
      setState((prev) => ({ ...prev, activeTab: tabParam, routeStack: [{ page: 'root' }] }))
    }
  }, [openFrameById])

  const switchPrimaryTab = useCallback((tab: PrimaryTab) => {
    setState((prev) => ({
      ...prev,
      activeTab: tab,
      routeStack: [{ page: 'root' }],
    }))
    window.scrollTo({ top: 0 })
  }, [])

  const setDiscoverSubTab = useCallback((sub: DiscoverSubTab) => {
    setState((prev) => ({ ...prev, discoverSubTab: sub }))
  }, [])

  const setConsultSubTab = useCallback((sub: ConsultSubTab) => {
    setState((prev) => ({ ...prev, consultSubTab: sub }))
  }, [])

  const setHomeDeptTab = useCallback((dept: string) => {
    setState((prev) => ({ ...prev, homeDeptTab: dept }))
  }, [])

  const navigate = useCallback((page: PageKey, params?: Record<string, any>) => {
    setState((prev) => ({
      ...prev,
      routeStack: [...prev.routeStack, { page, params }],
    }))
    window.scrollTo({ top: 0 })
  }, [])

  const goBack = useCallback(() => {
    setState((prev) => {
      if (prev.routeStack.length <= 1) {
        return { ...prev, routeStack: [{ page: 'root' }] }
      }
      return {
        ...prev,
        routeStack: prev.routeStack.slice(0, -1),
      }
    })
    window.scrollTo({ top: 0 })
  }, [])

  const toggleFollowDoctor = useCallback((doctorId: string) => {
    setState((prev) => {
      const doctors = prev.doctors.map((d) =>
        d.id === doctorId ? { ...d, followed: !d.followed } : d,
      )
      const target = doctors.find((d) => d.id === doctorId)
      return {
        ...prev,
        doctors,
        toast: target?.followed ? `已关注 ${target.name} 医生，同步至「我的医生」` : `已取消关注 ${target?.name || ''}`,
      }
    })
  }, [])

  const toggleVideoLike = useCallback((videoId: string) => {
    setState((prev) => ({
      ...prev,
      videos: prev.videos.map((v) => {
        if (v.id !== videoId) return v
        const nextLiked = !v.liked
        return {
          ...v,
          liked: nextLiked,
          likes: nextLiked ? '23.1w' : '23.0w',
        }
      }),
    }))
  }, [])

  const toggleVideoFavorite = useCallback((videoId: string) => {
    setState((prev) => ({
      ...prev,
      videos: prev.videos.map((v) => (v.id === videoId ? { ...v, favorited: !v.favorited } : v)),
    }))
  }, [])

  const addVideoComment = useCallback((videoId: string, content: string) => {
    if (!content.trim()) return
    setState((prev) => ({
      ...prev,
      videos: prev.videos.map((v) =>
        v.id === videoId
          ? {
              ...v,
              commentsCount: v.commentsCount + 1,
              comments: [
                {
                  id: `vc-${Date.now()}`,
                  user: prev.user.name,
                  avatar: prev.user.avatar,
                  content: content.trim(),
                  date: '刚刚',
                  likes: 0,
                  liked: false,
                },
                ...v.comments,
              ],
            }
          : v,
      ),
      toast: '评论已发布',
    }))
  }, [])

  const toggleLiveReserve = useCallback((liveId: string) => {
    setState((prev) => {
      const lives = prev.lives.map((l) =>
        l.id === liveId ? { ...l, reserved: !l.reserved } : l,
      )
      const target = lives.find((l) => l.id === liveId)
      return {
        ...prev,
        lives,
        toast: target?.reserved ? '预约成功，开播前将通过消息提醒您' : '已取消直播预约',
      }
    })
  }, [])

  const toggleArticleLike = useCallback((articleId: string) => {
    setState((prev) => ({
      ...prev,
      articles: prev.articles.map((a) =>
        a.id === articleId
          ? { ...a, liked: !a.liked, likes: a.liked ? a.likes - 1 : a.likes + 1 }
          : a,
      ),
    }))
  }, [])

  const toggleArticleFavorite = useCallback((articleId: string) => {
    setState((prev) => {
      const articles = prev.articles.map((a) =>
        a.id === articleId
          ? { ...a, favorited: !a.favorited, favorites: a.favorited ? a.favorites - 1 : a.favorites + 1 }
          : a,
      )
      const target = articles.find((a) => a.id === articleId)
      return {
        ...prev,
        articles,
        toast: target?.favorited ? '已加入「我的收藏」' : '已从「我的收藏」移除',
      }
    })
  }, [])

  const addArticleComment = useCallback((articleId: string, content: string) => {
    if (!content.trim()) return
    setState((prev) => ({
      ...prev,
      articles: prev.articles.map((a) =>
        a.id === articleId
          ? {
              ...a,
              comments: [
                {
                  id: `ac-${Date.now()}`,
                  user: prev.user.name,
                  avatar: prev.user.avatar,
                  content: content.trim(),
                  date: '刚刚',
                  likes: 0,
                  liked: false,
                },
                ...a.comments,
              ],
            }
          : a,
      ),
      toast: '评论已提交',
    }))
  }, [])

  const sendChatMessage = useCallback((consultationId: string, text: string) => {
    if (!text.trim()) return
    setState((prev) => ({
      ...prev,
      consultations: prev.consultations.map((c) => {
        if (c.id !== consultationId) return c
        const userMsg: ChatMessage = {
          id: `msg-${Date.now()}`,
          sender: 'patient',
          senderName: c.patientName,
          text: text.trim(),
          time: '刚刚',
        }
        const autoReply: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: c.type === 'free' ? 'assistant' : 'doctor',
          senderName: c.type === 'free' ? '医助' : c.doctorName,
          avatar: c.type === 'free' ? '/assets/extracted/studio-assistant.png' : '/assets/images/avatar-fill-original.png',
          text: '收到您的补充描述，医生正在为您进一步分析病情，请稍候。',
          time: '刚刚',
        }
        return {
          ...c,
          lastMessage: text.trim(),
          unread: 0,
          messages: [...c.messages, userMsg, autoReply],
        }
      }),
    }))
  }, [])

  const submitConsultReview = useCallback((consultationId: string, rating: number, content: string) => {
    setState((prev) => ({
      ...prev,
      consultations: prev.consultations.map((c) =>
        c.id === consultationId
          ? { ...c, reviewed: true, rating, reviewContent: content || '非常好的医生，专业细心！' }
          : c,
      ),
      toast: '评价提交成功，感谢您的反馈',
    }))
  }, [])

  const createInquiryOrderAndConsult = useCallback(
    (payload: {
      type: ConsultSubTab
      doctorId: string
      patientId: string
      symptom: string
      feeType: '自费' | '医保'
      amount: number
    }) => {
      const orderId = `ord-${Date.now()}`
      const consultationId = `con-${Date.now()}`
      setState((prev) => {
        const doc = prev.doctors.find((d) => d.id === payload.doctorId) || prev.doctors[0]
        const pat = prev.patients.find((p) => p.id === payload.patientId) || prev.patients[0]
        const categoryMap: Record<ConsultSubTab, OrderRecord['category']> = {
          image: '图文问诊',
          phone: '电话问诊',
          video: '视频问诊',
          free: '图文问诊',
        }
        const newOrder: OrderRecord = {
          id: orderId,
          category: categoryMap[payload.type],
          status: '待付款',
          patientName: pat.name,
          hospital: doc.hospital,
          doctorName: doc.name,
          dept: doc.dept,
          amount: payload.amount,
          time: '2022-02-24 16:10:00',
          consultationId,
        }
        const newConsult: ConsultationRecord = {
          id: consultationId,
          type: payload.type,
          doctorId: doc.id,
          doctorName: doc.name,
          doctorTitle: doc.title,
          hospital: doc.hospital,
          avatar: doc.avatar,
          patientId: pat.id,
          patientName: pat.name,
          patientPhone: pat.phone,
          lastMessage: payload.symptom || '我想咨询血管瘤治疗方案',
          date: '刚刚',
          unread: 1,
          status: '进行中',
          feeTag: payload.feeType,
          realtimeTag: true,
          symptom: payload.symptom || '我想咨询血管瘤治疗方案',
          orderId,
          prescriptionId: 'rx-1',
          summaryDiagnosis: `${doc.dept}临床随访与评估`,
          summaryAdvice: '建议按医嘱规律干预并定期上传局部恢复照片复诊。',
          messages: [
            {
              id: `m-${Date.now()}-1`,
              sender: 'patient',
              senderName: pat.name,
              text: payload.symptom || '医生您好，我想咨询血管瘤激光治疗。',
              time: '刚刚',
            },
            {
              id: `m-${Date.now()}-2`,
              sender: 'doctor',
              senderName: doc.name,
              avatar: doc.avatar,
              text: `您好，我是${doc.hospital}${doc.dept}${doc.name}医生，已收到您的病情资料，请问目前患处是否有破溃或疼痛？`,
              time: '刚刚',
            },
          ],
        }
        return {
          ...prev,
          orders: [newOrder, ...prev.orders],
          consultations: [newConsult, ...prev.consultations],
        }
      })
      return { orderId, consultationId }
    },
    [],
  )

  const createRegistrationOrder = useCallback(
    (payload: {
      doctorId: string
      patientId: string
      hospital: string
      dept: string
      slotTime: string
      amount: number
    }) => {
      const orderId = `ord-reg-${Date.now()}`
      setState((prev) => {
        const doc = prev.doctors.find((d) => d.id === payload.doctorId) || prev.doctors[0]
        const pat = prev.patients.find((p) => p.id === payload.patientId) || prev.patients[0]
        const newOrder: OrderRecord = {
          id: orderId,
          category: '门诊挂号',
          status: '待付款',
          patientName: pat.name,
          hospital: payload.hospital || doc.hospital,
          doctorName: doc.name,
          dept: payload.dept || doc.dept,
          amount: payload.amount,
          time: payload.slotTime || '2022-02-25 09:00:00',
        }
        return {
          ...prev,
          orders: [newOrder, ...prev.orders],
        }
      })
      return orderId
    },
    [],
  )

  const payOrder = useCallback((orderId: string) => {
    setState((prev) => ({
      ...prev,
      orders: prev.orders.map((o) =>
        o.id === orderId ? { ...o, status: '进行中' } : o,
      ),
      user: { ...prev.user, unreadOrder: prev.user.unreadOrder + 1 },
    }))
  }, [])

  const cancelOrder = useCallback((orderId: string, reason: string) => {
    setState((prev) => ({
      ...prev,
      orders: prev.orders.map((o) =>
        o.id === orderId ? { ...o, status: '已取消', cancelReason: reason } : o,
      ),
      toast: '订单已取消',
    }))
  }, [])

  const confirmReceiveOrder = useCallback((orderId: string) => {
    setState((prev) => ({
      ...prev,
      orders: prev.orders.map((o) =>
        o.id === orderId ? { ...o, status: '已完成' } : o,
      ),
      toast: '已确认收货，订单完成',
    }))
  }, [])

  const applyOrderRefund = useCallback((orderId: string, reason: string) => {
    setState((prev) => ({
      ...prev,
      orders: prev.orders.map((o) =>
        o.id === orderId
          ? { ...o, refundStatus: '申请中', refundReason: reason }
          : o,
      ),
      toast: '售后退款申请已提交',
    }))
  }, [])

  const savePatient = useCallback((patient: Omit<PatientProfile, 'id'> & { id?: string }) => {
    const id = patient.id || `pat-${Date.now()}`
    setState((prev) => {
      let list = [...prev.patients]
      if (patient.isDefault) {
        list = list.map((p) => ({ ...p, isDefault: false }))
      }
      const exists = list.some((p) => p.id === id)
      if (exists) {
        list = list.map((p) => (p.id === id ? { ...patient, id } : p))
      } else {
        list.push({ ...patient, id })
      }
      return {
        ...prev,
        patients: list,
        selectedPatientId: id,
        toast: '就诊人信息已保存',
      }
    })
    return id
  }, [])

  const setSelectedPatientId = useCallback((id: string) => {
    setState((prev) => ({ ...prev, selectedPatientId: id }))
  }, [])

  const addToCart = useCallback((productId: string, spec: string, quantity = 1) => {
    setState((prev) => {
      const prod = prev.mallProducts.find((p) => p.id === productId)
      if (!prod) return prev
      const existing = prev.cart.find((c) => c.productId === productId && c.spec === spec)
      const nextCart = existing
        ? prev.cart.map((c) =>
            c.id === existing.id ? { ...c, quantity: c.quantity + quantity, checked: true } : c,
          )
        : [
            ...prev.cart,
            {
              id: `cart-${Date.now()}`,
              productId,
              name: prod.name,
              spec,
              price: prod.price,
              quantity,
              checked: true,
              cover: prod.cover,
            },
          ]
      return {
        ...prev,
        cart: nextCart,
        toast: '已加入购物车',
      }
    })
  }, [])

  const toggleCartItem = useCallback((cartId: string) => {
    setState((prev) => ({
      ...prev,
      cart: prev.cart.map((c) => (c.id === cartId ? { ...c, checked: !c.checked } : c)),
    }))
  }, [])

  const toggleAllCart = useCallback((checked: boolean) => {
    setState((prev) => ({
      ...prev,
      cart: prev.cart.map((c) => ({ ...c, checked })),
    }))
  }, [])

  const deleteCheckedCart = useCallback(() => {
    setState((prev) => ({
      ...prev,
      cart: prev.cart.filter((c) => !c.checked),
      toast: '已删除选中商品',
    }))
  }, [])

  const checkoutCartOrDrug = useCallback(
    (payload: {
      category: '西药药品' | '中药药品'
      amount: number
      deliveryMode: '配送到家' | '到院自取' | '外配处方'
      addressId?: string
      prescriptionId?: string
    }) => {
      const orderId = `ord-drug-${Date.now()}`
      setState((prev) => {
        const pat = prev.patients.find((p) => p.id === prev.selectedPatientId) || prev.patients[0]
        const newOrder: OrderRecord = {
          id: orderId,
          category: payload.category,
          status: '待付款',
          patientName: pat.name,
          hospital: '安徽医科大学第一附属医院',
          amount: payload.amount,
          time: '2022-02-24 16:30:00',
          deliveryMode: payload.deliveryMode,
          addressId: payload.addressId || 'addr-1',
          prescriptionId: payload.prescriptionId || 'rx-1',
        }
        return {
          ...prev,
          orders: [newOrder, ...prev.orders],
        }
      })
      return orderId
    },
    [],
  )

  const saveAddress = useCallback((addr: Omit<AddressItem, 'id'> & { id?: string }) => {
    const id = addr.id || `addr-${Date.now()}`
    setState((prev) => {
      let list = [...prev.addresses]
      if (addr.isDefault) {
        list = list.map((a) => ({ ...a, isDefault: false }))
      }
      if (list.some((a) => a.id === id)) {
        list = list.map((a) => (a.id === id ? { ...addr, id } : a))
      } else {
        list.push({ ...addr, id })
      }
      return { ...prev, addresses: list, toast: '收货地址已保存' }
    })
    return id
  }, [])

  const saveMedication = useCallback((med: Omit<MedicationPlan, 'id'> & { id?: string }) => {
    const id = med.id || `med-${Date.now()}`
    setState((prev) => {
      const exists = prev.medications.some((m) => m.id === id)
      const list = exists
        ? prev.medications.map((m) => (m.id === id ? { ...med, id } : m))
        : [{ ...med, id }, ...prev.medications]
      return { ...prev, medications: list, toast: '用药计划已保存' }
    })
  }, [])

  const toggleMedicationReminder = useCallback((medId: string) => {
    setState((prev) => ({
      ...prev,
      medications: prev.medications.map((m) =>
        m.id === medId ? { ...m, enabled: !m.enabled } : m,
      ),
    }))
  }, [])

  const deleteMedication = useCallback((medId: string) => {
    setState((prev) => ({
      ...prev,
      medications: prev.medications.filter((m) => m.id !== medId),
      toast: '已删除用药计划',
    }))
  }, [])

  const addMedicalCase = useCallback((item: Omit<MedicalCaseRecord, 'id'>) => {
    setState((prev) => ({
      ...prev,
      medicalCases: [{ ...item, id: `case-${Date.now()}` }, ...prev.medicalCases],
      toast: '病历档案已保存',
    }))
  }, [])

  const submitInvoice = useCallback((orderIds: string[], title: string, email: string) => {
    setState((prev) => {
      const total = prev.orders
        .filter((o) => orderIds.includes(o.id))
        .reduce((acc, cur) => acc + cur.amount, 0)
      const newInv: InvoiceRecord = {
        id: `inv-${Date.now()}`,
        title: title || '张晓靖（个人）',
        taxNo: '-',
        amount: total || 45.0,
        date: '2022-02-24 16:45',
        status: '已开票',
        orderIds,
        email: email || 'zhangxiaojing@example.com',
      }
      return {
        ...prev,
        orders: prev.orders.map((o) => (orderIds.includes(o.id) ? { ...o, invoiced: true } : o)),
        invoices: [newInv, ...prev.invoices],
        toast: '电子发票申请已提交',
      }
    })
  }, [])

  const updateUserProfile = useCallback((patch: Partial<AppState['user']>) => {
    setState((prev) => ({
      ...prev,
      user: { ...prev.user, ...patch },
    }))
  }, [])

  const addSearchHistory = useCallback((keyword: string) => {
    const kw = keyword.trim()
    if (!kw) return
    setState((prev) => ({
      ...prev,
      searchHistory: [kw, ...prev.searchHistory.filter((k) => k !== kw)].slice(0, 8),
    }))
  }, [])

  const clearSearchHistory = useCallback(() => {
    setState((prev) => ({ ...prev, searchHistory: [], toast: '历史搜索已清空' }))
  }, [])

  const resetDemoState = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setState({ ...createInitialState(), toast: '已重置全部演示数据至初始状态' })
  }, [])

  const currentRoute = state.routeStack[state.routeStack.length - 1] || { page: 'root' }

  return (
    <AppContext.Provider
      value={{
        ...state,
        currentRoute,
        switchPrimaryTab,
        setDiscoverSubTab,
        setConsultSubTab,
        setHomeDeptTab,
        navigate,
        goBack,
        openFrameById,
        showToast,
        toggleFollowDoctor,
        toggleVideoLike,
        toggleVideoFavorite,
        addVideoComment,
        toggleLiveReserve,
        toggleArticleLike,
        toggleArticleFavorite,
        addArticleComment,
        sendChatMessage,
        submitConsultReview,
        createInquiryOrderAndConsult,
        createRegistrationOrder,
        payOrder,
        cancelOrder,
        confirmReceiveOrder,
        applyOrderRefund,
        savePatient,
        setSelectedPatientId,
        addToCart,
        toggleCartItem,
        toggleAllCart,
        deleteCheckedCart,
        checkoutCartOrDrug,
        saveAddress,
        saveMedication,
        toggleMedicationReminder,
        deleteMedication,
        addMedicalCase,
        submitInvoice,
        updateUserProfile,
        addSearchHistory,
        clearSearchHistory,
        resetDemoState,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppStore() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppStore must be used inside AppProvider')
  return ctx
}
