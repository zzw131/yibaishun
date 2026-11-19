import { useState } from 'react'
import { NavBar, StatusBar, WechatCapsule } from '../components/NavBar'
import { useAppStore } from '../store/appStore'

export function SearchPage() {
  const {
    searchHistory,
    doctors,
    articles,
    addSearchHistory,
    clearSearchHistory,
    navigate,
    goBack,
  } = useAppStore()
  const [keyword, setKeyword] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [confirmClearModal, setConfirmClearModal] = useState(false)
  const [activeCat, setActiveCat] = useState<'all' | 'doctor' | 'hospital' | 'dept' | 'news'>('all')

  const q = keyword.trim()
  const noResult = q === '无结果' || (submitted && q.length > 0 && q.includes('不存在'))

  const handleSearch = (kw: string) => {
    setKeyword(kw)
    if (kw.trim()) {
      addSearchHistory(kw.trim())
      setSubmitted(true)
    }
  }

  return (
    <div className="page-shell" style={{ backgroundColor: '#ffffff' }}>
      <div className="page-top" style={{ backgroundColor: '#ffffff' }}>
        <NavBar title="搜索" />

        {/* 搜索输入框 (0:1114 / 0:1037) */}
        <div
          style={{
            padding: '8px 15px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            borderBottom: '0.5px solid #f0f0f0',
          }}
        >
        <div
          style={{
            flex: 1,
            height: 34,
            borderRadius: 17,
            backgroundColor: '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            gap: 8,
          }}
        >
          <img src="/assets/icons/imgIconSearch.svg" alt="" style={{ width: 13, height: 13 }} />
          <input
            type="text"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value)
              setSubmitted(false)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch(keyword)
            }}
            placeholder="搜索医院、科室、医生、疾病、资讯"
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              fontSize: 13,
              color: '#333333',
            }}
          />
          {keyword && (
            <button
              type="button"
              onClick={() => {
                setKeyword('')
                setSubmitted(false)
              }}
              style={{
                border: 'none',
                background: 'transparent',
                color: '#999999',
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              ×
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={() => (keyword.trim() ? handleSearch(keyword) : goBack())}
          style={{
            border: 'none',
            background: 'transparent',
            color: '#1478ff',
            fontSize: 14,
            cursor: 'pointer',
            padding: 0,
          }}
        >
          {keyword.trim() ? '搜索' : '取消'}
        </button>
        </div>
      </div>

      <div className="page-scroll">
      {!q ? (
        <div style={{ padding: 15 }}>
          {/* 历史搜索 (0:1037) */}
          {searchHistory.length > 0 && (
            <div style={{ marginBottom: 22 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 12,
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 600, color: '#333333' }}>历史搜索</span>
                <button
                  type="button"
                  onClick={() => setConfirmClearModal(true)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    fontSize: 12,
                    color: '#999999',
                    cursor: 'pointer',
                  }}
                >
                  🗑 清空
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {searchHistory.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleSearch(item)}
                    style={{
                      height: 28,
                      padding: '0 12px',
                      borderRadius: 14,
                      border: 'none',
                      backgroundColor: '#f5f6f8',
                      color: '#333333',
                      fontSize: 12,
                      cursor: 'pointer',
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 热门搜索 */}
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#333333', marginBottom: 12 }}>
              热门搜索
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['婴幼儿血管瘤', '罗定', '北京长峰医院', '三伏天祛湿', '无结果'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleSearch(tag)}
                  style={{
                    height: 28,
                    padding: '0 12px',
                    borderRadius: 14,
                    border: 'none',
                    backgroundColor: tag === '无结果' ? '#fff2f0' : '#eef5fe',
                    color: tag === '无结果' ? '#ff4d4f' : '#1478ff',
                    fontSize: 12,
                    cursor: 'pointer',
                  }}
                >
                  {tag === '无结果' ? '测试无结果空态' : tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : noResult ? (
        /* 搜索无结果缺省页 (0:1510) */
        <div
          style={{
            paddingTop: 80,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            src="/assets/design-source/raster/411c58200b47aeea180a4c3ac193ffd16409f433.png"
            alt="暂无搜索结果"
            style={{ width: 187, height: 120, objectFit: 'contain' }}
          />
          <span style={{ marginTop: 14, fontSize: 14, color: '#999999' }}>
            未找到与“{q}”相关的结果
          </span>
          <button
            type="button"
            onClick={() => setKeyword('')}
            style={{
              marginTop: 16,
              height: 32,
              padding: '0 18px',
              borderRadius: 16,
              border: '1px solid #1478ff',
              backgroundColor: '#ffffff',
              color: '#1478ff',
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            清除搜索词重试
          </button>
        </div>
      ) : (
        /* 搜索结果页 (0:1821) */
        <div>
          <div
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 10,
              backgroundColor: '#ffffff',
              display: 'flex',
              justifyContent: 'space-around',
              height: 40,
              alignItems: 'center',
              borderBottom: '0.5px solid #eeeeee',
            }}
          >
            {[
              { key: 'all' as const, label: '综合' },
              { key: 'doctor' as const, label: '医生' },
              { key: 'hospital' as const, label: '医院' },
              { key: 'dept' as const, label: '科室/疾病' },
              { key: 'news' as const, label: '资讯' },
            ].map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setActiveCat(t.key)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  fontSize: 13,
                  fontWeight: activeCat === t.key ? 600 : 400,
                  color: activeCat === t.key ? '#1478ff' : '#333333',
                  cursor: 'pointer',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div style={{ padding: 15, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {(activeCat === 'all' || activeCat === 'doctor') && (
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#999999', marginBottom: 8 }}>
                  相关医生
                </div>
                {doctors.map((d) => (
                  <div
                    key={d.id}
                    onClick={() => navigate('doctor-studio', { doctorId: d.id })}
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
                        src={d.avatar}
                        alt={d.name}
                        style={{ width: 44, height: 44, borderRadius: '50%' }}
                      />
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: '#333333' }}>
                          {d.name} <span style={{ fontSize: 12, fontWeight: 400 }}>{d.title}</span>
                        </div>
                        <div style={{ fontSize: 12, color: '#666666', marginTop: 2 }}>
                          {d.hospital} · {d.dept}
                        </div>
                      </div>
                    </div>
                    <span style={{ fontSize: 12, color: '#1478ff' }}>进入工作室 ›</span>
                  </div>
                ))}
              </div>
            )}

            {(activeCat === 'all' || activeCat === 'hospital') && (
              <div
                onClick={() => navigate('reg-depts', { hospital: '北京长峰医院' })}
                style={{
                  padding: 12,
                  borderRadius: 8,
                  backgroundColor: '#f8f9fb',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#333333' }}>
                    北京长峰医院（二级专科医院）
                  </div>
                  <div style={{ fontSize: 12, color: '#666666', marginTop: 4 }}>
                    重点科室：血管瘤科、脉管畸形科、肾病科
                  </div>
                </div>
                <span style={{ fontSize: 12, color: '#1478ff' }}>去挂号 ›</span>
              </div>
            )}

            {(activeCat === 'all' || activeCat === 'dept') && (
              <div
                onClick={() => navigate('specialty-detail', { name: '血管瘤专病中心' })}
                style={{
                  padding: 12,
                  borderRadius: 8,
                  backgroundColor: '#eef5fe',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#1478ff' }}>
                    血管瘤专病中心
                  </div>
                  <div style={{ fontSize: 12, color: '#666666', marginTop: 4 }}>
                    名医团队在线问诊 · 脉冲激光微创诊疗
                  </div>
                </div>
                <span style={{ fontSize: 12, color: '#1478ff' }}>查看专病 ›</span>
              </div>
            )}

            {(activeCat === 'all' || activeCat === 'news') && (
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#999999', marginBottom: 8 }}>
                  相关健康资讯
                </div>
                {articles.slice(0, 2).map((a) => (
                  <div
                    key={a.id}
                    onClick={() => navigate('article-detail', { articleId: a.id })}
                    style={{
                      padding: '10px 0',
                      borderBottom: '0.5px solid #f2f2f2',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontSize: 14, fontWeight: 500, color: '#333333' }}>{a.title}</div>
                    <div style={{ fontSize: 11, color: '#999999', marginTop: 4 }}>
                      {a.date} · {a.views}阅读
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      </div>

      {/* 删除历史确认框 (0:1244) */}
      {confirmClearModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.45)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 280,
              backgroundColor: '#ffffff',
              borderRadius: 10,
              padding: 20,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 600, color: '#333333', marginBottom: 8 }}>
              提示
            </div>
            <div style={{ fontSize: 13, color: '#666666', marginBottom: 18 }}>
              确定清空全部历史搜索记录吗？
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                type="button"
                onClick={() => setConfirmClearModal(false)}
                style={{
                  flex: 1,
                  height: 36,
                  borderRadius: 18,
                  border: '1px solid #e5e5e5',
                  backgroundColor: '#ffffff',
                  color: '#666666',
                  cursor: 'pointer',
                }}
              >
                取消
              </button>
              <button
                type="button"
                onClick={() => {
                  clearSearchHistory()
                  setConfirmClearModal(false)
                }}
                style={{
                  flex: 1,
                  height: 36,
                  borderRadius: 18,
                  border: 'none',
                  backgroundColor: '#1478ff',
                  color: '#ffffff',
                  cursor: 'pointer',
                }}
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function LoginPage() {
  const { updateUserProfile, goBack, showToast } = useAppStore()
  const [step, setStep] = useState<'welcome' | 'phone' | 'captcha' | 'code' | 'help'>('welcome')
  const [phone, setPhone] = useState('13888210918')
  const [captchaVal, setCaptchaVal] = useState('')
  const [smsCode, setSmsCode] = useState('8821')

  const completeLogin = () => {
    updateUserProfile({ loggedIn: true, name: '李可可', phone: '138****0918' })
    showToast('登录成功')
    goBack()
  }

  return (
    <div className="page-shell" style={{ backgroundColor: '#ffffff' }}>
      <NavBar title="登录医百顺" />

      <div className="page-scroll">
      <div
        style={{
          padding: '36px 28px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          src="/assets/design-source/svg/0-35.svg"
          alt="医百顺"
          style={{ width: 156, height: 56, display: 'block', marginBottom: 32 }}
        />

        {step === 'welcome' && (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <button
              type="button"
              onClick={completeLogin}
              style={{
                width: '100%',
                height: 44,
                borderRadius: 22,
                border: 'none',
                backgroundColor: '#07c160',
                color: '#ffffff',
                fontSize: 15,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              微信一键快捷登录 (0:323)
            </button>
            <button
              type="button"
              onClick={() => setStep('phone')}
              style={{
                width: '100%',
                height: 44,
                borderRadius: 22,
                border: '1px solid #1478ff',
                backgroundColor: '#ffffff',
                color: '#1478ff',
                fontSize: 15,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              手机号验证码登录 (0:249)
            </button>
            <button
              type="button"
              onClick={() => setStep('help')}
              style={{
                marginTop: 8,
                border: 'none',
                background: 'transparent',
                color: '#999999',
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              登录遇到问题？(0:612)
            </button>
          </div>
        )}

        {(step === 'phone' || step === 'captcha') && (
          <div style={{ width: '100%' }}>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#333333', marginBottom: 16 }}>
              请输入手机号码
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="请输入11位手机号"
              style={{
                width: '100%',
                height: 44,
                border: 'none',
                borderBottom: '1px solid #e5e5e5',
                fontSize: 16,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            <button
              type="button"
              onClick={() => setStep('captcha')}
              style={{
                marginTop: 24,
                width: '100%',
                height: 44,
                borderRadius: 22,
                border: 'none',
                backgroundColor: '#1478ff',
                color: '#ffffff',
                fontSize: 15,
                cursor: 'pointer',
              }}
            >
              获取验证码
            </button>
          </div>
        )}

        {step === 'code' && (
          <div style={{ width: '100%' }}>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#333333', marginBottom: 6 }}>
              输入短信验证码 (0:175)
            </div>
            <div style={{ fontSize: 12, color: '#999999', marginBottom: 16 }}>
              验证码已发送至 {phone}
            </div>
            <input
              type="text"
              value={smsCode}
              onChange={(e) => setSmsCode(e.target.value)}
              placeholder="请输入4位验证码"
              style={{
                width: '100%',
                height: 44,
                border: 'none',
                borderBottom: '1px solid #1478ff',
                fontSize: 20,
                letterSpacing: 8,
                outline: 'none',
              }}
            />
            <button
              type="button"
              onClick={completeLogin}
              style={{
                marginTop: 24,
                width: '100%',
                height: 44,
                borderRadius: 22,
                border: 'none',
                backgroundColor: '#1478ff',
                color: '#ffffff',
                fontSize: 15,
                cursor: 'pointer',
              }}
            >
              确认登录
            </button>
          </div>
        )}

        {step === 'help' && (
          <div style={{ width: '100%' }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#333333', marginBottom: 12 }}>
              登录常见问题 (0:612)
            </div>
            <p style={{ fontSize: 13, color: '#666666', lineHeight: '22px' }}>
              1. 收不到短信验证码？请确认手机是否开启拦截，或点击图形验证码重新获取。
              <br />
              2. 原手机号已停用？可联系医百顺客服热线 010-88248999 协助变更绑定。
            </p>
            <button
              type="button"
              onClick={() => setStep('welcome')}
              style={{
                marginTop: 18,
                width: '100%',
                height: 40,
                borderRadius: 20,
                border: '1px solid #1478ff',
                backgroundColor: '#ffffff',
                color: '#1478ff',
                cursor: 'pointer',
              }}
            >
              返回登录
            </button>
          </div>
        )}
      </div>
      </div>

      {/* 图形验证码弹窗 (0:548) */}
      {step === 'captcha' && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.45)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 300,
              backgroundColor: '#ffffff',
              borderRadius: 10,
              padding: 20,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 600, color: '#333333', marginBottom: 12 }}>
              安全图形验证 (0:548)
            </div>
            <img
              src="/assets/design-source/raster/af46a9f992cacb1343d3f701d25c0aed57661d9d.png"
              alt="图形验证码"
              style={{ width: 160, height: 60, margin: '0 auto 12px', display: 'block' }}
            />
            <input
              type="text"
              value={captchaVal}
              onChange={(e) => setCaptchaVal(e.target.value)}
              placeholder="请输入上方图形字符"
              style={{
                width: '100%',
                height: 36,
                borderRadius: 6,
                border: '1px solid #dddddd',
                padding: '0 10px',
                boxSizing: 'border-box',
                marginBottom: 14,
              }}
            />
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                type="button"
                onClick={() => setStep('phone')}
                style={{
                  flex: 1,
                  height: 36,
                  borderRadius: 18,
                  border: '1px solid #e5e5e5',
                  backgroundColor: '#ffffff',
                  cursor: 'pointer',
                }}
              >
                取消
              </button>
              <button
                type="button"
                onClick={() => setStep('code')}
                style={{
                  flex: 1,
                  height: 36,
                  borderRadius: 18,
                  border: 'none',
                  backgroundColor: '#1478ff',
                  color: '#ffffff',
                  cursor: 'pointer',
                }}
              >
                验证并发送短信
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function RegHospitalsPage() {
  const { navigate } = useAppStore()
  const hospitals = [
    { name: '北京长峰医院', level: '二级甲等', type: '血管瘤专科医院', addr: '北京市丰台区靛厂路291号' },
    { name: '安徽医科大学第一附属医院', level: '三级甲等', type: '综合医院', addr: '合肥市蜀山区绩溪路218号' },
    { name: '上海长峰医院', level: '二级专科', type: '脉管病专科医院', addr: '上海市普陀区真南路1059号' },
    { name: '长沙长峰医院', level: '二级专科', type: '血管瘤专科医院', addr: '长沙市芙蓉区远大一路' },
  ]

  return (
    <div className="page-shell" style={{ backgroundColor: '#f6f7f9' }}>
      <NavBar title="预约挂号·选医院" />
      <div className="page-scroll">
      <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {hospitals.map((h) => (
          <div
            key={h.name}
            onClick={() => navigate('reg-depts', { hospital: h.name })}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 8,
              padding: 12,
              display: 'flex',
              gap: 12,
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <img
              src="/assets/design-source/raster/0cb7c9f40e0f79edbfa78d5af2b03c143785dcce.png"
              alt={h.name}
              style={{ width: 88, height: 64, borderRadius: 6, objectFit: 'cover', flexShrink: 0 }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#333333' }}>{h.name}</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                <span
                  style={{
                    fontSize: 10,
                    color: '#1478ff',
                    backgroundColor: '#eef5fe',
                    padding: '1px 5px',
                    borderRadius: 3,
                  }}
                >
                  {h.level}
                </span>
                <span style={{ fontSize: 11, color: '#666666' }}>{h.type}</span>
              </div>
              <div style={{ fontSize: 11, color: '#999999', marginTop: 6 }}>{h.addr}</div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}

export function RegDeptsPage() {
  const { navigate, currentRoute } = useAppStore()
  const hospital = currentRoute.params?.hospital || '北京长峰医院'
  const [selectedMain, setSelectedMain] = useState('专病特色科')

  const deptTree: Record<string, string[]> = {
    专病特色科: ['血管瘤科', '脉管畸形科', '激光微创美容科', '小儿血管瘤专病'],
    内科系统: ['肾病科', '内分泌科', '心血管内科', '消化内科'],
    外科系统: ['普通外科', '小儿外科', '介入血管外科'],
    中医与儿科: ['中医脾胃科', '儿科综合门诊'],
  }

  return (
    <div className="page-shell" style={{ backgroundColor: '#ffffff' }}>
      <div className="page-top" style={{ backgroundColor: '#ffffff' }}>
        <NavBar title={hospital} />

        {/* 医院头部卡片 (0:4021) */}
        <div
          style={{
            padding: 12,
            display: 'flex',
            gap: 10,
            borderBottom: '8px solid #f6f7f9',
            alignItems: 'center',
          }}
        >
          <img
            src="/assets/design-source/raster/0cb7c9f40e0f79edbfa78d5af2b03c143785dcce.png"
            alt=""
            style={{ width: 72, height: 52, borderRadius: 6, objectFit: 'cover' }}
          />
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#333333' }}>{hospital}</div>
            <div style={{ fontSize: 12, color: '#666666', marginTop: 4 }}>
              二级甲等 · 支持在线医保/自费预约挂号
            </div>
          </div>
        </div>
      </div>

      {/* 左右分栏科室选择 */}
      <div style={{ flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden' }}>
        <div style={{ width: 120, backgroundColor: '#f6f7f9', overflowY: 'auto' }}>
          {Object.keys(deptTree).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedMain(cat)}
              style={{
                width: '100%',
                height: 48,
                border: 'none',
                backgroundColor: selectedMain === cat ? '#ffffff' : 'transparent',
                color: selectedMain === cat ? '#1478ff' : '#333333',
                fontWeight: selectedMain === cat ? 600 : 400,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        <div style={{ flex: 1, padding: '0 14px', overflowY: 'auto' }}>
          {(deptTree[selectedMain] || []).map((sub) => (
            <div
              key={sub}
              onClick={() => navigate('reg-slots', { hospital, dept: sub })}
              style={{
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '0.5px solid #f0f0f0',
                fontSize: 14,
                color: '#333333',
                cursor: 'pointer',
              }}
            >
              <span>{sub}</span>
              <span style={{ color: '#999999' }}>›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function RegSlotsPage() {
  const { doctors, navigate, currentRoute } = useAppStore()
  const hospital = currentRoute.params?.hospital || '北京长峰医院'
  const dept = currentRoute.params?.dept || '血管瘤科'
  const [selectedDate, setSelectedDate] = useState('02-25 周五')
  const [slotModalDoctor, setSlotModalDoctor] = useState<string | null>(null)

  const dates = ['02-25 周五', '02-26 周六', '02-27 周日', '02-28 周一（无号）']
  const isNoSlotDay = selectedDate.includes('无号') || currentRoute.params?.frameId === '0:4222'

  return (
    <div className="page-shell" style={{ backgroundColor: '#f6f7f9' }}>
      <div className="page-top" style={{ backgroundColor: '#ffffff' }}>
        <NavBar title={`${dept}·号源列表`} />

        {/* 日期选择栏 (0:4084) */}
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '10px 12px',
            display: 'flex',
            gap: 8,
            overflowX: 'auto',
            borderBottom: '0.5px solid #eeeeee',
          }}
        >
        {dates.map((d) => {
          const active = selectedDate === d
          return (
            <button
              key={d}
              type="button"
              onClick={() => setSelectedDate(d)}
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                border: active ? '1px solid #1478ff' : '1px solid #eeeeee',
                backgroundColor: active ? '#eef5fe' : '#ffffff',
                color: active ? '#1478ff' : '#333333',
                fontSize: 12,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
              }}
            >
              {d}
            </button>
          )
        })}
        </div>
      </div>

      <div className="page-scroll">
      {isNoSlotDay ? (
        /* 无号源缺省页 (0:4222 / 0:114616) */
        <div
          style={{
            paddingTop: 80,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            src="/assets/design-source/raster/518e0b6e91246072eec4217ef1613c7b2b6b742a.png"
            alt="当前日期暂无号源"
            style={{ width: 187, height: 123, objectFit: 'contain' }}
          />
          <span style={{ marginTop: 12, fontSize: 14, color: '#999999' }}>
            当前日期暂无可预约号源
          </span>
          <button
            type="button"
            onClick={() => setSelectedDate('02-25 周五')}
            style={{
              marginTop: 16,
              height: 34,
              padding: '0 20px',
              borderRadius: 17,
              border: 'none',
              backgroundColor: '#1478ff',
              color: '#ffffff',
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            查看有号日期
          </button>
        </div>
      ) : (
        <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {doctors.map((doc) => (
            <div
              key={doc.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: 8,
                padding: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div
                onClick={() => navigate('doctor-studio', { doctorId: doc.id })}
                style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
              >
                <img
                  src={doc.avatar}
                  alt={doc.name}
                  style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#333333' }}>
                    {doc.name} <span style={{ fontSize: 12, fontWeight: 400 }}>{doc.title}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#666666', marginTop: 3 }}>
                    专家号 · 挂号费 <span style={{ color: '#ff5a59' }}>¥{doc.regFee}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSlotModalDoctor(doc.id)}
                style={{
                  height: 30,
                  padding: '0 14px',
                  borderRadius: 15,
                  border: 'none',
                  backgroundColor: '#1478ff',
                  color: '#ffffff',
                  fontSize: 12,
                  cursor: 'pointer',
                }}
              >
                有号 · 预约
              </button>
            </div>
          ))}
        </div>
      )}
      </div>

      {/* 选择就诊时间段弹框 (0:4329) */}
      {slotModalDoctor && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.45)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
          onClick={() => setSlotModalDoctor(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 375,
              backgroundColor: '#ffffff',
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              padding: '16px 16px 24px',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 600, color: '#333333', marginBottom: 14 }}>
              选择预约时段 ({selectedDate})
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {['上午 08:30-09:30', '上午 09:30-10:30', '下午 14:00-15:00', '下午 15:00-16:00'].map(
                (slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => {
                      const dId = slotModalDoctor
                      setSlotModalDoctor(null)
                      navigate('reg-confirm', {
                        doctorId: dId,
                        hospital,
                        dept,
                        slotTime: `2022-${selectedDate.slice(0, 5)} ${slot}`,
                      })
                    }}
                    style={{
                      height: 40,
                      borderRadius: 6,
                      border: '1px solid #1478ff',
                      backgroundColor: '#eef5fe',
                      color: '#1478ff',
                      fontSize: 13,
                      cursor: 'pointer',
                    }}
                  >
                    {slot} (余3)
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function RegConfirmPage() {
  const {
    doctors,
    patients,
    selectedPatientId,
    currentRoute,
    navigate,
    createRegistrationOrder,
  } = useAppStore()
  const docId = currentRoute.params?.doctorId || 'doc-luoding'
  const doc = doctors.find((d) => d.id === docId) || doctors[0]
  const pat = patients.find((p) => p.id === selectedPatientId) || patients[0]
  const hospital = currentRoute.params?.hospital || doc.hospital
  const dept = currentRoute.params?.dept || doc.dept
  const slotTime = currentRoute.params?.slotTime || '2022-02-25 上午 08:30-09:30'

  return (
    <div className="page-shell" style={{ backgroundColor: '#f6f7f9' }}>
      <NavBar title="确定挂号信息" />

      <div className="page-scroll">
      <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ backgroundColor: '#ffffff', borderRadius: 8, padding: 15 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#333333', marginBottom: 10 }}>
            {hospital} · {dept}
          </div>
          <div style={{ fontSize: 13, color: '#666666', lineHeight: '24px' }}>
            <div>接诊医生：{doc.name}（{doc.title}）</div>
            <div>就诊时间：{slotTime}</div>
            <div>
              医事服务费：<span style={{ color: '#ff5a59', fontWeight: 600 }}>¥{doc.regFee}.00</span>
            </div>
          </div>
        </div>

        {/* 选择就诊人 */}
        <div
          onClick={() => navigate('patient-select')}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 8,
            padding: 15,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <div>
            <div style={{ fontSize: 13, color: '#999999' }}>就诊人</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#333333', marginTop: 4 }}>
              {pat.name}（{pat.gender} · {pat.age}岁 · {pat.insuranceType}）
            </div>
          </div>
          <span style={{ fontSize: 13, color: '#1478ff' }}>切换就诊人 ›</span>
        </div>

        <button
          type="button"
          onClick={() => {
            const orderId = createRegistrationOrder({
              doctorId: doc.id,
              patientId: pat.id,
              hospital,
              dept,
              slotTime,
              amount: doc.regFee,
            })
            navigate('payment', { orderId, amount: doc.regFee, title: `${dept}预约挂号` })
          }}
          style={{
            marginTop: 12,
            height: 44,
            borderRadius: 22,
            border: 'none',
            backgroundColor: '#1478ff',
            color: '#ffffff',
            fontSize: 15,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          确认挂号并去支付 (¥{doc.regFee}.00)
        </button>
      </div>
      </div>
    </div>
  )
}

export function InquiryImageFormPage() {
  const {
    doctors,
    patients,
    selectedPatientId,
    currentRoute,
    navigate,
    createInquiryOrderAndConsult,
  } = useAppStore()
  const doctorId = currentRoute.params?.doctorId || 'doc-luoding'
  const doc = doctors.find((d) => d.id === doctorId) || doctors[0]
  const pat = patients.find((p) => p.id === selectedPatientId) || patients[0]

  const [symptom, setSymptom] = useState(
    '发现皮肤表面小红斑2周，想请罗医生看看是否需要激光干预治疗。',
  )
  const [feeType, setFeeType] = useState<'自费' | '医保'>('自费')
  const [uploadedCount, setUploadedCount] = useState(1)

  return (
    <div className="page-shell" style={{ backgroundColor: '#f6f7f9' }}>
      <NavBar title="填写病情·图文问诊" />

      <div className="page-scroll">
      <div style={{ padding: 12, paddingBottom: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* 选择问诊人 (0:3257) */}
        <div
          onClick={() => navigate('patient-select')}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 8,
            padding: 14,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <div>
            <span style={{ color: '#ff4d4f', marginRight: 4 }}>*</span>
            <span style={{ fontSize: 14, fontWeight: 500, color: '#333333' }}>选择问诊人</span>
          </div>
          <span style={{ fontSize: 14, color: '#1478ff' }}>
            {pat.name} ({pat.gender} {pat.age}岁) ›
          </span>
        </div>

        {/* 费用类型 */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 8,
            padding: 14,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 500, color: '#333333' }}>费别选择</span>
          <div style={{ display: 'flex', gap: 8 }}>
            {(['自费', '医保'] as const).map((ft) => (
              <button
                key={ft}
                type="button"
                onClick={() => setFeeType(ft)}
                style={{
                  height: 28,
                  padding: '0 14px',
                  borderRadius: 14,
                  border: feeType === ft ? '1px solid #1478ff' : '1px solid #dddddd',
                  backgroundColor: feeType === ft ? '#eef5fe' : '#ffffff',
                  color: feeType === ft ? '#1478ff' : '#666666',
                  fontSize: 12,
                  cursor: 'pointer',
                }}
              >
                {ft}
              </button>
            ))}
          </div>
        </div>

        {/* 病情描述与患处图片上传 */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: 8, padding: 14 }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: '#333333', marginBottom: 8 }}>
            <span style={{ color: '#ff4d4f', marginRight: 4 }}>*</span>病情描述
          </div>
          <textarea
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            rows={4}
            placeholder="请详细描述您的症状、持续时间、已做检查及用药情况..."
            style={{
              width: '100%',
              border: '1px solid #eeeeee',
              borderRadius: 6,
              padding: 10,
              fontSize: 13,
              boxSizing: 'border-box',
              outline: 'none',
            }}
          />

          <div style={{ fontSize: 13, color: '#666666', margin: '12px 0 8px' }}>
            上传患处照片或检查报告（选填）
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {uploadedCount > 0 && (
              <img
                src="/assets/design-source/raster/d976e2bc3f1828e2c5214b6a71a471d80debcc28.png"
                alt="已上传图片"
                style={{ width: 76, height: 76, borderRadius: 6, objectFit: 'cover' }}
              />
            )}
            <button
              type="button"
              onClick={() => setUploadedCount((c) => c + 1)}
              style={{
                width: 76,
                height: 76,
                border: 'none',
                padding: 0,
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              <img
                src="/assets/design-source/svg/0-3315.svg"
                alt="添加图片"
                style={{ width: 76, height: 76, display: 'block' }}
              />
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            const { orderId, consultationId } = createInquiryOrderAndConsult({
              type: 'image',
              doctorId: doc.id,
              patientId: pat.id,
              symptom,
              feeType,
              amount: doc.imageFee,
            })
            navigate('payment', {
              orderId,
              consultationId,
              amount: doc.imageFee,
              title: `${doc.name}医生·图文问诊`,
            })
          }}
          style={{
            marginTop: 10,
            height: 44,
            borderRadius: 22,
            border: 'none',
            backgroundColor: '#1478ff',
            color: '#ffffff',
            fontSize: 15,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          提交病情并支付 (¥{doc.imageFee}.00)
        </button>
      </div>
      </div>
    </div>
  )
}

export function InquiryAvFormPage() {
  const {
    doctors,
    patients,
    selectedPatientId,
    currentRoute,
    navigate,
    createInquiryOrderAndConsult,
  } = useAppStore()
  const doctorId = currentRoute.params?.doctorId || 'doc-luoding'
  const type: 'phone' | 'video' = currentRoute.params?.type === 'phone' ? 'phone' : 'video'
  const doc = doctors.find((d) => d.id === doctorId) || doctors[0]
  const pat = patients.find((p) => p.id === selectedPatientId) || patients[0]
  const fee = type === 'phone' ? doc.phoneFee : doc.videoFee
  const [appointTime, setAppointTime] = useState('今天 15:00-15:30')
  const [symptom, setSymptom] = useState('希望通过音视频详细咨询血管瘤激光术后恢复情况。')

  return (
    <div className="page-shell" style={{ backgroundColor: '#f6f7f9' }}>
      <NavBar title={type === 'phone' ? '电话问诊预约' : '视频问诊预约'} />

      <div className="page-scroll">
      <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div
          onClick={() => navigate('patient-select')}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 8,
            padding: 14,
            display: 'flex',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: 14, color: '#333333' }}>就诊人</span>
          <span style={{ fontSize: 14, color: '#1478ff' }}>{pat.name} ›</span>
        </div>

        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 8,
            padding: 14,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: 14, color: '#333333' }}>预约接听时间</span>
          <select
            value={appointTime}
            onChange={(e) => setAppointTime(e.target.value)}
            style={{
              border: '1px solid #e5e5e5',
              borderRadius: 4,
              padding: '4px 8px',
              fontSize: 13,
              color: '#1478ff',
            }}
          >
            <option>今天 15:00-15:30</option>
            <option>今天 16:00-16:30</option>
            <option>明天 09:30-10:00</option>
          </select>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: 8, padding: 14 }}>
          <div style={{ fontSize: 14, color: '#333333', marginBottom: 8 }}>病情简述</div>
          <textarea
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            rows={4}
            style={{
              width: '100%',
              border: '1px solid #eeeeee',
              borderRadius: 6,
              padding: 10,
              fontSize: 13,
              boxSizing: 'border-box',
            }}
          />
        </div>

        <button
          type="button"
          onClick={() => {
            const { orderId, consultationId } = createInquiryOrderAndConsult({
              type,
              doctorId: doc.id,
              patientId: pat.id,
              symptom,
              feeType: pat.insuranceType,
              amount: fee,
            })
            navigate('payment', {
              orderId,
              consultationId,
              amount: fee,
              title: `${doc.name}医生·${type === 'phone' ? '电话问诊' : '视频问诊'}`,
            })
          }}
          style={{
            marginTop: 10,
            height: 44,
            borderRadius: 22,
            border: 'none',
            backgroundColor: '#1478ff',
            color: '#ffffff',
            fontSize: 15,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          立即预约并支付 (¥{fee}.00)
        </button>
      </div>
      </div>
    </div>
  )
}

export function PatientSelectPage() {
  const { patients, selectedPatientId, setSelectedPatientId, navigate, goBack, currentRoute } =
    useAppStore()
  const isEmpty = Boolean(currentRoute.params?.empty) || patients.length === 0

  return (
    <div className="page-shell" style={{ backgroundColor: '#f6f7f9' }}>
      <NavBar title="选择就诊人" />

      <div className="page-scroll">
      {isEmpty ? (
        <div
          style={{
            paddingTop: 80,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            src="/assets/design-source/raster/00240760a2f75e24e56c2b9d15dd55080cd9a2b0.png"
            alt="暂未添加就诊人"
            style={{ width: 187, height: 120 }}
          />
          <span style={{ marginTop: 12, fontSize: 13, color: '#999999' }}>您还没有添加就诊人</span>
        </div>
      ) : (
        <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {patients.map((p) => {
            const active = p.id === selectedPatientId
            return (
              <div
                key={p.id}
                onClick={() => {
                  setSelectedPatientId(p.id)
                  goBack()
                }}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 8,
                  padding: 15,
                  border: active ? '1px solid #1478ff' : '1px solid transparent',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 16, fontWeight: 600, color: '#333333' }}>
                      {p.name}
                    </span>
                    <span style={{ fontSize: 12, color: '#666666' }}>
                      {p.gender} · {p.age}岁
                    </span>
                    {p.isDefault && (
                      <span
                        style={{
                          fontSize: 10,
                          color: '#1478ff',
                          backgroundColor: '#eef5fe',
                          padding: '1px 6px',
                          borderRadius: 3,
                        }}
                      >
                        默认
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: '#999999', marginTop: 6 }}>
                    身份证：{p.idCard} | 手机：{p.phone}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate('patient-edit', { patientId: p.id })
                  }}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: '#1478ff',
                    fontSize: 12,
                    cursor: 'pointer',
                  }}
                >
                  编辑
                </button>
              </div>
            )
          })}
        </div>
      )}

      <div style={{ padding: 12 }}>
        <button
          type="button"
          onClick={() => navigate('patient-edit')}
          style={{
            width: '100%',
            height: 44,
            borderRadius: 22,
            border: 'none',
            backgroundColor: '#1478ff',
            color: '#ffffff',
            fontSize: 15,
            cursor: 'pointer',
          }}
        >
          + 新增就诊人 (0:949)
        </button>
      </div>
      </div>
    </div>
  )
}

export function PatientEditPage() {
  const { patients, currentRoute, savePatient, goBack } = useAppStore()
  const editId = currentRoute.params?.patientId as string | undefined
  const existing = patients.find((p) => p.id === editId)

  const [name, setName] = useState(existing?.name || '')
  const [gender, setGender] = useState<'男' | '女'>(existing?.gender || '女')
  const [age, setAge] = useState(String(existing?.age || 28))
  const [idCard, setIdCard] = useState(existing?.idCard || '110101199508161234')
  const [phone, setPhone] = useState(existing?.phone || '13888210918')
  const [isDefault, setIsDefault] = useState(existing?.isDefault ?? true)

  return (
    <div className="page-shell" style={{ backgroundColor: '#f6f7f9' }}>
      <NavBar title={existing ? '修改就诊人' : '新增就诊人'} />
      <div className="page-scroll">
      <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ backgroundColor: '#ffffff', borderRadius: 8, padding: '4px 14px' }}>
          <div
            style={{
              height: 46,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '0.5px solid #f0f0f0',
            }}
          >
            <span style={{ fontSize: 14, color: '#333333' }}>姓名</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="请输入真实姓名"
              style={{ border: 'none', textAlign: 'right', outline: 'none', fontSize: 14 }}
            />
          </div>

          <div
            style={{
              height: 46,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '0.5px solid #f0f0f0',
            }}
          >
            <span style={{ fontSize: 14, color: '#333333' }}>性别</span>
            <div style={{ display: 'flex', gap: 10 }}>
              {(['女', '男'] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  style={{
                    padding: '3px 12px',
                    borderRadius: 12,
                    border: gender === g ? '1px solid #1478ff' : '1px solid #dddddd',
                    backgroundColor: gender === g ? '#eef5fe' : '#ffffff',
                    color: gender === g ? '#1478ff' : '#666666',
                    fontSize: 12,
                    cursor: 'pointer',
                  }}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              height: 46,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '0.5px solid #f0f0f0',
            }}
          >
            <span style={{ fontSize: 14, color: '#333333' }}>年龄</span>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              style={{ border: 'none', textAlign: 'right', outline: 'none', fontSize: 14, width: 80 }}
            />
          </div>

          <div
            style={{
              height: 46,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '0.5px solid #f0f0f0',
            }}
          >
            <span style={{ fontSize: 14, color: '#333333' }}>证件号码</span>
            <input
              type="text"
              value={idCard}
              onChange={(e) => setIdCard(e.target.value)}
              style={{ border: 'none', textAlign: 'right', outline: 'none', fontSize: 14, width: 190 }}
            />
          </div>

          <div
            style={{
              height: 46,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '0.5px solid #f0f0f0',
            }}
          >
            <span style={{ fontSize: 14, color: '#333333' }}>手机号码</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ border: 'none', textAlign: 'right', outline: 'none', fontSize: 14 }}
            />
          </div>

          <div
            style={{
              height: 46,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontSize: 14, color: '#333333' }}>设为默认就诊人</span>
            <input
              type="checkbox"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            savePatient({
              id: existing?.id,
              name: name.trim() || '张晓靖',
              gender,
              age: Number(age) || 28,
              idCard,
              phone,
              relation: '本人',
              isDefault,
              insuranceType: '医保',
            })
            goBack()
          }}
          style={{
            marginTop: 12,
            height: 44,
            borderRadius: 22,
            border: 'none',
            backgroundColor: '#1478ff',
            color: '#ffffff',
            fontSize: 15,
            cursor: 'pointer',
          }}
        >
          保存并返回
        </button>
      </div>
      </div>
    </div>
  )
}

export function ChatFreePage() {
  const { consultations, currentRoute, sendChatMessage, navigate } = useAppStore()
  const conId = currentRoute.params?.consultationId || 'con-free-1'
  const con = consultations.find((c) => c.id === conId) || consultations[0]
  const [showTeamMembers, setShowTeamMembers] = useState(Boolean(currentRoute.params?.showTeam))
  const [inputText, setInputText] = useState('')

  return (
    <div className="page-shell" style={{ backgroundColor: '#f6f7f9' }}>
      <div className="page-top" style={{ backgroundColor: '#ffffff' }}>
        <NavBar title="刘丹专家团队（4）" />

        {/* 顶部团队成员展开条 (0:16194 / 0:45233) */}
        <div style={{ backgroundColor: '#ffffff', padding: '10px 15px', borderBottom: '0.5px solid #eeeeee' }}>
        <div
          onClick={() => setShowTeamMembers((v) => !v)}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: 13, color: '#333333', fontWeight: 500 }}>
            专家团队成员：刘丹、罗定、王亚飞、专属医助
          </span>
          <span style={{ fontSize: 12, color: '#1478ff' }}>
            {showTeamMembers ? '收起 ▴' : '展开 ▾'}
          </span>
        </div>

        {showTeamMembers && (
          <div style={{ display: 'flex', gap: 16, marginTop: 12, paddingTop: 10, borderTop: '0.5px solid #f5f5f5' }}>
            {[
              { name: '刘丹', role: '主任医师', id: 'doc-liudan' },
              { name: '罗定', role: '主治医师', id: 'doc-luoding' },
              { name: '王亚飞', role: '主治医生', id: 'doc-wangyafei' },
              { name: '李医助', role: '医学助理', id: 'doc-luoding' },
            ].map((m) => (
              <div
                key={m.name}
                onClick={() => navigate('doctor-studio', { doctorId: m.id })}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <img
                  src="/assets/images/avatar-fill-original.png"
                  alt={m.name}
                  style={{ width: 40, height: 40, borderRadius: '50%' }}
                />
                <span style={{ fontSize: 12, color: '#333333', marginTop: 4 }}>{m.name}</span>
                <span style={{ fontSize: 10, color: '#999999' }}>{m.role}</span>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>

      {/* 聊天消息流 */}
      <div className="page-scroll">
      <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {con.messages.map((m) => {
          const isMe = m.sender === 'patient'
          return (
            <div
              key={m.id}
              style={{
                display: 'flex',
                flexDirection: isMe ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
                gap: 10,
              }}
            >
              <img
                src={
                  isMe
                    ? '/assets/extracted/mine-avatar.png'
                    : m.avatar || '/assets/extracted/studio-assistant.png'
                }
                alt=""
                style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover' }}
              />
              <div style={{ maxWidth: 250 }}>
                <div
                  style={{
                    fontSize: 11,
                    color: '#999999',
                    marginBottom: 4,
                    textAlign: isMe ? 'right' : 'left',
                  }}
                >
                  {m.senderName} · {m.time}
                </div>
                <div
                  style={{
                    backgroundColor: isMe ? '#1478ff' : '#ffffff',
                    color: isMe ? '#ffffff' : '#333333',
                    padding: '10px 12px',
                    borderRadius: 8,
                    fontSize: 14,
                    lineHeight: '20px',
                  }}
                >
                  {m.text}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      </div>

      {/* 底部发送栏 */}
      <div
        className="page-bottom-bar"
        style={{
          height: 54,
          backgroundColor: '#ffffff',
          borderTop: '0.5px solid #eeeeee',
          padding: '0 12px',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendChatMessage(con.id, inputText)
              setInputText('')
            }
          }}
          placeholder="请输入咨询内容..."
          style={{
            flex: 1,
            height: 36,
            borderRadius: 18,
            border: 'none',
            backgroundColor: '#f5f5f5',
            padding: '0 14px',
            fontSize: 13,
            outline: 'none',
          }}
        />
        <button
          type="button"
          onClick={() => {
            sendChatMessage(con.id, inputText)
            setInputText('')
          }}
          style={{
            height: 34,
            padding: '0 14px',
            borderRadius: 17,
            border: 'none',
            backgroundColor: '#1478ff',
            color: '#ffffff',
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          发送
        </button>
      </div>
    </div>
  )
}

export function ChatImagePage() {
  const { consultations, currentRoute, sendChatMessage, navigate } = useAppStore()
  const conId = currentRoute.params?.consultationId || 'con-img-1'
  const con = consultations.find((c) => c.id === conId) || consultations[consultations.length - 1]
  const isRealtime = Boolean(currentRoute.params?.realtime)
  const [text, setText] = useState('')

  return (
    <div className="page-shell" style={{ backgroundColor: '#f6f7f9' }}>
      <div className="page-top" style={{ backgroundColor: '#ffffff' }}>
        <NavBar title={isRealtime ? '实时在线问诊' : `${con.doctorName}医生·图文问诊`} />

        {/* 顶部病情摘要与操作条 (0:4895 / 0:5505) */}
        <div
        style={{
          backgroundColor: '#ffffff',
          padding: '10px 14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '0.5px solid #eeeeee',
        }}
      >
        <span style={{ fontSize: 12, color: '#666666' }}>
          患者：{con.patientName} | 状态：{con.status}
        </span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            type="button"
            onClick={() => navigate('consult-summary', { consultationId: con.id })}
            style={{
              height: 24,
              padding: '0 8px',
              borderRadius: 12,
              border: '1px solid #1478ff',
              backgroundColor: '#ffffff',
              color: '#1478ff',
              fontSize: 11,
              cursor: 'pointer',
            }}
          >
            问诊小结
          </button>
          <button
            type="button"
            onClick={() => navigate('prescription', { prescriptionId: con.prescriptionId || 'rx-1' })}
            style={{
              height: 24,
              padding: '0 8px',
              borderRadius: 12,
              border: '1px solid #1478ff',
              backgroundColor: '#eef5fe',
              color: '#1478ff',
              fontSize: 11,
              cursor: 'pointer',
            }}
          >
            电子处方
          </button>
          <button
            type="button"
            onClick={() => navigate('consult-review', { consultationId: con.id })}
            style={{
              height: 24,
              padding: '0 8px',
              borderRadius: 12,
              border: '1px solid #f47528',
              backgroundColor: '#fff8f3',
              color: '#f47528',
              fontSize: 11,
              cursor: 'pointer',
            }}
          >
            {con.reviewed ? '已评价' : '去评价'}
          </button>
        </div>
        </div>
      </div>

      {/* 消息列表 */}
      <div className="page-scroll">
      <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {con.messages.map((m) => {
          if (m.type === 'prescription') {
            return (
              <div
                key={m.id}
                onClick={() =>
                  navigate('prescription', { prescriptionId: m.prescriptionId || 'rx-1' })
                }
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 8,
                  padding: 14,
                  border: '1px solid #d4e6ff',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#1478ff' }}>
                    📄 电子处方笺 (点击查看详情并购药)
                  </span>
                  <span style={{ fontSize: 12, color: '#1478ff' }}>查看 ›</span>
                </div>
                <div style={{ fontSize: 12, color: '#666666', marginTop: 6 }}>
                  临床诊断：{con.summaryDiagnosis || '浅表型血管瘤'}
                </div>
              </div>
            )
          }

          if (m.type === 'summary') {
            return (
              <div
                key={m.id}
                onClick={() => navigate('consult-summary', { consultationId: con.id })}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 8,
                  padding: 14,
                  border: '1px solid #e5e5e5',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#333333' }}>
                    📋 医生问诊小结
                  </span>
                  <span style={{ fontSize: 12, color: '#1478ff' }}>详情 ›</span>
                </div>
                <div style={{ fontSize: 12, color: '#666666', marginTop: 6 }}>
                  {con.summaryAdvice || '按医嘱规律外敷并定期复查。'}
                </div>
              </div>
            )
          }

          const isMe = m.sender === 'patient'
          return (
            <div
              key={m.id}
              style={{
                display: 'flex',
                flexDirection: isMe ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
                gap: 10,
              }}
            >
              <img
                src={isMe ? '/assets/extracted/mine-avatar.png' : '/assets/images/avatar-fill-original.png'}
                alt=""
                style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover' }}
              />
              <div style={{ maxWidth: 250 }}>
                <div
                  style={{
                    backgroundColor: isMe ? '#1478ff' : '#ffffff',
                    color: isMe ? '#ffffff' : '#333333',
                    padding: '10px 12px',
                    borderRadius: 8,
                    fontSize: 14,
                    lineHeight: '20px',
                  }}
                >
                  {m.text}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      </div>

      <div
        className="page-bottom-bar"
        style={{
          height: 54,
          backgroundColor: '#ffffff',
          borderTop: '0.5px solid #eeeeee',
          padding: '0 12px',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="输入消息继续与医生沟通..."
          style={{
            flex: 1,
            height: 36,
            borderRadius: 18,
            border: 'none',
            backgroundColor: '#f5f5f5',
            padding: '0 14px',
            fontSize: 13,
            outline: 'none',
          }}
        />
        <button
          type="button"
          onClick={() => {
            sendChatMessage(con.id, text)
            setText('')
          }}
          style={{
            height: 34,
            padding: '0 14px',
            borderRadius: 17,
            border: 'none',
            backgroundColor: '#1478ff',
            color: '#ffffff',
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          发送
        </button>
      </div>
    </div>
  )
}

export function ChatAvPage() {
  const { consultations, currentRoute, navigate } = useAppStore()
  const conId = currentRoute.params?.consultationId || 'con-vid-1'
  const con = consultations.find((c) => c.id === conId) || consultations[4]
  const mode = currentRoute.params?.mode || con.type

  return (
    <div className="page-shell" style={{ backgroundColor: '#f6f7f9' }}>
      <NavBar title={mode === 'phone' ? '电话问诊会话' : '视频问诊会话'} />

      <div className="page-scroll">
      <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ backgroundColor: '#ffffff', borderRadius: 8, padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <img
                src={con.avatar}
                alt={con.doctorName}
                style={{ width: 48, height: 48, borderRadius: '50%' }}
              />
              <div>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#333333' }}>
                  {con.doctorName} <span style={{ fontSize: 12, fontWeight: 400 }}>{con.doctorTitle}</span>
                </div>
                <div style={{ fontSize: 12, color: '#666666', marginTop: 3 }}>{con.hospital}</div>
              </div>
            </div>
            <span style={{ fontSize: 12, color: '#f47528' }}>{con.status}</span>
          </div>

          <div
            style={{
              marginTop: 14,
              paddingTop: 12,
              borderTop: '0.5px solid #f0f0f0',
              fontSize: 13,
              color: '#666666',
            }}
          >
            病情主诉：{con.symptom}
          </div>

          {/* 发起语音/视频通话按钮 (0:5041 -> 0:6423 / 0:6549) */}
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button
              type="button"
              onClick={() => navigate('call-room', { mode: 'voice' })}
              style={{
                flex: 1,
                height: 38,
                borderRadius: 19,
                border: '1px solid #1478ff',
                backgroundColor: '#eef5fe',
                color: '#1478ff',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              📞 发起语音通话
            </button>
            <button
              type="button"
              onClick={() => navigate('call-room', { mode: 'video' })}
              style={{
                flex: 1,
                height: 38,
                borderRadius: 19,
                border: 'none',
                backgroundColor: '#1478ff',
                color: '#ffffff',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              📹 发起视频通话
            </button>
          </div>
        </div>

        {/* 关联小结、处方与评价 */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: 8, padding: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#333333', marginBottom: 12 }}>
            诊疗结果与服务
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div
              onClick={() => navigate('consult-summary', { consultationId: con.id })}
              style={{
                padding: 12,
                borderRadius: 6,
                backgroundColor: '#f8f9fb',
                display: 'flex',
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: 13, color: '#333333' }}>📋 查看问诊小结 (0:56121)</span>
              <span style={{ fontSize: 12, color: '#1478ff' }}>查看 ›</span>
            </div>

            <div
              onClick={() => navigate('prescription', { prescriptionId: con.prescriptionId || 'rx-1' })}
              style={{
                padding: 12,
                borderRadius: 6,
                backgroundColor: '#f8f9fb',
                display: 'flex',
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: 13, color: '#333333' }}>💊 查看电子处方笺 (0:7317)</span>
              <span style={{ fontSize: 12, color: '#1478ff' }}>去购药 ›</span>
            </div>

            <div
              onClick={() => navigate('consult-review', { consultationId: con.id })}
              style={{
                padding: 12,
                borderRadius: 6,
                backgroundColor: '#fff8f3',
                display: 'flex',
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: 13, color: '#f47528' }}>
                ⭐ 服务评价 ({con.reviewed ? '已完成评价' : '去评价 0:6784'})
              </span>
              <span style={{ fontSize: 12, color: '#f47528' }}>进入 ›</span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export function CallRoomPage() {
  const { currentRoute, goBack } = useAppStore()
  const initialMode = currentRoute.params?.mode === 'voice' ? 'voice' : 'video'
  const [callState, setCallState] = useState<'waiting' | 'connected'>('waiting')

  return (
    <div
      className="page-shell"
      style={{
        backgroundColor: '#1f2633',
        color: '#ffffff',
      }}
    >
      {initialMode === 'video' && callState === 'connected' && (
        <img
          src="/assets/design-source/raster/5422da4c9d29e9d6d98236929417e3f92b236b95.png"
          alt="视频通话"
          style={{ position: 'absolute', inset: 0, width: 375, height: '100%', objectFit: 'cover' }}
        />
      )}

      <StatusBar light />
      <WechatCapsule top={28} light />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          paddingTop: 110,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          src="/assets/images/avatar-fill-original.png"
          alt="罗定"
          style={{
            width: 88,
            height: 88,
            borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.6)',
          }}
        />
        <div style={{ fontSize: 20, fontWeight: 600, marginTop: 14 }}>罗定 主治医师</div>
        <div style={{ fontSize: 13, opacity: 0.85, marginTop: 6 }}>
          {callState === 'waiting'
            ? `正在呼叫医生（${initialMode === 'voice' ? '语音通话 0:6423' : '视频通话 0:6549'}）...`
            : `通话中 02:18（${initialMode === 'voice' ? '0:6490' : '0:6621'}）`}
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 64,
          width: 375,
          display: 'flex',
          justifyContent: 'center',
          gap: 44,
          zIndex: 20,
        }}
      >
        {callState === 'waiting' && (
          <button
            type="button"
            onClick={() => setCallState('connected')}
            style={{
              width: 68,
              height: 68,
              borderRadius: '50%',
              border: 'none',
              backgroundColor: '#07c160',
              color: '#ffffff',
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            模拟接通
          </button>
        )}
        <button
          type="button"
          onClick={goBack}
          style={{
            width: 68,
            height: 68,
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#ff4d4f',
            color: '#ffffff',
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          挂断返回
        </button>
      </div>
    </div>
  )
}

export function ConsultSummaryPage() {
  const { consultations, currentRoute, navigate } = useAppStore()
  const conId = currentRoute.params?.consultationId || 'con-img-1'
  const con = consultations.find((c) => c.id === conId) || consultations[0]

  return (
    <div className="page-shell" style={{ backgroundColor: '#f6f7f9' }}>
      <NavBar title="问诊小结" />
      <div className="page-scroll">
      <div style={{ padding: 12 }}>
        <div style={{ backgroundColor: '#ffffff', borderRadius: 8, padding: 16 }}>
          <div
            style={{
              fontSize: 17,
              fontWeight: 600,
              color: '#333333',
              textAlign: 'center',
              paddingBottom: 12,
              borderBottom: '0.5px solid #eeeeee',
            }}
          >
            北京长峰医院 · 互联网诊疗问诊小结
          </div>
          <div style={{ fontSize: 13, color: '#666666', lineHeight: '26px', marginTop: 12 }}>
            <div>患者姓名：{con.patientName}</div>
            <div>问诊类型：{con.type === 'video' ? '视频问诊' : '图文问诊'}</div>
            <div>主诉症状：{con.symptom}</div>
            <div>
              初步诊断：
              <span style={{ color: '#333333', fontWeight: 500 }}>
                {con.summaryDiagnosis || '浅表型婴幼儿血管瘤'}
              </span>
            </div>
            <div>
              处理建议：
              <span style={{ color: '#333333' }}>
                {con.summaryAdvice || '按电子处方外敷，保持局部清洁干燥，1个月后复诊。'}
              </span>
            </div>
            <div style={{ marginTop: 8 }}>接诊医师：{con.doctorName}（主治医师）</div>
          </div>

          <button
            type="button"
            onClick={() => navigate('prescription', { prescriptionId: con.prescriptionId || 'rx-1' })}
            style={{
              marginTop: 18,
              width: '100%',
              height: 40,
              borderRadius: 20,
              border: 'none',
              backgroundColor: '#1478ff',
              color: '#ffffff',
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            查看关联电子处方笺
          </button>
        </div>
      </div>
      </div>
    </div>
  )
}

export function ConsultReviewPage() {
  const { consultations, currentRoute, submitConsultReview, goBack } = useAppStore()
  const conId = currentRoute.params?.consultationId || 'con-img-1'
  const con = consultations.find((c) => c.id === conId) || consultations[0]
  const [rating, setRating] = useState(con.rating || 5)
  const [content, setContent] = useState(
    con.reviewContent || '非常好的医生，专业细心，解答非常清楚！',
  )
  const [submitted, setSubmitted] = useState(Boolean(con.reviewed || currentRoute.params?.done))

  return (
    <div className="page-shell" style={{ backgroundColor: '#f6f7f9' }}>
      <NavBar title={submitted ? '评价详情' : '服务评价'} />

      <div className="page-scroll">
      <div style={{ padding: 12 }}>
        <div style={{ backgroundColor: '#ffffff', borderRadius: 8, padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <img
              src={con.avatar}
              alt={con.doctorName}
              style={{ width: 44, height: 44, borderRadius: '50%' }}
            />
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#333333' }}>
                {con.doctorName} <span style={{ fontSize: 12, fontWeight: 400 }}>{con.doctorTitle}</span>
              </div>
              <div style={{ fontSize: 12, color: '#999999' }}>{con.hospital}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <span style={{ fontSize: 14, color: '#333333' }}>综合评分：</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                disabled={submitted}
                onClick={() => setRating(star)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  fontSize: 22,
                  color: star <= rating ? '#ffb400' : '#dddddd',
                  cursor: submitted ? 'default' : 'pointer',
                  padding: 0,
                }}
              >
                ★
              </button>
            ))}
          </div>

          {submitted ? (
            <div
              style={{
                backgroundColor: '#f8f9fb',
                borderRadius: 6,
                padding: 12,
                fontSize: 13,
                color: '#333333',
                lineHeight: '20px',
              }}
            >
              <div>已提交评价（{rating}星）：</div>
              <div style={{ marginTop: 6 }}>{content}</div>
            </div>
          ) : (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              placeholder="分享您的问诊体验，帮助更多患者..."
              style={{
                width: '100%',
                border: '1px solid #eeeeee',
                borderRadius: 6,
                padding: 10,
                fontSize: 13,
                boxSizing: 'border-box',
              }}
            />
          )}

          <button
            type="button"
            onClick={() => {
              if (!submitted) {
                submitConsultReview(con.id, rating, content)
                setSubmitted(true)
              } else {
                goBack()
              }
            }}
            style={{
              marginTop: 16,
              width: '100%',
              height: 42,
              borderRadius: 21,
              border: 'none',
              backgroundColor: '#1478ff',
              color: '#ffffff',
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            {submitted ? '返回会话' : '提交评价 (0:6784 → 0:6908)'}
          </button>
        </div>
      </div>
      </div>
    </div>
  )
}
