import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-none shadow-sm',
        hover && 'hover:shadow-lg transition-shadow duration-300',
        className
      )}
    >
      {children}
    </div>
  )
}

export function CardImage({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('relative overflow-hidden', className)}>{children}</div>
  )
}

export function CardContent({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn('p-6', className)}>{children}</div>
}
