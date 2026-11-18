import type { DiscoverSubTab } from '../store/appStore'
import { StatusBar, WechatCapsule } from './NavBar'

const CATEGORY_TABS: { key: DiscoverSubTab; label: string; left: number; width: number; indicatorLeft: number }[] = [
  { key: 'video', label: '小视频', left: 28, width: 42, indicatorLeft: 38 },
  { key: 'live', label: '直播', left: 127, width: 28, indicatorLeft: 129 },
  { key: 'classroom', label: '讲堂', left: 220, width: 28, indicatorLeft: 222.5 },
  { key: 'news', label: '资讯', left: 312, width: 28, indicatorLeft: 314.5 },
]

interface TopHeaderProps {
  activeCategory: DiscoverSubTab
  onCategoryChange: (cat: DiscoverSubTab) => void
  searchQuery: string
  onSearchChange: (val: string) => void
}

export function TopHeader({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: TopHeaderProps) {
  const activeItem = CATEGORY_TABS.find((t) => t.key === activeCategory) ?? CATEGORY_TABS[0]

  return (
    <header
      className="fixed-top-header"
      style={{
        position: 'fixed',
        top: 0,
        width: 375,
        height: 142,
        backgroundColor: '#ffffff',
        boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.05)',
        zIndex: 40,
      }}
    >
      <StatusBar />

      {/* 导航栏标题：发现 (0:41975) */}
      <h1
        style={{
          position: 'absolute',
          left: 174.5,
          top: 31,
          width: 34,
          height: 24,
          margin: 0,
          fontFamily: 'var(--font-sans)',
          fontSize: 17,
          fontWeight: 500,
          lineHeight: '23.8px',
          color: '#333333',
          textAlign: 'center',
          whiteSpace: 'nowrap',
        }}
      >
        发现
      </h1>

      <WechatCapsule top={28} />

      {/* 搜索框背景 (0:41965) */}
      <div
        style={{
          position: 'absolute',
          left: 15,
          top: 67,
          width: 345,
          height: 30,
          borderRadius: 18,
          backgroundColor: '#f5f5f5',
        }}
      >
        <img
          src="/assets/icons/imgIconSearch.svg"
          alt=""
          style={{
            position: 'absolute',
            left: 18,
            top: 8.5,
            width: 12,
            height: 12,
            display: 'block',
            pointerEvents: 'none',
          }}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="请输入关键词"
          aria-label="请输入关键词"
          style={{
            position: 'absolute',
            left: 35,
            top: 6.5,
            width: 295,
            height: 17,
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            padding: 0,
            margin: 0,
            fontFamily: 'var(--font-sans)',
            fontSize: 12,
            fontWeight: 400,
            lineHeight: '16.8px',
            color: '#333333',
          }}
        />
      </div>

      {/* 分类标签栏 (0:41964) */}
      {CATEGORY_TABS.map((tab) => {
        const isSelected = tab.key === activeCategory
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onCategoryChange(tab.key)}
            style={{
              position: 'absolute',
              left: tab.left,
              top: 110,
              width: tab.width,
              height: 20,
              padding: 0,
              margin: 0,
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              fontWeight: isSelected ? 500 : 400,
              lineHeight: '19.6px',
              color: isSelected ? '#1478ff' : '#333333',
              whiteSpace: 'nowrap',
              textAlign: 'left',
            }}
          >
            {tab.label}
          </button>
        )
      })}

      {/* 选中蓝色下划线 (0:41973) */}
      <div
        style={{
          position: 'absolute',
          left: activeItem.indicatorLeft,
          top: 138,
          width: 23,
          height: 3,
          borderRadius: 1,
          backgroundColor: '#1478ff',
          transition: 'left 0.18s ease',
        }}
      />
    </header>
  )
}
