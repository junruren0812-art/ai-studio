import { useCallback, useState } from 'react'
import { BookOpen, Cpu, FileCheck2, HelpCircle, LayoutDashboard, ListRestart, Menu, ShieldCheck, Sparkles, X } from 'lucide-react'
import type { CreationPlan, ExperienceMode, QualityPlan, ViewId } from './data'
import { OverviewPage } from './components/OverviewPage'
import { ModelPlanPage } from './components/ModelPlanPage'
import { EvaluationPage } from './components/EvaluationPage'
import { StudioWorkspace } from './components/StudioWorkspace'
import { TaskRecoveryPage } from './components/TaskRecoveryPage'
import { SourceDrawer } from './components/SourceDrawer'
import { TermsDrawer } from './components/TermsDrawer'
import { Button } from './components/ui/button'

const nav:[ViewId,string,typeof LayoutDashboard][]=[['overview','产品概览',LayoutDashboard],['models','创作方案',Cpu],['evaluation','评估体系',FileCheck2],['studio','工作台 Demo',Sparkles],['tasks','调度与恢复',ListRestart]]
export default function App(){
 const initialView=(()=>{const value=new URLSearchParams(window.location.search).get('view');return (['overview','models','evaluation','studio','tasks'].includes(value||'')?value:'overview') as ViewId})()
 const initialMode=(()=>{const value=new URLSearchParams(window.location.search).get('mode');return (['task','creative','workflow'].includes(value||'')?value:'task') as ExperienceMode})()
 const [view,setView]=useState<ViewId>(initialView),[sources,setSources]=useState(false),[terms,setTerms]=useState(false),[toast,setToast]=useState(''),[mobile,setMobile]=useState(false)
 const [mode,setMode]=useState<ExperienceMode>(initialMode),[creationPlan,setCreationPlan]=useState<CreationPlan>('daily'),[qualityPlan,setQualityPlan]=useState<QualityPlan>('daily')
 const navigate=(v:ViewId)=>{setView(v);setMobile(false);window.scrollTo({top:0,behavior:'smooth'})}
 const notify=useCallback((message:string)=>{setToast(message);window.setTimeout(()=>setToast(''),2600)},[])
 const changeMode=(next:ExperienceMode)=>{setMode(next);notify(next==='task'?'已切换任务模式：只展示任务与结果':next==='creative'?'已切换创作模式：显示能力与质量控制':'已切换工作流模式：显示技术与调度信息')}
 return <div className="min-h-screen bg-canvas text-ink"><header className="topbar"><button className="brand" onClick={()=>navigate('overview')}><span className="brand-mark"><Sparkles size={18}/></span><span><b>端侧 AI Studio</b><small>电商素材工作流</small></span></button><nav className="desktop-nav">{nav.map(([id,label,Icon])=><button className={view===id?'active':''} onClick={()=>navigate(id)} key={id}><Icon size={15}/>{label}</button>)}</nav><div className="top-actions"><div className="local-status"><ShieldCheck size={14}/><span>全程本地</span></div><Button variant="ghost" size="sm" onClick={()=>setTerms(true)} aria-label="打开术语说明"><HelpCircle size={14}/>术语</Button><Button variant="outline" size="sm" onClick={()=>setSources(true)}><BookOpen size={14}/>来源</Button><button className="mobile-menu" onClick={()=>setMobile(!mobile)} aria-label="切换移动导航">{mobile?<X/>:<Menu/>}</button></div></header>
 {mobile?<nav className="mobile-nav">{nav.map(([id,label,Icon])=><button onClick={()=>navigate(id)} className={view===id?'active':''} key={id}><Icon size={16}/>{label}</button>)}</nav>:null}
 {view==='overview'&&<OverviewPage navigate={navigate}/>}
 {view==='models'&&<ModelPlanPage mode="task" creationPlan={creationPlan} qualityPlan={qualityPlan} onCreationPlan={setCreationPlan} onQualityPlan={setQualityPlan} notify={notify}/>}
 {view==='evaluation'&&<EvaluationPage/>}
 {view==='studio'&&<StudioWorkspace mode={mode} onModeChange={changeMode} creationPlan={creationPlan} qualityPlan={qualityPlan} onQualityPlan={setQualityPlan} notify={notify}/>}
 {view==='tasks'&&<TaskRecoveryPage mode="task" notify={notify}/>}
 <footer className={view==='studio'?'hidden':''}><span>端侧 AI Studio · 交互原型 / 模拟数据</span><span>纯前端演示 · 本地状态模拟</span></footer>
 <SourceDrawer open={sources} onOpenChange={setSources}/><TermsDrawer open={terms} onOpenChange={setTerms}/>{toast?<div className="toast" role="status"><Sparkles size={15}/>{toast}</div>:null}
 </div>
}
