import { useState } from 'react'
import { NavBar } from '../components/NavBar'
import { VIDEO_CARDS } from '../data/figmaData'
import { useAppStore } from '../store/appStore'

export function FindDoctorPage() {
  const { doctors, navigate, currentRoute } = useAppStore()
  const [keyword, setKeyword] = useState('')
  const [selectedDept, setSelectedDept] = useState('全部科室')
  const [selectedSort, setSelectedSort] = useState('综合排序')
  const isPrescribeMode = currentRoute.params?.mode === 'prescribe'

  const filtered = doctors.filter(
    (d) =>
      (!keyword.trim() ||
        d.name.includes(keyword.trim()) ||
        d.dept.includes(keyword.trim()) ||
        d.hospital.includes(keyword.trim())) &&
      (selectedDept === '全部科室' || d.dept.includes(selectedDept.replace('科', ''))),
  )

  return (
    <div style={{ width: 375, minHeight: 812, backgroundColor: '#f6f7f9', paddingBottom: 32 }}>
      <NavBar title={isPrescribeMode ? '找医生·在线复诊开药' : '找医生'} />

      {/* 搜索与筛选栏 (0:2048) */}
      <div style={{ backgroundColor: '#ffffff', padding: '8px 15px 12px' }}>
        <div
          style={{
            height: 32,
            borderRadius: 16,
            backgroundColor: '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            padding: '0 14px',
            gap: 8,
          }}
        >
          <img src="/assets/icons/imgIconSearch.svg" alt="" style={{ width: 12, height: 12 }} />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="搜索医生姓名、科室、疾病"
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              fontSize: 12,
              color: '#333333',
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: 12,
            fontSize: 13,
            color: '#333333',
          }}
        >
          {['全部科室', '血管瘤科', '内科', '外科'].map((dept) => (
            <button
              key={dept}
              type="button"
              onClick={() => setSelectedDept(dept)}
              style={{
                border: 'none',
                background: 'transparent',
                color: selectedDept === dept ? '#1478ff' : '#333333',
                fontWeight: selectedDept === dept ? 500 : 400,
                fontSize: 13,
                cursor: 'pointer',
                padding: 0,
              }}
            >
              {dept}
            </button>
          ))}
          <button
            type="button"
            onClick={() =>
              setSelectedSort((s) => (s === '综合排序' ? '好评优先' : '综合排序'))
            }
            style={{
              border: 'none',
              background: 'transparent',
              color: '#666666',
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            {selectedSort} ▾
          </button>
        </div>
      </div>

      {/* 医生列表 */}
      <div style={{ padding: '10px 10px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[...filtered, ...filtered].map((doc, idx) => (
          <div
            key={`${doc.id}-${idx}`}
            onClick={() => navigate('doctor-studio', { doctorId: doc.id })}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 8,
              padding: 15,
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', gap: 12 }}>
              <img
                src={doc.avatar}
                alt={doc.name}
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontSize: 16, fontWeight: 600, color: '#333333' }}>
                    {doc.name}
                  </span>
                  <span style={{ fontSize: 13, color: '#666666' }}>
                    {doc.dept} | {doc.title}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  <span
                    style={{
                      fontSize: 10,
                      color: '#1478ff',
                      backgroundColor: '#eef5fe',
                      padding: '1px 5px',
                      borderRadius: 3,
                    }}
                  >
                    {doc.level}
                  </span>
                  <span style={{ fontSize: 12, color: '#666666' }}>{doc.hospital}</span>
                </div>
                <p
                  style={{
                    margin: '8px 0 10px',
                    fontSize: 12,
                    color: '#666666',
                    lineHeight: '18px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {doc.goodAt}
                </p>

                {/* 行内服务快捷入口 (图文 / 视频 / 电话 / 挂号) */}
                <div
                  style={{
                    display: 'flex',
                    gap: 8,
                    flexWrap: 'wrap',
                    paddingTop: 10,
                    borderTop: '0.5px solid #f2f2f2',
                  }}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate('inquiry-image-form', { doctorId: doc.id })
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      height: 26,
                      padding: '0 8px',
                      borderRadius: 13,
                      border: '1px solid #d4e6ff',
                      backgroundColor: '#f5f9ff',
                      color: '#1478ff',
                      fontSize: 11,
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      src="/assets/design-source/svg/0-2121.svg"
                      alt=""
                      style={{ width: 13, height: 13 }}
                    />
                    <span>图文 ¥{doc.imageFee}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate('inquiry-av-form', { doctorId: doc.id, type: 'video' })
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      height: 26,
                      padding: '0 8px',
                      borderRadius: 13,
                      border: '1px solid #ffe4d1',
                      backgroundColor: '#fff8f3',
                      color: '#f47528',
                      fontSize: 11,
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      src="/assets/design-source/svg/0-2168.svg"
                      alt=""
                      style={{ width: 13, height: 13 }}
                    />
                    <span>视频 ¥{doc.videoFee}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate('inquiry-av-form', { doctorId: doc.id, type: 'phone' })
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      height: 26,
                      padding: '0 8px',
                      borderRadius: 13,
                      border: '1px solid #d2f4ee',
                      backgroundColor: '#f2fcfa',
                      color: '#1dc5a3',
                      fontSize: 11,
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      src="/assets/design-source/svg/0-2240.svg"
                      alt=""
                      style={{ width: 13, height: 13 }}
                    />
                    <span>电话 ¥{doc.phoneFee}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate('reg-slots', { doctorId: doc.id })
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      height: 26,
                      padding: '0 8px',
                      borderRadius: 13,
                      border: '1px solid #ead8ff',
                      backgroundColor: '#faf5ff',
                      color: '#9b51e0',
                      fontSize: 11,
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      src="/assets/design-source/svg/0-2204.svg"
                      alt=""
                      style={{ width: 13, height: 13 }}
                    />
                    <span>挂号 ¥{doc.regFee}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function DoctorStudioPage() {
  const { doctors, currentRoute, navigate, toggleFollowDoctor } = useAppStore()
  const doctorId = currentRoute.params?.doctorId || 'doc-luoding'
  const doc = doctors.find((d) => d.id === doctorId) || doctors[0]
  const [studioTab, setStudioTab] = useState<'video' | 'live' | 'comment'>('video')

  return (
    <div
      style={{
        position: 'relative',
        width: 375,
        minHeight: 1296,
        backgroundColor: '#f6f7f9',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      <NavBar title={`${doc.name}医生工作室`} bgColor="#f6f7f9" />

      {/* 顶部医生名片卡 (0:19126) */}
      <div
        style={{
          position: 'relative',
          margin: '26px 10px 0',
          width: 355,
          backgroundColor: '#ffffff',
          borderRadius: 8,
          padding: '18px 14px 20px',
          boxSizing: 'border-box',
        }}
      >
        {/* 右上浮动圆形大头像 + 关注按钮 */}
        <div
          style={{
            position: 'absolute',
            right: 16,
            top: -16,
            width: 68,
            height: 76,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            src={doc.avatar}
            alt={doc.name}
            style={{
              width: 68,
              height: 68,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid #ffffff',
              boxSizing: 'border-box',
            }}
          />
          <button
            type="button"
            onClick={() => toggleFollowDoctor(doc.id)}
            style={{
              marginTop: -12,
              width: 56,
              height: 20,
              borderRadius: 10,
              border: 'none',
              backgroundColor: doc.followed ? '#999999' : '#ff6058',
              color: '#ffffff',
              fontSize: 11,
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              cursor: 'pointer',
              padding: 0,
            }}
          >
            {!doc.followed && (
              <img
                src="/assets/design-source/svg/0-19213.svg"
                alt=""
                style={{ width: 10, height: 10 }}
              />
            )}
            <span>{doc.followed ? '已关注' : '关注'}</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ fontSize: 18, fontWeight: 600, color: '#333333' }}>{doc.name}</span>
          <span style={{ fontSize: 12, color: '#333333' }}>
            {doc.dept.replace('科', '')} {doc.title}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
          <span
            style={{
              height: 20,
              padding: '0 8px',
              borderRadius: 10,
              border: '0.8px solid #eb6565',
              color: '#eb6565',
              fontSize: 11,
              lineHeight: '19px',
            }}
          >
            {doc.level}
          </span>
          <button
            type="button"
            onClick={() => navigate('reg-depts', { hospital: doc.hospital })}
            style={{
              height: 20,
              padding: '0 8px',
              borderRadius: 10,
              border: 'none',
              backgroundColor: '#f5f5f5',
              color: '#333333',
              fontSize: 11,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              cursor: 'pointer',
            }}
          >
            <span>{doc.hospital}</span>
            <span>›</span>
          </button>
        </div>

        <div style={{ fontSize: 12, color: '#999999', marginTop: 10 }}>
          多点执业：{doc.multiHospitals.join('、')}
        </div>

        <div
          onClick={() => navigate('doctor-bio', { doctorId: doc.id })}
          style={{
            marginTop: 8,
            fontSize: 12,
            color: '#666666',
            lineHeight: '20px',
            position: 'relative',
            paddingRight: 18,
            cursor: 'pointer',
          }}
        >
          <span>
            擅长：具有多年婴幼儿血管瘤畸形的临床诊治经验，擅长各类型婴幼儿血管瘤婴幼儿血管瘤婴幼儿血管瘤类…
          </span>
          <img
            src="/assets/design-source/svg/0-19412.svg"
            alt="展开"
            style={{
              position: 'absolute',
              right: 2,
              bottom: 4,
              width: 12,
              height: 12,
            }}
          />
        </div>

        {/* 四个问诊与挂号服务入口 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            marginTop: 22,
            textAlign: 'center',
          }}
        >
          {[
            {
              label: '图文问诊',
              price: `¥${doc.imageFee}`,
              icon: '/assets/extracted/studio-srv-img.png',
              onClick: () => navigate('inquiry-image-form', { doctorId: doc.id }),
            },
            {
              label: '电话问诊',
              price: `¥${doc.phoneFee}`,
              icon: '/assets/extracted/studio-srv-phone.png',
              onClick: () => navigate('inquiry-av-form', { doctorId: doc.id, type: 'phone' }),
            },
            {
              label: '视频问诊',
              price: `¥${doc.videoFee}`,
              icon: '/assets/extracted/studio-srv-video.png',
              onClick: () => navigate('inquiry-av-form', { doctorId: doc.id, type: 'video' }),
            },
            {
              label: '门诊挂号',
              price: `¥${doc.regFee}`,
              icon: '/assets/extracted/studio-srv-reg.png',
              onClick: () => navigate('reg-slots', { doctorId: doc.id }),
            },
          ].map((srv) => (
            <button
              key={srv.label}
              type="button"
              onClick={srv.onClick}
              style={{
                background: 'transparent',
                border: 'none',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <img
                src={srv.icon}
                alt={srv.label}
                style={{ width: 40, height: 40, display: 'block' }}
              />
              <span
                style={{
                  marginTop: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#333333',
                  lineHeight: '18px',
                }}
              >
                {srv.label}
              </span>
              <span style={{ marginTop: 2, fontSize: 12, color: '#eb6565' }}>
                {srv.price}
                <span style={{ fontSize: 10, color: '#999999' }}>/次</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 免费咨询卡片 (0:19126 中部) */}
      <div
        onClick={() => navigate('chat-free', { consultationId: 'con-free-1' })}
        style={{
          margin: '10px 10px 0',
          width: 355,
          backgroundColor: '#ffffff',
          borderRadius: 8,
          padding: '14px 12px 12px',
          boxSizing: 'border-box',
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 12,
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 600, color: '#e66465' }}>免费咨询</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <img
              src="/assets/design-source/svg/0-19325.svg"
              alt=""
              style={{ width: 16, height: 16 }}
            />
            <span
              style={{
                height: 18,
                padding: '0 8px',
                borderRadius: 9,
                backgroundColor: '#ee6c6c',
                color: '#ffffff',
                fontSize: 9,
                lineHeight: '18px',
              }}
            >
              点击咨询
            </span>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#f8f9fb',
            borderRadius: 6,
            padding: '12px 12px 6px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          {['您好，您哪里不舒服？', '患者多大年龄？', '患者什么性别？'].map((msg, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <img
                src="/assets/extracted/studio-assistant.png"
                alt="医助"
                style={{ width: 34, height: 34, borderRadius: 4, flexShrink: 0 }}
              />
              <div>
                <div style={{ fontSize: 10, color: '#999999', marginBottom: 3 }}>医助</div>
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: 6,
                    padding: '6px 12px',
                    fontSize: 12,
                    color: '#333333',
                  }}
                >
                  {msg}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部 小视频 / 直播 / 评论 模块 */}
      <div
        style={{
          margin: '10px 10px 20px',
          width: 355,
          backgroundColor: '#ffffff',
          borderRadius: 8,
          padding: '14px 10px 16px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', gap: 36, paddingLeft: 4, marginBottom: 14 }}>
          {[
            { key: 'video' as const, label: '小视频' },
            { key: 'live' as const, label: '直播' },
            { key: 'comment' as const, label: '评论' },
          ].map((t) => {
            const active = studioTab === t.key
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setStudioTab(t.key)}
                style={{
                  position: 'relative',
                  background: 'transparent',
                  border: 'none',
                  padding: '0 0 8px',
                  fontSize: 15,
                  fontWeight: active ? 500 : 400,
                  color: active ? '#333333' : '#999999',
                  cursor: 'pointer',
                }}
              >
                {t.label}
                {active && (
                  <span
                    style={{
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      bottom: 0,
                      width: 14,
                      height: 3,
                      borderRadius: 1.5,
                      backgroundColor: '#1478ff',
                    }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {studioTab === 'comment' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '4px 6px' }}>
            {[
              { user: '高**', text: '非常好的医生，专业细心，还能给予我很多关心。很高兴遇见你，谢谢！', date: '2022-02-20' },
              { user: '张**', text: '罗医生讲解血管瘤激光方案非常细致，复查效果很好！', date: '2022-02-16' },
            ].map((rev, idx) => (
              <div
                key={idx}
                style={{
                  paddingBottom: 12,
                  borderBottom: idx === 0 ? '0.5px solid #f0f0f0' : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#666666' }}>
                  <span>{rev.user}</span>
                  <span style={{ color: '#999999' }}>{rev.date}</span>
                </div>
                <p style={{ margin: '6px 0 0', fontSize: 13, color: '#333333', lineHeight: '20px' }}>
                  {rev.text}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '161px 161px', gap: 13 }}>
            {VIDEO_CARDS.slice(0, 4).map((card, idx) => {
              const isIll = card.coverImgSrc.includes('imgWebp2')
              return (
                <div
                  key={card.id}
                  onClick={() =>
                    studioTab === 'video'
                      ? navigate('video-detail', { videoId: `vid-${idx + 1}` })
                      : navigate('live-room', { liveId: 'live-1' })
                  }
                  style={{ width: 161, cursor: 'pointer' }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: 161,
                      height: 187,
                      borderRadius: 6,
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={card.coverImgSrc}
                      alt=""
                      style={{
                        position: 'absolute',
                        left: isIll ? -8 : 0,
                        top: isIll ? -82 : -5,
                        width: isIll ? 177 : 161,
                        height: isIll ? 279 : 191,
                      }}
                    />
                    <img
                      src="/assets/icons/imgOval4.svg"
                      alt=""
                      style={{ position: 'absolute', left: 63, top: 76, width: 36, height: 36 }}
                    />
                    <img
                      src="/assets/icons/imgTriangle1.svg"
                      alt=""
                      style={{ position: 'absolute', left: 77, top: 88, width: 10, height: 12 }}
                    />
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      fontSize: 15,
                      fontWeight: 500,
                      lineHeight: '19px',
                      color: '#333333',
                      height: 38,
                      overflow: 'hidden',
                    }}
                  >
                    {card.title}
                  </div>
                  <div
                    style={{
                      marginTop: 6,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <img
                        src="/assets/images/img2.png"
                        alt=""
                        style={{ width: 22, height: 22, borderRadius: '50%' }}
                      />
                      <span style={{ fontSize: 12, fontWeight: 500, color: '#333333' }}>罗定</span>
                      <span style={{ fontSize: 12, color: '#666666' }}>肾病科</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <img src="/assets/icons/imgIcon4.svg" alt="" style={{ width: 11, height: 7 }} />
                      <span style={{ fontSize: 12, color: '#999999' }}>1567</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <button
          type="button"
          onClick={() => navigate('video-detail', { videoId: 'vid-1' })}
          style={{
            marginTop: 16,
            width: '100%',
            background: 'transparent',
            border: 'none',
            fontSize: 12,
            color: '#999999',
            cursor: 'pointer',
          }}
        >
          查看更多 ⌄
        </button>
      </div>
    </div>
  )
}

export function DoctorBioPage() {
  const { doctors, currentRoute, toggleFollowDoctor } = useAppStore()
  const doctorId = currentRoute.params?.doctorId || 'doc-luoding'
  const doc = doctors.find((d) => d.id === doctorId) || doctors[0]

  return (
    <div style={{ width: 375, minHeight: 812, backgroundColor: '#f6f7f9' }}>
      <NavBar title="医生简介" />
      <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 8,
            padding: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img
              src={doc.avatar}
              alt={doc.name}
              style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <div style={{ fontSize: 17, fontWeight: 600, color: '#333333' }}>
                {doc.name} <span style={{ fontSize: 13, fontWeight: 400 }}>{doc.title}</span>
              </div>
              <div style={{ fontSize: 13, color: '#666666', marginTop: 4 }}>
                {doc.hospital} · {doc.dept}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => toggleFollowDoctor(doc.id)}
            style={{
              height: 28,
              padding: '0 14px',
              borderRadius: 14,
              border: 'none',
              backgroundColor: doc.followed ? '#cccccc' : '#ff6058',
              color: '#ffffff',
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            {doc.followed ? '已关注' : '+ 关注'}
          </button>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: 8, padding: 16 }}>
          <h3 style={{ margin: '0 0 8px', fontSize: 15, color: '#333333' }}>专业擅长</h3>
          <p style={{ margin: 0, fontSize: 13, color: '#666666', lineHeight: '22px' }}>
            {doc.bio}
          </p>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: 8, padding: 16 }}>
          <h3 style={{ margin: '0 0 8px', fontSize: 15, color: '#333333' }}>多点执业医院</h3>
          {doc.multiHospitals.map((h) => (
            <div
              key={h}
              style={{
                padding: '8px 0',
                borderBottom: '0.5px solid #f0f0f0',
                fontSize: 13,
                color: '#333333',
              }}
            >
              {h}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function SpecialtyListPage() {
  const { navigate } = useAppStore()
  const specialties = [
    { name: '婴幼儿血管瘤', dept: '血管瘤科', count: 18, desc: '浅表型、深部型及混合型血管瘤微创激光诊疗' },
    { name: '脉管畸形', dept: '血管瘤科', count: 12, desc: '静脉畸形、淋巴管畸形及鲜红斑痣综合治疗' },
    { name: '慢性肾脏病', dept: '肾病科', count: 15, desc: '肾小球肾炎、肾病综合征及中西医结合慢病管理' },
    { name: '糖尿病与代谢病', dept: '内分泌科', count: 14, desc: '血糖精细化管理、并发症筛查与营养指导' },
    { name: '小儿脾胃调理', dept: '中医儿科', count: 9, desc: '积食、厌食、长夏脾虚湿困中药与推拿调理' },
  ]

  return (
    <div style={{ width: 375, minHeight: 812, backgroundColor: '#f6f7f9' }}>
      <NavBar title="专病专科" />
      <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {specialties.map((sp) => (
          <div
            key={sp.name}
            onClick={() => navigate('specialty-detail', { name: sp.name })}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 8,
              padding: 15,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ flex: 1, paddingRight: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 16, fontWeight: 600, color: '#333333' }}>{sp.name}</span>
                <span
                  style={{
                    fontSize: 11,
                    color: '#1478ff',
                    backgroundColor: '#eef5fe',
                    padding: '1px 6px',
                    borderRadius: 3,
                  }}
                >
                  {sp.dept}
                </span>
              </div>
              <p style={{ margin: '6px 0 0', fontSize: 12, color: '#666666', lineHeight: '18px' }}>
                {sp.desc}
              </p>
            </div>
            <span style={{ fontSize: 12, color: '#1478ff', whiteSpace: 'nowrap' }}>
              {sp.count}位专家 ›
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function SpecialtyDetailPage() {
  const { doctors, articles, navigate, currentRoute } = useAppStore()
  const [tab, setTab] = useState<'all' | 'doctors' | 'lectures' | 'knowledge'>('all')
  const titleName = currentRoute.params?.name || '血管瘤专病中心'

  return (
    <div style={{ width: 375, minHeight: 1200, backgroundColor: '#f6f7f9', paddingBottom: 30 }}>
      <NavBar title={titleName} />

      {/* 顶部专病插画 Banner (0:22525) */}
      <div style={{ padding: '10px 12px 0' }}>
        <img
          src="/assets/design-source/raster/e59f355b3f53669d9168b58854f9d35e3df34dc4.png"
          alt={titleName}
          style={{ width: 351, height: 168, borderRadius: 8, objectFit: 'cover', display: 'block' }}
        />
      </div>

      {/* 吸顶切换标签 (0:22826 / 0:23559 / 0:23366 / 0:23124) */}
      <div
        style={{
          marginTop: 10,
          backgroundColor: '#ffffff',
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          borderBottom: '0.5px solid #eeeeee',
        }}
      >
        {[
          { key: 'all' as const, label: '综合' },
          { key: 'doctors' as const, label: '医生推荐' },
          { key: 'lectures' as const, label: '名医讲堂' },
          { key: 'knowledge' as const, label: '血管瘤知识' },
        ].map((item) => {
          const active = tab === item.key
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(item.key)}
              style={{
                border: 'none',
                background: 'transparent',
                fontSize: 14,
                fontWeight: active ? 600 : 400,
                color: active ? '#1478ff' : '#333333',
                cursor: 'pointer',
                position: 'relative',
                height: 44,
                padding: 0,
              }}
            >
              {item.label}
              {active && (
                <span
                  style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    bottom: 0,
                    width: 20,
                    height: 3,
                    borderRadius: 1.5,
                    backgroundColor: '#1478ff',
                  }}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* 医生推荐模块 */}
      {(tab === 'all' || tab === 'doctors') && (
        <div style={{ margin: '10px 12px 0', backgroundColor: '#ffffff', borderRadius: 8, padding: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 16, fontWeight: 600, color: '#333333' }}>专家团队推荐</span>
            <button
              type="button"
              onClick={() => setTab('doctors')}
              style={{ border: 'none', background: 'transparent', fontSize: 12, color: '#999999', cursor: 'pointer' }}
            >
              更多 ›
            </button>
          </div>
          {doctors.map((doc) => (
            <div
              key={doc.id}
              onClick={() => navigate('doctor-studio', { doctorId: doc.id })}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: '0.5px solid #f2f2f2',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img
                  src={doc.avatar}
                  alt={doc.name}
                  style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#333333' }}>
                    {doc.name} <span style={{ fontSize: 12, fontWeight: 400, color: '#666666' }}>{doc.title}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#999999', marginTop: 3 }}>
                    {doc.hospital} · {doc.dept}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  navigate('inquiry-image-form', { doctorId: doc.id })
                }}
                style={{
                  height: 26,
                  padding: '0 12px',
                  borderRadius: 13,
                  border: 'none',
                  backgroundColor: '#eef5fe',
                  color: '#1478ff',
                  fontSize: 12,
                  cursor: 'pointer',
                }}
              >
                去问诊
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 名医讲堂模块 */}
      {(tab === 'all' || tab === 'lectures') && (
        <div style={{ margin: '10px 12px 0', backgroundColor: '#ffffff', borderRadius: 8, padding: 14 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#333333', marginBottom: 12 }}>
            名医讲堂
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {VIDEO_CARDS.slice(0, 2).map((v, i) => (
              <div
                key={v.id}
                onClick={() => navigate('live-replay', { liveId: `live-${i + 5}` })}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={i === 0 ? '/assets/images/imgWebp1.png' : '/assets/illustrations/imgWebp2.png'}
                  alt=""
                  style={{ width: '100%', height: 140, borderRadius: 6, objectFit: 'cover' }}
                />
                <div style={{ fontSize: 13, fontWeight: 500, color: '#333333', marginTop: 6 }}>
                  {v.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 血管瘤知识模块 */}
      {(tab === 'all' || tab === 'knowledge') && (
        <div style={{ margin: '10px 12px 0', backgroundColor: '#ffffff', borderRadius: 8, padding: 14 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#333333', marginBottom: 10 }}>
            血管瘤知识科普
          </div>
          {articles.slice(0, 3).map((art) => (
            <div
              key={art.id}
              onClick={() => navigate('article-detail', { articleId: art.id })}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: '0.5px solid #f2f2f2',
                cursor: 'pointer',
              }}
            >
              <div style={{ width: 210 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: '#333333', lineHeight: '20px' }}>
                  {art.title}
                </div>
                <div style={{ fontSize: 11, color: '#999999', marginTop: 8 }}>
                  {art.date} · {art.views}阅读
                </div>
              </div>
              <img
                src={art.thumb}
                alt=""
                style={{ width: 88, height: 64, borderRadius: 6, objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
