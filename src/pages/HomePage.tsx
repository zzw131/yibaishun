import { useLayoutEffect, useRef, useState } from 'react'
import laserDermatologyCover from '../assets/images/laser_dermatology_care_1794965706467.jpg'
import pediatricCheckupCover from '../assets/images/pediatric_health_checkup_1794965709142.jpg'
import tcmWellnessCover from '../assets/images/tcm_herbal_wellness_1794965228624.jpg'
import { StatusBar } from '../components/NavBar'
import { useAppStore } from '../store/appStore'

let savedHomeScrollTop = 0

const DEPT_TABS = [
  { key: '综合', label: '综合', left: 26, width: 28 },
  { key: '血管瘤', label: '血管瘤', left: 78, width: 42 },
  { key: '内科', label: '内科', left: 144, width: 28 },
  { key: '外科', label: '外科', left: 196, width: 28 },
  { key: '妇科', label: '妇科', left: 248, width: 28 },
  { key: '妇科2', label: '妇科', left: 300, width: 28 },
]

const CITIES = ['北京市', '上海市', '长沙市', '合肥市', '广州市', '深圳市']

export function HomePage() {
  const {
    user,
    doctors,
    homeDeptTab,
    setHomeDeptTab,
    navigate,
    switchPrimaryTab,
    setDiscoverSubTab,
    updateUserProfile,
    showToast,
  } = useAppStore()
  const [cityModalOpen, setCityModalOpen] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTop = savedHomeScrollTop
    const handleScroll = () => {
      savedHomeScrollTop = el.scrollTop
    }
    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      if (el.isConnected) {
        savedHomeScrollTop = el.scrollTop
      }
      el.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const homeDoctors = [doctors[0], doctors[1], doctors[3]].filter(Boolean)
  const doctorRows = homeDoctors.map((doc, idx) => ({
    id: doc.id,
    name: doc.name,
    title: doc.title,
    avatar: doc.avatar,
    dept: homeDeptTab === '综合' ? doc.dept : homeDeptTab.replace('2', ''),
    goodAt: doc.goodAt,
    top: [418, 534, 650][idx] ?? 418 + idx * 116,
    activeBtn: idx !== 1,
  }))

  return (
    <div className="page-shell" style={{ backgroundColor: '#f6f7f9' }}>
      {/* 固定顶部：状态栏 + 城市切换 + 搜索框 */}
      <header
        style={{
          position: 'relative',
          width: 375,
          height: 114,
          backgroundColor: '#f6f7f9',
          flexShrink: 0,
          zIndex: 20,
        }}
      >
        <StatusBar />

        {/* 城市选择 */}
        <button
          type="button"
          onClick={() => setCityModalOpen(true)}
          style={{
            position: 'absolute',
            left: 15,
            top: 30,
            height: 25,
            background: 'transparent',
            border: 'none',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            cursor: 'pointer',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 15,
              fontWeight: 500,
              lineHeight: '21px',
              color: '#444444',
            }}
          >
            {user.city}
          </span>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1L5 5L9 1" fill="#333333" />
          </svg>
        </button>

        {/* 搜索框 (0:53504) */}
        <button
          type="button"
          onClick={() => navigate('search')}
          style={{
            position: 'absolute',
            left: 13,
            top: 68,
            width: 349,
            height: 40,
            borderRadius: 6,
            border: '1.5px solid #1478ff',
            backgroundColor: '#ffffff',
            boxSizing: 'border-box',
            padding: 0,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            style={{ position: 'absolute', left: 15, top: 11 }}
          >
            <circle cx="6.8" cy="6.8" r="5.5" stroke="#1478ff" strokeWidth="1.5" />
            <path d="M11 11L13.8 13.8" stroke="#1478ff" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span
            style={{
              position: 'absolute',
              left: 38.5,
              top: 8,
              fontFamily: 'var(--font-sans)',
              fontSize: 15,
              fontWeight: 400,
              lineHeight: '21px',
              color: '#838587',
            }}
          >
            医院、科室、医生、资讯
          </span>
        </button>
      </header>

      {/* 中间可滚动内容区 */}
      <div ref={scrollRef} className="page-scroll">
        <div style={{ position: 'relative', width: 375, height: 1136 }}>
          {/* 核心三大入口卡片 (找医生 / 去挂号 / 去开药) */}
          <div
            style={{
              position: 'absolute',
              left: 12,
              top: 6,
              width: 351,
              height: 118,
              borderRadius: 8,
              backgroundColor: '#ffffff',
            }}
          />
          {[
            {
              key: 'find-doc',
              title: '找医生',
              sub: '问诊咨询',
              icon: '/assets/extracted/home-find-doctor.png',
              iconLeft: 42,
              textLeft: 45,
              onClick: () => navigate('find-doctor'),
            },
            {
              key: 'reg',
              title: '去挂号',
              sub: '预约就诊',
              icon: '/assets/extracted/home-register.png',
              iconLeft: 162,
              textLeft: 165,
              onClick: () => navigate('reg-hospitals'),
            },
            {
              key: 'prescribe',
              title: '去开药',
              sub: '配送到家',
              icon: '/assets/extracted/home-prescribe.png',
              iconLeft: 282,
              textLeft: 285,
              onClick: () => {
                showToast('请选择可提供在线复诊开药服务的医生')
                navigate('find-doctor', { mode: 'prescribe' })
              },
            },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={item.onClick}
              style={{
                position: 'absolute',
                left: item.iconLeft - 15,
                top: 14,
                width: 80,
                height: 104,
                background: 'transparent',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
              }}
            >
              <img
                src={item.icon}
                alt={item.title}
                style={{
                  position: 'absolute',
                  left: 15,
                  top: 8,
                  width: 50,
                  height: 52,
                  display: 'block',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  left: item.textLeft - (item.iconLeft - 15),
                  top: 64,
                  width: 45,
                  height: 15,
                  fontFamily: 'var(--font-sans)',
                  fontSize: 15,
                  fontWeight: 500,
                  lineHeight: '15px',
                  color: '#323436',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.title}
              </span>
              <span
                style={{
                  position: 'absolute',
                  left: item.textLeft - (item.iconLeft - 15),
                  top: 84,
                  width: 44,
                  height: 15,
                  fontFamily: 'var(--font-sans)',
                  fontSize: 11,
                  fontWeight: 400,
                  lineHeight: '15px',
                  color: '#838587',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.sub}
              </span>
            </button>
          ))}

          {/* 四大工具横栏 (实时问诊 / 专病专科 / 用药助手 / AI舌面诊) */}
          <div
            style={{
              position: 'absolute',
              left: 12,
              top: 134,
              width: 351,
              height: 72,
              borderRadius: 8,
              backgroundColor: '#ffffff',
            }}
          />
          {[
            {
              key: 'realtime',
              label: '实时问诊',
              icon: '/assets/extracted/home-realtime.png',
              iconLeft: 44,
              iconTop: 252,
              iconW: 42,
              iconH: 36,
              labelLeft: 30,
              onClick: () => navigate('chat-image', { consultationId: 'con-img-1', realtime: true }),
            },
            {
              key: 'specialty',
              label: '专病专科',
              icon: '/assets/extracted/home-specialty.png',
              iconLeft: 130,
              iconTop: 258,
              iconW: 28,
              iconH: 28,
              labelLeft: 118,
              onClick: () => navigate('specialty-list'),
            },
            {
              key: 'medhelper',
              label: '用药助手',
              icon: '/assets/extracted/home-medhelper.png',
              iconLeft: 218,
              iconTop: 258,
              iconW: 28,
              iconH: 28,
              labelLeft: 205,
              onClick: () => navigate('med-helper'),
            },
            {
              key: 'aitongue',
              label: 'AI舌面诊',
              icon: '/assets/extracted/home-aitongue.png',
              iconLeft: 305,
              iconTop: 258,
              iconW: 28,
              iconH: 28,
              labelLeft: 293,
              onClick: () => navigate('ai-tongue'),
            },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={item.onClick}
              style={{
                position: 'absolute',
                left: item.labelLeft - 8,
                top: 136,
                width: 68,
                height: 66,
                background: 'transparent',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
              }}
            >
              <img
                src={item.icon}
                alt={item.label}
                style={{
                  position: 'absolute',
                  left: item.iconLeft - (item.labelLeft - 8),
                  top: item.iconTop - 250,
                  width: item.iconW,
                  height: item.iconH,
                  display: 'block',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  left: 8,
                  top: 44,
                  width: 52,
                  height: 18,
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13,
                  fontWeight: 500,
                  lineHeight: '18px',
                  color: '#323436',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
              </span>
            </button>
          ))}

          {/* 医疗知识科普 Banner */}
          <button
            type="button"
            onClick={() => navigate('article-detail', { articleId: 'art-1' })}
            style={{
              position: 'absolute',
              left: 12,
              top: 216,
              width: 351,
              height: 100,
              borderRadius: 12,
              overflow: 'hidden',
              border: 'none',
              padding: 0,
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            <img
              src="/assets/extracted/home-banner.png"
              alt="医疗知识科普"
              style={{ width: 351, height: 100, display: 'block' }}
            />
          </button>

          {/* 医生工作室模块 (0:53677) */}
          <div
            style={{
              position: 'absolute',
              left: 12,
              top: 328,
              width: 351,
              height: 484,
              borderRadius: 8,
              backgroundColor: '#ffffff',
              overflow: 'hidden',
            }}
          />
          <span
            style={{
              position: 'absolute',
              left: 25,
              top: 348,
              width: 80,
              height: 24,
              fontFamily: 'var(--font-sans)',
              fontSize: 16,
              fontWeight: 600,
              lineHeight: '24px',
              color: '#323336',
            }}
          >
            医生工作室
          </span>
          <button
            type="button"
            onClick={() => navigate('find-doctor')}
            style={{
              position: 'absolute',
              left: 314,
              top: 352,
              height: 16,
              background: 'transparent',
              border: 'none',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: 12, color: '#a7a9ab', lineHeight: '12px' }}>更多</span>
            <svg width="5" height="9" viewBox="0 0 5 9" fill="none">
              <path d="M1 1L4 4.5L1 8" stroke="#a7a9ab" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>

          {/* 科室分类 Tabs */}
          {DEPT_TABS.map((tab) => {
            const isSelected = homeDeptTab === tab.key
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setHomeDeptTab(tab.key)}
                style={{
                  position: 'absolute',
                  left: tab.left,
                  top: 381,
                  width: tab.width,
                  height: 28,
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 14,
                    fontWeight: isSelected ? 600 : 400,
                    lineHeight: '24px',
                    color: '#323336',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {tab.label}
                </span>
                {isSelected && (
                  <span
                    style={{
                      position: 'absolute',
                      left: (tab.width - 10) / 2,
                      top: 26,
                      width: 10,
                      height: 3,
                      borderRadius: 2,
                      backgroundColor: '#1478ff',
                    }}
                  />
                )}
              </button>
            )
          })}

          {/* 3条医生工作室卡片 */}
          {doctorRows.map((row, idx) => (
            <div key={idx}>
              <div
                onClick={() => navigate('doctor-studio', { doctorId: row.id })}
                style={{
                  position: 'absolute',
                  left: 25,
                  top: row.top,
                  width: 325,
                  height: 102,
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    width: 52,
                    height: 52,
                    borderRadius: 8,
                    overflow: 'hidden',
                    backgroundColor: '#d8d8d8',
                  }}
                >
                  <img
                    src={row.avatar}
                    alt={row.name}
                    referrerPolicy="no-referrer"
                    style={{ width: 52, height: 52, objectFit: 'cover', display: 'block' }}
                  />
                </div>

                <div
                  style={{
                    position: 'absolute',
                    left: 63,
                    top: 10,
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 6,
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 15,
                      fontWeight: 600,
                      lineHeight: '15px',
                      color: '#323336',
                    }}
                  >
                    {row.name}
                  </span>
                  {row.title && (
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 15,
                        fontWeight: 400,
                        lineHeight: '15px',
                        color: '#323336',
                      }}
                    >
                      {row.title}
                    </span>
                  )}
                </div>
                <span
                  style={{
                    position: 'absolute',
                    left: 63,
                    top: 39,
                    fontFamily: 'var(--font-sans)',
                    fontSize: 15,
                    fontWeight: 400,
                    lineHeight: '15px',
                    color: '#838587',
                  }}
                >
                  {row.dept}
                </span>
                <span
                  style={{
                    position: 'absolute',
                    left: 1,
                    top: 72,
                    width: 225,
                    height: 21,
                    fontFamily: 'var(--font-sans)',
                    fontSize: 15,
                    fontWeight: 400,
                    lineHeight: '21px',
                    color: '#323336',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {row.goodAt}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate('inquiry-image-form', { doctorId: row.id })
                  }}
                  style={{
                    position: 'absolute',
                    left: 270,
                    top: 70,
                    width: 54,
                    height: 24,
                    borderRadius: 12,
                    border: 'none',
                    backgroundColor: row.activeBtn ? '#eef5fe' : '#f5f6f8',
                    color: row.activeBtn ? '#1478ff' : '#c5c7c9',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 12,
                    fontWeight: 500,
                    lineHeight: '18px',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  去问诊
                </button>
              </div>
              {idx < 2 && (
                <div
                  style={{
                    position: 'absolute',
                    left: 25,
                    top: row.top + 105,
                    width: 325,
                    height: 0.5,
                    backgroundColor: '#f0f1f3',
                  }}
                />
              )}
            </div>
          ))}

          {/* 底部三个专病快捷入口 (血管瘤 / 肾病科 / 糖尿病) */}
          {[
            { label: '血管瘤', left: 25, icon: '/assets/extracted/home-tag-xgl.png', w: 24, h: 22 },
            { label: '肾病科', left: 136.5, icon: '/assets/extracted/home-tag-sbk.png', w: 29, h: 21 },
            { label: '糖尿病', left: 248, icon: '/assets/extracted/home-tag-tnb.png', w: 19, h: 25 },
          ].map((tag) => (
            <button
              key={tag.label}
              type="button"
              onClick={() => navigate('specialty-detail', { name: tag.label })}
              style={{
                position: 'absolute',
                left: tag.left,
                top: 754,
                width: 102,
                height: 44,
                borderRadius: 4,
                backgroundColor: '#eef5fe',
                border: 'none',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                cursor: 'pointer',
              }}
            >
              <img
                src={tag.icon}
                alt=""
                referrerPolicy="no-referrer"
                style={{
                  width: tag.w,
                  height: tag.h,
                  objectFit: 'contain',
                  flexShrink: 0,
                  display: 'block',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13,
                  fontWeight: 400,
                  lineHeight: '18px',
                  color: '#5a5c5e',
                  whiteSpace: 'nowrap',
                }}
              >
                {tag.label}
              </span>
            </button>
          ))}

          {/* 精选视频模块 */}
          <div
            style={{
              position: 'absolute',
              left: 12,
              top: 824,
              width: 351,
              height: 294,
              borderRadius: 8,
              backgroundColor: '#ffffff',
              overflow: 'hidden',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: 13,
                top: 20,
                fontFamily: 'var(--font-sans)',
                fontSize: 16,
                fontWeight: 600,
                lineHeight: '24px',
                color: '#323336',
              }}
            >
              精选视频
            </span>
            <button
              type="button"
              onClick={() => {
                setDiscoverSubTab('video')
                switchPrimaryTab('discover')
              }}
              style={{
                position: 'absolute',
                left: 302,
                top: 24,
                height: 16,
                background: 'transparent',
                border: 'none',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: 12, color: '#a7a9ab', lineHeight: '12px' }}>更多</span>
              <svg width="5" height="9" viewBox="0 0 5 9" fill="none">
                <path d="M1 1L4 4.5L1 8" stroke="#a7a9ab" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>

            {[
              {
                id: 'vid-3',
                slot: 1,
                left: 13,
                width: 134,
                img: laserDermatologyCover,
                title: '激光术后护理：防晒与忌口指南',
              },
              {
                id: 'vid-2',
                slot: 2,
                left: 159,
                width: 134,
                img: tcmWellnessCover,
                title: '三伏天祛湿养脾汤怎么煮更有效',
              },
              {
                id: 'vid-5',
                slot: 3,
                left: 305,
                width: 134,
                img: pediatricCheckupCover,
                title: '婴幼儿血管瘤早期识别要点',
              },
            ].map((v) => (
              <div
                key={v.id}
                onClick={() => navigate('video-detail', { videoId: v.id })}
                style={{
                  position: 'absolute',
                  left: v.left,
                  top: 53,
                  width: v.width,
                  height: 225,
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: v.slot === 3 ? 46 : 134,
                    height: 180,
                    borderRadius: 6,
                    overflow: 'hidden',
                    backgroundColor: '#eaeaea',
                  }}
                >
                  <img
                    src={v.img}
                    alt=""
                    referrerPolicy="no-referrer"
                    style={{
                      width: v.slot === 3 ? 46 : 134,
                      height: 180,
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  {v.slot !== 3 && (
                    <img
                      src="/assets/icons/img3.svg"
                      alt=""
                      style={{
                        position: 'absolute',
                        left: 49,
                        top: 72,
                        width: 36,
                        height: 36,
                        display: 'block',
                      }}
                    />
                  )}
                </div>
                <p
                  style={{
                    margin: '8px 0 0',
                    width: 134,
                    fontFamily: 'var(--font-sans)',
                    fontSize: 13,
                    fontWeight: 400,
                    lineHeight: '18px',
                    color: '#323436',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {v.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 城市切换弹层 */}
      {cityModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
          onClick={() => setCityModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 375,
              backgroundColor: '#ffffff',
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              padding: '16px 20px 24px',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 600, color: '#333333', marginBottom: 14 }}>
              选择服务城市
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {CITIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    updateUserProfile({ city: c })
                    setCityModalOpen(false)
                    showToast(`已切换至 ${c}`)
                  }}
                  style={{
                    height: 36,
                    borderRadius: 6,
                    border: user.city === c ? '1px solid #1478ff' : '1px solid #e5e5e5',
                    backgroundColor: user.city === c ? '#eef5fe' : '#ffffff',
                    color: user.city === c ? '#1478ff' : '#333333',
                    fontSize: 13,
                    fontWeight: user.city === c ? 500 : 400,
                    cursor: 'pointer',
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
