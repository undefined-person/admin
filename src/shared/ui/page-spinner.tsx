import { cn } from '@/shared/lib/utils'
import { Spinner } from './spinner'

export const PageSpinner = ({ className }: { className?: string }) => {
  return (
    <div className={cn('fixed left-0 right-0 top-0 bottom-0 flex justify-center items-center bg-white', className)}>
      <Spinner className="w-24 h-24 text-primary" />
    </div>
  )
}
