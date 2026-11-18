import { useState } from 'react'
import { NavBar, StatusBar, WechatCapsule } from '../components/NavBar'
import { useAppStore } from '../store/appStore'

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

  return (
    <div
      style={{
        position: 'relative',
        width: 375,
        height: 667,
        backgroundColor: '#7b8491',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* 视频全屏画面 (0:34368) */}
      <img
        src="/frames/patient/0-34368.png"
        alt={video.title}
        onClick={() => setPlaying((p) => !p)}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 375,
          height: 667,
          objectFit: 'cover',
          cursor: 'pointer',
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
            top: 307,
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
          left: 8,
          top: 24,
          width: 36,
          height: 36,
          background: 'transparent',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          zIndex: 35,
        }}
      />

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
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path
            d="M9 14H5C3.9 14 3 14.9 3 16V26C3 27.1 3.9 28 5 28H9V14ZM12 28H23.5C25.2 28 26.6 26.8 26.9 25.1L28.7 15.6C29.1 13.5 27.5 11.5 25.3 11.5H18.5V6.5C18.5 4.6 17 3 15 3L12 12V28Z"
            fill={video.liked ? '#ff4d4f' : '#ffffff'}
          />
        </svg>
        <span style={{ marginTop: 4, fontSize: 12, color: '#ffffff', fontWeight: 500 }}>
          {video.likes}
        </span>
      </button>

      {/* 评论按钮 */}
      <button
        type="button"
        onClick={() => setCommentDrawerOpen(true)}
        style={{
          position: 'absolute',
          left: 315,
          top: 428,
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
        <div style={{ width: 32, height: 32 }} />
        <span style={{ marginTop: 4, fontSize: 12, color: '#ffffff', fontWeight: 500 }}>
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
          height: 54,
          background: 'transparent',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          zIndex: 20,
        }}
        aria-label="分享"
      />

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
        <div style={{ fontSize: 16, fontWeight: 600, color: '#ffffff', marginBottom: 8 }}>
          @{video.authorName}
        </div>
        <p
          style={{
            margin: 0,
            fontSize: 13,
            lineHeight: '20px',
            color: '#ffffff',
            textShadow: '0 1px 2px rgba(0,0,0,0.2)',
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
                onClick={() => setCommentDrawerOpen(false)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  fontSize: 18,
                  color: '#999999',
                  cursor: 'pointer',
                }}
              >
                ×
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
    <div style={{ width: 375, minHeight: 812, backgroundColor: '#f6f7f9', paddingBottom: 30 }}>
      <NavBar title="直播预告" />

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
  )
}

