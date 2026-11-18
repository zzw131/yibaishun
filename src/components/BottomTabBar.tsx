import { type PrimaryTab, useAppStore } from '../store/appStore'

interface BottomTabItem {
  key: PrimaryTab
  label: string
  iconX: number
  labelX: number
  labelWidth: number
  activeIcon: string
  inactiveIcon: string
}

const BOTTOM_TABS: BottomTabItem[] = [
  {
    key: 'home',
    label: '首页',
    iconX: 30.5,
    labelX: 30.5,
    labelWidth: 20,
    activeIcon: '/assets/icons/imgIconSy.svg',
    inactiveIcon: '/assets/icons/imgIconSyHui.svg',
  },
  {
    key: 'discover',
    label: '发现',
    iconX: 128.5,
    labelX: 128.5,
    labelWidth: 20,
    activeIcon: '/assets/icons/imgIconFx.svg',
    inactiveIcon: '/assets/icons/imgIconFxHui.svg',
  },
  {
    key: 'consult',
    label: '咨询记录',
    iconX: 226.5,
    labelX: 216.5,
    labelWidth: 40,
    activeIcon: '/assets/icons/imgIconZxjl.svg',
    inactiveIcon: '/assets/icons/imgIconZxjlHui.svg',
  },
  {
    key: 'mine',
    label: '我的',
    iconX: 324.5,
    labelX: 324.5,
    labelWidth: 20,
    activeIcon: '/assets/icons/imgIconMine.svg',
    inactiveIcon: '/assets/icons/imgIconMineHui.svg',
  },
]

interface BottomTabBarProps {
  top?: number
  offsetX?: number
}

export function BottomTabBar({ top = 1481, offsetX = 0 }: BottomTabBarProps) {
  const { activeTab, switchPrimaryTab } = useAppStore()

  return (
    <nav
      aria-label="底部导航栏"
      style={{
        position: 'absolute',
        left: 0,
        top,
        width: 375,
        height: 49,
        backgroundColor: '#ffffff',
        boxShadow: '0px -1px 0px rgba(0, 0, 0, 0.05)',
        zIndex: 20,
      }}
    >
      {BOTTOM_TABS.map((item) => {
        const isActive = activeTab === item.key
        const hitLeft =
          item.key === 'home'
            ? 0
            : item.key === 'discover'
              ? 94
              : item.key === 'consult'
                ? 188
                : 282

        return (
          <div key={item.key}>
            <button
              type="button"
              onClick={() => switchPrimaryTab(item.key)}
              aria-current={isActive ? 'page' : undefined}
              style={{
                position: 'absolute',
                left: hitLeft,
                top: 0,
                width: 93,
                height: 49,
                background: 'transparent',
                border: 'none',
                padding: 0,
                margin: 0,
                cursor: 'pointer',
                zIndex: 2,
              }}
              aria-label={item.label}
            />
            <img
              src={isActive ? item.activeIcon : item.inactiveIcon}
              alt=""
              style={{
                position: 'absolute',
                left: item.iconX + offsetX,
                top: 5,
                width: 22,
                height: 22,
                display: 'block',
                pointerEvents: 'none',
              }}
            />
            <span
              style={{
                position: 'absolute',
                left: item.labelX + offsetX,
                top: 29,
                width: item.labelWidth,
                height: 14,
                fontFamily: 'var(--font-sans)',
                fontSize: 10,
                fontWeight: 400,
                lineHeight: '14px',
                color: isActive ? '#1478ff' : '#999999',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}
            >
              {item.label}
            </span>
          </div>
        )
      })}
    </nav>
  )
}
