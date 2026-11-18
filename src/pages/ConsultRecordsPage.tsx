import { BottomTabBar } from '../components/BottomTabBar'
import { StatusBar, WechatCapsule } from '../components/NavBar'
import { type ConsultSubTab, useAppStore } from '../store/appStore'

const CONSULT_TABS: { key: ConsultSubTab; label: string; left: number; indicatorLeft: number }[] = [
  { key: 'image', label: '图文问诊', left: 20, indicatorLeft: 37 },
  { key: 'phone', label: '电话问诊', left: 113, indicatorLeft: 130 },
  { key: 'video', label: '视频问诊', left: 206, indicatorLeft: 223 },
  { key: 'free', label: '免费咨询', left: 299, indicatorLeft: 316 },
]

export function ConsultRecordsPage() {
  const { consultSubTab, setConsultSubTab, consultations, navigate } = useAppStore()
  const activeTabItem = CONSULT_TABS.find((t) => t.key === consultSubTab) || CONSULT_TABS[3]

  const freeList = consultations.filter((c) => c.type === 'free')
  const paidRows = [
    {
      id: 'con-vid-1',
      doctorName: '罗定',
      doctorMeta: '主治医生 北京长峰…',
      date: '2020/03/23 12:04:04',
      tags: ['[已完成]', '[自费]', '[实时]'],
      msg: '我想做近视手术，请问手术…',
      unread: 0,
    },
    {
      id: 'con-vid-2',
      doctorName: '王亚飞',
      doctorMeta: '主治医生 北京长…',
      date: '2020/03/23 12:04:04',
      tags: ['[已完成]', '[医保]'],
      msg: '我想做近视手术，请问手术',
      unread: 2,
    },
    {
      id: 'con-vid-3',
      doctorName: '罗定',
      doctorMeta: '主治医生 北京长峰…',
      date: '2020/03/23 12:04:04',
      tags: ['[已完成]', '[自费]'],
      msg: '我想做近视手术，请问手术',
      unread: 0,
    },
    {
      id: 'con-vid-4',
      doctorName: '王亚飞',
      doctorMeta: '主治医生 北京长…',
      date: '2020/03/23 12:04:04',
      tags: ['[已完成]', '[医保]'],
      msg: '我想做近视手术，请问手术',
      unread: 2,
    },
  ]

  return (
    <div
      style={{
        position: 'relative',
        width: 375,
        height: 667,
        backgroundColor: '#f6f7f9',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* 顶部白色导航与标签栏 */}
      <header
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 375,
          height: 102,
          backgroundColor: '#ffffff',
          boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.04)',
          zIndex: 10,
        }}
      >
        <StatusBar />
        <h1
          style={{
            position: 'absolute',
            left: 151.5,
            top: 30,
            width: 72,
            height: 25,
            margin: 0,
            fontFamily: 'var(--font-sans)',
            fontSize: 18,
            fontWeight: 500,
            lineHeight: '25px',
            color: '#333333',
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          咨询记录
        </h1>
        <WechatCapsule top={28} />

        {CONSULT_TABS.map((tab) => {
          const isSelected = tab.key === consultSubTab
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setConsultSubTab(tab.key)}
              style={{
                position: 'absolute',
                left: tab.left,
                top: 71,
                width: 56,
                height: 20,
                background: 'transparent',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                fontSize: 14,
                fontWeight: 400,
                lineHeight: '20px',
                color: isSelected ? '#1478ff' : '#333333',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </button>
          )
        })}

        <div
          style={{
            position: 'absolute',
            left: activeTabItem.indicatorLeft,
            top: 99,
            width: 22,
            height: 3,
            borderRadius: 1.5,
            backgroundColor: '#1478ff',
            transition: 'left 0.18s ease',
          }}
        />
      </header>

      {/* 免费咨询列表 (0:16531) */}
      {consultSubTab === 'free' ? (
        <div
          style={{
            position: 'absolute',
            left: 10,
            top: 110,
            width: 355,
            height: 298,
            borderRadius: 6,
            backgroundColor: '#ffffff',
          }}
        >
          {freeList.slice(0, 4).map((item, idx) => {
            const rowTop = idx * 74
            return (
              <div
                key={item.id}
                onClick={() => navigate('chat-free', { consultationId: item.id })}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: rowTop,
                  width: 355,
                  height: 74,
                  cursor: 'pointer',
                }}
              >
                <img
                  src="/assets/extracted/consult-team-avatar.png"
                  alt=""
                  style={{
                    position: 'absolute',
                    left: 12,
                    top: 17,
                    width: 40,
                    height: 40,
                    borderRadius: 4,
                    display: 'block',
                  }}
                />
                {idx === 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      left: 43,
                      top: 12,
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      backgroundColor: '#ec4339',
                      color: '#ffffff',
                      fontSize: 8,
                      lineHeight: '14px',
                      textAlign: 'center',
                    }}
                  >
                    2
                  </span>
                )}
                <span
                  style={{
                    position: 'absolute',
                    left: 60,
                    top: 16.5,
                    fontFamily: 'var(--font-sans)',
                    fontSize: 15,
                    fontWeight: 500,
                    lineHeight: '21px',
                    color: '#333333',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.teamTitle || '刘丹专家团队-患者姓名/手机号'}
                </span>
                <span
                  style={{
                    position: 'absolute',
                    left: 60,
                    top: 41,
                    fontFamily: 'var(--font-sans)',
                    fontSize: 12,
                    fontWeight: 400,
                    lineHeight: '17px',
                    color: '#666666',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.lastMessage}
                </span>
                <span
                  style={{
                    position: 'absolute',
                    left: 303,
                    top: 18.5,
                    fontFamily: 'var(--font-sans)',
                    fontSize: 12,
                    fontWeight: 400,
                    lineHeight: '17px',
                    color: '#bababa',
                  }}
                >
                  {item.date}
                </span>
                {idx < 3 && (
                  <div
                    style={{
                      position: 'absolute',
                      left: 60,
                      top: 73.5,
                      width: 283,
                      height: 0.5,
                      backgroundColor: '#f2f2f2',
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>
      ) : (
        /* 视频 / 电话 / 图文 问诊列表 (0:7766 / 0:7620) */
        <div
          style={{
            position: 'absolute',
            left: 10,
            top: 111,
            width: 355,
            height: 300,
            borderRadius: 6,
            backgroundColor: '#ffffff',
          }}
        >
          {paidRows.map((row, idx) => {
            const rowTop = idx * 74
            return (
              <div
                key={row.id}
                onClick={() => {
                  if (consultSubTab === 'image') {
                    navigate('chat-image', { consultationId: 'con-img-1' })
                  } else {
                    navigate('chat-av', { consultationId: 'con-vid-1', mode: consultSubTab })
                  }
                }}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: rowTop,
                  width: 355,
                  height: 74,
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: 10,
                    top: 15,
                    width: 46,
                    height: 46,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    backgroundColor: '#d8d8d8',
                  }}
                >
                  <img
                    src="/assets/images/avatar-fill-original.png"
                    alt={row.doctorName}
                    style={{ width: 46, height: 46, objectFit: 'cover', display: 'block' }}
                  />
                </div>
                {row.unread > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      left: 44,
                      top: 12,
                      width: 15,
                      height: 15,
                      borderRadius: '50%',
                      backgroundColor: '#ec4339',
                      color: '#ffffff',
                      fontSize: 10,
                      lineHeight: '15px',
                      textAlign: 'center',
                    }}
                  >
                    {row.unread}
                  </span>
                )}
                <div
                  style={{
                    position: 'absolute',
                    left: 68,
                    top: 18,
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 5,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 15,
                      fontWeight: 500,
                      lineHeight: '21px',
                      color: '#333333',
                    }}
                  >
                    {row.doctorName}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 12,
                      fontWeight: 400,
                      lineHeight: '17px',
                      color: '#999999',
                    }}
                  >
                    {row.doctorMeta}
                  </span>
                </div>

                <span
                  style={{
                    position: 'absolute',
                    left: 233.5,
                    top: 20.5,
                    fontFamily: 'var(--font-sans)',
                    fontSize: 11,
                    lineHeight: '15px',
                    color: '#b3b2b2',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {row.date}
                </span>

                <div
                  style={{
                    position: 'absolute',
                    left: 68,
                    top: 41,
                    width: 275,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {row.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 12,
                        color: '#f47528',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                  <span
                    style={{
                      marginLeft: 2,
                      fontFamily: 'var(--font-sans)',
                      fontSize: 12,
                      color: '#666666',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {row.msg}
                  </span>
                </div>

                {idx < 3 && (
                  <div
                    style={{
                      position: 'absolute',
                      left: 68,
                      top: 73.5,
                      width: 277,
                      height: 0.5,
                      backgroundColor: '#f2f2f2',
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>
      )}

      <BottomTabBar top={618} offsetX={1} />
    </div>
  )
}
