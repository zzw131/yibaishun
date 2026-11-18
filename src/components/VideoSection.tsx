import { VIDEO_CARDS, type VideoCardItem } from '../data/figmaData'
import { useAppStore } from '../store/appStore'

interface VideoSectionProps {
  searchQuery?: string
}

function VideoCard({ card, onSelect }: { card: VideoCardItem; onSelect: () => void }) {
  const relImgX = card.coverImgX - card.coverX
  const relImgY = card.coverImgY - card.coverY

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
      style={{ cursor: 'pointer' }}
    >
      {/* 封面遮罩与背景 (162 × 184, rx=5) */}
      <div
        style={{
          position: 'absolute',
          left: card.coverX,
          top: card.coverY,
          width: card.coverW,
          height: card.coverH,
          backgroundColor: '#D8D8D8',
          borderRadius: 5,
          overflow: 'hidden',
        }}
      >
        <img
          src={card.coverImgSrc}
          alt=""
          style={{
            position: 'absolute',
            left: relImgX,
            top: relImgY,
            width: card.coverImgW,
            height: card.coverImgH,
            display: 'block',
            maxWidth: 'none',
          }}
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
          left: card.playX,
          top: card.playY,
          width: card.playSize,
          height: card.playSize,
          pointerEvents: 'none',
        }}
      >
        <img
          src="/assets/icons/imgOval4.svg"
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
        <img
          src="/assets/icons/imgTriangle1.svg"
          alt=""
          style={{
            position: 'absolute',
            left: 17.5,
            top: 15,
            width: 12,
            height: 15,
            display: 'block',
          }}
        />
      </div>

      {/* 视频标题 */}
      <div
        data-node-id={card.titleNodeId}
        style={{
          position: 'absolute',
          left: card.titleX,
          top: card.titleY,
          width: card.titleW,
          height: card.titleH,
          fontFamily: '"PingFang SC", -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: 15,
          fontWeight: 500,
          lineHeight: '19px',
          color: '#333333',
          textAlign: 'justify',
        }}
      >
        {card.title}
      </div>

      {/* 作者小头像 (22 × 22) */}
      <div
        data-node-id={card.avatarGroupNodeId}
        style={{
          position: 'absolute',
          left: card.avatarX,
          top: card.avatarY,
          width: card.avatarSize,
          height: card.avatarSize,
          borderRadius: '50%',
          backgroundColor: '#D8D8D8',
          overflow: 'hidden',
        }}
      >
        <img
          src="/assets/images/img2.png"
          alt=""
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 22,
            height: 22,
            display: 'block',
          }}
        />
      </div>

      {/* 作者名 */}
      <span
        data-node-id={card.authorNodeId}
        style={{
          position: 'absolute',
          left: card.authorX,
          top: card.authorY,
          width: card.authorW,
          height: card.authorH,
          fontFamily: '"PingFang SC", -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: 12,
          fontWeight: 500,
          lineHeight: '18px',
          color: '#333333',
          textAlign: 'justify',
          whiteSpace: 'nowrap',
        }}
      >
        {card.author}
      </span>

      {/* 科室名 */}
      <span
        data-node-id={card.deptNodeId}
        style={{
          position: 'absolute',
          left: card.deptX,
          top: card.deptY,
          width: card.deptW,
          height: card.deptH,
          fontFamily: '"PingFang SC", -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: 12,
          fontWeight: 400,
          lineHeight: '18px',
          color: '#666666',
          textAlign: 'justify',
          whiteSpace: 'nowrap',
        }}
      >
        {card.department}
      </span>

      {/* 浏览量眼睛图标 (12 × 12) */}
      <div
        data-node-id={card.eyeNodeId}
        style={{
          position: 'absolute',
          left: card.eyeX,
          top: card.eyeY,
          width: card.eyeSize,
          height: card.eyeSize,
        }}
      >
        <img
          src="/assets/icons/imgShape1.svg"
          alt=""
          style={{
            position: 'absolute',
            left: 0.6667,
            top: 2.5714,
            width: 10.6667,
            height: 6.8571,
            display: 'block',
          }}
        />
        <img
          src="/assets/icons/imgOval2.svg"
          alt=""
          style={{
            position: 'absolute',
            left: 4.2857,
            top: 4.2857,
            width: 3.4286,
            height: 3.4286,
            display: 'block',
          }}
        />
      </div>

      {/* 浏览数 1567 */}
      <span
        data-node-id={card.viewsNodeId}
        style={{
          position: 'absolute',
          left: card.viewsX,
          top: card.viewsY,
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

export function VideoSection({ searchQuery = '' }: VideoSectionProps) {
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
          top: 277,
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
          top: 289,
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
      {filteredCards.map((card, idx) => (
        <VideoCard
          key={card.id}
          card={card}
          onSelect={() => navigate('video-detail', { videoId: `vid-${(idx % 6) + 1}` })}
        />
      ))}

      {/* 0:42012 结尾分割线 (10, 1427, 355, 1), #FAFAFA */}
      <div
        data-node-id="0:42012"
        style={{
          position: 'absolute',
          left: 10,
          top: 1427,
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
          top: 1443,
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
