import { useState } from 'react'
import { useAppStore } from '../store/appStore'

interface StatusBarProps {
  light?: boolean
}

export function StatusBar({ light = false }: StatusBarProps) {
  const textColor = light ? '#ffffff' : '#030303'
  const filterStyle = light ? 'brightness(0) invert(1)' : 'none'

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: 375,
        height: 20,
        zIndex: 30,
        pointerEvents: 'none',
      }}
    >
      <img
        src="/assets/icons/imgMobileSignal.svg"
        alt=""
        style={{
          position: 'absolute',
          left: 6,
          top: 5,
          width: 16.5,
          height: 10,
          display: 'block',
          filter: filterStyle,
        }}
      />
      <span
        style={{
          position: 'absolute',
          left: 26.5,
          top: 1.5,
          width: 39,
          height: 17,
          fontFamily: '"PingFang TC", "PingFang SC", -apple-system, sans-serif',
          fontSize: 12,
          fontWeight: 500,
          lineHeight: '16.8px',
          color: textColor,
          whiteSpace: 'nowrap',
        }}
      >
        Sketch
      </span>
      <img
        src="/assets/icons/imgWifi.svg"
        alt=""
        style={{
          position: 'absolute',
          left: 70.5,
          top: 4,
          width: 15,
          height: 12,
          display: 'block',
          filter: filterStyle,
        }}
      />
      <span
        style={{
          position: 'absolute',
          left: 163.5,
          top: 2,
          width: 49,
          height: 17,
          fontFamily: 'var(--font-sans)',
          fontSize: 12,
          fontWeight: 600,
          lineHeight: '16.8px',
          color: textColor,
          textAlign: 'center',
          whiteSpace: 'nowrap',
        }}
      >
        9:41 AM
      </span>
      <img
        src="/assets/icons/imgBluetooth.svg"
        alt=""
        style={{
          position: 'absolute',
          left: 302,
          top: 4,
          width: 7,
          height: 12,
          display: 'block',
          filter: filterStyle,
        }}
      />
      <span
        style={{
          position: 'absolute',
          left: 312,
          top: 2.5,
          width: 33,
          height: 17,
          fontFamily: 'var(--font-sans)',
          fontSize: 12,
          fontWeight: 400,
          lineHeight: '16.8px',
          color: textColor,
          textAlign: 'right',
          whiteSpace: 'nowrap',
        }}
      >
        100%
      </span>
      <img
        src="/assets/icons/imgBattery.svg"
        alt=""
        style={{
          position: 'absolute',
          left: 348,
          top: 4.5,
          width: 21.5,
          height: 11,
          display: 'block',
          filter: filterStyle,
        }}
      />
    </div>
  )
}

interface WechatCapsuleProps {
  top?: number
  light?: boolean
}

