import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      {currentPage > 1 && (
        <Link
          href={currentPage === 2 ? basePath : `${basePath}?page=${currentPage - 1}`}
          className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm text-text-muted transition-colors hover:border-brand-300 hover:text-brand-600"
        >
          <ChevronLeft size={16} />
          上一页
        </Link>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={page === 1 ? basePath : `${basePath}?page=${page}`}
          className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
            page === currentPage
              ? 'bg-brand-600 text-white'
              : 'text-text-muted hover:bg-brand-50 hover:text-brand-600'
          }`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm text-text-muted transition-colors hover:border-brand-300 hover:text-brand-600"
        >
          下一页
          <ChevronRight size={16} />
        </Link>
      )}
    </div>
  )
}
