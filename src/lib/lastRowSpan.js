// Column-span classes for the last item of a grid that is one column on
// mobile, two at `sm` and three at `lg`. The last item stretches across the
// rest of its row, so a grid whose hairlines come from the container's
// background never shows an empty cell, whatever the item count.
const lgSpans = ['', 'lg:col-span-3', 'lg:col-span-2']

export function lastRowSpan(count) {
  const sm = count % 2 === 1 ? 'sm:col-span-2' : ''
  // A full last row at `lg` still has to undo the `sm` span.
  const lg = lgSpans[count % 3] || (sm && 'lg:col-span-1')
  return [sm, lg].filter(Boolean).join(' ')
}
