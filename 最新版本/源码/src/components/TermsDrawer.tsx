import * as Dialog from '@radix-ui/react-dialog'
import { BookOpenText, X } from 'lucide-react'

const terms = [
  ['模型','创作能力 / 创作引擎'],['模型路由','自动匹配创作方案'],['辅助模型','创作工具'],['推理步数','生成精细度'],['offload','节省显存模式'],['seed','锁定当前视觉方向'],['ControlNet','保持构图或姿态'],['Inpainting','局部修改'],['Upscale','高清放大'],['License','商用授权状态'],['Quantization','设备适配版本'],
]
export function TermsDrawer({ open, onOpenChange }: { open: boolean; onOpenChange: (v:boolean)=>void }) {
 return <Dialog.Root open={open} onOpenChange={onOpenChange}><Dialog.Portal><Dialog.Overlay className="fixed inset-0 z-50 bg-[#1d2b26]/25 backdrop-blur-sm"/><Dialog.Content className="source-drawer"><div className="flex items-start justify-between border-b border-[#e6e2da] p-6"><div><div className="flex items-center gap-2 text-pomegranate"><BookOpenText size={17}/><span className="text-xs font-semibold tracking-widest">PLAIN LANGUAGE</span></div><Dialog.Title className="mt-2 text-2xl font-semibold text-ink">术语怎么理解</Dialog.Title><Dialog.Description className="mt-2 text-sm font-normal text-[#707873]">默认界面使用左侧的创作语言；技术词仅在需要排查或配置时出现。</Dialog.Description></div><Dialog.Close aria-label="关闭术语说明" className="rounded-lg p-2 hover:bg-[#eeebe5]"><X size={18}/></Dialog.Close></div><div className="term-list">{terms.map(([technical,plain])=><div key={technical}><code>{technical}</code><span>→</span><strong>{plain}</strong></div>)}</div><div className="border-t border-[#e6e2da] bg-[#f6f4ef] p-5 text-xs leading-5 text-[#69716d]">任务模式只展示目标和结果；创作模式增加质量控制；工作流模式直接展示技术实现。</div></Dialog.Content></Dialog.Portal></Dialog.Root>
}
