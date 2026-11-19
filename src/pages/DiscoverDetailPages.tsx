import { useEffect, useRef, useState } from 'react'
import doctorFemaleAvatar from '../assets/images/doctor_female_avatar_1794965243647.jpg'
import doctorFemaleYoung from '../assets/images/doctor_female_young_1794965235903.jpg'
import doctorMaleSenior from '../assets/images/doctor_male_senior_1794965250626.jpg'
import laserDermatologyCover from '../assets/images/laser_dermatology_care_1794965706467.jpg'
import pediatricCheckupCover from '../assets/images/pediatric_health_checkup_1794965709142.jpg'
import pharmacyGuideCover from '../assets/images/pharmacy_medication_guide_1794965708416.jpg'
import tcmWellnessCover from '../assets/images/tcm_herbal_wellness_1794965228624.jpg'
import { NavBar, StatusBar, WechatCapsule } from '../components/NavBar'
import { useAppStore } from '../store/appStore'

const VIDEO_BG_POOL = [
  '/assets/design-source/raster/e352ea5ace15537ece559cd669d89eb573d889f7.png',
  laserDermatologyCover,
  pediatricCheckupCover,
  pharmacyGuideCover,
  tcmWellnessCover,
  doctorFemaleAvatar,
  doctorFemaleYoung,
  doctorMaleSenior,
]

function pickRandomVideoBg(preferred?: string) {
  const candidates = Array.from(
    new Set(
      [preferred, ...VIDEO_BG_POOL].filter(
        (src): src is string =>
          typeof src === 'string' &&
          src.length > 0 &&
          !src.includes('imgWebp') &&
          !src.includes('home-video'),
      ),
    ),
  )
  return candidates[Math.floor(Math.random() * candidates.length)] || VIDEO_BG_POOL[0]
}

