import { ClipboardCheck, Palette, Workflow } from 'lucide-react'
import type { ExperienceMode } from '@/data'

const modes: { id: ExperienceMode; label: string; icon: typeof ClipboardCheck; hint: string }[] = [
  { id: 'task', label: '任务模式', icon: ClipboardCheck, hint: '只看任务与结果' },
  { id: 'creative', label: '创作模式', icon: Palette, hint: '调整能力与质量' },
  { id: 'workflow', label: '工作流模式', icon: Workflow, hint: '查看技术与调度' },
]
export function ModeSwitch({ value, onChange }: { value: ExperienceMode; onChange: (m: ExperienceMode) => void }) {
  return <div className="mode-switch" role="group" aria-label="信息层级模式">{modes.map(({ id, label, icon: Icon, hint }) => <button key={id} type="button" className={value === id ? 'active' : ''} onClick={() => onChange(id)} aria-pressed={value === id} title={hint}><Icon size={13}/><span>{label}</span></button>)}</div>
}
