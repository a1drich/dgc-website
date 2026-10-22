export default function Logo({ className = '', mark = true }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {mark && (
        <span
          aria-hidden="true"
          className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-forest-800 text-sand-100 text-label-xs font-semibold tracking-control"
        >
          DGC
        </span>
      )}
      <span className="font-display text-[15px] font-medium tracking-label uppercase">
        De&nbsp;Leon&nbsp;Group
      </span>
    </span>
  )
}
