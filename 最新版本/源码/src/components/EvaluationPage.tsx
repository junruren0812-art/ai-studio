import { Activity, ArrowRight, Ban, CheckCircle2, Eye, Gauge, HeartHandshake, ShieldCheck, Sparkles, Timer, TriangleAlert } from 'lucide-react'
import { Badge } from './ui/badge'

const objective = [
  ['首图延迟', '冷 / 热启动 P50·P95·P99'], ['整批吞吐', '12 SKU 同配方持续运行'], ['峰值显存', '硬件 / 精度 / 尺寸'],
  ['失败率', 'OOM · 黑图 · 卡死'], ['文字正确率', 'OCR + 精确字符串命中'], ['主体保真', '颜色 · Logo · 结构回归'],
]
const subjective = ['第一眼完成度', '意图命中', '主体保真', '文字可用性', '局部边界', '自然度', '多轮稳定性', '成片可用率']
const vetoes = ['包装文字错误', 'Logo / 结构变形', '身份漂移', '蒙版外泄', '输出损坏']

export function EvaluationPage(){return <main className="page-shell pb-16">
  <section className="section-heading"><div><p className="eyebrow">DOUBLE QUALITY GATE</p><h1>两道门都通过，整批才可交付</h1><p>客观回归挡住可测问题，创作者盲评判断真实可用；系统性关键错误一票否决。</p></div><Badge tone="green"><ShieldCheck size={12}/> 质量优先</Badge></section>

  <section className="gate-track mt-6" aria-label="双门禁评测流程">
    <div className="gate-stage source"><span>待评测版本</span><strong>12 SKU · 36 张</strong></div><ArrowRight/>
    <div className="gate-stage objective"><Activity/><span>门禁 01</span><strong>客观回归</strong><small>指标过线</small></div><ArrowRight/>
    <div className="gate-stage subjective"><Eye/><span>门禁 02</span><strong>创作者盲评</strong><small>双盲通过</small></div><ArrowRight/>
    <div className="gate-stage pass"><CheckCircle2/><span>双门通过</span><strong>允许交付</strong></div>
  </section>

  <section className="mt-6 grid gap-5 lg:grid-cols-2">
    <div className="premium-card"><div className="flex items-start gap-3"><div className="icon-chip"><Activity size={19}/></div><div><p className="eyebrow">GATE 01 · REPEATABLE</p><h2 className="mt-1 text-xl font-bold text-ink">客观回归</h2><p className="mt-1 text-sm text-[#777e79]">同条件、同切片、可重复比较。</p></div></div><div className="mt-5 grid gap-3 sm:grid-cols-2">{objective.map(([a,b])=><div className="rounded-xl border border-[#ebe8e1] p-3" key={a}><div className="flex items-center justify-between"><strong className="text-sm text-ink">{a}</strong><span className="h-2 w-2 rounded-full bg-[#5b8c70]"/></div><p className="mt-1 text-xs leading-5 text-[#7a817d]">{b}</p></div>)}</div><div className="gate-result"><CheckCircle2 size={15}/> 回归基线通过，进入创作者盲评</div></div>
    <div className="premium-card"><div className="flex items-start gap-3"><div className="icon-chip red"><Eye size={19}/></div><div><p className="eyebrow">GATE 02 · HUMAN</p><h2 className="mt-1 text-xl font-bold text-ink">创作者盲评</h2><p className="mt-1 text-sm text-[#777e79]">至少 5 名目标创作者，隐藏模型，随机成对比较。</p></div></div><div className="mt-5 flex flex-wrap gap-2">{subjective.map((x,i)=><span key={x} className="eval-pill"><b>{String(i+1).padStart(2,'0')}</b>{x}</span>)}</div><div className="blind-score"><div><span>成片可用</span><strong>≥ 基线</strong></div><div><span>主体保真</span><strong>必须通过</strong></div><div><span>偏好胜率</span><strong>≥ 50%</strong></div></div></div>
  </section>

  <section className="veto-board mt-6"><div className="veto-title"><Ban/><div><p className="eyebrow">ONE-VOTE VETO</p><h2>系统性关键错误，一票否决</h2></div><Badge tone="red">阻断整批发布</Badge></div><div className="veto-items">{vetoes.map(x=><span key={x}><TriangleAlert size={14}/>{x}</span>)}</div><p>偶发错误进入复核；一旦确认可重复、成片成批出现，立即回退版本，不用平均分掩盖。</p></section>

  <section className="mt-7 overflow-hidden rounded-3xl bg-ink text-white shadow-panel"><div className="grid lg:grid-cols-[.8fr_1.2fr]"><div className="p-7 lg:p-9"><p className="text-xs font-bold tracking-[.2em] text-[#ff997e]">THE DECISION</p><h2 className="mt-3 text-3xl font-black">速度与质量冲突？<br/>明确保质量。</h2><p className="mt-4 text-sm leading-6 text-white/65">慢一点仍可能交付；价格、Logo 或商品结构错了，结果直接不可用。本地失败时降级、排队或阻止，绝不静默切云。</p></div><div className="relative bg-white/5 p-7 lg:p-9"><div className="relative grid gap-5 lg:grid-cols-2"><Channel icon={Sparkles} tag="FAST PREVIEW" title="快速预览" items={['FLUX.2 Klein 4B · 4 步', '仅用于探索方向', '不可绕过质量门禁']}/><Channel icon={HeartHandshake} tag="QUALITY EXPORT" title="日常 / 精细交付" items={['日常默认 FLUX.2 Klein 4B', '高质量必要时 Qwen 2511', '商品真值 + 双门禁']}/></div></div></div></section>

  <section className="mt-7"><div className="section-heading compact"><div><p className="eyebrow">EVALUATION LOOP</p><h2>每次升级都走同一条回路</h2></div></div><div className="mt-4 grid gap-3 md:grid-cols-4"><Loop icon={Gauge} no="01" title="固定条件" text="整机、驱动、SHA、seed 与切片"/><Loop icon={Timer} no="02" title="客观回归" text="资源、保真、文字与失败率"/><Loop icon={Eye} no="03" title="创作者盲评" text="完成度、一致性与可用率"/><Loop icon={CheckCircle2} no="04" title="交付判定" text="双门通过且无一票否决"/></div></section>
</main>}
function Channel({icon:Icon,tag,title,items}:{icon:typeof Sparkles;tag:string;title:string;items:string[]}){return <div className="rounded-2xl border border-white/10 bg-[#2a3d36] p-5"><div className="flex items-center justify-between"><Icon className="text-[#ff9478]" size={19}/><span className="text-[9px] font-bold tracking-widest text-white/40">{tag}</span></div><h3 className="mt-4 text-lg font-bold">{title}</h3><ul className="mt-3 space-y-2 text-xs text-white/65">{items.map(x=><li className="flex gap-2" key={x}><ArrowRight size={13}/>{x}</li>)}</ul></div>}
function Loop({icon:Icon,no,title,text}:{icon:typeof Gauge;no:string;title:string;text:string}){return <div className="premium-card"><div className="flex items-center justify-between"><Icon size={18} className="text-coral"/><span className="text-xs font-black text-[#d1cec7]">{no}</span></div><h3 className="mt-3 font-bold text-ink">{title}</h3><p className="mt-1 text-xs leading-5 text-[#757c77]">{text}</p></div>}
