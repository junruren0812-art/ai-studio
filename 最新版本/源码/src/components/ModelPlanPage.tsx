import { AlertTriangle, Box, Check, CheckCircle2, ChevronDown, Cpu, Gauge, Layers3, ShieldCheck, Sparkles, WandSparkles, Zap } from 'lucide-react'
import type { CreationPlan, ExperienceMode, QualityPlan } from '@/data'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

const tools = [
  { business:'场景结构识别', action:'理解桌面、背景与空间关系', tech:'Depth Anything V2 Small · FP16/BF16 · Apache-2.0', cite:'[6]' },
  { business:'智能抠图', action:'识别商品边缘与透明区域', tech:'SAM 2 + BiRefNet · PyTorch · Apache-2.0 / MIT', cite:'[7]' },
  { business:'高清放大', action:'提升尺寸并保护商品纹理', tech:'Real-ESRGAN · ncnn-Vulkan / PyTorch · BSD-3-Clause', cite:'' },
  { business:'局部修复', action:'移除物体、补齐背景空洞', tech:'LaMa · Apache-2.0', cite:'' },
  { business:'人像细节修复', action:'按需改善人像细节，默认关闭', tech:'GFPGAN · Apache-2.0', cite:'' },
  { business:'描述优化助手', action:'把创作意图整理为稳定描述', tech:'Qwen3-4B Q4 · llama.cpp · Apache-2.0', cite:'' },
]
const qualityOptions: {id:QualityPlan;title:string;speed:string;commercial:string;text:string;model:string;signal:string;tech:string}[] = [
  { id:'preview', title:'快速预览', speed:'较快', commercial:'探索方向', text:'先看构图、背景与光线，不直接交付。', model:'FLUX.2 Klein 4B', signal:'方向确认', tech:'4 步 · FP8 候选 · 较低分辨率' },
  { id:'daily', title:'日常创作', speed:'适中', commercial:'默认推荐', text:'常规上新主力，兼顾等待感与商品保真。', model:'FLUX.2 Klein 4B', signal:'审核后交付', tech:'BF16 / 经门禁 FP8 · 主体保护' },
  { id:'fine', title:'精细导出', speed:'较慢', commercial:'质量优先', text:'复杂文字或关键素材，必要时升级高质量模型。', model:'Qwen-Image-Edit-2511', signal:'双门禁交付', tech:'高质量必要时路由 · 真值检查 · 二次修复' },
]
const tiers = [
  { title:'流畅创作', tasks:'单张场景、背景替换与常规局部编辑', concurrent:'重任务串行', wait:'等待感知：适中', tech:'NVIDIA 16 GB · FLUX.2 FP8/BF16 + offload' },
  { title:'高效批量', tasks:'多 SKU 套用、渠道适配与后台队列', concurrent:'1 路重任务 + 轻任务受控并行', wait:'等待感知：较快', tech:'NVIDIA 24 GB · FLUX.2 BF16；Qwen INT8/FP8 候选' },
  { title:'专业精修', tasks:'复杂文字、多参考与高质量批量导出', concurrent:'更多辅助能力并行', wait:'等待感知：较慢但质量优先', tech:'32–48 GB+ · Qwen 20B BF16 / 高精度' },
]

