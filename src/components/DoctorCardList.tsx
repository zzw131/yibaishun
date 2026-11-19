import { DOCTOR_CARDS } from '../data/figmaData'
import { useAppStore } from '../store/appStore'

export function DoctorCardList({ offsetY = 142 }: { offsetY?: number }) {
  const { navigate } = useAppStore()

  return (
    <>
      {DOCTOR_CARDS.map((card) => {
        const relAvatarMaskX = card.avatarMaskX - card.cardX
        const relAvatarMaskY = card.avatarMaskY - card.cardY
        const relImgX = card.imgX - card.avatarMaskX
        const relImgY = card.imgY - card.avatarMaskY
        const relNameX = card.nameX - card.cardX
        const relNameY = card.nameY - card.cardY
        const relDeptX = card.deptX - card.cardX
        const relDeptY = card.deptY - card.cardY

        return (
          <div
            key={card.id}
            data-node-id={card.cardNodeId}
            onClick={() => navigate('doctor-studio', { doctorId: card.doctorId })}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigate('doctor-studio', { doctorId: card.doctorId })
              }
            }}
            style={{
              position: 'absolute',
              left: card.cardX,
              top: card.cardY - offsetY,
              width: card.cardW,
              height: card.cardH,
              backgroundColor: '#FFFFFF',
              borderRadius: 5,
              cursor: 'pointer',
            }}
          >
            {/* 圆形头像遮罩 48×48 */}
            <div
              style={{
                position: 'absolute',
                left: relAvatarMaskX,
                top: relAvatarMaskY,
                width: card.avatarSize,
                height: card.avatarSize,
                borderRadius: '50%',
                backgroundColor: '#D8D8D8',
                overflow: 'hidden',
              }}
            >
              {card.avatarSrc ? (
                <img
                  src={card.avatarSrc}
                  alt={card.name}
                  referrerPolicy="no-referrer"
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: card.avatarSize,
                    height: card.avatarSize,
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              ) : (
                <>
                  <img
                    src="/assets/images/avatar-fill-original.png"
                    alt={card.name}
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      width: card.avatarSize,
                      height: card.avatarSize,
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  <img
                    src="/assets/images/imgBitmap1.png"
                    alt=""
                    style={{
                      position: 'absolute',
                      left: relImgX,
                      top: relImgY,
                      width: card.imgW,
                      height: card.imgH,
                      display: 'block',
                      maxWidth: 'none',
                    }}
                  />
                </>
              )}
            </div>

            {/* 医生姓名 */}
            <span
              data-node-id={card.nameNodeId}
              style={{
                position: 'absolute',
                left: 0,
                top: relNameY,
                width: card.cardW,
                height: card.nameH,
                fontFamily: '"PingFang SC", -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: 14,
                fontWeight: 500,
                lineHeight: '22px',
                color: '#333333',
                textAlign: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              {card.name}
            </span>

            {/* 科室 */}
            <span
              data-node-id={card.deptNodeId}
              style={{
                position: 'absolute',
                left: relDeptX,
                top: relDeptY,
                width: card.deptW,
                height: card.deptH,
                fontFamily: '"PingFang SC", -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: 11,
                fontWeight: 400,
                lineHeight: '20px',
                letterSpacing: '0.275px',
                color: '#666666',
                textAlign: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              {card.department}
            </span>
          </div>
        )
      })}
    </>
  )
}
