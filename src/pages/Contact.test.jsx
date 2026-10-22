import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Contact from './Contact.jsx'

// jsdom can't navigate, so stand in for window.location and capture the
// mailto: URL that submitting the form assigns to it.
let location

beforeEach(() => {
  location = { href: '' }
  vi.stubGlobal('location', location)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

function submit({ name = '', email = '', message = '' }) {
  render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>,
  )
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: name } })
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: email } })
  fireEvent.change(screen.getByLabelText('Message'), { target: { value: message } })
  // fireEvent.submit skips constraint validation, so the required fields can be empty.
  fireEvent.submit(screen.getByRole('button', { name: /Send message/ }).closest('form'))
  return parseMailto(location.href)
}

// Splits the URL by hand and decodes each part with decodeURIComponent, so an
// unencoded &, = or # shows up as a stray or cut-off parameter.
function parseMailto(href) {
  expect(href.startsWith('mailto:')).toBe(true)
  // A URL holds only printable ASCII: spaces, line breaks and ñ must be encoded.
  expect(href).toMatch(/^[\x21-\x7e]+$/)
  const [beforeHash, ...afterHash] = href.slice('mailto:'.length).split('#')
  const [address, query = ''] = beforeHash.split('?')
  const params = query.split('&').map((pair) => {
    const [key, ...value] = pair.split('=')
    return [key, decodeURIComponent(value.join('='))]
  })
  return { address, params, fragment: afterHash.join('#') }
}

function only(params, key) {
  const values = params.filter(([k]) => k === key).map(([, v]) => v)
  expect(values).toHaveLength(1)
  return values[0]
}

describe('Contact form email link', () => {
  it('drafts an email to contact@dgc.ph from the filled-in form', () => {
    const { address, params } = submit({
      name: 'Maria Santos',
      email: 'maria@example.com',
      message: 'We are raising a seed round.',
    })
    expect(address).toBe('contact@dgc.ph')
    expect(only(params, 'subject')).toBe('Inquiry from Maria Santos')
    const body = only(params, 'body')
    expect(body).toContain('We are raising a seed round.')
    expect(body).toContain('Maria Santos')
    expect(body).toContain('maria@example.com')
  })

  it('falls back to a generic subject when the name is empty', () => {
    const { address, params } = submit({
      email: 'maria@example.com',
      message: 'Hello.',
    })
    expect(address).toBe('contact@dgc.ph')
    expect(only(params, 'subject')).toBe('Inquiry from the DGC website')
  })

  it('encodes characters that would otherwise split or cut off the URL', () => {
    const name = 'Peña & Sons? #1 = best+'
    const email = 'pena@example.com'
    const message = 'Q&A? Section #2: a=b + c\nNext line — Parañaque'
    const { address, params, fragment } = submit({ name, email, message })
    expect(address).toBe('contact@dgc.ph')
    expect(fragment).toBe('')
    expect(params.map(([key]) => key)).toEqual(['subject', 'body'])
    expect(only(params, 'subject')).toBe(`Inquiry from ${name}`)
    expect(only(params, 'body')).toBe(`${message}\n\n— ${name}\n${email}`)
  })
})
