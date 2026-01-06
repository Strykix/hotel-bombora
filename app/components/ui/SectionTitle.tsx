import { cn } from '@/lib/utils'

interface SectionTitleProps {
  title: string
  subtitle?: string
  description?: string
  centered?: boolean
  light?: boolean
  className?: string
}

export default function SectionTitle({
  title,
  subtitle,
  description,
  centered = true,
  light = false,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn(centered && 'text-center', 'mb-8 md:mb-12 lg:mb-16 px-2', className)}>
      {subtitle && (
        <span
          className={cn(
            'text-xs md:text-sm tracking-[0.15em] md:tracking-[0.2em] uppercase font-medium mb-2 md:mb-3 block',
            light ? 'text-secondary-light' : 'text-secondary'
          )}
        >
          {subtitle}
        </span>
      )}
      <h2
        className={cn(
          'font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium leading-tight',
          light ? 'text-white' : 'text-gray-900'
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-3 md:mt-4 max-w-2xl text-sm md:text-base lg:text-lg leading-relaxed',
            centered && 'mx-auto',
            light ? 'text-gray-300' : 'text-gray-600'
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
