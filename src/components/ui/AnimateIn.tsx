import { type CSSProperties, type ReactNode } from 'react'
import { useAnimateIn } from '@/hooks/useAnimateIn'

type Animation = 'slide-up' | 'slide-right' | 'slide-left' | 'scale-in'

type Props = {
  children: ReactNode
  animation?: Animation
  delay?: number
  className?: string
}

const animClass: Record<Animation, string> = {
  'slide-up':    'anim-slide-up',
  'slide-right': 'anim-slide-right',
  'slide-left':  'anim-slide-left',
  'scale-in':    'anim-scale-in',
}

export default function AnimateIn({ children, animation = 'slide-up', delay = 0, className = '' }: Props) {
  const [ref, inView] = useAnimateIn()
  return (
    <div
      ref={ref}
      className={`${inView ? animClass[animation] : 'opacity-0'} ${className}`}
      style={delay ? ({ animationDelay: `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </div>
  )
}