type Props = { mode:ExperienceMode; creationPlan:CreationPlan; qualityPlan:QualityPlan; onCreationPlan:(v:CreationPlan)=>void; onQualityPlan:(v:QualityPlan)=>void; notify:(s:string)=>void }
export function ModelPlanPage({ mode, creationPlan, qualityPlan, onCreationPlan, onQualityPlan, notify }:Props) {
 const workflow = mode === 'workflow'
 const choose=(plan:CreationPlan)=>{onCreationPlan(plan);notify(plan==='daily'?'已使用推荐模式：日常商品创作':'已进入高质量商品精修模式')}
 return <main className="page-shell pb-16 model-plan-page">
  <section className="section-heading"><div><p className="eyebrow">CREATION PLAN</p><h1>你想完成什么？</h1><p>选择结果与质量目标，系统会自动匹配创作能力和设备方案。</p></div><Badge tone="orange"><AlertTriangle size={12}/> 速度仅用较快 / 适中 / 较慢表达</Badge></section>

  <section className="mt-6 grid gap-4 lg:grid-cols-2" aria-label="创作方案选择">
   <PlanCard selected={creationPlan==='daily'} icon={Sparkles} title="日常商品创作" tag="推荐" summary="适合商品场景图、背景替换和常规局部编辑" speed="速度较快" quality="质量标准" device="当前设备可流畅运行" action="使用推荐模式" onClick={()=>choose('daily')}>
    <TechDetails open={workflow} title="查看技术详情"><TechGrid items={[['创作引擎','FLUX.2 [klein] 4B [1][2]'],['设备适配版本','官方 FP8 候选；BF16 质量基线'],['运行框架','Diffusers · ComfyUI · PyTorch CUDA'],['商用授权状态','Apache-2.0 · 可用于商业创作']]}/></TechDetails>
   </PlanCard>
   <PlanCard selected={creationPlan==='quality'} icon={Layers3} title="高质量商品精修" tag="高质量" summary="适合包装文字、复杂合成、多图参考和高质量编辑" speed="速度较慢" quality="质量更高" device="需要高性能设备" action="进入高质量模式" onClick={()=>choose('quality')}>
    <TechDetails open={workflow} title="查看技术详情"><TechGrid items={[['创作引擎','Qwen-Image-Edit-2511 [3]'],['设备适配版本','20B BF16；24 GB 量化 + offload 候选'],['运行框架','Diffusers · ComfyUI'],['商用授权状态','Apache-2.0 · 可用于商业创作']]}/></TechDetails>
   </PlanCard>
  </section>

  <section className="mt-6 plan-section"><div className="plan-section-head"><div><p className="eyebrow">ON-DEMAND TOOLS</p><h2>按需加载的创作工具</h2><p>只在需要时启动，完成后自动释放设备资源。</p></div><Box size={20}/></div><div className="tool-grid">{tools.map(tool=><article key={tool.business}><div className="tool-icon"><WandSparkles size={16}/></div><div><h3>{tool.business}</h3><p>{tool.action}</p>{workflow ? <small>{tool.tech} {tool.cite}</small> : <TechDetails title="高级详情"><p className="tech-line">{tool.tech} {tool.cite}</p></TechDetails>}</div></article>)}</div></section>

  <section className="mt-6 grid gap-4 lg:grid-cols-[.72fr_1.28fr]">
   <div className="device-diagnosis"><div className="flex items-start justify-between"><div><Badge tone="green"><CheckCircle2 size={12}/> 自动诊断完成</Badge><h2>你的设备适合高效批量模式</h2></div><Cpu size={22}/></div><p>系统检测到可支持批量工作流的本地设备资源，并保留前台交互预算，因此建议同时处理 SKU 队列与轻量创作工具。</p><ul><li>可完成：多 SKU 场景套用与渠道适配</li><li>并发：重任务 1 路，轻任务受控并行</li><li>等待感知：较快；高质量精修需排队</li></ul>{workflow ? <div className="tech-box">NVIDIA 24 GB 档 · 当前模拟占用 11.8 GB · CUDA 首发路径 · 需实机标定</div> : null}</div>
   <div className="plan-section"><div className="plan-section-head"><div><p className="eyebrow">EXPERIENCE TIERS</p><h2>设备体验档</h2></div><Gauge size={20}/></div><div className="experience-tiers">{tiers.map((tier,i)=><article className={i===1?'current':''} key={tier.title}><div><span>{tier.title}</span>{i === 1 ? <Badge tone="green">当前设备</Badge> : null}</div><h3>{tier.tasks}</h3><p>{tier.concurrent}</p><p>{tier.wait}</p>{workflow ? <small>{tier.tech}</small> : null}</article>)}</div>{workflow ? null : <TechDetails title="查看设备技术详情"><div className="tech-list">{tiers.map(x=><p key={x.title}><b>{x.title}</b>：{x.tech}</p>)}</div></TechDetails>}</div>
  </section>

  <section className="mt-6 plan-section"><div className="plan-section-head"><div><p className="eyebrow">THREE DELIVERY GEARS</p><h2>三档不是三种“画质”，而是三种交付阶段</h2><p>默认从日常创作开始；只有高质量确有必要时，才升级 Qwen-Image-Edit-2511。</p></div><Zap size={20}/></div><div className="quality-grid quality-visual">{qualityOptions.map((item,index)=><button key={item.id} className={qualityPlan===item.id?'selected':''} onClick={()=>{onQualityPlan(item.id);notify(`输出方式已切换为${item.title}`)}} aria-pressed={qualityPlan===item.id}><div className="gear-head"><i>{index+1}</i><span>{item.title}</span>{item.id === 'daily' ? <em>默认</em> : null}{qualityPlan === item.id ? <Check size={15}/> : null}</div><div className="gear-progress"><span style={{width:`${36+index*31}%`}}/></div><p>{item.text}</p><strong className="gear-model">{item.model}</strong><dl><div><dt>速度</dt><dd>{item.speed}</dd></div><div><dt>用途</dt><dd>{item.commercial}</dd></div><div><dt>出口</dt><dd>{item.signal}</dd></div></dl>{workflow ? <small>{item.tech}</small> : null}</button>)}</div>{workflow ? null : <TechDetails title="查看输出技术详情"><div className="tech-list">{qualityOptions.map(x=><p key={x.id}><b>{x.title} · {x.model}</b>：{x.tech}</p>)}</div></TechDetails>}
   <div className="failure-policy"><div><ShieldCheck size={17}/><strong>质量优先</strong><span>不为速度牺牲商品真值</span></div><div><AlertTriangle size={17}/><strong>本地失败</strong><span>明确降级 / 排队 / 阻止</span></div><div><CheckCircle2 size={17}/><strong>绝不静默切云</strong><span>素材与推理始终留在本机</span></div></div>
  </section>

  <section className="mt-6 authorization-box"><ShieldCheck size={20}/><div><h2>商用授权状态</h2><div className="authorization-tags"><Badge tone="green">可用于商业创作</Badge><Badge>仅限个人或研究使用</Badge><Badge tone="orange">商业使用前需要额外授权</Badge><Badge tone="red">当前版本不可用于商业交付</Badge></div><p>当前推荐的两套创作方案为“可用于商业创作”；研究候选与未授权能力默认阻断商业交付。</p><TechDetails open={workflow} title="查看授权依据"><div className="tech-list"><p><b>可商用：</b>FLUX.2 Klein 4B、Qwen-Image-Edit-2511 均为 Apache-2.0，版本与来源见 [1][2][3]。</p><p><b>默认阻断：</b>Qwen-Image-2.1 为研究许可；FLUX.2 9B/dev 与 FLUX.1-dev ControlNet 为非商用权重。</p><p><b>构建核验：</b>许可证 allowlist、版本清单与 SBOM 归档。</p></div></TechDetails></div></section>
  <div className="mt-5 flex items-center gap-3 rounded-lg border border-[#e9c89f] bg-[#fff8e8] px-4 py-3 text-sm font-normal text-[#704d22]"><AlertTriangle size={17}/><span><b className="font-medium">需实机标定：</b>设备兼容、质量、稳定性和资源边界均不在原型中伪装为已测结果。</span></div>
 </main>
}
function PlanCard({selected,icon:Icon,title,tag,summary,speed,quality,device,action,onClick,children}:{selected:boolean;icon:typeof Sparkles;title:string;tag:string;summary:string;speed:string;quality:string;device:string;action:string;onClick:()=>void;children:React.ReactNode}){return <article className={`creation-card ${selected?'selected':''}`}><div className="flex items-start justify-between"><div className="tool-icon"><Icon size={18}/></div><Badge tone={selected?'red':'neutral'}>{selected?'当前方案':tag}</Badge></div><h2>{title}</h2><p>{summary}</p><div className="result-tags"><span>{speed}</span><span>{quality}</span><span>{device}</span></div><Button variant={selected?'green':'outline'} className="w-full" onClick={onClick}>{selected ? <Check size={15}/> : null} {selected?'已选中':action}</Button>{children}</article>}
function TechDetails({title,open=false,children}:{title:string;open?:boolean;children:React.ReactNode}){return <details className="tech-details" open={open}><summary>{title}<ChevronDown size={14}/></summary><div className="tech-content">{children}</div></details>}
function TechGrid({items}:{items:string[][]}){return <div className="tech-grid">{items.map(([a,b])=><div key={a}><span>{a}</span><strong>{b}</strong></div>)}</div>}
