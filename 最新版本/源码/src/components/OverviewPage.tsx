import { ArrowRight, Boxes, Check, CheckCircle2, CloudOff, Download, LockKeyhole, PackageCheck, RotateCcw, ShieldCheck, Sparkles, Target, Workflow } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import type { ViewId } from '@/data'

const deliveryFlow = [
  ['01', '选择 SKU', '商品原图'], ['02', '选择任务', '场景 / 替换'], ['03', '选择档位', '快 / 日常 / 精细'],
  ['04', '创作控制', '构图与光线'], ['05', '锁定样片', '配方成为锚点'], ['06', '批量套用', '跨 SKU 复用'],
  ['07', '异常恢复', '从断点继续'], ['08', '多渠道导出', '规格自动适配'],
]
const truthChecks = [
  { title: 'SKU', note: '编号、原图、视角齐全', icon: Boxes },
  { title: '渠道规格', note: '尺寸、比例、安全区明确', icon: Target },
  { title: '包装文字', note: '品名与净含量可核对', icon: PackageCheck },
  { title: 'Logo', note: '位置、比例、方向锁定', icon: LockKeyhole },
  { title: '颜色', note: '标准色与实物对照', icon: Sparkles },
  { title: '轮廓', note: '瓶型与结构不可漂移', icon: ShieldCheck },
]

export function OverviewPage({ navigate }: { navigate: (v: ViewId) => void }) {
  const kpis = [['WSES', '每周成功导出 SKU 数', '北极星'], ['< 1%', '主体误改漏检率', '质量护栏'], ['≥ 75%', '批量一次通过率', '批量价值'], ['≥ 98%', '任务最终成功率', '含自动重试'], ['≥ 99.9%', '异常退出恢复率', '安全版本']]
  return <main className="page-shell pb-16">
    <section className="hero-grid overflow-hidden rounded-3xl border border-[#e3ded5] bg-[#fbfaf7] shadow-panel">
      <div className="relative z-10 p-8 lg:p-12">
        <div className="mb-5 flex flex-wrap gap-2"><Badge tone="green"><ShieldCheck size={12}/> 全程本地</Badge><Badge tone="red">v1.4 · 批量交付</Badge><Badge>质量优先</Badge></div>
        <p className="eyebrow">EDGE-NATIVE COMMERCE CREATION</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-[-.04em] text-ink lg:text-6xl">不是做好一张图，<br/><span className="text-pomegranate">而是可靠交付整批素材。</span></h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-[#68716d]">先守住商品真值，再锁定一张合格样片。配方批量复用、失败可恢复、结果按渠道成套导出。</p>
        <div className="mt-7 flex flex-wrap gap-3"><Button onClick={() => navigate('studio')}>进入批量工作台 <ArrowRight size={16}/></Button><Button variant="outline" onClick={() => navigate('models')}>查看三档方案</Button></div>
      </div>
      <div className="hero-art relative min-h-80 p-8">
        <div className="absolute right-10 top-9 h-52 w-40 rotate-6 rounded-[42px] bg-coral shadow-2xl"><div className="mx-auto mt-14 h-20 w-20 rounded-full border border-white/40 bg-white/25"/><div className="mx-auto mt-4 h-2 w-20 rounded bg-white/70"/><div className="mx-auto mt-2 h-2 w-12 rounded bg-white/30"/></div>
        <div className="absolute bottom-12 left-6 w-48 -rotate-3 rounded-2xl border border-white/80 bg-white/85 p-4 shadow-xl backdrop-blur"><div className="flex items-center gap-2 text-xs font-bold text-ink"><Sparkles size={14} className="text-coral"/> 锚点样片 v3</div><div className="mt-3 space-y-2"><div className="h-1.5 rounded bg-[#dfe8df]"/><div className="h-1.5 w-3/4 rounded bg-[#f3c0b1]"/></div></div>
        <div className="absolute bottom-8 right-3 rounded-xl bg-ink px-4 py-3 text-white shadow-lg"><p className="text-[10px] text-white/60">BATCH DELIVERY</p><p className="mt-1 text-sm font-bold">12 SKU · 36 张</p></div>
      </div>
    </section>

    <section className="mt-8 rounded-2xl border border-[#e2ded6] bg-white p-5 lg:p-7">
      <div className="section-heading compact"><div><p className="eyebrow">BEFORE CREATION</p><h2>素材准备检查清单</h2><p>六项齐全，才能进入批量创作。</p></div><Badge tone="green"><CheckCircle2 size={12}/> 6 / 6 已就绪</Badge></div>
      <div className="prep-grid">{truthChecks.map(({ title, note, icon: Icon }) => <article key={title}><div className="prep-check"><Icon size={16}/><Check size={12}/></div><strong>{title}</strong><span>{note}</span></article>)}</div>
    </section>

    <section className="mt-8">
      <div className="section-heading compact"><div><p className="eyebrow">DELIVERY MAP</p><h2>从一张样片，到整批交付</h2></div><Badge><Workflow size={12}/> 8 步可恢复流程</Badge></div>
      <div className="delivery-map">{deliveryFlow.map(([no, title, note], i) => <div className="delivery-node" key={no}><div className="delivery-node-top"><b>{no}</b>{i < deliveryFlow.length - 1 && <ArrowRight size={14}/>}</div><strong>{title}</strong><span>{note}</span></div>)}</div>
      <p className="mt-3 text-xs text-[#7c837f]">任务模式 / 创作模式 / 工作流模式仅在工作台切换，首页只呈现清晰的交付主线。</p>
    </section>

    <section className="mt-8 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
      <div className="premium-card"><div className="flex items-center gap-3"><div className="icon-chip"><RotateCcw size={18}/></div><div><p className="eyebrow">BATCH, NOT ONE-OFF</p><h2 className="mt-1 text-xl font-bold">样片只是起点，整批通过才算完成</h2></div></div><div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="mini-delivery"><Sparkles/><b>1 张样片</b><span>人工确认锚点</span></div><div className="mini-delivery"><Boxes/><b>12 个 SKU</b><span>同配方批量套用</span></div><div className="mini-delivery"><Download/><b>36 张成片</b><span>多渠道完整导出</span></div></div></div>
      <div className="rounded-2xl bg-ink p-6 text-white"><CloudOff className="text-[#ff8b6f]"/><h3 className="mt-4 text-xl font-bold">失败绝不静默切云</h3><p className="mt-3 text-sm leading-6 text-white/65">质量优先。设备不足或本地失败时，系统只会给出明确选择。</p><div className="mt-5 grid grid-cols-3 gap-2 text-center text-[11px]"><span className="rounded-lg bg-white/10 p-2">降级</span><span className="rounded-lg bg-white/10 p-2">排队</span><span className="rounded-lg bg-[#aa283b] p-2">阻止</span></div></div>
    </section>

    <section className="mt-8"><div className="section-heading"><div><p className="eyebrow">MVP SCOREBOARD</p><h2>KPI 与可信边界</h2></div><Badge tone="orange">建议目标，待基线校准</Badge></div><div className="mt-4 grid gap-3 md:grid-cols-5">{kpis.map(([n, t, s]) => <div className="metric-card" key={t}><strong>{n}</strong><p>{t}</p><span>{s}</span></div>)}</div></section>
  </main>
}
