import { useState } from 'react'
import { BottomTabBar } from '../components/BottomTabBar'
import { DoctorCardList } from '../components/DoctorCardList'
import { TopHeader } from '../components/TopHeader'
import { VideoSection } from '../components/VideoSection'
import { type LiveItem, useAppStore } from '../store/appStore'

function LiveOrClassroomGrid({
  mode,
  searchQuery,
}: {
  mode: 'live' | 'classroom'
  searchQuery: string
}) {
  const { lives, navigate, toggleLiveReserve } = useAppStore()
  const q = searchQuery.trim()

  const positions = [
    { x: 20, y: 344 },
    { x: 194, y: 344 },
    { x: 20, y: 618 },
    { x: 194, y: 618 },
    { x: 20, y: 892 },
    { x: 194, y: 892 },
  ]

  const baseList: LiveItem[] =
    mode === 'live'
      ? lives
      : lives.map((item, idx) => ({
          ...item,
          id: `class-${idx + 1}`,
          status: 'replay',
          badgeText: '',
          topRank: idx === 3,
          cover:
            idx === 0 || idx === 4 || idx === 5
              ? '/assets/images/imgWebp1.png'
              : '/assets/illustrations/imgWebp2.png',
        }))

  const filtered = q
    ? baseList.filter(
        (l) => l.title.includes(q) || l.doctorName.includes(q) || l.dept.includes(q),
      )
    : baseList

  return (
    <div style={{ position: 'relative', width: 375, height: 1277 }}>
      {/* 顶部抗疫直播 Banner (0:41798 / 0:42342) */}
      <button
        type="button"
        onClick={() => navigate('live-room', { liveId: 'live-1' })}
        style={{
          position: 'absolute',
          left: 10,
          top: 152,
          width: 355,
          height: 140,
          borderRadius: 8,
          overflow: 'hidden',
          border: 'none',
          padding: 0,
          background: 'transparent',
          cursor: 'pointer',
        }}
      >
        <img
          src="/assets/design-source/raster/1e73cfc7802162eb5e2a27ceb40e6e11ac9e954b.png"
          alt="点击观看抗疫直播"
          style={{ width: 355, height: 140, objectFit: 'cover', display: 'block' }}
        />
      </button>

      {/* 白色主卡片背景 */}
      <div
        style={{
          position: 'absolute',
          left: 10,
          top: 302,
          width: 355,
          height: 916,
          borderRadius: 5,
          backgroundColor: '#ffffff',
        }}
      />

      {/* 标题：全部直播 / 全部讲堂 */}
      <h2
        style={{
          position: 'absolute',
          left: 20,
          top: 314,
          margin: 0,
          fontFamily: 'var(--font-sans)',
          fontSize: 17,
          fontWeight: 600,
          lineHeight: '24px',
          letterSpacing: '0.081px',
          color: '#333333',
        }}
      >
        {mode === 'live' ? '全部直播' : '全部讲堂'}
      </h2>

      {filtered.map((item, idx) => {
        const pos = positions[idx] || positions[0]
        const isIllustration = item.cover.includes('imgWebp2')

        return (
          <article
            key={item.id}
            onClick={() => {
              if (mode === 'classroom' || item.status === 'replay') {
                navigate('live-replay', { liveId: item.id })
              } else if (item.status === 'live') {
                navigate('live-room', { liveId: item.id })
              } else {
                navigate('live-preview', { liveId: item.id })
              }
            }}
            style={{
              position: 'absolute',
              left: pos.x,
              top: pos.y,
              width: 161,
              height: 260,
              cursor: 'pointer',
            }}
          >
            {/* 封面 161 x 187 */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: 161,
                height: 187,
                borderRadius: 6,
                overflow: 'hidden',
                backgroundColor: '#eaeaea',
              }}
            >
              <img
                src={item.cover}
                alt=""
                style={{
                  position: 'absolute',
                  left: isIllustration ? -8 : 0,
                  top: isIllustration ? -82 : -5,
                  width: isIllustration ? 177 : 161,
                  height: isIllustration ? 279 : 191,
                  display: 'block',
                  maxWidth: 'none',
                }}
              />

              {/* 直播角标与浮层 */}
              {mode === 'live' && item.status === 'live' && (
                <div
                  style={{
                    position: 'absolute',
                    left: 6,
                    top: 6,
                    height: 16,
                    padding: '0 6px',
                    borderRadius: 2,
                    backgroundColor: '#ff5a59',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <img
                    src="/assets/design-source/svg/0-41755.svg"
                    alt=""
                    style={{ width: 8, height: 8, display: 'block' }}
                  />
                  <span style={{ fontSize: 10, color: '#ffffff', lineHeight: '14px' }}>
                    直播中
                  </span>
                </div>
              )}

              {mode === 'live' && item.status === 'upcoming' && (
                <>
                  <div
                    style={{
                      position: 'absolute',
                      left: 6,
                      top: 6,
                      height: 16,
                      borderRadius: 2,
                      backgroundColor: 'rgba(0, 0, 0, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: '#48a4ff',
                        color: '#ffffff',
                        fontSize: 10,
                        padding: '0 4px',
                        lineHeight: '16px',
                      }}
                    >
                      预播
                    </span>
                    <span
                      style={{
                        color: '#ffffff',
                        fontSize: 10,
                        padding: '0 5px',
                        lineHeight: '16px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.scheduleText}
                    </span>
                  </div>

                  {/* 居中 预约 / 已预约 圆形按钮 */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleLiveReserve(item.id)
                    }}
                    style={{
                      position: 'absolute',
                      left: 58,
                      top: 66,
                      width: 45,
                      height: 45,
                      borderRadius: '50%',
                      border: 'none',
                      background: item.reserved
                        ? 'rgba(0, 0, 0, 0.55)'
                        : 'linear-gradient(135deg, #62a1fc 0%, #1478ff 100%)',
                      color: '#ffffff',
                      fontSize: 12,
                      cursor: 'pointer',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.reserved ? '已预约' : '预约'}
                  </button>

                  {/* 底部倒计时条 */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      width: 161,
                      height: 29,
                      backgroundColor: 'rgba(0, 0, 0, 0.45)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{ fontSize: 12, color: '#ffffff', lineHeight: '19px' }}>
                      {item.countdownText}
                    </span>
                  </div>
                </>
              )}

              {mode === 'live' && item.status === 'replay' && (
                <div
                  style={{
                    position: 'absolute',
                    left: 6,
                    top: 6,
                    width: 28,
                    height: 16,
                    borderRadius: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.45)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontSize: 10, color: '#ffffff', lineHeight: '15px' }}>回放</span>
                </div>
              )}

              {mode === 'classroom' && item.topRank && (
                <div
                  style={{
                    position: 'absolute',
                    right: 10,
                    top: 9,
                    width: 24,
                    height: 24,
                    borderRadius: '2px 2px 12px 12px',
                    backgroundColor: '#ff5a59',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontSize: 8, fontWeight: 600, color: '#ffffff' }}>TOP</span>
                </div>
              )}
            </div>

            {/* 标题 */}
            <h3
              style={{
                position: 'absolute',
                left: 0,
                top: 195,
                width: 161,
                height: 38,
                margin: 0,
                fontFamily: 'var(--font-sans)',
                fontSize: 15,
                fontWeight: 500,
                lineHeight: '19px',
                color: '#333333',
              }}
            >
              {item.title}
            </h3>

            {/* 底部作者栏 */}
            <div
              onClick={(e) => {
                e.stopPropagation()
                navigate('doctor-studio', { doctorId: item.doctorId })
              }}
              style={{
                position: 'absolute',
                left: 2,
                top: 239,
                width: 22,
                height: 22,
                borderRadius: '50%',
                overflow: 'hidden',
              }}
            >
              <img
                src="/assets/images/img2.png"
                alt=""
                style={{ width: 22, height: 22, display: 'block' }}
              />
            </div>
            <span
              style={{
                position: 'absolute',
                left: 29,
                top: 242,
                fontSize: 12,
                fontWeight: 500,
                lineHeight: '18px',
                color: '#333333',
              }}
            >
              {item.doctorName}
            </span>
            <span
              style={{
                position: 'absolute',
                left: 55,
                top: 242,
                fontSize: 12,
                fontWeight: 400,
                lineHeight: '18px',
                color: '#666666',
              }}
            >
              {item.dept}
            </span>
            <img
              src="/assets/icons/imgIcon4.svg"
              alt=""
              style={{
                position: 'absolute',
                left: 118.67,
                top: 247.57,
                width: 10.67,
                height: 6.86,
                display: 'block',
              }}
            />
            <span
              style={{
                position: 'absolute',
                left: 134,
                top: 246,
                fontFamily: 'var(--font-num)',
                fontSize: 12,
                lineHeight: '10px',
                color: '#999999',
              }}
            >
              {item.views}
            </span>
          </article>
        )
      })}

      <div
        style={{
          position: 'absolute',
          left: 10,
          top: 1174,
          width: 355,
          height: 1,
          backgroundColor: '#fafafa',
        }}
      />
      <span
        style={{
          position: 'absolute',
          left: 156,
          top: 1190,
          width: 63,
          height: 18,
          fontSize: 12,
          color: '#999999',
          textAlign: 'center',
        }}
      >
        没有更多啦
      </span>

      <BottomTabBar top={1228} />
    </div>
  )
}

function NewsListSection({ searchQuery }: { searchQuery: string }) {
  const { articles, navigate } = useAppStore()
  const q = searchQuery.trim()
  const filtered = q ? articles.filter((a) => a.title.includes(q)) : articles

  return (
    <div style={{ position: 'relative', width: 375, height: 977 }}>
      <div
        style={{
          position: 'absolute',
          left: 10,
          top: 152,
          width: 355,
          height: 766,
          borderRadius: 5,
          backgroundColor: '#ffffff',
        }}
      />

      {filtered.slice(0, 7).map((art, idx) => {
        const rowTop = 163 + idx * 102
        return (
          <article
            key={art.id}
            onClick={() => navigate('article-detail', { articleId: art.id })}
            style={{
              position: 'absolute',
              left: 0,
              top: rowTop,
              width: 375,
              height: 92,
              cursor: 'pointer',
            }}
          >
            <h3
              style={{
                position: 'absolute',
                left: 23,
                top: 0,
                width: 221,
                height: 50,
                margin: 0,
                fontFamily: 'var(--font-sans)',
                fontSize: 15,
                fontWeight: 500,
                lineHeight: '25px',
                color: '#333333',
              }}
            >
              {art.title}
            </h3>

            <span
              style={{
                position: 'absolute',
                left: 23,
                top: 64,
                fontFamily: 'var(--font-sans)',
                fontSize: 12,
                lineHeight: '10px',
                color: '#999999',
              }}
            >
              {art.date}
            </span>

            {/* 点赞图标与数量 */}
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              style={{ position: 'absolute', left: 131, top: 62 }}
            >
              <path
                d="M3.5 5.5V10.5H2C1.45 10.5 1 10.05 1 9.5V6.5C1 5.95 1.45 5.5 2 5.5H3.5ZM4.5 5.2L6.6 1.8C6.9 1.3 7.6 1.5 7.6 2.1V4.5H10C10.6 4.5 11.1 5.1 10.9 5.7L9.8 9.7C9.6 10.2 9.2 10.5 8.7 10.5H4.5V5.2Z"
                stroke="#999999"
                strokeWidth="0.9"
              />
            </svg>
            <span
              style={{
                position: 'absolute',
                left: 147,
                top: 65,
                fontFamily: 'var(--font-num)',
                fontSize: 12,
                lineHeight: '10px',
                color: '#999999',
              }}
            >
              {art.likes}
            </span>

            {/* 浏览图标与数量 */}
            <img
              src="/assets/icons/imgIcon4.svg"
              alt=""
              style={{
                position: 'absolute',
                left: 201,
                top: 66.5,
                width: 10.67,
                height: 6.86,
                display: 'block',
              }}
            />
            <span
              style={{
                position: 'absolute',
                left: 217,
                top: 65,
                fontFamily: 'var(--font-num)',
                fontSize: 12,
                lineHeight: '10px',
                color: '#999999',
              }}
            >
              {art.views}
            </span>

            {/* 右侧缩略图 91 x 69 */}
            <img
              src={art.thumb}
              alt=""
              style={{
                position: 'absolute',
                left: 261,
                top: 7,
                width: 91,
                height: 69,
                borderRadius: 6,
                objectFit: 'cover',
                display: 'block',
              }}
            />

            {idx < 6 && (
              <div
                style={{
                  position: 'absolute',
                  left: 23,
                  top: 89,
                  width: 329,
                  height: 0.5,
                  backgroundColor: '#f5f5f5',
                }}
              />
            )}
          </article>
        )
      })}

      <span
        style={{
          position: 'absolute',
          left: 156,
          top: 890,
          width: 63,
          height: 18,
          fontSize: 12,
          color: '#999999',
          textAlign: 'center',
        }}
      >
        没有更多啦
      </span>

      <BottomTabBar top={928} />
    </div>
  )
}

export function DiscoverPage() {
  const { discoverSubTab, setDiscoverSubTab } = useAppStore()
  const [searchQuery, setSearchQuery] = useState('')

  const frameHeight =
    discoverSubTab === 'video' ? 1530 : discoverSubTab === 'news' ? 977 : 1277

  return (
    <div
      style={{
        position: 'relative',
        width: 375,
        height: frameHeight,
        backgroundColor: '#f6f7f9',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      <TopHeader
        activeCategory={discoverSubTab}
        onCategoryChange={setDiscoverSubTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {discoverSubTab === 'video' && (
        <>
          <DoctorCardList />
          <VideoSection searchQuery={searchQuery} />
          <BottomTabBar top={1481} />
        </>
      )}

      {discoverSubTab === 'live' && (
        <LiveOrClassroomGrid mode="live" searchQuery={searchQuery} />
      )}

      {discoverSubTab === 'classroom' && (
        <LiveOrClassroomGrid mode="classroom" searchQuery={searchQuery} />
      )}

      {discoverSubTab === 'news' && <NewsListSection searchQuery={searchQuery} />}
    </div>
  )
}
