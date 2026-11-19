import { VIDEO_CARDS, type VideoCardItem } from '../data/figmaData'
import { useAppStore } from '../store/appStore'

interface VideoSectionProps {
  searchQuery?: string
  offsetY?: number
}

function VideoCard({
  card,
  onSelect,
  offsetY = 142,
}: {
  card: VideoCardItem
  onSelect: () => void
  offsetY?: number
}) {
  const relImgX = card.coverImgX - card.coverX
  const relImgY = card.coverImgY - card.coverY
  const baseX = card.coverX
  const baseY = card.coverY
  const cardHeight = card.viewsY + card.viewsH - card.coverY

  return (
    <div
      data-node-id={card.groupNodeId}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect()
        }
      }}
      style={{
        position: 'absolute',
        left: baseX,
        top: baseY - offsetY,
        width: card.coverW,
        height: cardHeight,
        cursor: 'pointer',
      }}
    >
      {/* 封面遮罩与背景 (162 × 184, rx=5) */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: card.coverW,
          height: card.coverH,
          backgroundColor: '#D8D8D8',
          borderRadius: 5,
          overflow: 'hidden',
        }}
      >
        <img
          src={card.coverImgSrc}
          alt={card.title}
          referrerPolicy="no-referrer"
          style={
            card.coverFit === 'cover'
              ? {
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: card.coverW,
                  height: card.coverH,
                  objectFit: 'cover',
                  display: 'block',
                }
              : {
                  position: 'absolute',
                  left: relImgX,
                  top: relImgY,
                  width: card.coverImgW,
                  height: card.coverImgH,
                  display: 'block',
                  maxWidth: 'none',
                }
          }
        />
        {card.hasTopGreySquare && (
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: 162,
              height: 162,
              backgroundColor: 'rgba(131, 131, 131, 0.1494)',
              borderRadius: 5,
            }}
          />
        )}
        {/* 底部半透明渐变遮罩 (162 × 75, y+109) */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 109,
            width: 162,
            height: 75,
            borderRadius: 5,
            background:
              'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3549) 100%)',
          }}
        />
      </div>

      {/* 播放按钮 (45 × 45) */}
      <div
        data-node-id={card.playNodeId}
        style={{
          position: 'absolute',
          left: card.playX - baseX,
          top: card.playY - baseY,
          width: card.playSize,
          height: card.playSize,
          pointerEvents: 'none',
        }}
      >
        <img
          src="/assets/icons/img3.svg"
          alt=""
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 45,
            height: 45,
            display: 'block',
          }}
        />
      </div>

      {/* 视频标题 */}
      <div
        data-node-id={card.titleNodeId}
        style={{
          position: 'absolute',
          left: card.titleX - baseX,
          top: card.titleY - baseY,
          width: card.titleW,
          height: card.titleH,
          fontFamily: '"PingFang SC", -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: 15,
          fontWeight: 500,
          lineHeight: '19px',
          color: '#333333',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {card.title}
      </div>

      {/* 作者小头像 (22 × 22) */}
      <div
        data-node-id={card.avatarGroupNodeId}
        style={{
          position: 'absolute',
          left: card.avatarX - baseX,
          top: card.avatarY - baseY,
          width: card.avatarSize,
          height: card.avatarSize,
          borderRadius: '50%',
          backgroundColor: '#D8D8D8',
          overflow: 'hidden',
        }}
      >
        <img
          src={card.authorAvatarSrc || '/assets/images/img2.png'}
          alt={card.author}
          referrerPolicy="no-referrer"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 22,
            height: 22,
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>

      {/* 作者名与科室 */}
      <div
        style={{
          position: 'absolute',
          left: card.authorX - baseX,
          top: card.authorY - baseY,
          width: card.eyeX - card.authorX - 4,
          height: card.authorH,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          overflow: 'hidden',
        }}
      >
        <span
          data-node-id={card.authorNodeId}
          style={{
            fontFamily: '"PingFang SC", -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: 12,
            fontWeight: 500,
            lineHeight: '18px',
            color: '#333333',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {card.author}
        </span>
        <span
          data-node-id={card.deptNodeId}
          style={{
            fontFamily: '"PingFang SC", -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: 12,
            fontWeight: 400,
            lineHeight: '18px',
            color: '#666666',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {card.department}
        </span>
      </div>

      {/* 浏览量眼睛图标 (12 × 12) */}
      <div
        data-node-id={card.eyeNodeId}
        style={{
          position: 'absolute',
          left: card.eyeX - baseX,
          top: card.eyeY - baseY,
          width: card.eyeSize,
          height: card.eyeSize,
        }}
      >
        <img
          src="/assets/icons/imgIcon4.svg"
          alt=""
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 12,
            height: 12,
            display: 'block',
          }}
        />
      </div>

      {/* 浏览数 1567 */}
      <span
        data-node-id={card.viewsNodeId}
        style={{
          position: 'absolute',
          left: card.viewsX - baseX,
          top: card.viewsY - baseY,
          width: card.viewsW,
          height: card.viewsH,
          fontFamily: ' Arial, "Helvetica Neue", Helvetica, sans-serif',
          fontSize: 12,
          fontWeight: 400,
          lineHeight: '10px',
          color: '#999999',
          textAlign: 'justify',
          whiteSpace: 'nowrap',
        }}
      >
        {card.views}
      </span>
    </div>
  )
}

export function VideoSection({ searchQuery = '', offsetY = 142 }: VideoSectionProps) {
  const { navigate } = useAppStore()
  const normalizedQuery = searchQuery.trim()
  const filteredCards = normalizedQuery
    ? VIDEO_CARDS.filter(
        (c) =>
          c.title.includes(normalizedQuery) ||
          c.author.includes(normalizedQuery) ||
          c.department.includes(normalizedQuery),
      )
    : VIDEO_CARDS

  return (
    <>
      {/* 0:41963 全部视频白底容器 (10, 277, 355, 1194), rx=5 */}
      <div
        data-node-id="0:41963"
        style={{
          position: 'absolute',
          left: 10,
          top: 277 - offsetY,
          width: 355,
          height: 1194,
          backgroundColor: '#FFFFFF',
          borderRadius: 5,
        }}
      />

      {/* 0:41979 标题「全部视频」 (20, 289, 69, 24) */}
      <div
        data-node-id="0:41979"
        style={{
          position: 'absolute',
          left: 20,
          top: 289 - offsetY,
          width: 69,
          height: 24,
          fontFamily: '"PingFang SC", -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: 17,
          fontWeight: 600,
          lineHeight: '23.8px',
          letterSpacing: '0.081px',
          color: '#333333',
          whiteSpace: 'nowrap',
        }}
      >
        全部视频
      </div>

      {/* 8 张视频卡片 */}
      {filteredCards.map((card) => (
        <VideoCard
          key={card.id}
          card={card}
          offsetY={offsetY}
          onSelect={() => navigate('video-detail', { videoId: card.videoId })}
        />
      ))}

      {/* 0:42012 结尾分割线 (10, 1427, 355, 1), #FAFAFA */}
      <div
        data-node-id="0:42012"
        style={{
          position: 'absolute',
          left: 10,
          top: 1427 - offsetY,
          width: 355,
          height: 1,
          backgroundColor: '#FAFAFA',
        }}
      />

      {/* 0:42011 结尾文案「没有更多啦」 (156, 1443, 63, 18) */}
      <div
        data-node-id="0:42011"
        style={{
          position: 'absolute',
          left: 156,
          top: 1443 - offsetY,
          width: 63,
          height: 18,
          fontFamily: '"PingFang SC", -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: 12,
          fontWeight: 400,
          lineHeight: '18px',
          color: '#999999',
          textAlign: 'center',
          whiteSpace: 'nowrap',
        }}
      >
        没有更多啦
      </div>
    </>
  )
}
