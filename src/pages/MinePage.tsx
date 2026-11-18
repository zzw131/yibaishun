import { useState } from 'react'
import { BottomTabBar } from '../components/BottomTabBar'
import { StatusBar, WechatCapsule } from '../components/NavBar'
import { useAppStore } from '../store/appStore'

export function MinePage() {
  const { user, orders, navigate, showToast } = useAppStore()
  const [serviceModal, setServiceModal] = useState<'none' | 'online' | 'phone'>('none')

  const unpaidCount = orders.filter((o) => o.status === '待付款').length || 2

  const orderButtons: {
    label: string
    filterStatus: '待付款' | '进行中' | '已完成' | '已取消' | '全部'
    icon: string
    iconLeft: number
    labelLeft: number
    labelWidth: number
    badge?: number
  }[] = [
    {
      label: '待支付',
      filterStatus: '待付款',
      icon: '/assets/extracted/mine-ord-unpaid.png',
      iconLeft: 30,
      labelLeft: 25,
      labelWidth: 39,
      badge: unpaidCount,
    },
    {
      label: '进行中',
      filterStatus: '进行中',
      icon: '/assets/extracted/mine-ord-ongoing.png',
      iconLeft: 104,
      labelLeft: 99,
      labelWidth: 39,
    },
    {
      label: '已完成',
      filterStatus: '已完成',
      icon: '/assets/extracted/mine-ord-done.png',
      iconLeft: 180,
      labelLeft: 175,
      labelWidth: 39,
    },
    {
      label: '已取消',
      filterStatus: '已取消',
      icon: '/assets/extracted/mine-ord-cancelled.png',
      iconLeft: 255,
      labelLeft: 250,
      labelWidth: 39,
    },
    {
      label: '全部',
      filterStatus: '全部',
      icon: '/assets/extracted/mine-ord-all.png',
      iconLeft: 323,
      labelLeft: 324,
      labelWidth: 26,
    },
  ]

  const tools = [
    {
      label: '我的医生',
      icon: '/assets/extracted/mine-tool-doctors.png',
      iconLeft: 41,
      iconTop: 291,
      labelLeft: 29,
      labelTop: 322,
      onClick: () => navigate('my-doctors'),
    },
    {
      label: '我的家人',
      icon: '/assets/extracted/mine-tool-family.png',
      iconLeft: 128,
      iconTop: 291,
      labelLeft: 116,
      labelTop: 322,
      onClick: () => navigate('my-family'),
    },
    {
      label: '我的评论',
      icon: '/assets/extracted/mine-tool-comments.png',
      iconLeft: 218,
      iconTop: 291,
      labelLeft: 206,
      labelTop: 322,
      onClick: () => navigate('my-comments'),
    },
    {
      label: '我的评价',
      icon: '/assets/extracted/mine-tool-reviews.png',
      iconLeft: 307,
      iconTop: 291,
      labelLeft: 295,
      labelTop: 322,
      onClick: () => navigate('my-reviews'),
    },
    {
      label: '我的收藏',
      icon: '/assets/extracted/mine-tool-favs.png',
      iconLeft: 41,
      iconTop: 351,
      labelLeft: 29,
      labelTop: 384,
      onClick: () => navigate('my-favorites'),
    },
    {
      label: '核酸检测',
      icon: '/assets/extracted/mine-tool-nucleic.png',
      iconLeft: 128,
      iconTop: 351,
      labelLeft: 116,
      labelTop: 384,
      onClick: () => navigate('nucleic-acid'),
    },
    {
      label: '病例夹',
      icon: '/assets/extracted/mine-tool-records.png',
      iconLeft: 218,
      iconTop: 351,
      labelLeft: 212,
      labelTop: 384,
      onClick: () => navigate('medical-records'),
    },
    {
      label: '报告查询',
      icon: '/assets/extracted/mine-tool-reports.png',
      iconLeft: 307,
      iconTop: 351,
      labelLeft: 295,
      labelTop: 384,
      onClick: () => navigate('reports'),
    },
    {
      label: '我的发票',
      icon: '/assets/extracted/mine-tool-invoice.png',
      iconLeft: 41,
      iconTop: 414,
      labelLeft: 29,
      labelTop: 446,
      onClick: () => navigate('my-invoices'),
    },
  ]

  return (
    <div
      style={{
        position: 'relative',
        width: 375,
        height: 778,
        backgroundColor: '#f6f7f9',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      <StatusBar />
      <WechatCapsule top={28} />

      {/* 用户头像与昵称 (0:54946) */}
      <button
        type="button"
        onClick={() => (user.loggedIn ? navigate('account-settings') : navigate('login'))}
        style={{
          position: 'absolute',
          left: 20,
          top: 67,
          width: 220,
          height: 58,
          background: 'transparent',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <img
          src={user.avatar}
          alt={user.name}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 58,
            height: 58,
            borderRadius: '50%',
            display: 'block',
          }}
        />
        <span
          style={{
            position: 'absolute',
            left: 71,
            top: 16,
            fontFamily: 'var(--font-sans)',
            fontSize: 21,
            fontWeight: 600,
            lineHeight: '29px',
            letterSpacing: '0.338px',
            color: '#333333',
            whiteSpace: 'nowrap',
          }}
        >
          {user.loggedIn ? user.name : '点击登录'}
        </span>
      </button>

      {/* 右上消息图标 */}
      <button
        type="button"
        onClick={() => navigate('messages')}
        aria-label="我的消息"
        style={{
          position: 'absolute',
          left: 328,
          top: 80,
          width: 32,
          height: 30,
          background: 'transparent',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
        }}
      >
        <img
          src="/assets/extracted/mine-msg.png"
          alt=""
          style={{ position: 'absolute', left: 4, top: 4, width: 24, height: 22, display: 'block' }}
        />
      </button>

      {/* 订单快捷状态栏卡片 */}
      <div
        style={{
          position: 'absolute',
          left: 12,
          top: 144,
          width: 351,
          height: 78,
          borderRadius: 8,
          backgroundColor: '#ffffff',
        }}
      />
      {orderButtons.map((btn) => (
        <button
          key={btn.label}
          type="button"
          onClick={() => navigate('orders', { status: btn.filterStatus })}
          style={{
            position: 'absolute',
            left: btn.labelLeft - 10,
            top: 148,
            width: 60,
            height: 70,
            background: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
        >
          <img
            src={btn.icon}
            alt={btn.label}
            style={{
              position: 'absolute',
              left: btn.iconLeft - (btn.labelLeft - 10),
              top: 4,
              width: btn.label === '待支付' ? 34 : 30,
              height: 34,
              display: 'block',
            }}
          />
          <span
            style={{
              position: 'absolute',
              left: 10,
              top: 42,
              width: btn.labelWidth,
              height: 18,
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              fontWeight: 500,
              lineHeight: '18px',
              color: '#262626',
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            {btn.label}
          </span>
        </button>
      ))}

      {/* 常用工具卡片 (0:55192) */}
      <div
        style={{
          position: 'absolute',
          left: 12,
          top: 234,
          width: 351,
          height: 248,
          borderRadius: 8,
          backgroundColor: '#ffffff',
        }}
      />
      <span
        style={{
          position: 'absolute',
          left: 22,
          top: 250,
          width: 64,
          height: 22,
          fontFamily: 'var(--font-sans)',
          fontSize: 16,
          fontWeight: 500,
          lineHeight: '22px',
          color: '#333333',
        }}
      >
        常用工具
      </span>

      {/* 商城入口（PAGE_RELATIONSHIPS.md 约定：我的 → 常用工具 → 商城） */}
      <button
        type="button"
        onClick={() => navigate('mall')}
        style={{
          position: 'absolute',
          left: 295,
          top: 252,
          height: 18,
          background: 'transparent',
          border: 'none',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          cursor: 'pointer',
          color: '#1478ff',
          fontSize: 12,
        }}
      >
        <span>健康商城</span>
        <svg width="5" height="9" viewBox="0 0 5 9" fill="none">
          <path d="M1 1L4 4.5L1 8" stroke="#1478ff" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>

      {tools.map((tool) => (
        <button
          key={tool.label}
          type="button"
          onClick={tool.onClick}
          style={{
            position: 'absolute',
            left: tool.labelLeft - 10,
            top: tool.iconTop - 4,
            width: 72,
            height: 60,
            background: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
        >
          <img
            src={tool.icon}
            alt={tool.label}
            style={{
              position: 'absolute',
              left: tool.iconLeft - (tool.labelLeft - 10),
              top: 4,
              width: 28,
              height: 28,
              display: 'block',
            }}
          />
          <span
            style={{
              position: 'absolute',
              left: 10,
              top: tool.labelTop - (tool.iconTop - 4),
              width: 52,
              height: 18,
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              fontWeight: 400,
              lineHeight: '18px',
              color: '#333333',
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            {tool.label}
          </span>
        </button>
      ))}

      {/* 底部功能列表卡片 (设置 / 帮助与反馈 / 联系客服 / 客服电话) */}
      <div
        style={{
          position: 'absolute',
          left: 12,
          top: 494,
          width: 351,
          height: 218,
          borderRadius: 8,
          backgroundColor: '#ffffff',
        }}
      />
      {[
        {
          label: '设置',
          icon: '/assets/extracted/mine-row-settings.png',
          top: 500,
          textTop: 513,
          iconTop: 510,
          arrow: true,
          onClick: () => navigate('settings'),
        },
        {
          label: '帮助与反馈',
          icon: '/assets/extracted/mine-row-help.png',
          top: 551,
          textTop: 564,
          iconTop: 561,
          arrow: true,
          onClick: () => navigate('help-feedback'),
        },
        {
          label: '联系客服',
          icon: '/assets/extracted/mine-row-service.png',
          top: 602,
          textTop: 615,
          iconTop: 612,
          arrow: true,
          onClick: () => setServiceModal('online'),
        },
      ].map((row) => (
        <button
          key={row.label}
          type="button"
          onClick={row.onClick}
          style={{
            position: 'absolute',
            left: 12,
            top: row.top,
            width: 351,
            height: 46,
            background: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <img
            src={row.icon}
            alt=""
            style={{
              position: 'absolute',
              left: 16,
              top: row.iconTop - row.top,
              width: 24,
              height: 24,
              display: 'block',
            }}
          />
          <span
            style={{
              position: 'absolute',
              left: 44,
              top: row.textTop - row.top,
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              fontWeight: 400,
              lineHeight: '18px',
              color: '#333333',
            }}
          >
            {row.label}
          </span>
          <svg
            width="6"
            height="11"
            viewBox="0 0 6 11"
            fill="none"
            style={{ position: 'absolute', left: 324, top: row.textTop - row.top + 3.5 }}
          >
            <path d="M1 1L5 5.5L1 10" stroke="#999999" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>
      ))}

      {/* 客服电话行 */}
      <button
        type="button"
        onClick={() => setServiceModal('phone')}
        style={{
          position: 'absolute',
          left: 12,
          top: 650,
          width: 351,
          height: 52,
          background: 'transparent',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <img
          src="/assets/extracted/mine-row-phone.png"
          alt=""
          style={{ position: 'absolute', left: 16, top: 11, width: 24, height: 24, display: 'block' }}
        />
        <span
          style={{
            position: 'absolute',
            left: 44,
            top: 9,
            fontFamily: 'var(--font-sans)',
            fontSize: 13,
            fontWeight: 400,
            lineHeight: '18px',
            color: '#333333',
          }}
        >
          客服电话
        </span>
        <span
          style={{
            position: 'absolute',
            left: 101,
            top: 9,
            fontFamily: 'var(--font-sans)',
            fontSize: 13,
            fontWeight: 400,
            lineHeight: '18px',
            color: '#333333',
          }}
        >
          010-88248999
        </span>
        <span
          style={{
            position: 'absolute',
            left: 45,
            top: 27,
            fontFamily: 'var(--font-sans)',
            fontSize: 10,
            fontWeight: 400,
            lineHeight: '14px',
            color: '#999999',
          }}
        >
          周一至周五8:00-22:00在线
        </span>
      </button>

      <BottomTabBar top={729} offsetX={1} />

      {/* 客服弹层 */}
      {serviceModal !== 'none' && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.45)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setServiceModal('none')}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 300,
              backgroundColor: '#ffffff',
              borderRadius: 10,
              padding: '20px 20px 16px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 600, color: '#333333', marginBottom: 8 }}>
              {serviceModal === 'online' ? '在线客服' : '拨打客服电话'}
            </div>
            <div style={{ fontSize: 13, color: '#666666', lineHeight: '20px', marginBottom: 18 }}>
              {serviceModal === 'online'
                ? '医百顺患者端官方客服在线为您解答挂号、问诊、处方及订单疑问。'
                : '确认拨打客服热线 010-88248999 吗？（周一至周五 8:00-22:00）'}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                type="button"
                onClick={() => setServiceModal('none')}
                style={{
                  flex: 1,
                  height: 36,
                  borderRadius: 18,
                  border: '1px solid #e5e5e5',
                  backgroundColor: '#ffffff',
                  color: '#666666',
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                取消
              </button>
              <button
                type="button"
                onClick={() => {
                  setServiceModal('none')
                  showToast(
                    serviceModal === 'online'
                      ? '已接入在线客服会话'
                      : '正在模拟呼叫 010-88248999...',
                  )
                }}
                style={{
                  flex: 1,
                  height: 36,
                  borderRadius: 18,
                  border: 'none',
                  backgroundColor: '#1478ff',
                  color: '#ffffff',
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                {serviceModal === 'online' ? '立即咨询' : '立即拨打'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
