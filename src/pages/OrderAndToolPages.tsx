import React, { useState } from 'react'
import { NavBar } from '../components/NavBar'
import { useAppStore, type OrderRecord } from '../store/appStore'
import { FRAME_META_MAP } from '../data/frameCatalogMeta'

/**
 * 订单列表 (0:54446 / 0:114700 缺省页)
 * 尺寸: 375 × 1403 px
 * 严格还原 0-54446.png:
 * - 顶部导航 + 5个状态Tab: 全部 / 待付款 / 进行中 / 已完成 / 已取消
 * - 开发票入口栏 (y=102, h=29, #EBF6FF 背景, "开发票 >")
 * - 西药药品待付款卡片（含订单一、订单二、订单三 3个子订单 + 取消订单/立即付款）
 * - 检查检验待付款卡片
 * - 中药药品进行中卡片（申请售后 / 确认收货）
 * - 图文问诊已完成卡片（查看问诊记录）
 * - 西药药品已取消卡片（含订单一、订单二、订单三）
 */
export function OrdersPage() {
  const {
    currentRoute,
    orders,
    navigate,
    goBack,
    cancelOrder,
    confirmReceiveOrder,
  } = useAppStore()

  const initialTab = (currentRoute.params?.status as string) || '全部'
  const isForcedEmpty = Boolean(currentRoute.params?.empty)
  const [activeStatus, setActiveStatus] = useState<string>(initialTab)
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null)
  const [cancelReason, setCancelReason] = useState<string>('临时不需要了')

  const statusTabs = ['全部', '待付款', '进行中', '已完成', '已取消']
  const filteredOrders = isForcedEmpty
    ? []
    : activeStatus === '全部'
      ? orders
      : orders.filter((o) => o.status === activeStatus)

  const getStatusColor = (status: OrderRecord['status']) => {
    if (status === '待付款') return '#ff5a5a'
    if (status === '进行中') return '#1c96ff'
    return '#8f939a'
  }

  return (
    <div
      data-frame-id="0:54446"
      className="relative w-[375px] min-h-[667px] bg-[#f6f6f6] pb-[30px]"
    >
      <div className="bg-white">
        <NavBar title="订单列表" onBack={goBack} />
        {/* 5状态Tab (y=64..102) */}
        <div className="h-[38px] flex items-center justify-around px-[8px] bg-white">
          {statusTabs.map((st) => {
            const active = activeStatus === st
            return (
              <button
                key={st}
                type="button"
                onClick={() => setActiveStatus(st)}
                className="relative h-full flex items-center justify-center px-[6px] bg-transparent border-0 cursor-pointer"
              >
                <span
                  className={
                    active
                      ? 'text-[#333333] text-[15px] font-semibold'
                      : 'text-[#8c9298] text-[14px] font-normal'
                  }
                >
                  {st}
                </span>
                {active && (
                  <span className="absolute bottom-[2px] left-1/2 -translate-x-1/2 w-[16px] h-[3px] rounded-[2px] bg-[#1890ff]" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* 开发票提示条 (y=102, h=29) */}
      <button
        type="button"
        onClick={() => navigate('invoice-select')}
        className="w-full h-[29px] bg-[#ebf6ff] px-[15px] flex items-center justify-end gap-[4px] border-0 cursor-pointer"
      >
        <span className="text-[#2b9aff] text-[12px]">开发票</span>
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
          <path
            d="M1 1L5 5L1 9"
            stroke="#2B9AFF"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* 订单卡片列表 */}
      {filteredOrders.length === 0 ? (
        <div
          data-frame-id="0:114700"
          className="pt-[90px] flex flex-col items-center justify-center"
        >
          <img
            src="/frames/empty-states/208-2918.png"
            alt="暂无订单"
            className="w-[180px] h-[180px] object-contain"
          />
          <p className="mt-[8px] text-[#999999] text-[14px]">暂无相关订单数据</p>
        </div>
      ) : (
        <div className="px-[10px] pt-[10px] space-y-[10px]">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              onClick={() => navigate('order-detail', { orderId: order.id })}
              className="bg-white rounded-[8px] px-[15px] py-[14px] shadow-[0px_1px_6px_rgba(0,0,0,0.03)] cursor-pointer"
            >
              {/* 卡片头部 */}
              <div className="flex items-center justify-between pb-[11px] border-b border-[#f2f2f2]">
                <span className="text-[#333333] text-[15px] font-medium">
                  {order.category}
                </span>
                <span
                  className="text-[13px] font-normal"
                  style={{ color: getStatusColor(order.status) }}
                >
                  {order.status}
                </span>
              </div>

              {/* 基本信息 */}
              <div className="pt-[11px] space-y-[6px] text-[13px] leading-[19px]">
                <div className="flex items-center">
                  <span className="text-[#666666] w-[66px] shrink-0">就诊人：</span>
                  <span className="text-[#333333]">{order.patientName}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-[#666666] w-[66px] shrink-0">医院：</span>
                  <span className="text-[#333333]">{order.hospital}</span>
                </div>
                {!order.subOrders && (
                  <>
                    <div className="flex items-center">
                      <span className="text-[#666666] w-[66px] shrink-0">总金额：</span>
                      <span className="text-[#333333]">¥{order.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[#666666] w-[66px] shrink-0">时间：</span>
                      <span className="text-[#333333]">{order.time}</span>
                    </div>
                  </>
                )}
              </div>

              {/* 子订单列表（西药药品合并订单一、订单二、订单三） */}
              {order.subOrders && order.subOrders.length > 0 && (
                <div className="mt-[8px] space-y-[6px]">
                  {order.subOrders.map((sub) => (
                    <div
                      key={sub.id}
                      className="bg-[#f7f7f7] rounded-[4px] px-[10px] py-[8px] space-y-[4px] text-[12px]"
                    >
                      <div className="text-[#333333] font-medium">{sub.title}</div>
                      <div className="text-[#666666]">
                        总金额：<span className="text-[#333333]">¥{sub.amount.toFixed(2)}</span>
                      </div>
                      <div className="text-[#666666]">
                        时间：<span className="text-[#333333]">{sub.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 底部操作按钮栏 */}
              {order.status !== '已取消' && (
                <div
                  className="mt-[12px] pt-[12px] border-t border-[#f2f2f2] flex items-center justify-end gap-[10px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {order.status === '待付款' && (
                    <>
                      <button
                        type="button"
                        onClick={() => setCancellingOrderId(order.id)}
                        className="h-[28px] px-[13px] rounded-[14px] border border-[#dcdcdc] bg-white text-[#666666] text-[12px] cursor-pointer"
                      >
                        取消订单
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate('payment', { orderId: order.id })}
                        className="h-[28px] px-[13px] rounded-[14px] border border-[#1890ff] bg-white text-[#1890ff] text-[12px] cursor-pointer"
                      >
                        立即付款
                      </button>
                    </>
                  )}
                  {order.status === '进行中' && (
                    <>
                      <button
                        type="button"
                        onClick={() => navigate('order-refund', { orderId: order.id })}
                        className="h-[28px] px-[13px] rounded-[14px] border border-[#dcdcdc] bg-white text-[#666666] text-[12px] cursor-pointer"
                      >
                        申请售后
                      </button>
                      <button
                        type="button"
                        onClick={() => confirmReceiveOrder(order.id)}
                        className="h-[28px] px-[13px] rounded-[14px] border border-[#1890ff] bg-white text-[#1890ff] text-[12px] cursor-pointer"
                      >
                        确认收货
                      </button>
                    </>
                  )}
                  {order.status === '已完成' && (
                    <button
                      type="button"
                      onClick={() => {
                        if (order.consultationId) {
                          navigate('chat-image', { consultationId: order.consultationId })
                        } else {
                          navigate('order-detail', { orderId: order.id })
                        }
                      }}
                      className="h-[28px] px-[13px] rounded-[14px] border border-[#1890ff] bg-white text-[#1890ff] text-[12px] cursor-pointer"
                    >
                      {order.category.includes('问诊') ? '查看问诊记录' : '查看详情'}
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 取消订单原因弹窗 (0:8615 -> 0:9794) */}
      {cancellingOrderId && (
        <div
          data-frame-id="0:9794"
          className="fixed inset-0 z-50 bg-black/45 flex items-end justify-center"
          onClick={() => setCancellingOrderId(null)}
        >
          <div
            className="w-[375px] bg-white rounded-t-[12px] p-[16px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-[12px] border-b border-[#f0f0f0]">
              <span className="text-[#333333] text-[16px] font-medium">请选择取消订单原因</span>
              <button
                type="button"
                onClick={() => setCancellingOrderId(null)}
                className="text-[#999999] text-[14px] bg-transparent border-0 cursor-pointer"
              >
                关闭
              </button>
            </div>
            <div className="py-[10px] space-y-[10px]">
              {[
                '临时不需要了',
                '信息填写错误，重新下单',
                '更换了其他医生/医院',
                '已在医院线下完成就诊',
              ].map((reason) => (
                <button
                  key={reason}
                  type="button"
                  onClick={() => setCancelReason(reason)}
                  className="w-full flex items-center justify-between py-[8px] bg-transparent border-0 cursor-pointer text-left"
                >
                  <span className="text-[#333333] text-[14px]">{reason}</span>
                  <span
                    className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center ${
                      cancelReason === reason
                        ? 'border-[#1890ff] bg-[#1890ff] text-white'
                        : 'border-[#cccccc]'
                    }`}
                  >
                    {cancelReason === reason && '✓'}
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                cancelOrder(cancellingOrderId, cancelReason)
                setCancellingOrderId(null)
              }}
              className="w-full h-[42px] mt-[8px] rounded-[21px] bg-[#1890ff] text-white text-[15px] font-medium border-0 cursor-pointer"
            >
              确认取消
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * 订单详情页 (0:9090 / 0:11242 / 0:12251 / 0:49877 / 0:48568)
 */
export function OrderDetailPage() {
  const {
    currentRoute,
    orders,
    addresses,
    prescriptions,
    navigate,
    goBack,
    confirmReceiveOrder,
  } = useAppStore()
  const orderId = currentRoute.params?.orderId || 'ord-1'
  const order = orders.find((o) => o.id === orderId) || orders[0]
  const addr = addresses.find((a) => a.id === order.addressId) || addresses[0]
  const rx = prescriptions.find((r) => r.id === order.prescriptionId) || prescriptions[0]

  return (
    <div
      data-frame-id="0:9090"
      className="relative w-[375px] min-h-[667px] bg-[#f5f6f8] pb-[80px]"
    >
      <NavBar title="订单详情" onBack={goBack} />

      {/* 顶部状态横幅 */}
      <div className="bg-gradient-to-r from-[#2b9aff] to-[#1890ff] px-[18px] py-[18px] text-white">
        <div className="text-[17px] font-medium">{order.status}</div>
        <div className="mt-[4px] text-[12px] text-white/85">
          {order.status === '待付款' && '请在29分59秒内完成支付，超时订单将自动取消'}
          {order.status === '进行中' && '您的订单正在处理中，可随时查看物流或诊室进度'}
          {order.status === '已完成' && '订单已完成，感谢您使用医百顺互联网医院'}
          {order.status === '已取消' && `取消原因：${order.cancelReason || '用户主动取消'}`}
        </div>
      </div>

      {/* 配送方式与地址 */}
      {(order.category === '西药药品' || order.category === '中药药品') && (
        <div className="mx-[10px] mt-[10px] bg-white rounded-[8px] p-[14px]">
          <div className="flex items-center justify-between pb-[10px] border-b border-[#f2f2f2]">
            <span className="text-[#333333] text-[14px] font-medium">
              配送方式：{order.deliveryMode || '配送到家'}
            </span>
            {order.status === '进行中' && (
              <button
                type="button"
                onClick={() => navigate('logistics', { orderId: order.id })}
                className="text-[#1890ff] text-[12px] bg-transparent border-0 cursor-pointer"
              >
                查看物流 &gt;
              </button>
            )}
          </div>
          <div className="pt-[10px] text-[13px] text-[#333333]">
            <div className="font-medium">
              {addr.name} <span className="text-[#666666] ml-[8px]">{addr.phone}</span>
            </div>
            <div className="mt-[4px] text-[#666666] text-[12px]">
              {addr.region} {addr.detail}
            </div>
          </div>
        </div>
      )}

      {/* 订单明细卡片 */}
      <div className="mx-[10px] mt-[10px] bg-white rounded-[8px] p-[14px] space-y-[8px] text-[13px]">
        <div className="flex items-center justify-between pb-[8px] border-b border-[#f2f2f2]">
          <span className="font-medium text-[#333333]">{order.hospital}</span>
          <span className="text-[#1890ff] text-[12px]">{order.category}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#666666]">就诊人</span>
          <span className="text-[#333333]">{order.patientName}</span>
        </div>
        {order.doctorName && (
          <div className="flex justify-between">
            <span className="text-[#666666]">接诊医生</span>
            <span className="text-[#333333]">
              {order.doctorName}（{order.dept}）
            </span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-[#666666]">下单时间</span>
          <span className="text-[#333333]">{order.time}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#666666]">订单编号</span>
          <span className="text-[#333333]">{order.id.toUpperCase()}</span>
        </div>
        <div className="pt-[8px] border-t border-[#f2f2f2] flex justify-between items-center">
          <span className="text-[#333333] font-medium">实付总金额</span>
          <span className="text-[#ff4d4f] text-[16px] font-semibold">
            ¥{order.amount.toFixed(2)}
          </span>
        </div>
      </div>

      {/* 关联电子处方 */}
      {order.prescriptionId && (
        <div className="mx-[10px] mt-[10px] bg-white rounded-[8px] p-[14px]">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[#333333] text-[14px] font-medium">关联电子处方笺</div>
              <div className="text-[#888888] text-[12px] mt-[2px]">
                处方单号：{rx.code} · 临床诊断：{rx.diagnosis}
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate('prescription', { prescriptionId: rx.id })}
              className="px-[10px] py-[5px] rounded-[14px] border border-[#1890ff] text-[#1890ff] text-[12px] bg-white cursor-pointer"
            >
              查看处方
            </button>
          </div>
        </div>
      )}

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[375px] h-[54px] bg-white border-t border-[#eeeeee] px-[15px] flex items-center justify-end gap-[10px]">
        {order.status === '待付款' && (
          <button
            type="button"
            onClick={() => navigate('payment', { orderId: order.id })}
            className="h-[34px] px-[18px] rounded-[17px] bg-[#1890ff] text-white text-[13px] border-0 cursor-pointer"
          >
            立即付款
          </button>
        )}
        {order.status === '进行中' && (
          <>
            <button
              type="button"
              onClick={() => navigate('order-refund', { orderId: order.id })}
              className="h-[34px] px-[16px] rounded-[17px] border border-[#cccccc] bg-white text-[#666666] text-[13px] cursor-pointer"
            >
              申请售后
            </button>
            <button
              type="button"
              onClick={() => confirmReceiveOrder(order.id)}
              className="h-[34px] px-[18px] rounded-[17px] bg-[#1890ff] text-white text-[13px] border-0 cursor-pointer"
            >
              确认收货
            </button>
          </>
        )}
        {order.status === '已完成' && (
          <button
            type="button"
            onClick={() => navigate('invoice-select')}
            className="h-[34px] px-[16px] rounded-[17px] border border-[#1890ff] bg-white text-[#1890ff] text-[13px] cursor-pointer"
          >
            申请开票
          </button>
        )}
      </div>
    </div>
  )
}

/**
 * 支付收银台 (0:45709)
 */
export function PaymentPage() {
  const { currentRoute, orders, payOrder, navigate, goBack } = useAppStore()
  const orderId = currentRoute.params?.orderId || 'ord-1'
  const order = orders.find((o) => o.id === orderId) || orders[0]
  const [payMethod, setPayMethod] = useState<'wechat' | 'medical'>('wechat')

  return (
    <div data-frame-id="0:45709" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8]">
      <NavBar title="收银台" onBack={goBack} />

      <div className="bg-white py-[28px] flex flex-col items-center border-b border-[#f0f0f0]">
        <span className="text-[#888888] text-[13px]">支付剩余时间 29:48</span>
        <div className="mt-[8px] text-[#333333] text-[28px] font-semibold">
          ¥{order.amount.toFixed(2)}
        </div>
        <span className="mt-[4px] text-[#666666] text-[13px]">
          {order.hospital} - {order.category}
        </span>
      </div>

      <div className="mt-[10px] bg-white px-[15px] divide-y divide-[#f2f2f2]">
        <button
          type="button"
          onClick={() => setPayMethod('wechat')}
          className="w-full py-[14px] flex items-center justify-between bg-transparent border-0 cursor-pointer"
        >
          <div className="flex items-center gap-[10px]">
            <span className="w-[26px] h-[26px] rounded-full bg-[#07c160] text-white text-[13px] flex items-center justify-center font-bold">
              微
            </span>
            <span className="text-[#333333] text-[14px]">微信支付</span>
          </div>
          <span
            className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center text-[12px] ${
              payMethod === 'wechat'
                ? 'border-[#1890ff] bg-[#1890ff] text-white'
                : 'border-[#cccccc]'
            }`}
          >
            {payMethod === 'wechat' && '✓'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setPayMethod('medical')}
          className="w-full py-[14px] flex items-center justify-between bg-transparent border-0 cursor-pointer"
        >
          <div className="flex items-center gap-[10px]">
            <span className="w-[26px] h-[26px] rounded-full bg-[#1890ff] text-white text-[13px] flex items-center justify-center font-bold">
              医
            </span>
            <span className="text-[#333333] text-[14px]">医保电子凭证移动支付</span>
          </div>
          <span
            className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center text-[12px] ${
              payMethod === 'medical'
                ? 'border-[#1890ff] bg-[#1890ff] text-white'
                : 'border-[#cccccc]'
            }`}
          >
            {payMethod === 'medical' && '✓'}
          </span>
        </button>
      </div>

      <div className="px-[15px] mt-[36px]">
        <button
          type="button"
          onClick={() => {
            payOrder(order.id)
            navigate('payment-result', { orderId: order.id })
          }}
          className="w-full h-[44px] rounded-[22px] bg-[#1890ff] text-white text-[16px] font-medium border-0 cursor-pointer"
        >
          确认支付 ¥{order.amount.toFixed(2)}
        </button>
      </div>
    </div>
  )
}

/**
 * 支付成功结果页 (0:45942)
 */
export function PaymentResultPage() {
  const { currentRoute, orders, navigate, switchPrimaryTab } = useAppStore()
  const orderId = currentRoute.params?.orderId || 'ord-1'
  const order = orders.find((o) => o.id === orderId) || orders[0]

  return (
    <div data-frame-id="0:45942" className="relative w-[375px] min-h-[667px] bg-white">
      <NavBar title="支付结果" onBack={() => navigate('orders')} />

      <div className="pt-[46px] px-[24px] flex flex-col items-center">
        <div className="w-[64px] h-[64px] rounded-full bg-[#1890ff] text-white text-[32px] flex items-center justify-center">
          ✓
        </div>
        <h2 className="mt-[14px] text-[#333333] text-[18px] font-semibold">支付成功</h2>
        <p className="mt-[6px] text-[#888888] text-[13px]">
          实付金额：¥{order.amount.toFixed(2)}
        </p>

        <div className="w-full mt-[30px] flex gap-[12px]">
          <button
            type="button"
            onClick={() => navigate('order-detail', { orderId: order.id })}
            className="flex-1 h-[40px] rounded-[20px] border border-[#1890ff] bg-white text-[#1890ff] text-[14px] cursor-pointer"
          >
            查看订单
          </button>
          <button
            type="button"
            onClick={() => {
              if (order.consultationId) {
                navigate('chat-image', { consultationId: order.consultationId })
              } else {
                switchPrimaryTab('home')
              }
            }}
            className="flex-1 h-[40px] rounded-[20px] bg-[#1890ff] text-white text-[14px] border-0 cursor-pointer"
          >
            {order.consultationId ? '进入诊室' : '返回首页'}
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * 申请退款页 (0:9829) & 退款详情页 (0:9939)
 */
export function OrderRefundPage() {
  const { currentRoute, orders, applyOrderRefund, navigate, goBack } = useAppStore()
  const orderId = currentRoute.params?.orderId || 'ord-3'
  const order = orders.find((o) => o.id === orderId) || orders[0]
  const [reason, setReason] = useState('药品包装破损 / 处方调整')

  return (
    <div data-frame-id="0:9829" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8]">
      <NavBar title="申请售后退款" onBack={goBack} />
      <div className="m-[10px] bg-white rounded-[8px] p-[14px] space-y-[10px]">
        <div className="text-[#333333] text-[14px] font-medium">
          退款商品：{order.category}（{order.hospital}）
        </div>
        <div className="text-[#ff4d4f] text-[14px]">
          可退金额：¥{order.amount.toFixed(2)}
        </div>
        <div>
          <label className="block text-[#666666] text-[13px] mb-[6px]">退款原因说明</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            className="w-full rounded-[6px] border border-[#e5e5e5] p-[10px] text-[13px] text-[#333333]"
          />
        </div>
        <button
          type="button"
          onClick={() => {
            applyOrderRefund(order.id, reason)
            navigate('refund-detail', { orderId: order.id })
          }}
          className="w-full h-[42px] rounded-[21px] bg-[#1890ff] text-white text-[15px] border-0 cursor-pointer"
        >
          提交退款申请
        </button>
      </div>
    </div>
  )
}

export function RefundDetailPage() {
  const { currentRoute, orders, goBack } = useAppStore()
  const orderId = currentRoute.params?.orderId || 'ord-3'
  const order = orders.find((o) => o.id === orderId) || orders[0]

  return (
    <div data-frame-id="0:9939" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8]">
      <NavBar title="退款详情" onBack={goBack} />
      <div className="bg-white p-[16px] m-[10px] rounded-[8px] space-y-[8px] text-[13px]">
        <div className="text-[#1890ff] text-[16px] font-semibold">
          售后状态：{order.refundStatus || '申请中'}
        </div>
        <div className="text-[#666666]">退款金额：¥{order.amount.toFixed(2)}</div>
        <div className="text-[#666666]">
          申请原因：{order.refundReason || '药品包装破损 / 处方调整'}
        </div>
        <div className="text-[#888888] text-[12px]">
          药师与医院财务审核通过后，款项将原路退回您的支付账户。
        </div>
      </div>
    </div>
  )
}

/**
 * 电子处方页 (0:7317 有效 / 0:15876 已过期 / 0:13420 不支持线上购药)
 */
export function PrescriptionPage() {
  const { currentRoute, prescriptions, navigate, goBack } = useAppStore()
  const rxId = currentRoute.params?.prescriptionId || 'rx-1'
  const rx = prescriptions.find((r) => r.id === rxId) || prescriptions[0]
  const [statusMode, setStatusMode] = useState<'valid' | 'expired' | 'offline-only'>(rx.status)

  return (
    <div data-frame-id="0:7317" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8] pb-[80px]">
      <NavBar title="电子处方" onBack={goBack} />

      {/* 状态切换演示栏（支持核验 0:7317 / 0:15876 / 0:13420 三态） */}
      <div className="bg-[#ebf6ff] px-[12px] py-[6px] flex items-center justify-between text-[12px]">
        <span className="text-[#1890ff]">处方状态切换：</span>
        <div className="flex gap-[6px]">
          {[
            { key: 'valid', label: '有效可购药' },
            { key: 'expired', label: '已过期(0:15876)' },
            { key: 'offline-only', label: '院内调配(0:13420)' },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setStatusMode(item.key as any)}
              className={`px-[8px] py-[2px] rounded-[10px] border-0 cursor-pointer text-[11px] ${
                statusMode === item.key
                  ? 'bg-[#1890ff] text-white'
                  : 'bg-white text-[#666666]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 处方笺纸张主体 */}
      <div className="m-[12px] bg-white rounded-[8px] p-[16px] relative shadow-sm">
        {statusMode === 'expired' && (
          <div className="absolute top-[16px] right-[16px] px-[10px] py-[4px] rounded-[4px] border border-[#ff4d4f] text-[#ff4d4f] text-[12px] font-semibold rotate-12">
            处方已过期
          </div>
        )}
        <div className="text-center border-b border-dashed border-[#dcdcdc] pb-[12px]">
          <div className="text-[#333333] text-[16px] font-semibold">{rx.hospital}</div>
          <div className="text-[#333333] text-[15px] font-medium mt-[2px]">电子处方笺</div>
          <div className="text-[#888888] text-[11px] mt-[4px]">
            处方编号：{rx.code} · 开具日期：{rx.date}
          </div>
        </div>

        <div className="py-[10px] border-b border-[#f0f0f0] grid grid-cols-3 gap-[6px] text-[12px] text-[#333333]">
          <div>姓名：{rx.patientName}</div>
          <div>性别：{rx.gender}</div>
          <div>年龄：{rx.age}岁</div>
          <div className="col-span-3">科室：{rx.dept}</div>
          <div className="col-span-3">
            临床诊断：<span className="font-medium">{rx.diagnosis}</span>
          </div>
        </div>

        {/* Rp 药品列表 */}
        <div className="py-[12px]">
          <div className="text-[#333333] text-[18px] font-serif font-bold mb-[8px]">Rp</div>
          <div className="space-y-[12px]">
            {rx.medicines.map((m, i) => (
              <div key={m.id} className="text-[13px]">
                <div className="flex justify-between text-[#333333] font-medium">
                  <span>
                    {i + 1}. {m.name}
                  </span>
                  <span>{m.quantity}</span>
                </div>
                <div className="text-[#888888] text-[12px] mt-[2px]">规格：{m.spec}</div>
                <div className="text-[#666666] text-[12px] mt-[2px]">用法用量：{m.usage}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 签章 */}
        <div className="pt-[12px] border-t border-[#f0f0f0] flex justify-between text-[12px] text-[#666666]">
          <div>处方医师：{rx.doctorName}</div>
          <div>审核药师：{rx.pharmacistName}</div>
        </div>
      </div>

      {/* 底部购药栏 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[375px] h-[56px] bg-white border-t border-[#eeeeee] px-[15px] flex items-center justify-between">
        <div>
          <span className="text-[#666666] text-[12px]">处方药费合计：</span>
          <span className="text-[#ff4d4f] text-[16px] font-semibold">
            ¥{rx.amount.toFixed(2)}
          </span>
        </div>
        {statusMode === 'valid' && (
          <button
            type="button"
            onClick={() => navigate('drug-checkout', { prescriptionId: rx.id })}
            className="h-[38px] px-[22px] rounded-[19px] bg-[#1890ff] text-white text-[14px] font-medium border-0 cursor-pointer"
          >
            立即购药
          </button>
        )}
        {statusMode === 'expired' && (
          <span className="text-[#999999] text-[13px]">处方超3天有效期，请重新问诊开方</span>
        )}
        {statusMode === 'offline-only' && (
          <span className="text-[#ff9800] text-[12px]">该处方含院内制剂，请凭处方到院购药</span>
        )}
      </div>
    </div>
  )
}

/**
 * 处方购药结算页 (0:13581 / 0:55419)
 */
export function DrugCheckoutPage() {
  const {
    currentRoute,
    prescriptions,
    addresses,
    checkoutCartOrDrug,
    navigate,
    goBack,
  } = useAppStore()
  const rxId = currentRoute.params?.prescriptionId || 'rx-1'
  const rx = prescriptions.find((r) => r.id === rxId) || prescriptions[0]
  const [deliveryMode, setDeliveryMode] = useState<'配送到家' | '到院自取' | '外配处方'>('配送到家')
  const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0]

  return (
    <div data-frame-id="0:13581" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8] pb-[80px]">
      <NavBar title="购买药品" onBack={goBack} />

      {/* 购药方式切换 */}
      <div className="bg-white p-[12px] flex gap-[8px]">
        {(['配送到家', '到院自取', '外配处方'] as const).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => setDeliveryMode(mode)}
            className={`flex-1 h-[34px] rounded-[17px] text-[13px] border cursor-pointer ${
              deliveryMode === mode
                ? 'border-[#1890ff] bg-[#ebf6ff] text-[#1890ff] font-medium'
                : 'border-[#e0e0e0] bg-white text-[#666666]'
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* 收货地址 */}
      {deliveryMode === '配送到家' && (
        <div
          onClick={() => navigate('address-list')}
          className="m-[10px] bg-white rounded-[8px] p-[14px] flex items-center justify-between cursor-pointer"
        >
          <div>
            <div className="text-[#333333] text-[14px] font-medium">
              {defaultAddr.name} <span className="ml-[8px]">{defaultAddr.phone}</span>
            </div>
            <div className="text-[#666666] text-[12px] mt-[4px]">
              {defaultAddr.region} {defaultAddr.detail}
            </div>
          </div>
          <span className="text-[#999999] text-[14px]">&gt;</span>
        </div>
      )}

      {deliveryMode === '到院自取' && (
        <div className="m-[10px] bg-white rounded-[8px] p-[14px] text-[13px]">
          <div className="font-medium text-[#333333]">自取药房：{rx.hospital} 门诊一楼西药房3号窗口</div>
          <div className="text-[#888888] text-[12px] mt-[4px]">凭支付成功后的取药码至医院窗口取药</div>
        </div>
      )}

      {/* 药品清单 */}
      <div className="m-[10px] bg-white rounded-[8px] p-[14px] space-y-[10px]">
        <div className="text-[#333333] text-[14px] font-medium border-b border-[#f2f2f2] pb-[8px]">
          处方药品清单
        </div>
        {rx.medicines.map((m) => (
          <div key={m.id} className="flex justify-between items-center text-[13px]">
            <div>
              <div className="text-[#333333]">{m.name}</div>
              <div className="text-[#888888] text-[12px]">{m.spec}</div>
            </div>
            <div className="text-right">
              <div className="text-[#333333]">¥{m.price.toFixed(2)}</div>
              <div className="text-[#888888] text-[12px]">{m.quantity}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 底部提交订单 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[375px] h-[54px] bg-white border-t border-[#eeeeee] px-[15px] flex items-center justify-between">
        <div>
          <span className="text-[#666666] text-[12px]">应付金额：</span>
          <span className="text-[#ff4d4f] text-[17px] font-semibold">
            ¥{rx.amount.toFixed(2)}
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            const orderId = checkoutCartOrDrug({
              category: '西药药品',
              amount: rx.amount,
              deliveryMode,
              addressId: defaultAddr.id,
              prescriptionId: rx.id,
            })
            navigate('payment', { orderId })
          }}
          className="h-[38px] px-[22px] rounded-[19px] bg-[#1890ff] text-white text-[14px] font-medium border-0 cursor-pointer"
        >
          提交订单
        </button>
      </div>
    </div>
  )
}

/**
 * 地址管理 (0:45640) & 新增编辑地址 (0:7169) & 查看物流 (0:16116)
 */
export function AddressListPage() {
  const { addresses, navigate, goBack } = useAppStore()
  return (
    <div data-frame-id="0:45640" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8] pb-[80px]">
      <NavBar title="收货地址管理" onBack={goBack} />
      <div className="p-[10px] space-y-[10px]">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="bg-white rounded-[8px] p-[14px] flex items-center justify-between"
          >
            <div>
              <div className="flex items-center gap-[8px]">
                <span className="text-[#333333] text-[14px] font-medium">{addr.name}</span>
                <span className="text-[#666666] text-[13px]">{addr.phone}</span>
                {addr.isDefault && (
                  <span className="px-[6px] py-[1px] rounded-[3px] bg-[#ebf6ff] text-[#1890ff] text-[11px]">
                    默认
                  </span>
                )}
              </div>
              <div className="text-[#666666] text-[12px] mt-[4px]">
                {addr.region} {addr.detail}
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate('address-edit', { addressId: addr.id })}
              className="text-[#1890ff] text-[12px] bg-transparent border-0 cursor-pointer"
            >
              编辑
            </button>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[375px] p-[12px] bg-white border-t border-[#eeeeee]">
        <button
          type="button"
          onClick={() => navigate('address-edit')}
          className="w-full h-[40px] rounded-[20px] bg-[#1890ff] text-white text-[14px] font-medium border-0 cursor-pointer"
        >
          + 新增收货地址
        </button>
      </div>
    </div>
  )
}

export function AddressEditPage() {
  const { currentRoute, addresses, saveAddress, goBack } = useAppStore()
  const editId = currentRoute.params?.addressId as string | undefined
  const existing = addresses.find((a) => a.id === editId)
  const [name, setName] = useState(existing?.name || '')
  const [phone, setPhone] = useState(existing?.phone || '')
  const [region, setRegion] = useState(existing?.region || '北京市丰台区')
  const [detail, setDetail] = useState(existing?.detail || '')
  const [isDefault, setIsDefault] = useState(existing?.isDefault ?? true)

  return (
    <div data-frame-id="0:7169" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8]">
      <NavBar title={existing ? '编辑收货地址' : '新增收货地址'} onBack={goBack} />
      <div className="bg-white mt-[10px] px-[15px] divide-y divide-[#f2f2f2] text-[14px]">
        <div className="py-[12px] flex items-center">
          <span className="w-[80px] text-[#666666]">收货人</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="请输入收货人姓名"
            className="flex-1 border-0 outline-none text-[#333333]"
          />
        </div>
        <div className="py-[12px] flex items-center">
          <span className="w-[80px] text-[#666666]">手机号码</span>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="请输入手机号码"
            className="flex-1 border-0 outline-none text-[#333333]"
          />
        </div>
        <div className="py-[12px] flex items-center">
          <span className="w-[80px] text-[#666666]">所在地区</span>
          <input
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="flex-1 border-0 outline-none text-[#333333]"
          />
        </div>
        <div className="py-[12px] flex items-center">
          <span className="w-[80px] text-[#666666]">详细地址</span>
          <input
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            placeholder="街道、楼牌号等"
            className="flex-1 border-0 outline-none text-[#333333]"
          />
        </div>
        <div className="py-[12px] flex items-center justify-between">
          <span className="text-[#666666]">设为默认地址</span>
          <input
            type="checkbox"
            checked={isDefault}
            onChange={(e) => setIsDefault(e.target.checked)}
          />
        </div>
      </div>
      <div className="p-[15px] mt-[20px]">
        <button
          type="button"
          onClick={() => {
            saveAddress({
              id: existing?.id,
              name: name || '张晓靖',
              phone: phone || '13888210918',
              region,
              detail: detail || '靛厂路291号',
              isDefault,
            })
            goBack()
          }}
          className="w-full h-[42px] rounded-[21px] bg-[#1890ff] text-white text-[15px] border-0 cursor-pointer"
        >
          保存地址
        </button>
      </div>
    </div>
  )
}

export function LogisticsPage() {
  const { goBack } = useAppStore()
  const steps = [
    { time: '2022-02-24 16:20', title: '派送中', desc: '顺丰速运派件员【王师傅 13800138000】正在为您派送' },
    { time: '2022-02-24 14:10', title: '运输中', desc: '快件已到达【北京丰台靛厂营业点】' },
    { time: '2022-02-24 11:00', title: '已揽收', desc: '顺丰速运已从【安徽医科大学第一附属医院智慧药房】揽收' },
  ]
  return (
    <div data-frame-id="0:16116" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8]">
      <NavBar title="物流详情" onBack={goBack} />
      <div className="m-[10px] bg-white rounded-[8px] p-[14px]">
        <div className="text-[#333333] text-[14px] font-medium">顺丰速运：SF1389201928371</div>
        <div className="mt-[14px] space-y-[16px] border-l-2 border-[#1890ff] ml-[8px] pl-[14px]">
          {steps.map((s, idx) => (
            <div key={idx} className="relative">
              <span className="absolute -left-[20px] top-[4px] w-[10px] h-[10px] rounded-full bg-[#1890ff]" />
              <div className="text-[#333333] text-[13px] font-medium">{s.title}</div>
              <div className="text-[#666666] text-[12px] mt-[2px]">{s.desc}</div>
              <div className="text-[#999999] text-[11px] mt-[2px]">{s.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * 中医养生健康商城 (0:56181 / 0:57264) & 商品详情 (0:56715) & 购物车 (0:56290)
 */
export function MallPage() {
  const { mallProducts, cart, navigate, goBack } = useAppStore()
  const [selectedHospital, setSelectedHospital] = useState('北京长峰医院')
  const [showHospitalPicker, setShowHospitalPicker] = useState(false)

  return (
    <div data-frame-id="0:56181" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8] pb-[70px]">
      <NavBar title="健康商城" onBack={goBack} />

      {/* 顶部医院切换与购物车入口 */}
      <div className="bg-white px-[15px] py-[10px] flex items-center justify-between border-b border-[#f0f0f0]">
        <button
          type="button"
          onClick={() => setShowHospitalPicker(!showHospitalPicker)}
          className="text-[#333333] text-[14px] font-medium bg-transparent border-0 cursor-pointer flex items-center gap-[4px]"
        >
          <span>{selectedHospital}</span>
          <span className="text-[11px] text-[#888888]">▼</span>
        </button>
        <button
          type="button"
          onClick={() => navigate('cart')}
          className="px-[12px] py-[4px] rounded-[14px] bg-[#ebf6ff] text-[#1890ff] text-[12px] border-0 cursor-pointer"
        >
          购物车 ({cart.reduce((s, c) => s + c.quantity, 0)})
        </button>
      </div>

      {/* 商品列表 */}
      <div className="p-[10px] space-y-[10px]">
        {mallProducts.map((prod) => (
          <div
            key={prod.id}
            onClick={() => navigate('mall-detail', { productId: prod.id })}
            className="bg-white rounded-[8px] p-[12px] flex gap-[12px] cursor-pointer"
          >
            <img
              src={prod.cover}
              alt={prod.name}
              className="w-[84px] h-[84px] rounded-[6px] object-cover shrink-0 bg-[#f5f5f5]"
            />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="text-[#333333] text-[14px] font-medium line-clamp-2">
                  {prod.name}
                </div>
                <div className="text-[#888888] text-[12px] mt-[3px] line-clamp-1">
                  {prod.subtitle}
                </div>
              </div>
              <div className="flex items-center justify-between mt-[8px]">
                <div>
                  <span className="text-[#ff4d4f] text-[16px] font-semibold">
                    ¥{prod.price.toFixed(2)}
                  </span>
                  <span className="text-[#999999] text-[11px] line-through ml-[6px]">
                    ¥{prod.originalPrice.toFixed(2)}
                  </span>
                </div>
                <span className="text-[#999999] text-[11px]">已售{prod.sales}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 医院选择弹窗 (0:57264) */}
      {showHospitalPicker && (
        <div
          data-frame-id="0:57264"
          className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center"
          onClick={() => setShowHospitalPicker(false)}
        >
          <div
            className="w-[375px] bg-white rounded-t-[12px] p-[16px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-[#333333] text-[15px] font-medium mb-[12px]">切换所属医院</div>
            {['北京长峰医院', '上海长峰医院', '长沙长峰医院', '安徽医科大学第一附属医院'].map(
              (h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => {
                    setSelectedHospital(h)
                    setShowHospitalPicker(false)
                  }}
                  className="w-full py-[10px] text-left text-[14px] text-[#333333] border-b border-[#f5f5f5] bg-transparent border-x-0 border-t-0 cursor-pointer flex justify-between"
                >
                  <span>{h}</span>
                  {selectedHospital === h && <span className="text-[#1890ff]">✓</span>}
                </button>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export function MallDetailPage() {
  const { currentRoute, mallProducts, addToCart, checkoutCartOrDrug, navigate, goBack } =
    useAppStore()
  const prodId = currentRoute.params?.productId || 'prod-1'
  const prod = mallProducts.find((p) => p.id === prodId) || mallProducts[0]
  const [selectedSpec, setSelectedSpec] = useState(prod.specs[0])

  return (
    <div data-frame-id="0:56715" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8] pb-[70px]">
      <NavBar title="商品详情" onBack={goBack} />
      <img src={prod.cover} alt={prod.name} className="w-[375px] h-[220px] object-cover bg-white" />
      <div className="bg-white p-[15px]">
        <div className="flex items-baseline gap-[8px]">
          <span className="text-[#ff4d4f] text-[22px] font-semibold">¥{prod.price.toFixed(2)}</span>
          <span className="text-[#999999] text-[12px] line-through">
            ¥{prod.originalPrice.toFixed(2)}
          </span>
        </div>
        <h1 className="text-[#333333] text-[16px] font-medium mt-[6px]">{prod.name}</h1>
        <p className="text-[#888888] text-[12px] mt-[4px]">{prod.subtitle}</p>
      </div>

      {/* 规格选择 */}
      <div className="mt-[10px] bg-white p-[15px]">
        <div className="text-[#333333] text-[13px] font-medium mb-[8px]">选择规格</div>
        <div className="flex flex-wrap gap-[8px]">
          {prod.specs.map((sp) => (
            <button
              key={sp}
              type="button"
              onClick={() => setSelectedSpec(sp)}
              className={`px-[12px] py-[6px] rounded-[15px] text-[12px] border cursor-pointer ${
                selectedSpec === sp
                  ? 'border-[#1890ff] bg-[#ebf6ff] text-[#1890ff]'
                  : 'border-[#e0e0e0] bg-white text-[#666666]'
              }`}
            >
              {sp}
            </button>
          ))}
        </div>
      </div>

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[375px] h-[54px] bg-white border-t border-[#eeeeee] px-[15px] flex items-center gap-[10px]">
        <button
          type="button"
          onClick={() => navigate('cart')}
          className="px-[12px] h-[36px] rounded-[18px] border border-[#dcdcdc] bg-white text-[#666666] text-[12px] cursor-pointer"
        >
          购物车
        </button>
        <button
          type="button"
          onClick={() => addToCart(prod.id, selectedSpec, 1)}
          className="flex-1 h-[36px] rounded-[18px] bg-[#e6f4ff] text-[#1890ff] text-[13px] font-medium border-0 cursor-pointer"
        >
          加入购物车
        </button>
        <button
          type="button"
          onClick={() => {
            const orderId = checkoutCartOrDrug({
              category: '中药药品',
              amount: prod.price,
              deliveryMode: '配送到家',
            })
            navigate('payment', { orderId })
          }}
          className="flex-1 h-[36px] rounded-[18px] bg-[#1890ff] text-white text-[13px] font-medium border-0 cursor-pointer"
        >
          立即购买
        </button>
      </div>
    </div>
  )
}

export function CartPage() {
  const {
    cart,
    toggleCartItem,
    toggleAllCart,
    deleteCheckedCart,
    checkoutCartOrDrug,
    navigate,
    goBack,
  } = useAppStore()
  const [editMode, setEditMode] = useState(false)
  const allChecked = cart.length > 0 && cart.every((c) => c.checked)
  const totalAmount = cart
    .filter((c) => c.checked)
    .reduce((acc, cur) => acc + cur.price * cur.quantity, 0)

  return (
    <div data-frame-id="0:56290" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8] pb-[70px]">
      <NavBar
        title="购物车"
        onBack={goBack}
        rightText={editMode ? '完成' : '管理'}
        onRightClick={() => setEditMode(!editMode)}
      />

      <div className="p-[10px] space-y-[10px]">
        {cart.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleCartItem(item.id)}
            className="bg-white rounded-[8px] p-[12px] flex items-center gap-[10px] cursor-pointer"
          >
            <span
              className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center text-[12px] ${
                item.checked
                  ? 'border-[#1890ff] bg-[#1890ff] text-white'
                  : 'border-[#cccccc]'
              }`}
            >
              {item.checked && '✓'}
            </span>
            <img
              src={item.cover}
              alt={item.name}
              className="w-[64px] h-[64px] rounded-[6px] object-cover"
            />
            <div className="flex-1">
              <div className="text-[#333333] text-[13px] font-medium line-clamp-1">{item.name}</div>
              <div className="text-[#888888] text-[11px] mt-[2px]">{item.spec}</div>
              <div className="flex justify-between items-center mt-[6px]">
                <span className="text-[#ff4d4f] text-[14px] font-semibold">
                  ¥{item.price.toFixed(2)}
                </span>
                <span className="text-[#666666] text-[12px]">x{item.quantity}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 底部结算栏 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[375px] h-[54px] bg-white border-t border-[#eeeeee] px-[15px] flex items-center justify-between">
        <button
          type="button"
          onClick={() => toggleAllCart(!allChecked)}
          className="flex items-center gap-[6px] bg-transparent border-0 cursor-pointer text-[13px] text-[#333333]"
        >
          <span
            className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center text-[12px] ${
              allChecked ? 'border-[#1890ff] bg-[#1890ff] text-white' : 'border-[#cccccc]'
            }`}
          >
            {allChecked && '✓'}
          </span>
          全选
        </button>

        {editMode ? (
          <button
            type="button"
            onClick={deleteCheckedCart}
            className="h-[34px] px-[18px] rounded-[17px] border border-[#ff4d4f] text-[#ff4d4f] bg-white text-[13px] cursor-pointer"
          >
            删除所选
          </button>
        ) : (
          <div className="flex items-center gap-[10px]">
            <span className="text-[#333333] text-[13px]">
              合计：<b className="text-[#ff4d4f] text-[16px]">¥{totalAmount.toFixed(2)}</b>
            </span>
            <button
              type="button"
              onClick={() => {
                if (totalAmount <= 0) return
                const orderId = checkoutCartOrDrug({
                  category: '中药药品',
                  amount: totalAmount,
                  deliveryMode: '配送到家',
                })
                navigate('payment', { orderId })
              }}
              className="h-[36px] px-[20px] rounded-[18px] bg-[#1890ff] text-white text-[13px] border-0 cursor-pointer"
            >
              去结算
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * 发票模块: 选择开票订单 (0:54695 / 0:54673) -> 提交开票 (0:54888) -> 我的发票 (0:54563) -> 发票详情 (0:54655)
 */
export function InvoiceSelectPage() {
  const { currentRoute, orders, navigate, goBack } = useAppStore()
  const isForcedEmpty = Boolean(currentRoute.params?.empty)
  const eligibleOrders = isForcedEmpty
    ? []
    : orders.filter((o) => o.status === '已完成' && !o.invoiced)
  const [selectedIds, setSelectedIds] = useState<string[]>(eligibleOrders.map((o) => o.id))

  const toggleId = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  return (
    <div data-frame-id="0:54695" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8] pb-[70px]">
      <NavBar
        title="开发票"
        onBack={goBack}
        rightText="我的发票"
        onRightClick={() => navigate('my-invoices')}
      />

      {eligibleOrders.length === 0 ? (
        <div className="pt-[100px] flex flex-col items-center">
          <img
            src="/frames/empty-states/208-2918.png"
            alt="暂无可开票订单"
            className="w-[160px] h-[160px] object-contain"
          />
          <p className="text-[#999999] text-[13px] mt-[8px]">暂无可开发票的已完成订单</p>
        </div>
      ) : (
        <div className="p-[10px] space-y-[10px]">
          {eligibleOrders.map((o) => {
            const checked = selectedIds.includes(o.id)
            return (
              <div
                key={o.id}
                onClick={() => toggleId(o.id)}
                className="bg-white rounded-[8px] p-[14px] flex items-center gap-[12px] cursor-pointer"
              >
                <span
                  className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center text-[12px] ${
                    checked ? 'border-[#1890ff] bg-[#1890ff] text-white' : 'border-[#cccccc]'
                  }`}
                >
                  {checked && '✓'}
                </span>
                <div className="flex-1">
                  <div className="flex justify-between text-[14px] font-medium text-[#333333]">
                    <span>{o.category}</span>
                    <span className="text-[#ff4d4f]">¥{o.amount.toFixed(2)}</span>
                  </div>
                  <div className="text-[#888888] text-[12px] mt-[4px]">
                    {o.hospital} · {o.time}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[375px] h-[54px] bg-white border-t border-[#eeeeee] px-[15px] flex items-center justify-between">
        <span className="text-[#666666] text-[13px]">已选 {selectedIds.length} 个订单</span>
        <button
          type="button"
          onClick={() => navigate('invoice-submit', { orderIds: selectedIds })}
          className="h-[36px] px-[22px] rounded-[18px] bg-[#1890ff] text-white text-[13px] border-0 cursor-pointer"
        >
          下一步
        </button>
      </div>
    </div>
  )
}

export function InvoiceSubmitPage() {
  const { currentRoute, submitInvoice, navigate, goBack } = useAppStore()
  const orderIds = (currentRoute.params?.orderIds as string[]) || ['ord-4']
  const [title, setTitle] = useState('张晓靖')
  const [email, setEmail] = useState('zhangxiaojing@example.com')

  return (
    <div data-frame-id="0:54888" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8]">
      <NavBar title="开具电子发票" onBack={goBack} />
      <div className="bg-white mt-[10px] px-[15px] divide-y divide-[#f2f2f2] text-[14px]">
        <div className="py-[12px] flex justify-between">
          <span className="text-[#666666]">抬头类型</span>
          <span className="text-[#333333]">个人 / 非企业单位</span>
        </div>
        <div className="py-[12px] flex items-center">
          <span className="w-[90px] text-[#666666]">发票抬头</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 border-0 outline-none text-[#333333]"
          />
        </div>
        <div className="py-[12px] flex items-center">
          <span className="w-[90px] text-[#666666]">接收邮箱</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 border-0 outline-none text-[#333333]"
          />
        </div>
      </div>
      <div className="p-[15px] mt-[24px]">
        <button
          type="button"
          onClick={() => {
            submitInvoice(orderIds, title, email)
            navigate('my-invoices')
          }}
          className="w-full h-[42px] rounded-[21px] bg-[#1890ff] text-white text-[15px] border-0 cursor-pointer"
        >
          提交开票申请
        </button>
      </div>
    </div>
  )
}

export function MyInvoicesPage() {
  const { invoices, navigate, goBack } = useAppStore()
  return (
    <div data-frame-id="0:54563" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8]">
      <NavBar title="我的发票" onBack={goBack} />
      <div className="p-[10px] space-y-[10px]">
        {invoices.map((inv) => (
          <div
            key={inv.id}
            onClick={() => navigate('invoice-detail', { invoiceId: inv.id })}
            className="bg-white rounded-[8px] p-[14px] flex items-center justify-between cursor-pointer"
          >
            <div>
              <div className="text-[#333333] text-[14px] font-medium">{inv.title}</div>
              <div className="text-[#888888] text-[12px] mt-[4px]">{inv.date}</div>
            </div>
            <div className="text-right">
              <div className="text-[#1890ff] text-[13px]">{inv.status}</div>
              <div className="text-[#333333] text-[14px] font-semibold mt-[2px]">
                ¥{inv.amount.toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function InvoiceDetailPage() {
  const { currentRoute, invoices, goBack } = useAppStore()
  const invId = currentRoute.params?.invoiceId || 'inv-1'
  const inv = invoices.find((i) => i.id === invId) || invoices[0]

  return (
    <div data-frame-id="0:54655" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8]">
      <NavBar title="发票详情" onBack={goBack} />
      <div className="m-[10px] bg-white rounded-[8px] p-[16px] space-y-[10px] text-[13px]">
        <div className="text-[#1890ff] text-[15px] font-semibold">{inv.status}</div>
        <div className="flex justify-between">
          <span className="text-[#666666]">发票抬头</span>
          <span className="text-[#333333]">{inv.title}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#666666]">开票金额</span>
          <span className="text-[#ff4d4f] font-semibold">¥{inv.amount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#666666]">接收邮箱</span>
          <span className="text-[#333333]">{inv.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#666666]">开票时间</span>
          <span className="text-[#333333]">{inv.date}</span>
        </div>
      </div>
    </div>
  )
}

/**
 * 消息通知页 (0:1559 系统消息 / 0:1615 订单消息)
 */
export function MessagesPage() {
  const { currentRoute, orders, navigate, goBack } = useAppStore()
  const [tab, setTab] = useState<'system' | 'order'>(
    (currentRoute.params?.tab as 'system' | 'order') || 'system',
  )

  return (
    <div data-frame-id="0:1559" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8]">
      <NavBar title="消息中心" onBack={goBack} />
      <div className="bg-white h-[42px] flex border-b border-[#f0f0f0]">
        <button
          type="button"
          onClick={() => setTab('system')}
          className={`flex-1 text-[14px] border-0 bg-transparent cursor-pointer ${
            tab === 'system' ? 'text-[#1890ff] font-semibold' : 'text-[#666666]'
          }`}
        >
          系统消息
        </button>
        <button
          type="button"
          onClick={() => setTab('order')}
          className={`flex-1 text-[14px] border-0 bg-transparent cursor-pointer ${
            tab === 'order' ? 'text-[#1890ff] font-semibold' : 'text-[#666666]'
          }`}
        >
          订单消息
        </button>
      </div>

      {tab === 'system' ? (
        <div className="p-[10px] space-y-[10px]">
          <div className="bg-white rounded-[8px] p-[14px]">
            <div className="flex justify-between">
              <span className="text-[#333333] text-[14px] font-medium">实名认证通过通知</span>
              <span className="text-[#999999] text-[11px]">2022-02-24 10:00</span>
            </div>
            <p className="text-[#666666] text-[12px] mt-[6px]">
              恭喜您完成医百顺实名认证，现在可以使用在线预约挂号、极速问诊与电子处方服务。
            </p>
          </div>
          <div className="bg-white rounded-[8px] p-[14px]">
            <div className="flex justify-between">
              <span className="text-[#333333] text-[14px] font-medium">直播开播提醒</span>
              <span className="text-[#999999] text-[11px]">2022-02-24 08:20</span>
            </div>
            <p className="text-[#666666] text-[12px] mt-[6px]">
              您预约的罗定医生科普直播《血管瘤，激光可以祛除吗？》即将开始，点击前往观看。
            </p>
          </div>
        </div>
      ) : (
        <div className="p-[10px] space-y-[10px]">
          {orders.slice(0, 4).map((o) => (
            <div
              key={o.id}
              onClick={() => navigate('order-detail', { orderId: o.id })}
              className="bg-white rounded-[8px] p-[14px] cursor-pointer"
            >
              <div className="flex justify-between">
                <span className="text-[#333333] text-[14px] font-medium">
                  {o.category} - {o.status}
                </span>
                <span className="text-[#999999] text-[11px]">{o.time}</span>
              </div>
              <p className="text-[#666666] text-[12px] mt-[6px]">
                就诊人 {o.patientName} 在 {o.hospital} 的订单（¥{o.amount.toFixed(2)}）状态为「
                {o.status}」，点击查看详情。
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * 我的医生 (0:9185)、我的收藏 (0:9349)、我的家人 (0:10846)、病历档案 (0:23739)、新增病历 (0:22121)、我的评论 (0:17308)、我的评价 (0:17343)
 */
export function MyDoctorsPage() {
  const { doctors, toggleFollowDoctor, navigate, goBack } = useAppStore()
  const followedDocs = doctors.filter((d) => d.followed)

  return (
    <div data-frame-id="0:9185" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8]">
      <NavBar title="我的医生" onBack={goBack} />
      {followedDocs.length === 0 ? (
        <div className="pt-[100px] flex flex-col items-center">
          <img
            src="/frames/empty-states/208-2921.png"
            alt="暂无关注医生"
            className="w-[160px] h-[160px] object-contain"
          />
          <p className="text-[#999999] text-[13px] mt-[8px]">暂未关注医生</p>
        </div>
      ) : (
        <div className="p-[10px] space-y-[10px]">
          {followedDocs.map((doc) => (
            <div
              key={doc.id}
              onClick={() => navigate('doctor-studio', { doctorId: doc.id })}
              className="bg-white rounded-[8px] p-[14px] flex items-center gap-[12px] cursor-pointer"
            >
              <img
                src={doc.avatar}
                alt={doc.name}
                className="w-[52px] h-[52px] rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="text-[#333333] text-[15px] font-medium">
                  {doc.name}{' '}
                  <span className="text-[#666666] text-[12px] ml-[6px]">
                    {doc.dept} | {doc.title}
                  </span>
                </div>
                <div className="text-[#666666] text-[12px] mt-[3px]">{doc.hospital}</div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFollowDoctor(doc.id)
                }}
                className="px-[10px] py-[4px] rounded-[12px] border border-[#dcdcdc] bg-white text-[#888888] text-[11px] cursor-pointer"
              >
                已关注
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function MyFavoritesPage() {
  const { videos, articles, navigate, goBack } = useAppStore()
  const [tab, setTab] = useState<'video' | 'article'>('video')
  const favVideos = videos.filter((v) => v.favorited)
  const favArticles = articles.filter((a) => a.favorited)

  return (
    <div data-frame-id="0:9349" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8]">
      <NavBar title="我的收藏" onBack={goBack} />
      <div className="bg-white h-[40px] flex border-b border-[#f0f0f0]">
        <button
          type="button"
          onClick={() => setTab('video')}
          className={`flex-1 text-[14px] bg-transparent border-0 cursor-pointer ${
            tab === 'video' ? 'text-[#1890ff] font-semibold' : 'text-[#666666]'
          }`}
        >
          小视频 ({favVideos.length})
        </button>
        <button
          type="button"
          onClick={() => setTab('article')}
          className={`flex-1 text-[14px] bg-transparent border-0 cursor-pointer ${
            tab === 'article' ? 'text-[#1890ff] font-semibold' : 'text-[#666666]'
          }`}
        >
          科普文章 ({favArticles.length})
        </button>
      </div>

      {tab === 'video' ? (
        <div className="p-[10px] grid grid-cols-2 gap-[10px]">
          {favVideos.map((v) => (
            <div
              key={v.id}
              onClick={() => navigate('video-detail', { videoId: v.id })}
              className="bg-white rounded-[8px] overflow-hidden cursor-pointer"
            >
              <img src={v.cover} alt={v.title} className="w-full h-[140px] object-cover" />
              <div className="p-[8px] text-[13px] text-[#333333] line-clamp-1">{v.title}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-[10px] space-y-[10px]">
          {favArticles.map((a) => (
            <div
              key={a.id}
              onClick={() => navigate('article-detail', { articleId: a.id })}
              className="bg-white rounded-[8px] p-[12px] flex gap-[10px] cursor-pointer"
            >
              <div className="flex-1">
                <div className="text-[#333333] text-[14px] font-medium line-clamp-2">
                  {a.detailTitle}
                </div>
                <div className="text-[#888888] text-[12px] mt-[6px]">
                  {a.doctorName} · {a.date}
                </div>
              </div>
              <img
                src={a.thumb}
                alt={a.detailTitle}
                className="w-[88px] h-[64px] rounded-[6px] object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function MyFamilyPage() {
  const { patients, navigate, goBack } = useAppStore()
  return (
    <div data-frame-id="0:10846" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8] pb-[80px]">
      <NavBar title="我的家人" onBack={goBack} />
      <div className="p-[10px] space-y-[10px]">
        {patients.map((pat) => (
          <div
            key={pat.id}
            onClick={() => navigate('patient-edit', { patientId: pat.id })}
            className="bg-white rounded-[8px] p-[14px] flex items-center justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center gap-[8px]">
                <span className="text-[#333333] text-[15px] font-medium">{pat.name}</span>
                <span className="text-[#666666] text-[12px]">
                  {pat.gender} · {pat.age}岁
                </span>
                <span className="px-[6px] py-[1px] rounded-[3px] bg-[#ebf6ff] text-[#1890ff] text-[11px]">
                  {pat.relation}
                </span>
              </div>
              <div className="text-[#888888] text-[12px] mt-[4px]">身份证：{pat.idCard}</div>
            </div>
            <span className="text-[#1890ff] text-[12px]">编辑 &gt;</span>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[375px] p-[12px] bg-white border-t border-[#eeeeee]">
        <button
          type="button"
          onClick={() => navigate('patient-edit')}
          className="w-full h-[40px] rounded-[20px] bg-[#1890ff] text-white text-[14px] border-0 cursor-pointer"
        >
          + 添加就诊人/家人
        </button>
      </div>
    </div>
  )
}

export function MedicalRecordsPage() {
  const { medicalCases, navigate, goBack } = useAppStore()
  return (
    <div data-frame-id="0:23739" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8] pb-[80px]">
      <NavBar title="病历档案" onBack={goBack} />
      <div className="p-[10px] space-y-[10px]">
        {medicalCases.map((c) => (
          <div key={c.id} className="bg-white rounded-[8px] p-[14px] space-y-[6px]">
            <div className="flex justify-between items-center">
              <span className="text-[#333333] text-[15px] font-medium">
                就诊人：{c.patientName}
              </span>
              <span className="text-[#888888] text-[12px]">{c.visitDate}</span>
            </div>
            <div className="text-[#1890ff] text-[13px]">
              {c.hospital} · {c.dept}
            </div>
            <div className="text-[#333333] text-[13px]">临床诊断：{c.diagnosis}</div>
            <div className="text-[#666666] text-[12px] bg-[#f7f8fa] p-[8px] rounded-[4px]">
              病情记录：{c.notes}
            </div>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[375px] p-[12px] bg-white border-t border-[#eeeeee]">
        <button
          type="button"
          onClick={() => navigate('medical-record-add')}
          className="w-full h-[40px] rounded-[20px] bg-[#1890ff] text-white text-[14px] border-0 cursor-pointer"
        >
          + 上传线下病历档案
        </button>
      </div>
    </div>
  )
}

export function MedicalRecordAddPage() {
  const { patients, addMedicalCase, goBack } = useAppStore()
  const [patientName, setPatientName] = useState(patients[0]?.name || '张晓靖')
  const [hospital, setHospital] = useState('北京长峰医院')
  const [dept, setDept] = useState('血管瘤科')
  const [diagnosis, setDiagnosis] = useState('浅表性婴幼儿血管瘤复诊')
  const [notes, setNotes] = useState('完成脉冲激光巩固治疗一次，恢复良好。')

  return (
    <div data-frame-id="0:22121" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8]">
      <NavBar title="上传病历档案" onBack={goBack} />
      <div className="bg-white mt-[10px] px-[15px] divide-y divide-[#f2f2f2] text-[14px]">
        <div className="py-[12px] flex items-center">
          <span className="w-[85px] text-[#666666]">就诊人</span>
          <input
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="flex-1 border-0 outline-none text-[#333333]"
          />
        </div>
        <div className="py-[12px] flex items-center">
          <span className="w-[85px] text-[#666666]">就诊医院</span>
          <input
            value={hospital}
            onChange={(e) => setHospital(e.target.value)}
            className="flex-1 border-0 outline-none text-[#333333]"
          />
        </div>
        <div className="py-[12px] flex items-center">
          <span className="w-[85px] text-[#666666]">就诊科室</span>
          <input
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            className="flex-1 border-0 outline-none text-[#333333]"
          />
        </div>
        <div className="py-[12px] flex items-center">
          <span className="w-[85px] text-[#666666]">主要诊断</span>
          <input
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            className="flex-1 border-0 outline-none text-[#333333]"
          />
        </div>
        <div className="py-[12px]">
          <span className="block text-[#666666] mb-[6px]">诊疗经过与医嘱备注</span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full rounded-[6px] border border-[#e5e5e5] p-[8px] text-[13px]"
          />
        </div>
      </div>
      <div className="p-[15px] mt-[20px]">
        <button
          type="button"
          onClick={() => {
            addMedicalCase({
              patientName,
              hospital,
              dept,
              visitDate: '2022-02-24',
              diagnosis,
              notes,
            })
            goBack()
          }}
          className="w-full h-[42px] rounded-[21px] bg-[#1890ff] text-white text-[15px] border-0 cursor-pointer"
        >
          保存病历档案
        </button>
      </div>
    </div>
  )
}

export function MyCommentsPage() {
  const { articles, navigate, goBack } = useAppStore()
  const allComments = articles.flatMap((a) =>
    a.comments.map((c) => ({ ...c, articleId: a.id, articleTitle: a.detailTitle })),
  )
  return (
    <div data-frame-id="0:17308" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8]">
      <NavBar title="我的评论" onBack={goBack} />
      <div className="p-[10px] space-y-[10px]">
        {allComments.map((c) => (
          <div
            key={`${c.articleId}-${c.id}`}
            onClick={() => navigate('article-detail', { articleId: c.articleId })}
            className="bg-white rounded-[8px] p-[14px] cursor-pointer"
          >
            <div className="text-[#333333] text-[14px]">{c.content}</div>
            <div className="text-[#999999] text-[11px] mt-[4px]">{c.date}</div>
            <div className="mt-[8px] bg-[#f7f8fa] px-[10px] py-[6px] rounded-[4px] text-[#666666] text-[12px]">
              原文：{c.articleTitle}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function MyReviewsPage() {
  const { consultations, navigate, goBack } = useAppStore()
  const reviewedList = consultations.filter((c) => c.type !== 'free')
  return (
    <div data-frame-id="0:17343" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8]">
      <NavBar title="我的评价" onBack={goBack} />
      <div className="p-[10px] space-y-[10px]">
        {reviewedList.map((c) => (
          <div key={c.id} className="bg-white rounded-[8px] p-[14px]">
            <div className="flex justify-between items-center">
              <span className="text-[#333333] text-[14px] font-medium">
                {c.doctorName} 医生（{c.hospital}）
              </span>
              <span className="text-[#ffb800] text-[13px]">★★★★★</span>
            </div>
            <p className="text-[#666666] text-[13px] mt-[6px]">
              {c.reviewContent || '非常好的医生，专业细心，解答详尽！'}
            </p>
            <div className="mt-[8px] flex justify-between items-center text-[12px] text-[#999999]">
              <span>{c.date}</span>
              <button
                type="button"
                onClick={() => navigate('consult-review', { consultationId: c.id })}
                className="text-[#1890ff] bg-transparent border-0 cursor-pointer"
              >
                查看/追评 &gt;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * 报告查询 (0:12318) -> 报告列表 (0:12387) -> 检验检查报告单详情 (0:7400 / 0:7479)
 */
export function ReportsPage() {
  const { patients, reports, navigate, goBack } = useAppStore()
  const [selectedPatId, setSelectedPatId] = useState(patients[0]?.id || 'pat-1')
  const patReports = reports.filter((r) => r.patientId === selectedPatId)

  return (
    <div data-frame-id="0:12318" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8]">
      <NavBar title="报告查询" onBack={goBack} />

      {/* 就诊人切换栏 */}
      <div className="bg-white px-[15px] py-[10px] flex gap-[8px] border-b border-[#f0f0f0]">
        {patients.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setSelectedPatId(p.id)}
            className={`px-[12px] py-[5px] rounded-[15px] text-[13px] border cursor-pointer ${
              selectedPatId === p.id
                ? 'border-[#1890ff] bg-[#ebf6ff] text-[#1890ff] font-medium'
                : 'border-[#e0e0e0] bg-white text-[#666666]'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="p-[10px] space-y-[10px]">
        {patReports.map((rep) => (
          <div
            key={rep.id}
            onClick={() => navigate('report-sheet', { reportId: rep.id })}
            className="bg-white rounded-[8px] p-[14px] flex items-center justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center gap-[8px]">
                <span className="px-[6px] py-[1px] rounded-[3px] bg-[#ebf6ff] text-[#1890ff] text-[11px]">
                  {rep.type}
                </span>
                <span className="text-[#333333] text-[14px] font-medium">{rep.title}</span>
              </div>
              <div className="text-[#888888] text-[12px] mt-[6px]">
                {rep.hospital} · {rep.dept} · {rep.date}
              </div>
            </div>
            <span className="text-[#1890ff] text-[12px]">查看 &gt;</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ReportDetailPage() {
  return <ReportsPage />
}

export function ReportSheetPage() {
  const { currentRoute, reports, goBack } = useAppStore()
  const repId = currentRoute.params?.reportId || 'rep-1'
  const rep = reports.find((r) => r.id === repId) || reports[0]

  return (
    <div data-frame-id="0:7400" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8]">
      <NavBar title={rep.type} onBack={goBack} />
      <div className="m-[10px] bg-white rounded-[8px] p-[15px]">
        <div className="text-center border-b border-[#f0f0f0] pb-[10px]">
          <div className="text-[#333333] text-[16px] font-semibold">{rep.hospital}</div>
          <div className="text-[#666666] text-[13px] mt-[2px]">{rep.title}</div>
        </div>
        <div className="py-[10px] text-[12px] text-[#666666] flex justify-between border-b border-[#f0f0f0]">
          <span>姓名：{rep.patientName}</span>
          <span>科室：{rep.dept}</span>
          <span>日期：{rep.date.split(' ')[0]}</span>
        </div>
        <div className="mt-[10px]">
          <div className="grid grid-cols-4 text-[12px] text-[#888888] pb-[6px] border-b border-[#f0f0f0]">
            <span className="col-span-2">项目名称</span>
            <span>结果</span>
            <span>参考值</span>
          </div>
          {rep.items.map((item, idx) => (
            <div
              key={idx}
              className="grid grid-cols-4 py-[8px] text-[12px] text-[#333333] border-b border-[#f8f8f8]"
            >
              <span className="col-span-2 font-medium">{item.name}</span>
              <span className="text-[#1890ff] font-medium">
                {item.result} {item.unit !== '-' ? item.unit : ''}
              </span>
              <span className="text-[#888888]">{item.ref}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * 核酸检测预约页 (0:12966 / 0:12543 预约通道过期) & 核酸报告查询 (0:11624) & 核酸医院选择 (0:12469)
 */
export function NucleicAcidPage() {
  const { currentRoute, patients, checkoutCartOrDrug, navigate, goBack } = useAppStore()
  const [expiredChannel, setExpiredChannel] = useState(
    Boolean(currentRoute.params?.expiredChannel),
  )
  const [selectedHospital, setSelectedHospital] = useState('北京长峰医院核酸采样点')
  const pat = patients[0]

  return (
    <div data-frame-id="0:12966" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8]">
      <NavBar
        title="核酸检测预约"
        onBack={goBack}
        rightText="查报告"
        onRightClick={() => navigate('nucleic-query')}
      />

      <div className="bg-[#ebf6ff] px-[12px] py-[6px] flex items-center justify-between text-[12px]">
        <span className="text-[#1890ff]">通道状态演示：</span>
        <button
          type="button"
          onClick={() => setExpiredChannel(!expiredChannel)}
          className="px-[8px] py-[2px] rounded-[10px] bg-white text-[#1890ff] border-0 cursor-pointer text-[11px]"
        >
          {expiredChannel ? '切换为正常可预约(0:12966)' : '切换为通道已过期(0:12543)'}
        </button>
      </div>

      <div className="m-[10px] bg-white rounded-[8px] p-[14px] space-y-[12px] text-[14px]">
        <div
          onClick={() => navigate('nucleic-hospitals')}
          className="flex justify-between items-center pb-[10px] border-b border-[#f0f0f0] cursor-pointer"
        >
          <span className="text-[#666666]">检测医院</span>
          <span className="text-[#333333] font-medium">{selectedHospital} &gt;</span>
        </div>
        <div
          onClick={() => navigate('patient-select')}
          className="flex justify-between items-center pb-[10px] border-b border-[#f0f0f0] cursor-pointer"
        >
          <span className="text-[#666666]">受检人</span>
          <span className="text-[#333333]">
            {pat.name} ({pat.idCard}) &gt;
          </span>
        </div>
        <div className="flex justify-between items-center pb-[10px] border-b border-[#f0f0f0]">
          <span className="text-[#666666]">检测项目</span>
          <span className="text-[#333333]">新冠病毒核酸单采检测</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#666666]">检测费用</span>
          <span className="text-[#ff4d4f] font-semibold">¥35.00</span>
        </div>
      </div>

      <div className="p-[15px] mt-[20px]">
        {expiredChannel ? (
          <button
            type="button"
            disabled
            className="w-full h-[44px] rounded-[22px] bg-[#cccccc] text-white text-[15px] border-0"
          >
            当前时段预约通道已关闭
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              const orderId = checkoutCartOrDrug({
                category: '西药药品',
                amount: 35,
                deliveryMode: '到院自取',
              })
              navigate('payment', { orderId })
            }}
            className="w-full h-[44px] rounded-[22px] bg-[#1890ff] text-white text-[15px] font-medium border-0 cursor-pointer"
          >
            立即预约并支付 ¥35.00
          </button>
        )}
      </div>
    </div>
  )
}

export function NucleicQueryPage() {
  const { reports, navigate, goBack } = useAppStore()
  const nucleicRep = reports.find((r) => r.type === '核酸报告') || reports[0]
  return (
    <div data-frame-id="0:11624" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8]">
      <NavBar title="核酸检测结果查询" onBack={goBack} />
      <div className="p-[10px]">
        <div
          onClick={() => navigate('report-sheet', { reportId: nucleicRep.id })}
          className="bg-white rounded-[8px] p-[16px] cursor-pointer"
        >
          <div className="flex justify-between items-center">
            <span className="text-[#333333] text-[15px] font-semibold">{nucleicRep.title}</span>
            <span className="px-[8px] py-[2px] rounded-[10px] bg-[#e6fffb] text-[#00b578] text-[12px] font-medium">
              阴性 (-)
            </span>
          </div>
          <div className="text-[#666666] text-[12px] mt-[8px]">
            受检人：{nucleicRep.patientName} · 采样医院：{nucleicRep.hospital}
          </div>
          <div className="text-[#999999] text-[12px] mt-[4px]">报告时间：{nucleicRep.date}</div>
        </div>
      </div>
    </div>
  )
}

export function NucleicHospitalsPage() {
  const { goBack } = useAppStore()
  const list = ['北京长峰医院核酸采样点', '安徽医科大学第一附属医院采样点', '上海长峰医院采样点']
  return (
    <div data-frame-id="0:12469" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8]">
      <NavBar title="选择核酸检测医院" onBack={goBack} />
      <div className="p-[10px] space-y-[10px]">
        {list.map((h) => (
          <div
            key={h}
            onClick={goBack}
            className="bg-white rounded-[8px] p-[14px] flex justify-between items-center cursor-pointer"
          >
            <span className="text-[#333333] text-[14px] font-medium">{h}</span>
            <span className="text-[#1890ff] text-[12px]">选择 &gt;</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * 用药助手模块: 首页 (0:20963) -> 计划详情 (0:21211) -> 添加用药 (0:20090) -> 服药提醒弹窗页 (0:20277)
 */
export function MedHelperPage() {
  const { medications, toggleMedicationReminder, navigate, goBack } = useAppStore()
  return (
    <div data-frame-id="0:20963" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8] pb-[80px]">
      <NavBar
        title="用药助手"
        onBack={goBack}
        rightText="提醒预览"
        onRightClick={() => navigate('med-remind')}
      />
      <div className="bg-gradient-to-r from-[#2b9aff] to-[#1890ff] p-[16px] text-white">
        <div className="text-[16px] font-semibold">今日服药计划</div>
        <div className="text-[12px] text-white/85 mt-[4px]">
          按时规律服药/外敷，科学守护康复每一步
        </div>
      </div>

      <div className="p-[10px] space-y-[10px]">
        {medications.map((med) => (
          <div
            key={med.id}
            onClick={() => navigate('med-detail', { medId: med.id })}
            className="bg-white rounded-[8px] p-[14px] flex items-center justify-between cursor-pointer"
          >
            <div>
              <div className="text-[#333333] text-[15px] font-medium">{med.drugName}</div>
              <div className="text-[#666666] text-[12px] mt-[4px]">
                {med.frequency} · {med.dosage} · 提醒时间：{med.times.join(' / ')}
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                toggleMedicationReminder(med.id)
              }}
              className={`px-[10px] py-[4px] rounded-[12px] text-[12px] border-0 cursor-pointer ${
                med.enabled ? 'bg-[#1890ff] text-white' : 'bg-[#eeeeee] text-[#888888]'
              }`}
            >
              {med.enabled ? '提醒开启' : '已暂停'}
            </button>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[375px] p-[12px] bg-white border-t border-[#eeeeee] flex gap-[10px]">
        <button
          type="button"
          onClick={() => navigate('med-add')}
          className="flex-1 h-[40px] rounded-[20px] bg-[#1890ff] text-white text-[14px] border-0 cursor-pointer"
        >
          + 添加用药提醒
        </button>
      </div>
    </div>
  )
}

export function MedDetailPage() {
  const { currentRoute, medications, deleteMedication, goBack } = useAppStore()
  const medId = currentRoute.params?.medId || 'med-1'
  const med = medications.find((m) => m.id === medId) || medications[0]

  return (
    <div data-frame-id="0:21211" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8]">
      <NavBar title="用药详情" onBack={goBack} />
      <div className="m-[10px] bg-white rounded-[8px] p-[16px] space-y-[10px] text-[14px]">
        <div className="text-[#333333] text-[16px] font-semibold">{med.drugName}</div>
        <div className="text-[#666666]">规格：{med.spec}</div>
        <div className="text-[#666666]">单次剂量：{med.dosage}</div>
        <div className="text-[#666666]">用药频次：{med.frequency}</div>
        <div className="text-[#666666]">提醒时间：{med.times.join('、')}</div>
        <div className="text-[#666666]">疗程天数：{med.days}天</div>
      </div>
      <div className="p-[15px]">
        <button
          type="button"
          onClick={() => {
            deleteMedication(med.id)
            goBack()
          }}
          className="w-full h-[42px] rounded-[21px] border border-[#ff4d4f] bg-white text-[#ff4d4f] text-[14px] cursor-pointer"
        >
          删除该提醒计划
        </button>
      </div>
    </div>
  )
}

export function MedAddPage() {
  const { saveMedication, goBack } = useAppStore()
  const [drugName, setDrugName] = useState('重组人表皮生长因子凝胶')
  const [spec, setSpec] = useState('20g/支')
  const [dosage, setDosage] = useState('外涂患处1次')
  const [frequency, setFrequency] = useState('每日2次')

  return (
    <div data-frame-id="0:20090" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8]">
      <NavBar title="添加用药计划" onBack={goBack} />
      <div className="bg-white mt-[10px] px-[15px] divide-y divide-[#f2f2f2] text-[14px]">
        <div className="py-[12px] flex items-center">
          <span className="w-[85px] text-[#666666]">药品名称</span>
          <input
            value={drugName}
            onChange={(e) => setDrugName(e.target.value)}
            className="flex-1 border-0 outline-none text-[#333333]"
          />
        </div>
        <div className="py-[12px] flex items-center">
          <span className="w-[85px] text-[#666666]">药品规格</span>
          <input
            value={spec}
            onChange={(e) => setSpec(e.target.value)}
            className="flex-1 border-0 outline-none text-[#333333]"
          />
        </div>
        <div className="py-[12px] flex items-center">
          <span className="w-[85px] text-[#666666]">每次用量</span>
          <input
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            className="flex-1 border-0 outline-none text-[#333333]"
          />
        </div>
        <div className="py-[12px] flex items-center">
          <span className="w-[85px] text-[#666666]">用药频次</span>
          <input
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="flex-1 border-0 outline-none text-[#333333]"
          />
        </div>
      </div>
      <div className="p-[15px] mt-[20px]">
        <button
          type="button"
          onClick={() => {
            saveMedication({
              drugName,
              spec,
              dosage,
              frequency,
              times: ['08:30', '20:30'],
              days: 14,
              startDate: '2022-02-24',
              enabled: true,
              takenToday: false,
            })
            goBack()
          }}
          className="w-full h-[42px] rounded-[21px] bg-[#1890ff] text-white text-[15px] border-0 cursor-pointer"
        >
          保存用药提醒
        </button>
      </div>
    </div>
  )
}

export function MedRemindPage() {
  const { medications, showToast, goBack } = useAppStore()
  const med = medications[0]
  return (
    <div data-frame-id="0:20277" className="relative w-[375px] min-h-[667px] bg-[#1890ff] text-white flex flex-col justify-between p-[24px]">
      <div className="pt-[40px] text-center">
        <div className="text-[36px] font-bold">08:30</div>
        <div className="mt-[6px] text-[14px] text-white/85">医百顺用药小助手提醒您按时用药</div>
      </div>
      <div className="bg-white rounded-[12px] p-[20px] text-[#333333]">
        <div className="text-[16px] font-semibold">{med?.drugName || '马来酸噻吗洛尔滴眼液'}</div>
        <div className="text-[#666666] text-[13px] mt-[6px]">
          用法用量：{med?.dosage || '每次湿敷15分钟'}（{med?.frequency || '每日2次'}）
        </div>
        <div className="mt-[20px] flex gap-[10px]">
          <button
            type="button"
            onClick={() => {
              showToast('已推迟10分钟提醒')
              goBack()
            }}
            className="flex-1 h-[38px] rounded-[19px] border border-[#1890ff] bg-white text-[#1890ff] text-[13px] cursor-pointer"
          >
            稍后提醒
          </button>
          <button
            type="button"
            onClick={() => {
              showToast('已打卡完成今日用药')
              goBack()
            }}
            className="flex-1 h-[38px] rounded-[19px] bg-[#1890ff] text-white text-[13px] border-0 cursor-pointer"
          >
            确认已用药
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={goBack}
        className="text-white/80 text-[13px] bg-transparent border-0 cursor-pointer"
      >
        关闭提醒预览
      </button>
    </div>
  )
}

/**
 * 系统设置 (0:16957 / 0:17015) 及子页
 */
export function SettingsPage() {
  const { user, navigate, goBack, resetDemoState } = useAppStore()
  const items: { label: string; page: any; extra?: string }[] = [
    { label: '个人资料设置', page: 'account-settings', extra: user.name },
    { label: '账号与安全', page: 'account-security', extra: user.phone },
    { label: '实名认证', page: 'realname-auth', extra: user.realNameVerified ? '已认证' : '未认证' },
    { label: '用户服务与隐私协议', page: 'agreement' },
    { label: '关于医百顺', page: 'about', extra: 'v2.4.0' },
  ]
  return (
    <div data-frame-id="0:16957" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8]">
      <NavBar title="系统设置" onBack={goBack} />
      <div className="bg-white mt-[10px] divide-y divide-[#f2f2f2]">
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => navigate(item.page)}
            className="w-full px-[15px] py-[14px] flex items-center justify-between bg-transparent border-0 cursor-pointer text-[14px]"
          >
            <span className="text-[#333333]">{item.label}</span>
            <span className="text-[#888888] text-[13px]">{item.extra || ''} &gt;</span>
          </button>
        ))}
      </div>

      <div className="p-[15px] mt-[24px] space-y-[10px]">
        <button
          type="button"
          onClick={resetDemoState}
          className="w-full h-[42px] rounded-[21px] border border-[#1890ff] bg-white text-[#1890ff] text-[14px] cursor-pointer"
        >
          重置演示状态数据
        </button>
        <button
          type="button"
          onClick={() => navigate('login')}
          className="w-full h-[42px] rounded-[21px] bg-white text-[#ff4d4f] text-[14px] border border-[#eeeeee] cursor-pointer"
        >
          退出登录
        </button>
      </div>
    </div>
  )
}

export function AccountSettingsPage() {
  const { user, navigate, goBack } = useAppStore()
  return (
    <div data-frame-id="0:10148" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8]">
      <NavBar title="个人资料" onBack={goBack} />
      <div className="bg-white mt-[10px] px-[15px] divide-y divide-[#f2f2f2] text-[14px]">
        <div className="py-[12px] flex items-center justify-between">
          <span className="text-[#666666]">头像</span>
          <img src={user.avatar} alt={user.name} className="w-[44px] h-[44px] rounded-full object-cover" />
        </div>
        <button
          type="button"
          onClick={() => navigate('edit-nickname')}
          className="w-full py-[14px] flex items-center justify-between bg-transparent border-0 cursor-pointer"
        >
          <span className="text-[#666666]">昵称</span>
          <span className="text-[#333333]">{user.name} &gt;</span>
        </button>
        <div className="py-[14px] flex items-center justify-between">
          <span className="text-[#666666]">绑定手机</span>
          <span className="text-[#333333]">{user.phone}</span>
        </div>
      </div>
    </div>
  )
}

export function AccountSecurityPage() {
  const { navigate, goBack } = useAppStore()
  return (
    <div data-frame-id="0:46508" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8]">
      <NavBar title="账号与安全" onBack={goBack} />
      <div className="bg-white mt-[10px] divide-y divide-[#f2f2f2]">
        <button
          type="button"
          onClick={() => navigate('change-password')}
          className="w-full px-[15px] py-[14px] flex justify-between bg-transparent border-0 cursor-pointer text-[14px]"
        >
          <span className="text-[#333333]">修改登录密码</span>
          <span className="text-[#999999]">&gt;</span>
        </button>
        <button
          type="button"
          onClick={() => navigate('delete-account')}
          className="w-full px-[15px] py-[14px] flex justify-between bg-transparent border-0 cursor-pointer text-[14px]"
        >
          <span className="text-[#ff4d4f]">注销账号</span>
          <span className="text-[#999999]">&gt;</span>
        </button>
      </div>
    </div>
  )
}

export function EditNicknamePage() {
  const { user, updateUserProfile, showToast, goBack } = useAppStore()
  const [name, setName] = useState(user.name)
  return (
    <div data-frame-id="0:10568" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8]">
      <NavBar title="修改昵称" onBack={goBack} />
      <div className="bg-white mt-[10px] p-[15px]">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border-0 outline-none text-[14px] text-[#333333]"
        />
      </div>
      <div className="p-[15px]">
        <button
          type="button"
          onClick={() => {
            updateUserProfile({ name: name || '李可可' })
            showToast('昵称已更新')
            goBack()
          }}
          className="w-full h-[42px] rounded-[21px] bg-[#1890ff] text-white text-[15px] border-0 cursor-pointer"
        >
          保存
        </button>
      </div>
    </div>
  )
}

export function RealnameAuthPage() {
  const { user, updateUserProfile, showToast, goBack } = useAppStore()
  return (
    <div data-frame-id="0:10465" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8]">
      <NavBar title="实名认证" onBack={goBack} />
      <div className="m-[10px] bg-white rounded-[8px] p-[16px] space-y-[8px] text-[14px]">
        <div className="text-[#1890ff] font-semibold">
          {user.realNameVerified ? '✓ 已通过实名认证' : '请完成实名认证'}
        </div>
        <div className="text-[#666666]">真实姓名：李可可</div>
        <div className="text-[#666666]">证件号码：11010519980912****</div>
        {!user.realNameVerified && (
          <button
            type="button"
            onClick={() => {
              updateUserProfile({ realNameVerified: true })
              showToast('实名认证成功')
            }}
            className="w-full h-[40px] mt-[10px] rounded-[20px] bg-[#1890ff] text-white border-0 cursor-pointer"
          >
            立即认证
          </button>
        )}
      </div>
    </div>
  )
}

export function ChangePasswordPage() {
  const { showToast, goBack } = useAppStore()
  return (
    <div data-frame-id="0:17080" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8]">
      <NavBar title="修改密码" onBack={goBack} />
      <div className="bg-white mt-[10px] px-[15px] divide-y divide-[#f2f2f2] text-[14px]">
        <div className="py-[12px]">
          <input type="password" placeholder="请输入原密码" className="w-full border-0 outline-none" />
        </div>
        <div className="py-[12px]">
          <input type="password" placeholder="请输入新密码（6-20位字母或数字）" className="w-full border-0 outline-none" />
        </div>
      </div>
      <div className="p-[15px]">
        <button
          type="button"
          onClick={() => {
            showToast('密码修改成功')
            goBack()
          }}
          className="w-full h-[42px] rounded-[21px] bg-[#1890ff] text-white text-[15px] border-0 cursor-pointer"
        >
          确认修改
        </button>
      </div>
    </div>
  )
}

export function DeleteAccountPage() {
  const { showToast, goBack } = useAppStore()
  return (
    <div data-frame-id="0:17261" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8]">
      <NavBar title="注销账号" onBack={goBack} />
      <div className="m-[10px] bg-white rounded-[8px] p-[16px] text-[13px] text-[#666666] space-y-[8px]">
        <div className="text-[#ff4d4f] text-[15px] font-semibold">注销账号风险提示</div>
        <p>账号注销后，您的电子处方、问诊记录、家庭就诊人及健康档案将被永久清理且不可恢复。</p>
        <button
          type="button"
          onClick={() => {
            showToast('已取消注销申请')
            goBack()
          }}
          className="w-full h-[40px] mt-[12px] rounded-[20px] bg-[#1890ff] text-white border-0 cursor-pointer"
        >
          我再想想
        </button>
      </div>
    </div>
  )
}

export function AgreementPage() {
  const { goBack } = useAppStore()
  return (
    <div data-frame-id="0:17287" className="relative w-[375px] min-h-[667px] bg-white">
      <NavBar title="用户服务与隐私协议" onBack={goBack} />
      <div className="p-[16px] text-[13px] text-[#444444] leading-[22px] space-y-[10px]">
        <h3 className="text-[15px] font-semibold text-[#222222]">医百顺互联网医院用户服务协议</h3>
        <p>
          欢迎使用医百顺患者端小程序。本平台严格遵守国家互联网诊疗监管规定，为您提供预约挂号、在线图文/音视频问诊、电子处方流转及健康科普服务。
        </p>
        <p>
          您的所有个人敏感医疗信息、电子病历及实名认证数据均采用加密存储，仅用于执业医师在线诊疗与处方审核。
        </p>
      </div>
    </div>
  )
}

export function AboutPage() {
  const { goBack } = useAppStore()
  return (
    <div data-frame-id="0:17215" className="relative w-[375px] min-h-[667px] bg-[#f5f6f8]">
      <NavBar title="关于医百顺" onBack={goBack} />
      <div className="pt-[40px] flex flex-col items-center">
        <div className="w-[64px] h-[64px] rounded-[16px] bg-[#1890ff] text-white text-[22px] font-bold flex items-center justify-center">
          医百顺
        </div>
        <div className="mt-[10px] text-[#333333] text-[16px] font-medium">医百顺互联网医院</div>
        <div className="text-[#888888] text-[12px] mt-[4px]">Version 2.4.0</div>
      </div>
    </div>
  )
}

export function HelpFeedbackPage() {
  const { showToast, goBack } = useAppStore()
  const [text, setText] = useState('')
  return (
    <div className="relative w-[375px] min-h-[667px] bg-[#f5f6f8]">
      <NavBar title="帮助与反馈" onBack={goBack} />
      <div className="m-[10px] bg-white rounded-[8px] p-[14px]">
        <div className="text-[#333333] text-[14px] font-medium mb-[8px]">问题与意见反馈</div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="请描述您在使用医百顺小程序过程中遇到的问题或建议..."
          rows={4}
          className="w-full rounded-[6px] border border-[#e5e5e5] p-[10px] text-[13px]"
        />
        <button
          type="button"
          onClick={() => {
            showToast('感谢您的反馈，客服将在24小时内处理')
            goBack()
          }}
          className="w-full h-[40px] mt-[12px] rounded-[20px] bg-[#1890ff] text-white text-[14px] border-0 cursor-pointer"
        >
          提交反馈
        </button>
      </div>
    </div>
  )
}

export function AiTonguePage() {
  const { navigate, goBack } = useAppStore()
  return (
    <div className="relative w-[375px] min-h-[667px] bg-[#f5f6f8]">
      <NavBar title="智能舌诊辨体质" onBack={goBack} />
      <div className="m-[12px] bg-white rounded-[10px] p-[16px] text-center">
        <img
          src="/assets/extracted/home-ai-banner.png"
          alt="智能舌诊"
          className="w-full rounded-[8px] object-cover"
        />
        <div className="mt-[14px] text-[#333333] text-[16px] font-semibold">
          中医智能舌象体质辨识
        </div>
        <p className="mt-[6px] text-[#666666] text-[12px]">
          自然光线下拍摄舌面照片，辅助评估脾虚湿盛、气虚等中医体质并提供调养建议。
        </p>
        <button
          type="button"
          onClick={() => navigate('find-doctor')}
          className="w-full h-[42px] mt-[16px] rounded-[21px] bg-[#1890ff] text-white text-[14px] font-medium border-0 cursor-pointer"
        >
          预约中医科专家辨证调理
        </button>
      </div>
    </div>
  )
}

/**
 * 全量 Figma 864 画板精准检视器 (FrameViewerPage)
 * 支持通过 ?frame=<nodeId> 直接检视任意原始画板并交互返回
 */
export function FrameViewerPage() {
  const { currentRoute, goBack } = useAppStore()
  const rawFrameId = (currentRoute.params?.frameId as string) || '0:41862'
  const cleanId = rawFrameId.replace('-', ':')
  const meta = FRAME_META_MAP[cleanId]
  const pngSrc = meta
    ? meta.png
    : `/frames/patient/${cleanId.replace(':', '-')}.png`

  return (
    <div
      data-frame-id={cleanId}
      className="relative w-[375px] min-h-[667px] bg-[#f5f6f8]"
    >
      <div className="relative">
        <img
          src={pngSrc}
          alt={meta?.name || cleanId}
          className="w-[375px] h-auto block select-none"
        />
        {/* 顶部返回热区 */}
        <button
          type="button"
          aria-label="返回上一页"
          onClick={goBack}
          className="absolute top-[20px] left-[4px] w-[60px] h-[44px] bg-transparent border-0 cursor-pointer"
        />
      </div>
    </div>
  )
}
