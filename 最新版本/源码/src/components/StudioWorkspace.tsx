import { useEffect, useState } from 'react'
import { Aperture, BoxSelect, Check, ChevronDown, CirclePause, ClipboardCheck, Image, Layers3, LockKeyhole, Maximize2, Play, RotateCcw, ScanLine, Sparkles, WandSparkles, WifiOff } from 'lucide-react'
import { type CreationPlan, type ExperienceMode, type QualityPlan, type Ratio, type Stage, skus } from '@/data'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { ProductArtwork } from './ProductArtwork'
import { ModeSwitch } from './ModeSwitch'

const qualityCopy:Record<QualityPlan,{title:string;hint:string;button:string}>={preview:{title:'快速预览',hint:'较快 · 用于探索，不建议直接商用',button:'生成快速预览'},daily:{title:'日常创作',hint:'适中 · 主体保护，审核后可商用',button:'生成日常成片'},fine:{title:'精细导出',hint:'较慢 · 含商品真值检查',button:'生成精细成片'}}
type Props={mode:ExperienceMode;onModeChange:(mode:ExperienceMode)=>void;creationPlan:CreationPlan;qualityPlan:QualityPlan;onQualityPlan:(q:QualityPlan)=>void;notify:(s:string)=>void}
export function StudioWorkspace({ mode,onModeChange,creationPlan,qualityPlan,onQualityPlan,notify }:Props) {
  const [skuIndex,setSkuIndex] = useState(0), [stage,setStage] = useState<Stage>('场景'), [ratio,setRatio] = useState<Ratio>('1:1')
  const [progress,setProgress] = useState(0), [running,setRunning] = useState(false), [generated,setGenerated] = useState(false)
  const [editing,setEditing] = useState(false), [anchor,setAnchor] = useState(false), [batch,setBatch] = useState(false),[task,setTask]=useState('生成商品场景图')
  const sku = skus[skuIndex], quality=qualityCopy[qualityPlan], workflow=mode==='workflow', creative=mode!=='task'
  const flowSteps = [
    {label:'SKU',done:true},{label:'任务',done:true},{label:'档位',done:true},{label:'创作控制',done:creative},
    {label:'锁定样片',done:anchor},{label:'批量套用',done:batch},{label:'异常恢复',done:batch},{label:'多渠道导出',done:generated&&batch},
  ]
  useEffect(()=>{ if(!running) return; const id=setInterval(()=>setProgress(p=>{ if(p>=96){clearInterval(id);setRunning(false);setGenerated(true);notify(`${quality.title}已生成：主体保护检查通过`);return 100} return p+8}),180); return()=>clearInterval(id)},[running,notify,quality.title])
  const generate=()=>{setProgress(8);setRunning(true);setGenerated(false);notify('创作任务已优先执行，输入与参数已保存')}
  const switchSku=(i:number)=>{setSkuIndex(i);setGenerated(false);setEditing(false);notify(`已切换到 ${skus[i].id}`)}
  return <main className="studio-shell">
    <div className="studio-meta"><div className="flex min-w-0 items-center gap-2"><Badge tone="red">v1.4 · 模拟数据</Badge><span className="truncate text-sm font-medium text-ink">秋季护肤系列 / 场景母版</span><span className="hidden text-xs text-[#8a8f8b] md:block">自动保存于 15:37</span></div><div className="studio-mode-control"><span>工作台视图</span><ModeSwitch value={mode} onChange={onModeChange}/></div><div className="flex items-center gap-2"><Badge tone="green"><span className="status-dot"/> 全程本地</Badge><Badge>网络创作禁用</Badge><Button size="sm" variant="outline">导出</Button></div></div>
    <div className="studio-flowbar"><div className="studio-flow-title"><ClipboardCheck size={14}/><span>整批交付</span></div><div className="studio-flow-steps">{flowSteps.map((item,i)=><div key={item.label} className={item.done?'done':i===flowSteps.findIndex(x=>!x.done)?'current':''}><i>{item.done?<Check size={10}/>:i+1}</i><span>{item.label}</span></div>)}</div><div className="local-failure"><WifiOff size={13}/><span>失败：降级 / 排队 / 阻止，不切云</span></div></div>
    <div className="workspace-grid">
      <aside className="studio-panel left-panel"><PanelTitle icon={Layers3} title="资产与流程"/><div className="stage-list">{(['原图','抠图','场景','渠道适配'] as Stage[]).map((s,i)=><button key={s} onClick={()=>{setStage(s);notify(`已进入${s}阶段`)}} className={stage===s?'active':''} aria-pressed={stage===s}><span>{i+1}</span>{s}{stage===s&&<ChevronDown size={13}/>}</button>)}</div>
        <p className="panel-label">SKU 资产 · 3</p><div className="sku-list">{skus.map((s,i)=><button key={s.id} onClick={()=>switchSku(i)} className={skuIndex===i?'active':''} aria-pressed={skuIndex===i}><div className="sku-thumb" style={{backgroundColor:s.color,borderColor:s.accent}}></div><div><strong>{s.id}</strong><span>{s.name}</span></div>{skuIndex===i&&<Check size={14}/>}</button>)}</div>
        <div className="mt-auto rounded-lg bg-[#edf2ee] p-3 text-xs font-normal text-[#496155]"><div className="flex items-center justify-between font-medium"><span className="flex items-center gap-2"><LockKeyhole size={14}/> 素材检查</span><b>6 / 6</b></div><div className="truth-mini"><span><Check/>SKU</span><span><Check/>渠道</span><span><Check/>文字</span><span><Check/>Logo</span><span><Check/>颜色</span><span><Check/>轮廓</span></div></div>
      </aside>

      <section className="canvas-zone"><div className="canvas-toolbar"><div className="tool-group"><button title="选择"><BoxSelect size={16}/></button><button onClick={()=>setEditing(!editing)} className={editing?'active':''} title="局部编辑" aria-pressed={editing}><WandSparkles size={16}/></button><button title="边缘"><ScanLine size={16}/></button></div><div className="ratio-switch">{(['1:1','4:5','16:9'] as Ratio[]).map(r=><button key={r} onClick={()=>{setRatio(r);notify(`画布已切换为 ${r}`)}} className={ratio===r?'active':''} aria-pressed={ratio===r}>{r}</button>)}</div><div className="tool-group"><button aria-label="撤销"><RotateCcw size={15}/></button><button aria-label="适应画布"><Maximize2 size={15}/></button></div></div>
        <div className="canvas-surface"><ProductArtwork sku={sku} stage={stage} ratio={ratio} editing={editing} generated={generated}/></div>
        <div className="canvas-footer"><span>{ratio==='1:1'?'2400 × 2400':ratio==='4:5'?'2400 × 3000':'2560 × 1440'} · Display P3</span><span>{workflow?'FLUX.2 [klein] 4B · FP8 候选 · 调度优先级 P0':`${quality.title} · ${quality.hint}`}</span></div>
      </section>

      <aside className="studio-panel right-panel"><PanelTitle icon={Aperture} title={mode==='task'?'你想完成什么？':mode==='creative'?'创作控制':'工作流参数'}/>
        {mode==='task'?<div className="task-choices" role="group" aria-label="创作任务">{['生成商品场景图','替换商品背景','只修改选中区域','适配渠道尺寸'].map(x=><button key={x} className={task===x?'active':''} onClick={()=>{setTask(x);notify(`创作任务已设为：${x}`)}} aria-pressed={task===x}>{task===x&&<Check size={13}/>}<span>{x}</span></button>)}</div>:<><label className="panel-label">创作描述</label><textarea value="暖调石材台面，柔和晨光从左侧进入，低饱和珊瑚色背景，商品摄影，保留原包装与文字" readOnly/><div className="prompt-hints"><span>主体锁定</span><span>左侧主光</span><span>浅景深</span></div><div className="param"><span>主体占比</span><b>62%</b><input aria-label="主体占比" type="range" defaultValue="62"/></div><div className="param"><span>阴影强度</span><b>38%</b><input aria-label="阴影强度" type="range" defaultValue="38"/></div></>}
        <div className="quality-switch three" role="group" aria-label="输出方式">{(['preview','daily','fine'] as QualityPlan[]).map(q=><button key={q} className={qualityPlan===q?'active':''} onClick={()=>{onQualityPlan(q);notify(`已切换为${qualityCopy[q].title}`)}} aria-pressed={qualityPlan===q}>{q==='preview'?<Play size={12}/>:<Sparkles size={12}/>} {qualityCopy[q].title}</button>)}</div>
        <div className="current-plan-note"><span>当前方案</span><strong>{creationPlan==='daily'?'日常商品创作':'高质量商品精修'} · {quality.title}</strong><p>{quality.hint}</p></div>
        {running ? <div className="run-card"><div className="flex justify-between text-xs font-medium"><span>本地创作中 · {progress<45?'准备创作能力':'生成与合成'}</span><span>{progress}%</span></div><Progress value={progress}/><span>前台任务已优先执行 · 参数已保存</span></div> : null}
        <Button className="w-full" onClick={generate} disabled={running}>{running?<><CirclePause size={16}/> 生成中，可安全暂停</>:<><WandSparkles size={16}/> {quality.button}</>}</Button>
        <div className="grid grid-cols-2 gap-2"><Button variant={editing?'soft':'outline'} size="sm" onClick={()=>{setEditing(!editing);notify(editing?'已退出局部编辑':'请在画布圈选区域')}}><BoxSelect size={14}/>局部编辑</Button><Button variant={anchor?'green':'outline'} size="sm" onClick={()=>{setAnchor(!anchor);notify(!anchor?'已锁定锚点样片 v1':'已取消锚点')}}><LockKeyhole size={14}/>{anchor?'锚点已锁':'锁定样片'}</Button></div>
        <Button variant={batch?'green':'outline'} className="w-full" onClick={()=>{setBatch(!batch);notify(!batch?'配方已应用到其余 2 个 SKU，任务已排队':'批量任务已暂停')}}>{batch?<><CirclePause size={15}/>暂停批量套用</>:<><Layers3 size={15}/>批量套用到本组</>}</Button>
        <details className="creation-summary"><summary>本次创作方案 <ChevronDown size={14}/></summary><dl><div><dt>主创作能力</dt><dd>{creationPlan==='daily'?'日常商品创作':'高质量商品精修'}</dd></div><div><dt>辅助能力</dt><dd>智能抠图 · 场景结构识别</dd></div><div><dt>输出方式</dt><dd>{quality.title}</dd></div><div><dt>设备状态</dt><dd>适合高效批量模式</dd></div><div><dt>选择理由</dt><dd>{creationPlan==='daily'?'当前任务无需复杂文字重绘，优先兼顾等待与保真。':'当前任务包含复杂编辑，优先保证文字与合成质量。'}</dd></div></dl>{workflow ? <div className="tech-box">主模型：{creationPlan==='daily'?'FLUX.2 Klein 4B · FP8 · Diffusers':'Qwen-Image-Edit-2511 · INT8 候选 · Diffusers'}<br/>调度：前台 P0 · 重任务 1 路 · 参数已持久化</div> : null}</details>
        {workflow ? <div className="device-mini"><div><span>显存预算</span><b>11.8 / 24 GB</b></div><Progress value={49}/><p>交互预留 4 GB · 后台重任务 1 路</p></div> : null}
      </aside>
    </div>
  </main>
}
function PanelTitle({icon:Icon,title}:{icon:typeof Image;title:string}){return <div className="panel-title"><Icon size={17}/><h2>{title}</h2></div>}