export function LiveRoomPage() {
  const { doctors, goBack, navigate, toggleFollowDoctor } = useAppStore()
  const doc = doctors[0]
  const [connectState, setConnectState] = useState<'idle' | 'applying' | 'connected'>('idle')
  const [chatList, setChatList] = useState([
    { user: '张**', text: '罗主任好！请问宝宝3个月血管瘤可以做激光吗？' },
    { user: '李**', text: '已经关注罗医生了，讲得非常实用！' },
    { user: '王**', text: '激光治疗后多久复查一次呢？' },
  ])
  const [inputVal, setInputVal] = useState('')

  return (
    <div
      style={{
        position: 'relative',
        width: 375,
        height: 812,
        backgroundColor: '#1b222d',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* 直播画面背景 (0:27802 / 0:24992) */}
      <img
        src="/assets/design-source/raster/e352ea5ace15537ece559cd669d89eb573d889f7.png"
        alt="直播画面"
        style={{
          position: 'absolute',
          inset: 0,
          width: 375,
          height: 812,
          objectFit: 'cover',
        }}
      />

      <StatusBar light />

      {/* 顶部主播信息胶囊与返回 */}
      <div
        style={{
          position: 'absolute',
          left: 12,
          top: 28,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          zIndex: 25,
        }}
      >
        <button
          type="button"
          onClick={goBack}
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            border: 'none',
            backgroundColor: 'rgba(0,0,0,0.35)',
            color: '#ffffff',
            fontSize: 16,
            cursor: 'pointer',
          }}
        >
          ‹
        </button>
        <div
          onClick={() => navigate('doctor-studio', { doctorId: doc.id })}
          style={{
            height: 36,
            padding: '0 6px 0 4px',
            borderRadius: 18,
            backgroundColor: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            cursor: 'pointer',
          }}
        >
          <img
            src={doc.avatar}
            alt={doc.name}
            style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }}
          />
          <div style={{ color: '#ffffff' }}>
            <div style={{ fontSize: 12, fontWeight: 500, lineHeight: '14px' }}>{doc.name}</div>
            <div style={{ fontSize: 9, opacity: 0.8, lineHeight: '12px' }}>1567观看</div>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              toggleFollowDoctor(doc.id)
            }}
            style={{
              height: 22,
              padding: '0 8px',
              borderRadius: 11,
              border: 'none',
              backgroundColor: doc.followed ? '#888888' : '#ff5a59',
              color: '#ffffff',
              fontSize: 10,
              cursor: 'pointer',
            }}
          >
            {doc.followed ? '已关注' : '关注'}
          </button>
        </div>
      </div>

      <WechatCapsule top={30} light />

      {/* 连线状态小窗 (0:25882 / 0:33046) */}
      {connectState !== 'idle' && (
        <div
          style={{
            position: 'absolute',
            right: 12,
            top: 90,
            width: 110,
            height: 150,
            borderRadius: 8,
            backgroundColor: 'rgba(0,0,0,0.65)',
            border: '1px solid rgba(255,255,255,0.35)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            padding: 8,
            boxSizing: 'border-box',
            zIndex: 25,
          }}
        >
          <img
            src="/assets/extracted/mine-avatar.png"
            alt=""
            style={{ width: 42, height: 42, borderRadius: '50%' }}
          />
          <span style={{ fontSize: 11, marginTop: 8 }}>
            {connectState === 'applying' ? '申请连线等待中...' : '语音连线通话中'}
          </span>
          <button
            type="button"
            onClick={() =>
              setConnectState((s) => (s === 'applying' ? 'connected' : 'idle'))
            }
            style={{
              marginTop: 8,
              height: 22,
              padding: '0 8px',
              borderRadius: 11,
              border: 'none',
              backgroundColor: connectState === 'applying' ? '#1478ff' : '#ff4d4f',
              color: '#ffffff',
              fontSize: 10,
              cursor: 'pointer',
            }}
          >
            {connectState === 'applying' ? '模拟接通' : '挂断连线'}
          </button>
        </div>
      )}

      {/* 左下互动弹幕与推荐问诊卡 */}
      <div
        style={{
          position: 'absolute',
          left: 12,
          bottom: 72,
          width: 270,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          zIndex: 20,
        }}
      >
        <div
          onClick={() => navigate('inquiry-image-form', { doctorId: doc.id })}
          style={{
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderRadius: 8,
            padding: '8px 10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 4,
            cursor: 'pointer',
          }}
        >
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#333333' }}>
              罗定医生 · 图文问诊
            </div>
            <div style={{ fontSize: 11, color: '#ff5a59' }}>¥25/次 · 在线快速答疑</div>
          </div>
          <span
            style={{
              height: 24,
              padding: '0 10px',
              borderRadius: 12,
              backgroundColor: '#1478ff',
              color: '#ffffff',
              fontSize: 11,
              lineHeight: '24px',
            }}
          >
            去咨询
          </span>
        </div>

        {chatList.slice(-4).map((msg, i) => (
          <div
            key={i}
            style={{
              backgroundColor: 'rgba(0,0,0,0.38)',
              borderRadius: 14,
              padding: '5px 10px',
              fontSize: 12,
              color: '#ffffff',
              lineHeight: '18px',
            }}
          >
            <span style={{ color: '#8cc5ff', marginRight: 6 }}>{msg.user}:</span>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>

      {/* 底部输入与申请连线栏 */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: 375,
          height: 56,
          padding: '0 12px',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          backgroundColor: 'rgba(0,0,0,0.35)',
          zIndex: 25,
        }}
      >
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="跟主播聊点什么？"
          style={{
            flex: 1,
            height: 34,
            borderRadius: 17,
            border: 'none',
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: '#ffffff',
            padding: '0 14px',
            fontSize: 13,
            outline: 'none',
          }}
        />
        <button
          type="button"
          onClick={() => {
            if (!inputVal.trim()) return
            setChatList((prev) => [...prev, { user: '李可可', text: inputVal.trim() }])
            setInputVal('')
          }}
          style={{
            height: 32,
            padding: '0 12px',
            borderRadius: 16,
            border: 'none',
            backgroundColor: '#1478ff',
            color: '#ffffff',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          发送
        </button>
        <button
          type="button"
          onClick={() =>
            setConnectState((s) => (s === 'idle' ? 'applying' : 'idle'))
          }
          style={{
            height: 32,
            padding: '0 12px',
            borderRadius: 16,
            border: 'none',
            backgroundColor: connectState === 'idle' ? '#ff5a59' : '#666666',
            color: '#ffffff',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          {connectState === 'idle' ? '申请连线' : '取消连线'}
        </button>
      </div>
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
    <div
      style={{
        position: 'relative',
        width: 375,
        height: 812,
        backgroundColor: '#11161f',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* 回放画面 (0:33799 / 0:36791) */}
      <img
        src="/assets/design-source/raster/e352ea5ace15537ece559cd669d89eb573d889f7.png"
        alt="直播回放"
        onClick={() => setPlaying((p) => !p)}
        style={{
          position: 'absolute',
          inset: 0,
          width: 375,
          height: 812,
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
    <div
      style={{
        position: 'relative',
        width: 375,
        minHeight: 1255,
        backgroundColor: '#ffffff',
        paddingBottom: 60,
        userSelect: 'none',
      }}
    >
      <NavBar title="资讯详情" />

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

      {/* 底部写评论固定栏 */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          width: 375,
          height: 52,
          backgroundColor: '#ffffff',
          borderTop: '0.5px solid #eeeeee',
          padding: '0 15px',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          zIndex: 30,
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
    <div style={{ width: 375, minHeight: 667, backgroundColor: '#ffffff', paddingBottom: 60 }}>
      <NavBar title={`全部评论 (${art.comments.length})`} />
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
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          width: 375,
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
