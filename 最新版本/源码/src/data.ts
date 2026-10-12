export type ExperienceMode = 'task'|'creative'|'workflow'
export type QualityPlan = 'preview'|'daily'|'fine'
export type CreationPlan = 'daily'|'quality'
export type ViewId = 'overview'|'models'|'evaluation'|'studio'|'tasks'
export const sources = [
  { id: 1, title: 'FLUX.2 官方仓库', note: '版本、步数、许可与能力矩阵', url: 'https://github.com/black-forest-labs/flux2' },
  { id: 2, title: 'FLUX.2 Klein 4B 模型卡', note: '4B、4 步、Apache-2.0 与显存口径', url: 'https://huggingface.co/black-forest-labs/FLUX.2-klein-4B' },
  { id: 3, title: 'Qwen-Image-Edit-2511 模型卡', note: '20B、BF16、多图编辑、Apache-2.0', url: 'https://huggingface.co/Qwen/Qwen-Image-Edit-2511' },
  { id: 4, title: 'Diffusers 量化概览', note: 'bitsandbytes、Quanto、torchao', url: 'https://huggingface.co/docs/diffusers/en/quantization/overview' },
  { id: 5, title: 'ComfyUI 官方仓库', note: '工作流层支持模型清单', url: 'https://github.com/Comfy-Org/ComfyUI' },
  { id: 6, title: 'Depth Anything V2', note: 'Small 24.8M、Apache-2.0', url: 'https://github.com/DepthAnything/Depth-Anything-V2' },
  { id: 7, title: 'SAM 2 官方仓库', note: '交互分割与 Apache-2.0', url: 'https://github.com/facebookresearch/sam2' },
  { id: 8, title: 'Photoroom 批量抠图', note: '目录级电商素材工作流依据', url: 'https://www.photoroom.com/batch/background-remover' },
]
export const skus = [
  { id: 'SKU-2401', name: '山茶洁颜油', color: '#cf6d4e', accent: '#7c1f31', shape: 'pump' },
  { id: 'SKU-2402', name: '青柚精华液', color: '#8fa47d', accent: '#294c3d', shape: 'dropper' },
  { id: 'SKU-2403', name: '珊瑚修护霜', color: '#e8a08e', accent: '#a33b43', shape: 'jar' },
] as const
export type Stage = '原图'|'抠图'|'场景'|'渠道适配'
export type Ratio = '1:1'|'4:5'|'16:9'
