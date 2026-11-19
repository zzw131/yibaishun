import { useEffect, useRef } from 'react'
import { StatusBar, WechatCapsule } from '../components/NavBar'
import { type ConsultSubTab, useAppStore } from '../store/appStore'

const CONSULT_TABS: { key: ConsultSubTab; label: string; left: number; indicatorLeft: number }[] = [
  { key: 'image', label: '图文问诊', left: 20, indicatorLeft: 37 },
  { key: 'phone', label: '电话问诊', left: 113, indicatorLeft: 130 },
  { key: 'video', label: '视频问诊', left: 206, indicatorLeft: 223 },
  { key: 'free', label: '免费咨询', left: 299, indicatorLeft: 316 },
]

export function ConsultRecordsPage() {
  const { consultSubTab, setConsultSubTab, consultations, doctors, navigate } = useAppStore()
  const activeTabItem = CONSULT_TABS.find((t) => t.key === consultSubTab) || CONSULT_TABS[3]
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [consultSubTab])

  const freeList = consultations.filter((c) => c.type === 'free')

  const getPaidRowsForTab = (tab: Exclude<ConsultSubTab, 'free'>) => {
    const matched = consultations.filter((c) => c.type === tab)
    const rows = matched.slice(0, 4).map((c) => {
      const doc = doctors.find((d) => d.id === c.doctorId)
      const tags = [`[${c.status}]`, `[${c.feeTag}]`]
      if (c.realtimeTag) tags.push('[实时]')
      return {
        rowKey: c.id,
        id: c.id,
        doctorId: c.doctorId,
        doctorName: c.doctorName,
        doctorMeta: `${c.doctorTitle} ${doc?.hospital || c.hospital}`,
        avatar: doc?.avatar || c.avatar,
        date: c.date,
        tags,
        msg: c.lastMessage,
        unread: c.unread,
      }
    })

    if (rows.length >= 4) return rows

    const usedDocIds = new Set(rows.map((r) => r.doctorId))
    const fallbackCandidates = [
      {
        doctorId: doctors[2]?.id || 'doc-wangyafei',
        doctorName: doctors[2]?.name || '王亚飞',
        doctorMeta: `${doctors[2]?.title || '副主任医师'} ${doctors[2]?.hospital || '北京长峰医院'}`,
        avatar: doctors[2]?.avatar || '/assets/images/avatar-fill-original.png',
        date: '2022/02/21 16:30:12',
        tags: ['[已完成]', '[医保]'],
        msg: '激光治疗后结痂期防晒与涂抹修护凝胶频次确认',
        unread: 0,
      },
      {
        doctorId: doctors[1]?.id || 'doc-liudan',
        doctorName: doctors[1]?.name || '刘丹',
        doctorMeta: `${doctors[1]?.title || '主任医师'} ${doctors[1]?.hospital || '安徽医科大学第一附属医院'}`,
        avatar: doctors[1]?.avatar || '/assets/images/avatar-fill-original.png',
        date: '2022/02/18 10:15:40',
        tags: ['[已完成]', '[自费]'],
        msg: '微创介入术后下肢弹性袜需要连续穿戴几周？',
        unread: 0,
      },
      {
        doctorId: doctors[3]?.id || 'doc-chenwei',
        doctorName: doctors[3]?.name || '陈微',
        doctorMeta: `${doctors[3]?.title || '主治医师'} ${doctors[3]?.hospital || '上海长峰医院'}`,
        avatar: doctors[3]?.avatar || '/assets/images/avatar-fill-original.png',
        date: '2022/02/12 19:22:08',
        tags: ['[已完成]', '[医保]'],
        msg: '孩子脾胃积食配合健脾食疗方两周后大便情况反馈',
        unread: 1,
      },
      {
        doctorId: doctors[4]?.id || 'doc-zhoumingyuan',
        doctorName: doctors[4]?.name || '周明远',
        doctorMeta: `${doctors[4]?.title || '副主任医师'} ${doctors[4]?.hospital || '长沙长峰医院'}`,
        avatar: doctors[4]?.avatar || '/assets/images/avatar-fill-original.png',
        date: '2022/02/09 09:40:25',
        tags: ['[已完成]', '[自费]'],
        msg: '慢性肾脏病随访检验指标复核与低盐饮食说明',
        unread: 0,
      },
    ].filter((c) => !usedDocIds.has(c.doctorId))

    for (let i = 0; rows.length < 4 && i < fallbackCandidates.length; i++) {
      const cand = fallbackCandidates[i]
      rows.push({
        rowKey: `${tab}-extra-${i}`,
        id: matched[0]?.id || 'con-vid-1',
        ...cand,
      })
    }

    return rows
  }

  const paidRows = consultSubTab === 'free' ? [] : getPaidRowsForTab(consultSubTab)

  return (
    <div className="page-shell" style={{ backgroundColor: '#f6f7f9' }}>
      {/* 顶部白色导航与标签栏 */}
      <header
        style={{
          position: 'relative',
          width: 375,
          height: 102,
          backgroundColor: '#ffffff',
          boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.04)',
          flexShrink: 0,
          zIndex: 20,
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

      {/* 中间可滚动内容区 */}
      <div ref={scrollRef} className="page-scroll">
        <div style={{ position: 'relative', width: 375, minHeight: 330 }}>
          {/* 免费咨询列表 (0:16531) */}
          {consultSubTab === 'free' ? (
            <div
              style={{
                position: 'absolute',
                left: 10,
                top: 8,
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
                      src={item.avatar || '/assets/extracted/consult-team-avatar.png'}
                      alt=""
                      referrerPolicy="no-referrer"
                      style={{
                        position: 'absolute',
                        left: 12,
                        top: 17,
                        width: 40,
                        height: 40,
                        borderRadius: 4,
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                    {item.unread > 0 && (
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
                        {item.unread}
                      </span>
                    )}
                    <span
                      style={{
                        position: 'absolute',
                        left: 60,
                        top: 16.5,
                        maxWidth: 230,
                        fontFamily: 'var(--font-sans)',
                        fontSize: 15,
                        fontWeight: 500,
                        lineHeight: '21px',
                        color: '#333333',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {item.teamTitle || item.doctorName}
                    </span>
                    <span
                      style={{
                        position: 'absolute',
                        left: 60,
                        top: 41,
                        maxWidth: 278,
                        fontFamily: 'var(--font-sans)',
                        fontSize: 12,
                        fontWeight: 400,
                        lineHeight: '17px',
                        color: '#666666',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
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
                top: 9,
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
                    key={row.rowKey}
                    onClick={() => {
                      if (consultSubTab === 'image') {
                        navigate('chat-image', { consultationId: row.id })
                      } else {
                        navigate('chat-av', { consultationId: row.id, mode: consultSubTab })
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
                        src={row.avatar}
                        alt={row.doctorName}
                        referrerPolicy="no-referrer"
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
                        maxWidth: 160,
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: 5,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: 15,
                          fontWeight: 500,
                          lineHeight: '21px',
                          color: '#333333',
                          flexShrink: 0,
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
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
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
        </div>
      </div>
    </div>
  )
}
