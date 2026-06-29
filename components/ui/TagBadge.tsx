import Link from 'next/link'

interface TagBadgeProps {
  label: string
  href?: string
  variant?: 'default' | 'category' | 'outline'
}

export default function TagBadge({ label, href, variant = 'default' }: TagBadgeProps) {
  const base =
    variant === 'category'
      ? 'inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 transition-colors hover:bg-amber-100'
      : variant === 'outline'
      ? 'inline-block rounded-full border border-border px-3 py-1 text-xs font-medium text-text-muted transition-colors hover:border-brand-300 hover:text-brand-600'
      : 'inline-block rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-600'

  if (href) {
    return (
      <Link href={href} className={base}>
        {label}
      </Link>
    )
  }
  return <span className={base}>{label}</span>
}