export function VideoDetailPage() {
  const {
    videos,
    currentRoute,
    goBack,
    navigate,
    toggleVideoLike,
    addVideoComment,
    showToast,
  } = useAppStore()
  const videoId = currentRoute.params?.videoId || 'vid-1'
  const video = videos.find((v) => v.id === videoId) || videos[0]
  const [playing, setPlaying] = useState(true)
  const [commentDrawerOpen, setCommentDrawerOpen] = useState(Boolean(currentRoute.params?.liked))
  const [commentText, setCommentText] = useState('')
  const [bgSrc, setBgSrc] = useState(() => pickRandomVideoBg(video.cover))

  useEffect(() => {
    setBgSrc(pickRandomVideoBg(video.cover))
  }, [video.id, video.cover])

  const isDoctorPortraitBg = bgSrc.includes('e352ea5ace15537ece559cd669d89eb573d889f7')

  return (
    <div className="page-shell" style={{ backgroundColor: '#1b222d' }}>
      {/* 小视频全屏背景（从已验证素材库随机选取并防止裂图） */}
      <img
        src={bgSrc}
        alt={video.title}
        onClick={() => setPlaying((p) => !p)}
        onError={() => setBgSrc(VIDEO_BG_POOL[0])}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 375,
          height: '100%',
          objectFit: 'cover',
          objectPosition: isDoctorPortraitBg ? 'center top' : 'center center',
          transform: isDoctorPortraitBg ? 'scale(1.06)' : undefined,
          transformOrigin: isDoctorPortraitBg ? 'center top' : undefined,
          cursor: 'pointer',
        }}
      />

      {/* 上下微渐变保护白色文字与按钮对比度 */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 375,
          height: 96,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0) 100%)',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: 375,
          height: 200,
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 100%)',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />

      {/* 暂停态居中播放图标 */}
      {!playing && (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          style={{
            position: 'absolute',
            left: 161,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 52,
            height: 52,
            borderRadius: '50%',
            border: 'none',
            backgroundColor: 'rgba(0,0,0,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 15,
          }}
        >
          <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
            <path d="M2 2L18 12L2 22V2Z" fill="#ffffff" />
          </svg>
        </button>
      )}

      <StatusBar light />

      {/* 左上返回按钮 */}
      <button
        type="button"
        onClick={goBack}
        aria-label="返回"
        style={{
          position: 'absolute',
          left: 6,
          top: 24,
          width: 36,
          height: 36,
          background: 'transparent',
          border: 'none',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 35,
        }}
      >
        <svg
          width="11"
          height="19"
          viewBox="0 0 11 19"
          fill="none"
          style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.45))' }}
        >
          <path
            d="M9.5 1.5L1.5 9.5L9.5 17.5"
            stroke="#ffffff"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <WechatCapsule top={26} light />

      {/* 右侧互动操作栏 (0:34368: 头像 / 点赞 / 评论 / 分享) */}
      <button
        type="button"
        onClick={() => navigate('doctor-studio', { doctorId: video.authorId })}
        title="查看作者主页"
        style={{
          position: 'absolute',
          left: 319,
          top: 293,
          width: 48,
          height: 48,
          borderRadius: '50%',
          border: '2px solid #ffffff',
          padding: 0,
          overflow: 'hidden',
          background: '#ffffff',
          cursor: 'pointer',
          zIndex: 20,
        }}
      >
        <img
          src="/assets/design-source/raster/756286c79456aadf094dc8341b269858d9050f4a.png"
          alt={video.authorName}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </button>

      {/* 点赞按钮 */}
      <button
        type="button"
        aria-label="点赞"
        onClick={() => toggleVideoLike(video.id)}
        style={{
          position: 'absolute',
          left: 315,
          top: 360,
          width: 56,
          height: 54,
          background: 'transparent',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 20,
        }}
      >
        {video.liked ? (
          <img
            src="/assets/icons/live-room-like-pressed.svg"
            alt=""
            style={{
              width: 34,
              height: 34,
              display: 'block',
              filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.35))',
            }}
          />
        ) : (
          <svg
            width="34"
            height="34"
            viewBox="0 0 32 32"
            fill="none"
            style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.45))' }}
          >
            <path
              d="M9 14H5C3.9 14 3 14.9 3 16V26C3 27.1 3.9 28 5 28H9V14ZM12 28H23.5C25.2 28 26.6 26.8 26.9 25.1L28.7 15.6C29.1 13.5 27.5 11.5 25.3 11.5H18.5V6.5C18.5 4.6 17 3 15 3L12 12V28Z"
              fill="#ffffff"
            />
          </svg>
        )}
        <span
          style={{
            marginTop: 2,
            fontSize: 12,
            color: '#ffffff',
            fontWeight: 500,
            textShadow: '0 1px 3px rgba(0,0,0,0.55)',
          }}
        >
          {video.likes}
        </span>
      </button>

      {/* 评论按钮 */}
      <button
        type="button"
        aria-label="评论"
        onClick={() => setCommentDrawerOpen(true)}
        style={{
          position: 'absolute',
          left: 315,
          top: 428,
          width: 56,
          height: 56,
          background: 'transparent',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 20,
        }}
      >
        <img
          src="/assets/icons/live-room-comment.svg"
          alt=""
          style={{
            width: 36,
            height: 36,
            display: 'block',
            filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.45))',
          }}
        />
        <span
          style={{
            marginTop: 2,
            fontSize: 12,
            color: '#ffffff',
            fontWeight: 500,
            textShadow: '0 1px 3px rgba(0,0,0,0.55)',
          }}
        >
          {video.commentsCount}
        </span>
      </button>

      {/* 分享按钮 */}
      <button
        type="button"
        onClick={() => showToast('已生成小程序分享卡片，可发送给微信好友')}
        style={{
          position: 'absolute',
          left: 315,
          top: 498,
          width: 56,
          height: 56,
          background: 'transparent',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 20,
        }}
        aria-label="分享"
      >
        <img
          src="/assets/icons/live-room-share.svg"
          alt=""
          style={{
            width: 36,
            height: 36,
            display: 'block',
            filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.45))',
          }}
        />
        <span
          style={{
            marginTop: 2,
            fontSize: 12,
            color: '#ffffff',
            fontWeight: 500,
            textShadow: '0 1px 3px rgba(0,0,0,0.55)',
          }}
        >
          分享
        </span>
      </button>

      {/* 左下角作者与文案信息区 */}
      <div
        onClick={() => navigate('med-helper')}
        style={{
          position: 'absolute',
          left: 12,
          bottom: 16,
          width: 245,
          cursor: 'pointer',
          zIndex: 20,
        }}
      >
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: '#ffffff',
            marginBottom: 8,
            textShadow: '0 1px 3px rgba(0,0,0,0.55)',
          }}
        >
          @{video.authorName}
        </div>
        <p
          style={{
            margin: 0,
            fontSize: 13,
            lineHeight: '20px',
            color: '#ffffff',
            textShadow: '0 1px 3px rgba(0,0,0,0.55)',
          }}
        >
          {video.description}
        </p>
      </div>

      {/* 评论抽屉弹层 (0:36321) */}
      {commentDrawerOpen && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.45)',
            zIndex: 50,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
          onClick={() => setCommentDrawerOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 375,
              height: 420,
              backgroundColor: '#ffffff',
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                height: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 16px',
                borderBottom: '0.5px solid #eeeeee',
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 600, color: '#333333' }}>
                全部评论 ({video.comments.length})
              </span>
              <button
                type="button"
                aria-label="关闭"
                onClick={() => setCommentDrawerOpen(false)}
                style={{
                  width: 28,
                  height: 28,
                  border: 'none',
                  background: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  cursor: 'pointer',
                }}
              >
                <img
                  src="/assets/icons/live-room-close.svg"
                  alt=""
                  style={{ width: 14, height: 14, display: 'block' }}
                />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
              {video.comments.map((c) => (
                <div
                  key={c.id}
                  style={{
                    display: 'flex',
                    gap: 10,
                    paddingBottom: 14,
                    marginBottom: 14,
                    borderBottom: '0.5px solid #f5f5f5',
                  }}
                >
                  <img
                    src={c.avatar}
                    alt=""
                    style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: '#666666' }}>{c.user}</div>
                    <div style={{ fontSize: 14, color: '#333333', marginTop: 4 }}>{c.content}</div>
                    <div style={{ fontSize: 11, color: '#999999', marginTop: 4 }}>{c.date}</div>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                height: 54,
                padding: '0 12px',
                borderTop: '0.5px solid #eeeeee',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="说点什么吧..."
                style={{
                  flex: 1,
                  height: 34,
                  borderRadius: 17,
                  border: 'none',
                  backgroundColor: '#f5f5f5',
                  padding: '0 14px',
                  fontSize: 13,
                  outline: 'none',
                }}
              />
              <button
                type="button"
                onClick={() => {
                  addVideoComment(video.id, commentText)
                  setCommentText('')
                }}
                style={{
                  width: 58,
                  height: 32,
                  borderRadius: 16,
                  border: 'none',
                  backgroundColor: '#1478ff',
                  color: '#ffffff',
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                发送
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function LivePreviewPage() {
  const { lives, currentRoute, navigate, toggleLiveReserve } = useAppStore()
  const liveId = currentRoute.params?.liveId || 'live-3'
  const live = lives.find((l) => l.id === liveId) || lives[2]

  return (
    <div className="page-shell" style={{ backgroundColor: '#f6f7f9' }}>
      <NavBar title="直播预告" />

      <div className="page-scroll">
        <div style={{ paddingBottom: 30 }}>
      {/* 顶部封面与倒计时 (0:43677 / 0:43581) */}
      <div style={{ position: 'relative', width: 375, height: 220, backgroundColor: '#1c2331' }}>
        <img
          src="/assets/design-source/raster/f448718037716d29b0a564dd4cdce48ab041e340.png"
          alt={live.title}
          style={{ width: 375, height: 220, objectFit: 'cover', opacity: 0.85, display: 'block' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
          }}
        >
          <div style={{ fontSize: 14, opacity: 0.9 }}>距离开播还有</div>
          <div style={{ fontSize: 22, fontWeight: 600, marginTop: 8 }}>00 天 03 小时 10 分钟</div>
          <div style={{ fontSize: 12, opacity: 0.8, marginTop: 6 }}>
            开播时间：{live.scheduleText || '今天 08:30'}
          </div>
          <button
            type="button"
            onClick={() => toggleLiveReserve(live.id)}
            style={{
              marginTop: 16,
              height: 36,
              padding: '0 28px',
              borderRadius: 18,
              border: 'none',
              background: live.reserved
                ? 'rgba(255,255,255,0.28)'
                : 'linear-gradient(90deg, #62a1fc 0%, #1478ff 100%)',
              color: '#ffffff',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            {live.reserved ? '已预约（点击取消）' : '立即预约'}
          </button>
        </div>
      </div>

      {/* 直播主题与主讲医生卡片 */}
      <div style={{ margin: 12, backgroundColor: '#ffffff', borderRadius: 8, padding: 16 }}>
        <div style={{ fontSize: 17, fontWeight: 600, color: '#333333' }}>{live.title}</div>
        <div style={{ fontSize: 12, color: '#999999', marginTop: 6 }}>
          {live.views} 人已关注 · 血管瘤名医在线答疑
        </div>

        <div
          onClick={() => navigate('doctor-studio', { doctorId: live.doctorId })}
          style={{
            marginTop: 16,
            padding: 12,
            borderRadius: 8,
            backgroundColor: '#f8f9fb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img
              src="/assets/images/avatar-fill-original.png"
              alt={live.doctorName}
              style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#333333' }}>
                {live.doctorName} <span style={{ fontSize: 12, fontWeight: 400 }}>主治医师</span>
              </div>
              <div style={{ fontSize: 12, color: '#666666', marginTop: 2 }}>
                北京长峰医院 · {live.dept}
              </div>
            </div>
          </div>
          <span style={{ fontSize: 12, color: '#1478ff' }}>进入工作室 ›</span>
        </div>
      </div>

      <div style={{ margin: '0 12px', backgroundColor: '#ffffff', borderRadius: 8, padding: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#333333', marginBottom: 8 }}>
          直播简介
        </div>
        <p style={{ margin: 0, fontSize: 13, color: '#666666', lineHeight: '22px' }}>
          本期直播由北京长峰医院罗定主治医师为您系统讲解婴幼儿血管瘤激光治疗的适应症、最佳治疗窗口期及术后家庭护理要点，支持直播间实时连线答疑。
        </p>
      </div>
        </div>
      </div>
    </div>
  )
}

type FloatingLikeVariant = 'small' | 'medium' | 'large'

interface SpawnedLikeParticle {
  id: number
  variant: FloatingLikeVariant
  alt: boolean
}

const FLOAT_LIKE_ASSETS: Record<
  FloatingLikeVariant,
  { src: string; width: number; height: number }
> = {
  small: {
    src: '/assets/icons/live-room-like-float-small.svg',
    width: 17,
    height: 15,
  },
  medium: {
    src: '/assets/icons/live-room-like-float-medium.svg',
    width: 21,
    height: 19,
  },
  large: {
    src: '/assets/icons/live-room-like-float-large.svg',
    width: 25,
    height: 24,
  },
}

export function LiveRoomPage() {
  const {
    lives,
    doctors,
    currentRoute,
    goBack,
    navigate,
    toggleFollowDoctor,
    switchPrimaryTab,
    setDiscoverSubTab,
    showToast,
  } = useAppStore()
  const liveId = currentRoute.params?.liveId || 'live-1'
  const live = lives.find((l) => l.id === liveId) || lives[0]
  const doc = doctors.find((d) => d.id === live.doctorId) || doctors[0]

  const [connectState, setConnectState] = useState<'idle' | 'applying' | 'connected'>('idle')
  const [micSheetOpen, setMicSheetOpen] = useState(false)
  const [serviceSheetOpen, setServiceSheetOpen] = useState(false)
  const [topicSheetOpen, setTopicSheetOpen] = useState(false)
  const [commentsCleared, setCommentsCleared] = useState(false)
  const [likeCount, setLikeCount] = useState(2678)
  const [likePressed, setLikePressed] = useState(false)
  const [likeBurstKey, setLikeBurstKey] = useState<number | null>(null)
  const [spawnedLikes, setSpawnedLikes] = useState<SpawnedLikeParticle[]>([])
  const [screenBursts, setScreenBursts] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [chatList, setChatList] = useState<
    Array<{ user: string; text: string; kind: 'chat' | 'join' | 'system' | 'host' | 'tip' }>
  >([
    { user: '爱新觉罗·旺财', text: '每天07:20直播，与你不见不散哟！', kind: 'chat' },
    { user: '爱新觉罗·旺财', text: '已进入直播间', kind: 'join' },
    { user: '爱新觉罗·旺财', text: '已进入直播间', kind: 'join' },
    { user: '您已成功进入直播间', text: '', kind: 'system' },
  ])
  const [inputVal, setInputVal] = useState('')

  const nextLikeIdRef = useRef(1)
  const pressTimerRef = useRef<number | null>(null)
  const burstTimerRef = useRef<number | null>(null)
  const lastTouchTapRef = useRef<number>(0)
  const lastTouchDoubleTapRef = useRef<number>(0)

  useEffect(() => {
    return () => {
      if (pressTimerRef.current !== null) window.clearTimeout(pressTimerRef.current)
      if (burstTimerRef.current !== null) window.clearTimeout(burstTimerRef.current)
    }
  }, [])

  const viewerDisplay = live.id === 'live-1' ? 3823 : live.views
  const isWideViewerCount = String(viewerDisplay).length >= 3
  const topicTitle =
    live.id === 'live-1'
      ? '【直播答疑专场】肾移植术后高血...'
      : `【直播答疑专场】${live.title}`

  const handleSendComment = () => {
    const trimmed = inputVal.trim()
    if (!trimmed) return
    setCommentsCleared(false)
    setChatList((prev) => [...prev, { user: '李可可', text: trimmed, kind: 'chat' }])
    setInputVal('')
  }

  const handleLikeTap = () => {
    setLikeCount((c) => c + 1)

    setLikePressed(true)
    if (pressTimerRef.current !== null) window.clearTimeout(pressTimerRef.current)
    pressTimerRef.current = window.setTimeout(() => {
      setLikePressed(false)
    }, 180)

    const id = nextLikeIdRef.current++
    setLikeBurstKey(id)
    if (burstTimerRef.current !== null) window.clearTimeout(burstTimerRef.current)
    burstTimerRef.current = window.setTimeout(() => {
      setLikeBurstKey(null)
    }, 520)

    const variants: FloatingLikeVariant[] = ['small', 'medium', 'large']
    const variant = variants[id % variants.length]
    setSpawnedLikes((prev) => [...prev.slice(-14), { id, variant, alt: id % 2 === 1 }])
  }

  const isBlockedScreenLikeTarget = (target: EventTarget | null) => {
    if (serviceSheetOpen || micSheetOpen || topicSheetOpen) return true
    if (!(target instanceof Element)) return false
    return Boolean(target.closest('button, input, textarea, [data-no-dblclick-like]'))
  }

  const triggerScreenDoubleLike = (x: number, y: number) => {
    const burstId = nextLikeIdRef.current
    setScreenBursts((prev) => [...prev.slice(-5), { id: burstId, x, y }])
    handleLikeTap()
  }

  const handleScreenDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (Date.now() - lastTouchDoubleTapRef.current < 350) return
    if (isBlockedScreenLikeTarget(e.target)) return
    const rect = e.currentTarget.getBoundingClientRect()
    triggerScreenDoubleLike(e.clientX - rect.left, e.clientY - rect.top)
  }

  const handleScreenPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'touch') return
    if (isBlockedScreenLikeTarget(e.target)) return
    const now = Date.now()
    if (now - lastTouchTapRef.current < 320) {
      lastTouchTapRef.current = 0
      lastTouchDoubleTapRef.current = now
      const rect = e.currentTarget.getBoundingClientRect()
      triggerScreenDoubleLike(e.clientX - rect.left, e.clientY - rect.top)
    } else {
      lastTouchTapRef.current = now
    }
  }

  return (
    <div
      className="page-shell"
      style={{ backgroundColor: '#1b222d', touchAction: 'manipulation' }}
      onDoubleClick={handleScreenDoubleClick}
      onPointerUp={handleScreenPointerUp}
    >
      {/* 直播画面背景 (0:27802) */}
      <img
        src="/assets/design-source/raster/e352ea5ace15537ece559cd669d89eb573d889f7.png"
        alt="直播画面"
        referrerPolicy="no-referrer"
        style={{
          position: 'absolute',
          inset: 0,
          width: 375,
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center top',
          transform: 'scale(1.06)',
          transformOrigin: 'center top',
        }}
      />

      {/* 顶部微渐变保障白色文字可读性 */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 375,
          height: 112,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0) 100%)',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />

      {/* 底部微渐变保障公屏与输入框对比度 */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: 375,
          height: 220,
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.28) 100%)',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />

      <StatusBar light />

      {/* 顶部主播信息胶囊 (0:27802) */}
      <div
        data-no-dblclick-like="true"
        onClick={() => navigate('doctor-studio', { doctorId: doc.id })}
        style={{
          position: 'absolute',
          left: 12,
          top: 25,
          height: 38,
          padding: '0 4px 0 4px',
          borderRadius: 19,
          backgroundColor: 'rgba(0,0,0,0.32)',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          cursor: 'pointer',
          zIndex: 25,
        }}
      >
        <img
          src={doc.avatar}
          alt={doc.name}
          referrerPolicy="no-referrer"
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        <div style={{ color: '#ffffff', paddingRight: 2 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, lineHeight: '15px' }}>
            <span style={{ fontSize: 13, fontWeight: 500 }}>{doc.name}</span>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.88)' }}>{doc.dept}</span>
          </div>
          <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.75)', lineHeight: '12px' }}>
            {doc.hospital}
          </div>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            toggleFollowDoctor(doc.id)
          }}
          style={{
            height: 26,
            padding: '0 10px',
            borderRadius: 13,
            border: 'none',
            backgroundColor: doc.followed ? 'rgba(255,255,255,0.28)' : '#1478ff',
            color: '#ffffff',
            fontSize: 11,
            fontWeight: 500,
            cursor: 'pointer',
            marginLeft: 2,
          }}
        >
          {doc.followed ? '已关注' : '关注'}
        </button>
      </div>

      <WechatCapsule top={28} light />

      {/* 第二行：主题横幅 + 观看人数 + 关闭按钮 (0:27802) */}
      <button
        type="button"
        onClick={() => setTopicSheetOpen(true)}
        style={{
          position: 'absolute',
          left: 12,
          top: 70,
          maxWidth: 268,
          height: 24,
          padding: '0 8px',
          borderRadius: 12,
          border: 'none',
          backgroundColor: 'rgba(0,0,0,0.32)',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          cursor: 'pointer',
          zIndex: 25,
        }}
      >
        <img
          src="/assets/icons/live-room-topic-label.svg"
          alt="主题"
          style={{ width: 29, height: 13, flexShrink: 0, display: 'block' }}
        />
        <span
          style={{
            fontSize: 11,
            color: '#ffffff',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {topicTitle}
        </span>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', flexShrink: 0 }}>›</span>
      </button>

      <div
        style={{
          position: 'absolute',
          right: 38,
          top: 67,
          width: isWideViewerCount ? 45 : 30,
          height: 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          fontWeight: 500,
          color: '#ffffff',
          zIndex: 25,
        }}
      >
        <img
          src={
            isWideViewerCount
              ? '/assets/icons/live-room-count-wide-background.svg'
              : '/assets/icons/live-room-viewer-count-background.svg'
          }
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: isWideViewerCount ? 45 : 30,
            height: 30,
            display: 'block',
            pointerEvents: 'none',
          }}
        />
        <span style={{ position: 'relative', zIndex: 1 }}>{viewerDisplay}</span>
      </div>

      <button
        type="button"
        onClick={goBack}
        aria-label="关闭"
        style={{
          position: 'absolute',
          right: 8,
          top: 68,
          width: 28,
          height: 28,
          border: 'none',
          background: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          padding: 0,
          zIndex: 25,
        }}
      >
        <img
          src="/assets/icons/live-room-close.svg"
          alt=""
          style={{
            width: 14,
            height: 14,
            display: 'block',
            filter: 'brightness(0) invert(1)',
          }}
        />
      </button>

      {/* 右侧浮动入口：更多直播 + 快速专家问诊 (0:27802) */}
      <button
        type="button"
        onClick={() => {
          setDiscoverSubTab('live')
          switchPrimaryTab('discover')
        }}
        style={{
          position: 'absolute',
          right: 0,
          top: 132,
          height: 26,
          padding: '0 6px 0 8px',
          borderTopLeftRadius: 13,
          borderBottomLeftRadius: 13,
          border: 'none',
          backgroundColor: 'rgba(0,0,0,0.34)',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          cursor: 'pointer',
          zIndex: 25,
        }}
      >
        <img
          src="/assets/icons/live-room-more-streams.svg"
          alt=""
          style={{ width: 16, height: 16, display: 'block', flexShrink: 0 }}
        />
        <span style={{ fontSize: 11, color: '#ffffff', whiteSpace: 'nowrap' }}>更多直播</span>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>›</span>
      </button>

      <button
        type="button"
        onClick={() => setServiceSheetOpen(true)}
        style={{
          position: 'absolute',
          right: 0,
          top: 178,
          height: 44,
          padding: '0 6px 0 10px',
          borderTopLeftRadius: 22,
          borderBottomLeftRadius: 22,
          border: 'none',
          background: 'linear-gradient(90deg, #4b9bff 0%, #1478ff 100%)',
          boxShadow: '0 2px 8px rgba(20,120,255,0.32)',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          cursor: 'pointer',
          zIndex: 25,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 2.5C5.58 2.5 2 5.64 2 9.5C2 11.45 2.91 13.21 4.38 14.47L3.7 17.2L6.65 15.86C7.69 16.27 8.82 16.5 10 16.5C14.42 16.5 18 13.36 18 9.5C18 5.64 14.42 2.5 10 2.5Z"
            fill="#ffffff"
          />
          <circle cx="6.8" cy="9.5" r="1" fill="#1478ff" />
          <circle cx="10" cy="9.5" r="1" fill="#1478ff" />
          <circle cx="13.2" cy="9.5" r="1" fill="#1478ff" />
        </svg>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#ffffff',
            fontSize: 10.5,
            fontWeight: 500,
            lineHeight: '13px',
          }}
        >
          <span>快速</span>
          <span>专家问诊</span>
        </div>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', marginLeft: -1 }}>›</span>
      </button>

      {/* 语音连麦进行中状态条 (0:33046) */}
      {connectState === 'connected' && (
        <button
          type="button"
          onClick={() => setMicSheetOpen(true)}
          style={{
            position: 'absolute',
            right: 12,
            top: 236,
            height: 28,
            padding: '0 10px',
            borderRadius: 14,
            border: '1px solid rgba(255,255,255,0.35)',
            backgroundColor: 'rgba(20,120,255,0.85)',
            color: '#ffffff',
            fontSize: 11,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            cursor: 'pointer',
            zIndex: 25,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: '#52f09c',
            }}
          />
          <span>连麦通话中</span>
        </button>
      )}

      {/* 左下直播公告与互动弹幕区 (0:27802 / 0:43851) */}
      {!commentsCleared && (
        <div
          style={{
            position: 'absolute',
            left: 12,
            bottom: 62,
            width: 288,
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
            zIndex: 20,
          }}
        >
          <div
            style={{
              backgroundColor: 'rgba(0,0,0,0.34)',
              borderRadius: 10,
              padding: '7px 10px',
              fontSize: 11.5,
              lineHeight: '17px',
              color: 'rgba(255,255,255,0.96)',
            }}
          >
            <img
              src="/assets/icons/live-room-chat-badge-announcement.svg"
              alt="公告"
              style={{
                width: 35,
                height: 14,
                display: 'inline-block',
                verticalAlign: 'middle',
                marginRight: 6,
                transform: 'translateY(-1px)',
              }}
            />
            <span>
              欢迎来到直播间！直播间内严禁出现违法违规、低俗色情等内容，请大家共同遵守、监督，经举报或巡查发现将进行封号处理。
            </span>
          </div>

          {chatList.slice(-5).map((msg, idx) => (
            <div
              key={idx}
              style={{
                width: 'fit-content',
                maxWidth: 288,
                backgroundColor: 'rgba(0,0,0,0.34)',
                borderRadius: 12,
                padding: '4px 10px',
                fontSize: 11.5,
                lineHeight: '17px',
                color: '#ffffff',
              }}
            >
              {msg.kind === 'system' ? (
                <span style={{ color: '#73c4ff' }}>{msg.user}</span>
              ) : msg.kind === 'tip' ? (
                <>
                  <img
                    src="/assets/icons/live-room-chat-badge-tip.svg"
                    alt="提示"
                    style={{
                      width: 35,
                      height: 14,
                      display: 'inline-block',
                      verticalAlign: 'middle',
                      marginRight: 5,
                      transform: 'translateY(-1px)',
                    }}
                  />
                  <span style={{ color: '#73c4ff' }}>{msg.text || msg.user}</span>
                </>
              ) : msg.kind === 'host' ? (
                <>
                  <img
                    src="/assets/icons/live-room-chat-badge-host.svg"
                    alt="主播"
                    style={{
                      width: 35,
                      height: 14,
                      display: 'inline-block',
                      verticalAlign: 'middle',
                      marginRight: 5,
                      transform: 'translateY(-1px)',
                    }}
                  />
                  <span style={{ color: '#73c4ff', marginRight: 4 }}>{msg.user}：</span>
                  <span>{msg.text}</span>
                </>
              ) : msg.kind === 'join' ? (
                <>
                  <span style={{ color: '#73c4ff', marginRight: 5 }}>{msg.user}</span>
                  <span>{msg.text}</span>
                </>
              ) : (
                <>
                  <span style={{ color: '#73c4ff', marginRight: 4 }}>{msg.user}：</span>
                  <span>{msg.text}</span>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 右下飘赞动效层：仅在点击点赞后触发飘赞与大反馈动效 */}
      <div
        style={{
          position: 'absolute',
          right: 7,
          bottom: 58,
          width: 44,
          height: 180,
          pointerEvents: 'none',
          zIndex: 22,
          overflow: 'visible',
        }}
      >
        {spawnedLikes.map((particle) => {
          const asset = FLOAT_LIKE_ASSETS[particle.variant]
          return (
            <img
              key={particle.id}
              src={asset.src}
              alt=""
              onAnimationEnd={() =>
                setSpawnedLikes((prev) => prev.filter((p) => p.id !== particle.id))
              }
              className={particle.alt ? 'live-like-spawn-alt' : 'live-like-spawn'}
              style={{
                position: 'absolute',
                left: '50%',
                bottom: 2,
                width: asset.width,
                height: asset.height,
                marginLeft: -(asset.width / 2),
                display: 'block',
                pointerEvents: 'none',
              }}
            />
          )
        })}

        {likeBurstKey !== null && (
          <img
            key={`burst-${likeBurstKey}`}
            src="/assets/icons/live-room-like-burst.svg"
            alt=""
            className="live-like-burst"
            style={{
              position: 'absolute',
              left: '50%',
              bottom: -2,
              width: 66,
              height: 58,
              display: 'block',
              pointerEvents: 'none',
            }}
          />
        )}
      </div>

      {/* 双击屏幕触发的局部点赞大反馈特效 */}
      {screenBursts.map((burst) => (
        <img
          key={`screen-burst-${burst.id}`}
          src="/assets/icons/live-room-like-burst.svg"
          alt=""
          onAnimationEnd={() =>
            setScreenBursts((prev) => prev.filter((item) => item.id !== burst.id))
          }
          className="live-screen-like-burst"
          style={{
            position: 'absolute',
            left: burst.x,
            top: burst.y,
            width: 66,
            height: 58,
            display: 'block',
            pointerEvents: 'none',
            zIndex: 35,
          }}
        />
      ))}

      {/* 底部输入栏与连麦/清屏/点赞按钮组 (0:27802 / 0:43851) */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: 375,
          height: 58,
          padding: '6px 12px 14px',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          zIndex: 25,
        }}
      >
        <div
          style={{
            flex: 1,
            height: 36,
            borderRadius: 18,
            backgroundColor: 'rgba(0,0,0,0.32)',
            padding: '0 10px 0 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            minWidth: 0,
          }}
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendComment()
            }}
            placeholder="说点什么..."
            style={{
              flex: 1,
              minWidth: 0,
              height: 32,
              border: 'none',
              background: 'transparent',
              color: '#ffffff',
              fontSize: 13,
              outline: 'none',
            }}
          />
          {inputVal.trim() ? (
            <button
              type="button"
              onClick={handleSendComment}
              style={{
                height: 24,
                padding: '0 10px',
                borderRadius: 12,
                border: 'none',
                backgroundColor: '#1478ff',
                color: '#ffffff',
                fontSize: 11,
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              发送
            </button>
          ) : (
            <button
              type="button"
              aria-label="发送图片"
              onClick={() => {
                setCommentsCleared(false)
                setChatList((prev) => [
                  ...prev,
                  { user: '李可可', text: '[发送了一张检查报告图片]', kind: 'chat' },
                ])
                showToast('已发送图片提问卡片到公屏')
              }}
              style={{
                width: 24,
                height: 24,
                border: 'none',
                background: 'transparent',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <img
                src="/assets/icons/live-room-attach-image.svg"
                alt=""
                style={{ width: 23, height: 23, display: 'block' }}
              />
            </button>
          )}
        </div>

        {/* 发起连麦按钮 (34px SVG 已含半透明圆底) */}
        <button
          type="button"
          aria-label="发起连麦"
          onClick={() => {
            if (connectState === 'idle') setConnectState('applying')
            setMicSheetOpen(true)
          }}
          style={{
            width: 34,
            height: 34,
            border: 'none',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <img
            src="/assets/icons/live-room-mic-link.svg"
            alt=""
            style={{ width: 34, height: 34, display: 'block' }}
          />
        </button>

        {/* 清屏按钮 (34px SVG 已含半透明圆底) */}
        <button
          type="button"
          aria-label="清屏"
          onClick={() => {
            const next = !commentsCleared
            setCommentsCleared(next)
            showToast(next ? '已清空公屏评论，再次点击恢复' : '已恢复公屏评论')
          }}
          style={{
            width: 34,
            height: 34,
            border: 'none',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <img
            src="/assets/icons/live-room-clear-screen.svg"
            alt=""
            style={{
              width: 34,
              height: 34,
              display: 'block',
              opacity: commentsCleared ? 0.65 : 1,
            }}
          />
        </button>

        {/* 直播间底栏点赞按钮 + 实时点赞数底板 */}
        <button
          type="button"
          aria-label="点赞"
          onClick={handleLikeTap}
          style={{
            position: 'relative',
            width: 34,
            height: 34,
            border: 'none',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            cursor: 'pointer',
            flexShrink: 0,
            overflow: 'visible',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: -9,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 34,
              height: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          >
            <img
              src="/assets/icons/live-room-like-count-background.svg"
              alt=""
              style={{
                position: 'absolute',
                inset: 0,
                width: 34,
                height: 14,
                display: 'block',
              }}
            />
            <span
              style={{
                position: 'relative',
                zIndex: 1,
                color: '#FF4AB4',
                fontSize: 9.5,
                fontWeight: 500,
                lineHeight: '14px',
                whiteSpace: 'nowrap',
              }}
            >
              {likeCount}
            </span>
          </span>

          <img
            src="/assets/icons/live-room-like-toolbar.svg"
            alt=""
            style={{
              width: 34,
              height: 34,
              display: 'block',
              opacity: likePressed ? 0 : 1,
            }}
          />
          {likePressed && (
            <img
              src="/assets/icons/live-room-like-pressed.svg"
              alt=""
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: 42,
                height: 42,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                display: 'block',
              }}
            />
          )}
        </button>
      </div>

      {/* 服务推荐弹层 (0:39456) */}
      {serviceSheetOpen && (
        <div
          onClick={() => setServiceSheetOpen(false)}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.45)',
            zIndex: 50,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 375,
              backgroundColor: '#f7f8fa',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              padding: '18px 16px 24px',
              boxSizing: 'border-box',
              position: 'relative',
            }}
          >
            <button
              type="button"
              aria-label="关闭"
              onClick={() => setServiceSheetOpen(false)}
              style={{
                position: 'absolute',
                right: 14,
                top: 16,
                width: 28,
                height: 28,
                border: 'none',
                background: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                cursor: 'pointer',
              }}
            >
              <img
                src="/assets/icons/live-room-close.svg"
                alt=""
                style={{ width: 14, height: 14, display: 'block' }}
              />
            </button>
            <div style={{ textAlign: 'center', fontSize: 17, fontWeight: 600, color: '#333333' }}>
              服务推荐
            </div>
            <div style={{ textAlign: 'center', fontSize: 13, color: '#888888', marginTop: 4 }}>
              您可通过以下服务与医生沟通
            </div>

            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                {
                  label: '图文问诊',
                  tag: doc.canPrescribe ? '可开药' : undefined,
                  fee: doc.imageFee,
                  icon: '/assets/extracted/studio-srv-img.png',
                  onClick: () => {
                    setServiceSheetOpen(false)
                    navigate('inquiry-image-form', { doctorId: doc.id })
                  },
                },
                {
                  label: '电话问诊',
                  fee: doc.phoneFee,
                  icon: '/assets/extracted/studio-srv-phone.png',
                  onClick: () => {
                    setServiceSheetOpen(false)
                    navigate('inquiry-av-form', { doctorId: doc.id, type: 'phone' })
                  },
                },
                {
                  label: '视频问诊',
                  fee: doc.videoFee,
                  icon: '/assets/extracted/studio-srv-video.png',
                  onClick: () => {
                    setServiceSheetOpen(false)
                    navigate('inquiry-av-form', { doctorId: doc.id, type: 'video' })
                  },
                },
                {
                  label: '门诊挂号',
                  fee: doc.regFee,
                  icon: '/assets/extracted/studio-srv-reg.png',
                  onClick: () => {
                    setServiceSheetOpen(false)
                    navigate('reg-slots', { doctorId: doc.id })
                  },
                },
              ].map((srv) => (
                <button
                  key={srv.label}
                  type="button"
                  onClick={srv.onClick}
                  style={{
                    width: '100%',
                    height: 60,
                    padding: '0 14px',
                    borderRadius: 8,
                    border: 'none',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <img
                      src={srv.icon}
                      alt=""
                      style={{ width: 34, height: 34, objectFit: 'contain', display: 'block' }}
                    />
                    <span style={{ fontSize: 15, fontWeight: 500, color: '#333333' }}>
                      {srv.label}
                    </span>
                    {srv.tag && (
                      <span
                        style={{
                          padding: '1px 6px',
                          borderRadius: 3,
                          backgroundColor: '#1478ff',
                          color: '#ffffff',
                          fontSize: 10,
                        }}
                      >
                        {srv.tag}
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 15, fontWeight: 500, color: '#ff4d4f' }}>
                      ¥{srv.fee}
                      <span style={{ fontSize: 12, fontWeight: 400, color: '#666666' }}>/次</span>
                    </span>
                    <span style={{ fontSize: 15, color: '#c5c7c9' }}>›</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 发起连麦弹层 (0:24992 / 0:25882) */}
      {micSheetOpen && (
        <div
          onClick={() => setMicSheetOpen(false)}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.45)',
            zIndex: 50,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 375,
              backgroundColor: '#ffffff',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              padding: '18px 20px 28px',
              boxSizing: 'border-box',
              position: 'relative',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 600, color: '#333333' }}>
              {connectState === 'connected' ? '语音连麦通话中' : '发起连麦'}
            </div>
            <button
              type="button"
              onClick={() => {
                setConnectState('idle')
                setMicSheetOpen(false)
                showToast('已取消连麦')
              }}
              style={{
                position: 'absolute',
                right: 16,
                top: 18,
                border: 'none',
                background: 'transparent',
                color: '#888888',
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              {connectState === 'connected' ? '挂断连麦' : '取消连麦'}
            </button>

            <div
              style={{
                marginTop: 28,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 24,
              }}
            >
              <img
                src={doc.avatar}
                alt={doc.name}
                style={{ width: 58, height: 58, borderRadius: '50%', objectFit: 'cover' }}
              />
              <img
                src="/assets/icons/live-room-mic-link-chain.svg"
                alt=""
                style={{ width: 28, height: 28, display: 'block' }}
              />
              <img
                src="/assets/extracted/mine-avatar.png"
                alt="我"
                style={{ width: 58, height: 58, borderRadius: '50%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ marginTop: 22, fontSize: 16, fontWeight: 500, color: '#333333' }}>
              {connectState === 'connected' ? '正在与主讲医生语音连麦' : '已申请连麦'}
            </div>
            <div style={{ marginTop: 6, fontSize: 13, color: '#999999' }}>
              {connectState === 'connected' ? '已开启实时语音交流，请保持网络通畅' : '等待医生通过'}
            </div>

            <button
              type="button"
              onClick={() => {
                if (connectState === 'connected') {
                  setConnectState('idle')
                  setMicSheetOpen(false)
                  showToast('已结束语音连麦')
                } else {
                  setConnectState('connected')
                  showToast('医生已同意连麦，已接通语音')
                }
              }}
              style={{
                marginTop: 20,
                height: 36,
                padding: '0 24px',
                borderRadius: 18,
                border: 'none',
                backgroundColor: connectState === 'connected' ? '#ff4d4f' : '#1478ff',
                color: '#ffffff',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              {connectState === 'connected' ? '结束通话' : '模拟医生接通'}
            </button>
          </div>
        </div>
      )}

      {/* 直播主题详情弹层 */}
      {topicSheetOpen && (
        <div
          onClick={() => setTopicSheetOpen(false)}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.45)',
            zIndex: 50,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 375,
              backgroundColor: '#ffffff',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              padding: '18px 16px 24px',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 16, fontWeight: 600, color: '#333333' }}>本期直播主题</span>
              <button
                type="button"
                aria-label="关闭"
                onClick={() => setTopicSheetOpen(false)}
                style={{
                  width: 28,
                  height: 28,
                  border: 'none',
                  background: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  cursor: 'pointer',
                }}
              >
                <img
                  src="/assets/icons/live-room-close.svg"
                  alt=""
                  style={{ width: 14, height: 14, display: 'block' }}
                />
              </button>
            </div>
            <div style={{ marginTop: 12, fontSize: 15, fontWeight: 500, color: '#333333' }}>
              {live.title}
            </div>
            <div style={{ marginTop: 8, fontSize: 13, color: '#666666', lineHeight: '21px' }}>
              主讲专家：{doc.name}（{doc.title} · {doc.dept} · {doc.hospital}）。直播期间可在公屏提问或申请语音连麦，也可通过右侧「快速专家问诊」预约一对一图文、电话、视频服务。
            </div>
            <button
              type="button"
              onClick={() => {
                setTopicSheetOpen(false)
                navigate('doctor-studio', { doctorId: doc.id })
              }}
              style={{
                marginTop: 16,
                width: '100%',
                height: 38,
                borderRadius: 19,
                border: 'none',
                backgroundColor: '#1478ff',
                color: '#ffffff',
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              进入{doc.name}医生工作室
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export function LiveReplayPage() {
  const { goBack, navigate } = useAppStore()
  const [speed, setSpeed] = useState('1.0X')
  const [quality, setQuality] = useState('高清')
  const [playing, setPlaying] = useState(true)

  const speeds = ['1.0X', '1.25X', '1.5X', '2.0X']
  const qualities = ['标清', '高清', '超清']

  return (
    <div className="page-shell" style={{ backgroundColor: '#11161f' }}>
      {/* 回放画面 (0:33799 / 0:36791) */}
      <img
        src="/assets/design-source/raster/e352ea5ace15537ece559cd669d89eb573d889f7.png"
        alt="直播回放"
        onClick={() => setPlaying((p) => !p)}
        style={{
          position: 'absolute',
          inset: 0,
          width: 375,
          height: '100%',
          objectFit: 'cover',
          cursor: 'pointer',
        }}
      />

      <StatusBar light />
      <WechatCapsule top={28} light />

      <button
        type="button"
        onClick={goBack}
        style={{
          position: 'absolute',
          left: 12,
          top: 28,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: 'none',
          backgroundColor: 'rgba(0,0,0,0.4)',
          color: '#ffffff',
          fontSize: 18,
          cursor: 'pointer',
          zIndex: 30,
        }}
      >
        ‹
      </button>

      {/* 底部回放进度条与倍速/清晰度控制 (0:37334 / 0:38446) */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: 375,
          padding: '16px 14px 24px',
          boxSizing: 'border-box',
          background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.75) 100%)',
          color: '#ffffff',
          zIndex: 25,
        }}
      >
        <div
          onClick={() => navigate('doctor-studio', { doctorId: 'doc-luoding' })}
          style={{ fontSize: 15, fontWeight: 600, marginBottom: 6, cursor: 'pointer' }}
        >
          @罗定主治医师 · 血管瘤激光治疗专题讲堂回放
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              fontSize: 14,
              cursor: 'pointer',
              padding: 0,
            }}
          >
            {playing ? '❚❚' : '▶'}
          </button>
          <span style={{ fontSize: 11 }}>12:35</span>
          <div
            style={{
              flex: 1,
              height: 3,
              borderRadius: 2,
              backgroundColor: 'rgba(255,255,255,0.3)',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '45%',
                height: 3,
                borderRadius: 2,
                backgroundColor: '#1478ff',
              }}
            />
          </div>
          <span style={{ fontSize: 11 }}>28:00</span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 14,
          }}
        >
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              type="button"
              onClick={() =>
                setSpeed((s) => speeds[(speeds.indexOf(s) + 1) % speeds.length])
              }
              style={{
                height: 26,
                padding: '0 10px',
                borderRadius: 13,
                border: '1px solid rgba(255,255,255,0.4)',
                backgroundColor: 'rgba(0,0,0,0.35)',
                color: '#ffffff',
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              倍速 {speed}
            </button>
            <button
              type="button"
              onClick={() =>
                setQuality((q) => qualities[(qualities.indexOf(q) + 1) % qualities.length])
              }
              style={{
                height: 26,
                padding: '0 10px',
                borderRadius: 13,
                border: '1px solid rgba(255,255,255,0.4)',
                backgroundColor: 'rgba(0,0,0,0.35)',
                color: '#ffffff',
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              {quality}
            </button>
          </div>

          <button
            type="button"
            onClick={() => navigate('inquiry-image-form', { doctorId: 'doc-luoding' })}
            style={{
              height: 28,
              padding: '0 14px',
              borderRadius: 14,
              border: 'none',
              backgroundColor: '#1478ff',
              color: '#ffffff',
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            向罗医生提问
          </button>
        </div>
      </div>
    </div>
  )
}

export function ArticleDetailPage() {
  const {
    articles,
    currentRoute,
    navigate,
    toggleArticleLike,
    toggleArticleFavorite,
    addArticleComment,
  } = useAppStore()
  const articleId = currentRoute.params?.articleId || 'art-1'
  const art = articles.find((a) => a.id === articleId) || articles[0]
  const [commentInput, setCommentInput] = useState('')

  return (
    <div className="page-shell" style={{ backgroundColor: '#ffffff' }}>
      <NavBar title="资讯详情" />

      <div className="page-scroll">
      <div style={{ padding: '10px 15px 0' }}>
        {/* 标题 (0:43308) */}
        <h1
          style={{
            margin: 0,
            fontFamily: 'var(--font-sans)',
            fontSize: 21,
            fontWeight: 600,
            lineHeight: '30px',
            color: '#333333',
          }}
        >
          {art.detailTitle}
        </h1>

        {/* 蓝色描边医生推荐卡 */}
        <div
          onClick={() => navigate('doctor-studio', { doctorId: art.doctorId })}
          style={{
            marginTop: 14,
            height: 64,
            borderRadius: 5,
            border: '1px solid #1478ff',
            padding: '0 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
            <img
              src="/assets/images/avatar-fill-original.png"
              alt={art.doctorName}
              style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }}
            />
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: '#333333' }}>
                  {art.doctorName}
                </span>
                <span style={{ fontSize: 11, color: '#999999' }}>
                  {art.doctorTitle} {art.doctorDept}
                </span>
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: '#666666',
                  marginTop: 4,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: 195,
                }}
              >
                擅长：血管瘤科、血管瘤科、血管瘤科、血…
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              navigate('inquiry-image-form', { doctorId: art.doctorId })
            }}
            style={{
              width: 58,
              height: 24,
              borderRadius: 3,
              border: '0.8px solid #1478ff',
              backgroundColor: '#ffffff',
              color: '#1478ff',
              fontSize: 12,
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            问医生
          </button>
        </div>

        {/* 浅蓝灰导语框 */}
        <div
          style={{
            marginTop: 14,
            backgroundColor: '#f5f7fa',
            borderRadius: 6,
            padding: '12px 14px',
            fontSize: 12,
            lineHeight: '20px',
            color: '#444444',
          }}
        >
          {art.summary}
        </div>

        {/* 正文段落 */}
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {art.paragraphs.map((p, idx) => (
            <p
              key={idx}
              style={{
                margin: 0,
                fontSize: 15,
                lineHeight: '26px',
                color: '#333333',
                textIndent: '2em',
              }}
            >
              {p}
            </p>
          ))}
        </div>

        {/* 文中配图 */}
        <img
          src="/assets/design-source/raster/1e73cfc7802162eb5e2a27ceb40e6e11ac9e954b.png"
          alt=""
          onClick={() => navigate('live-room', { liveId: 'live-1' })}
          style={{
            marginTop: 16,
            width: 345,
            height: 136,
            borderRadius: 6,
            objectFit: 'cover',
            display: 'block',
            cursor: 'pointer',
          }}
        />

        {/* 点赞 / 收藏 / 浏览 / 日期 */}
        <div
          style={{
            marginTop: 14,
            paddingBottom: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 12,
            color: '#999999',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <button
              type="button"
              onClick={() => toggleArticleLike(art.id)}
              style={{
                border: 'none',
                background: 'transparent',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                color: art.liked ? '#1478ff' : '#999999',
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              <span>👍</span>
              <span>{art.likes}</span>
            </button>

            <button
              type="button"
              onClick={() => toggleArticleFavorite(art.id)}
              style={{
                border: 'none',
                background: 'transparent',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                color: art.favorited ? '#1478ff' : '#999999',
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              <span>★</span>
              <span>{art.favorites}</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <img src="/assets/icons/imgIcon4.svg" alt="" style={{ width: 12, height: 8 }} />
              <span>{art.views}</span>
            </div>
          </div>

          <span>2021-06-21</span>
        </div>
      </div>

      <div style={{ width: 375, height: 10, backgroundColor: '#f6f7f9' }} />

      {/* 全部评论区 (0:43308 下半部 & 0:662) */}
      <div style={{ padding: '16px 15px 20px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 14,
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 600, color: '#333333' }}>全部评论</span>
          <button
            type="button"
            onClick={() => navigate('article-comments', { articleId: art.id })}
            style={{
              border: 'none',
              background: 'transparent',
              color: '#1478ff',
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            查看全部 ({art.comments.length}) ›
          </button>
        </div>

        {art.comments.map((c) => (
          <div
            key={c.id}
            style={{
              display: 'flex',
              gap: 10,
              paddingBottom: 16,
              marginBottom: 16,
              borderBottom: '0.5px solid #f2f2f2',
            }}
          >
            <img
              src={c.avatar}
              alt={c.user}
              style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: '#666666' }}>{c.user}</div>
              <div
                style={{
                  fontSize: 14,
                  color: '#333333',
                  lineHeight: '22px',
                  marginTop: 6,
                }}
              >
                {c.content}
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 8,
                  fontSize: 12,
                  color: '#999999',
                }}
              >
                <span>{c.date}</span>
                <div style={{ display: 'flex', gap: 16 }}>
                  <span>👍 赞</span>
                  <span>💬 回复</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>

      {/* 底部写评论固定栏 */}
      <div
        className="page-bottom-bar"
        style={{
          height: 52,
          backgroundColor: '#ffffff',
          borderTop: '0.5px solid #eeeeee',
          padding: '0 15px',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <input
          type="text"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="写评论"
          style={{
            flex: 1,
            height: 34,
            borderRadius: 4,
            border: 'none',
            backgroundColor: '#f5f5f5',
            padding: '0 12px',
            fontSize: 13,
            outline: 'none',
          }}
        />
        <button
          type="button"
          onClick={() => {
            addArticleComment(art.id, commentInput)
            setCommentInput('')
          }}
          style={{
            width: 56,
            height: 34,
            borderRadius: 4,
            border: 'none',
            backgroundColor: '#1478ff',
            color: '#ffffff',
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          提交
        </button>
      </div>
    </div>
  )
}

export function ArticleCommentsPage() {
  const { articles, currentRoute, addArticleComment } = useAppStore()
  const articleId = currentRoute.params?.articleId || 'art-1'
  const art = articles.find((a) => a.id === articleId) || articles[0]
  const [text, setText] = useState('')

  return (
    <div className="page-shell" style={{ backgroundColor: '#ffffff' }}>
      <NavBar title={`全部评论 (${art.comments.length})`} />
      <div className="page-scroll">
        <div style={{ padding: 15 }}>
          {art.comments.map((c) => (
            <div
              key={c.id}
              style={{
                display: 'flex',
                gap: 10,
                paddingBottom: 14,
                marginBottom: 14,
                borderBottom: '0.5px solid #f0f0f0',
              }}
            >
              <img
                src={c.avatar}
                alt=""
                style={{ width: 30, height: 30, borderRadius: '50%' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: '#666666' }}>{c.user}</div>
                <div style={{ fontSize: 14, color: '#333333', marginTop: 4 }}>{c.content}</div>
                <div style={{ fontSize: 11, color: '#999999', marginTop: 6 }}>{c.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="page-bottom-bar"
        style={{
          height: 52,
          backgroundColor: '#ffffff',
          borderTop: '0.5px solid #eeeeee',
          padding: '0 15px',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="写评论..."
          style={{
            flex: 1,
            height: 34,
            borderRadius: 4,
            border: 'none',
            backgroundColor: '#f5f5f5',
            padding: '0 12px',
            fontSize: 13,
            outline: 'none',
          }}
        />
        <button
          type="button"
          onClick={() => {
            addArticleComment(art.id, text)
            setText('')
          }}
          style={{
            width: 56,
            height: 34,
            borderRadius: 4,
            border: 'none',
            backgroundColor: '#1478ff',
            color: '#ffffff',
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          提交
        </button>
      </div>
    </div>
  )
}
