import type { Ratio, Stage } from '@/data'
import { LockKeyhole, MousePointer2, ScanLine, Sparkles } from 'lucide-react'

export function ProductArtwork({ sku, stage, ratio, editing, generated }: { sku: { name:string;color:string;accent:string;shape:string }; stage:Stage; ratio:Ratio; editing:boolean; generated:boolean }) {
  const isCut = stage === '抠图'
  const hasScene = stage === '场景' || stage === '渠道适配' || generated
  return <div className={`artboard ratio-${ratio.replace(':','-')} ${isCut?'checker':''} ${hasScene?'scene':''}`}>
    {hasScene && <><div className="scene-sun"></div><div className="scene-leaf leaf-one"></div><div className="scene-leaf leaf-two"></div><div className="scene-plinth"></div><div className="scene-shadow"></div></>}
    {!hasScene && !isCut && <><div className="raw-grid"></div><div className="raw-card"><span>RAW / 2840 × 2840</span></div></>}
    <div className={`product-wrap ${editing?'editing':''}`}>
      {editing && <div className="selection-box"><i></i><i></i><i></i><i></i></div>}
      {sku.shape === 'pump' && <div className="product pump"><div className="pump-head"></div><div className="pump-neck"></div><div className="bottle" style={{backgroundColor:sku.color,borderColor:sku.accent}}><ProductLabel name={sku.name}/></div></div>}
      {sku.shape === 'dropper' && <div className="product dropper"><div className="dropper-top" style={{background:sku.accent}}></div><div className="dropper-neck"></div><div className="serum" style={{backgroundColor:sku.color,borderColor:sku.accent}}><ProductLabel name={sku.name}/></div></div>}
      {sku.shape === 'jar' && <div className="product jar"><div className="jar-lid" style={{background:sku.accent}}></div><div className="jar-body" style={{backgroundColor:sku.color,borderColor:sku.accent}}><ProductLabel name={sku.name}/></div></div>}
    </div>
    {hasScene && <div className="canvas-tag"><LockKeyhole size={12}/> 主体像素已锁定</div>}
    {isCut && <div className="canvas-tag green"><ScanLine size={12}/> Alpha 边缘预览</div>}
    {editing && <div className="context-bar"><MousePointer2 size={13}/><span>只修改选区</span><button>替换</button><button>移除</button></div>}
    {generated && <div className="generation-stamp"><Sparkles size={13}/> 新预览 · 未审核</div>}
  </div>
}
function ProductLabel({name}:{name:string}) { return <div className="product-label"><span>ATELIER 24</span><strong>{name}</strong><small>LOCAL FORMULA</small></div> }
