import { describe, expect, it } from 'vitest'
import { lastRowSpan } from './lastRowSpan.js'

describe('lastRowSpan', () => {
  it.each([
    [1, 'sm:col-span-2 lg:col-span-3'],
    [2, 'lg:col-span-2'],
    [3, 'sm:col-span-2 lg:col-span-1'],
    [4, 'lg:col-span-3'],
    [5, 'sm:col-span-2 lg:col-span-2'],
    [6, ''],
  ])('fills the last row of a %i-item grid', (count, classes) => {
    expect(lastRowSpan(count)).toBe(classes)
  })
})
