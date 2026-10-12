import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const styles = cva('inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pomegranate disabled:pointer-events-none disabled:opacity-50 active:scale-[.98]', { variants: { variant: { default: 'bg-pomegranate text-white hover:bg-[#8f2032] shadow-sm', outline: 'border border-[#d8d5ce] bg-white text-ink hover:border-[#b8b3aa] hover:bg-[#faf9f6]', ghost: 'text-[#59645f] hover:bg-[#ece9e2] hover:text-ink', green: 'bg-ink text-white hover:bg-[#13251f]', soft: 'bg-[#fff0eb] text-[#9f3426] hover:bg-[#ffe2d9]' }, size: { default: 'h-9 px-4', sm: 'h-8 px-3 text-xs', icon: 'h-9 w-9' } }, defaultVariants: { variant: 'default', size: 'default' } })

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof styles> { asChild?: boolean }
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => { const Comp = asChild ? Slot : 'button'; return <Comp className={cn(styles({ variant, size, className }))} ref={ref} {...props} /> })
Button.displayName = 'Button'