export function WechatCapsule({ top = 28, light = false }: WechatCapsuleProps) {
  const { navigate, resetDemoState, showToast } = useAppStore()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: 278,
          top,
          width: 80,
          height: 30,
          borderRadius: 15,
          backgroundColor: light ? 'rgba(0, 0, 0, 0.25)' : '#ffffff',
          border: light
            ? '0.5px solid rgba(255, 255, 255, 0.4)'
            : '0.5px solid rgba(236, 236, 236, 1)',
          boxSizing: 'border-box',
          zIndex: 35,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          title="更多与演示工具"
          style={{
            position: 'relative',
            width: 40,
            height: 30,
            background: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
        >
          <span
            style={{
              position: 'absolute',
              left: 11,
              top: 13.5,
              width: 3,
              height: 3,
              borderRadius: '50%',
              backgroundColor: light ? '#ffffff' : '#030303',
            }}
          />
          <span
            style={{
              position: 'absolute',
              left: 16,
              top: 12.5,
              width: 5,
              height: 5,
              borderRadius: '50%',
              backgroundColor: light ? '#ffffff' : '#030303',
            }}
          />
          <span
            style={{
              position: 'absolute',
              left: 23,
              top: 13.5,
              width: 3,
              height: 3,
              borderRadius: '50%',
              backgroundColor: light ? '#ffffff' : '#030303',
            }}
          />
        </button>

        <div
          style={{
            width: 0.5,
            height: 18,
            backgroundColor: light ? 'rgba(255,255,255,0.35)' : '#e7e7e7',
          }}
        />

        <button
          type="button"
          onClick={() => showToast('医百顺患者端小程序演示运行中')}
          title="小程序胶囊"
          style={{
            position: 'relative',
            width: 39.5,
            height: 30,
            background: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
        >
          <span
            style={{
              position: 'absolute',
              left: 11.5,
              top: 6.5,
              width: 17,
              height: 17,
              borderRadius: '50%',
              border: `1.8px solid ${light ? '#ffffff' : '#030303'}`,
              boxSizing: 'border-box',
            }}
          />
          <span
            style={{
              position: 'absolute',
              left: 17.5,
              top: 12.5,
              width: 5,
              height: 5,
              borderRadius: '50%',
              backgroundColor: light ? '#ffffff' : '#030303',
            }}
          />
        </button>
      </div>

      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.35)',
            zIndex: 999,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
          onClick={() => setMenuOpen(false)}
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
            <div style={{ fontSize: 15, fontWeight: 600, color: '#333333', marginBottom: 12 }}>
              小程序快捷工具与设计核验
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false)
                  navigate('frame-viewer', { frameId: '0:53466' })
                }}
                style={{
                  height: 38,
                  borderRadius: 6,
                  border: '1px solid #1478ff',
                  backgroundColor: '#eef5fe',
                  color: '#1478ff',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                全量864画板目录核验
              </button>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false)
                  resetDemoState()
                }}
                style={{
                  height: 38,
                  borderRadius: 6,
                  border: '1px solid #ececec',
                  backgroundColor: '#f6f7f9',
                  color: '#333333',
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                重置演示模拟数据
              </button>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              style={{
                marginTop: 12,
                width: '100%',
                height: 38,
                borderRadius: 6,
                border: 'none',
                backgroundColor: '#f5f5f5',
                color: '#666666',
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              取消
            </button>
          </div>
        </div>
      )}
    </>
  )
}

interface NavBarProps {
  title: string
  showBack?: boolean
  onBack?: () => void
  light?: boolean
  bgColor?: string
  rightText?: string
  onRightClick?: () => void
}

export function NavBar({
  title,
  showBack = true,
  onBack,
  light = false,
  bgColor = '#ffffff',
  rightText,
  onRightClick,
}: NavBarProps) {
  const { goBack } = useAppStore()

  return (
    <header
      style={{
        position: 'relative',
        width: 375,
        height: 64,
        backgroundColor: bgColor,
        flexShrink: 0,
      }}
    >
      <StatusBar light={light} />
      {showBack && (
        <button
          type="button"
          onClick={onBack || goBack}
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 35,
          }}
        >
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
            <path
              d="M9 1L1 9L9 17"
              stroke={light ? '#ffffff' : '#333333'}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
      <h1
        style={{
          position: 'absolute',
          left: 60,
          top: 30,
          width: 215,
          height: 25,
          margin: 0,
          fontFamily: 'var(--font-sans)',
          fontSize: 17,
          fontWeight: 500,
          lineHeight: '24px',
          color: light ? '#ffffff' : '#333333',
          textAlign: 'center',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {title}
      </h1>
      {rightText && (
        <button
          type="button"
          onClick={onRightClick}
          style={{
            position: 'absolute',
            right: 88,
            top: 31,
            height: 24,
            background: 'transparent',
            border: 'none',
            padding: '0 4px',
            fontSize: 12,
            color: light ? '#ffffff' : '#1890ff',
            cursor: 'pointer',
            zIndex: 35,
          }}
        >
          {rightText}
        </button>
      )}
      <WechatCapsule top={28} light={light} />
    </header>
  )
}
