# @baurine/use-url-state

A very lightweight react hook to manage state in the url.

This hook doesn't depend on any router libs (not like `@ahooks/use-state-url`), it can be used with none router or any router libs.

## Installation

```sh
npm install @baurine/use-url-state
# or
pnpm add @baurine/use-url-state
# or
yarn add @baurine/use-url-state
```

## Usage

### Step 1

Use `UrlStateProvider` in the top level, wrap `<App />` component.

```tsx
import { UrlStateProvider } from '@baurine/use-url-state'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UrlStateProvider>
      <App />
    </UrlStateProvider>
  </React.StrictMode>
)
```

The `UrlStateProvider` has default value:

```js
function defCtxVal(): UrlStateCtxValue {
  return {
    urlQuery: new URL(window.location.href).search,
    setUrlQuery(p) {
      const url = new URL(window.location.href)
      window.history.replaceState({}, '', `${url.pathname}?${p}`)
    }
  }
}
```

The default value is only suitable for working with none router lib. If your app works with a router lib, you need to write a adapter.

Adapter for react-router v5:

```tsx
import { useLocation, useHistory } from 'react-router-dom'

function ReactRouter5UrlStateProvider(props: { children: React.ReactNode }) {
  const loc = useLocation()
  const history = useHistory()

  return (
    <UrlStateProvider
      value={{
        urlQuery: loc.search,
        setUrlQuery(v) {
          history.replace(`${loc.pathname}?${v}`)
        }
      }}
    >
      {props.children}
    </UrlStateProvider>
  )
}
```

Adapter for react-router v6:

```tsx
import { useLocation, useNavigate } from 'react-router-dom'

function ReactRouter6UrlStateProvider(props: { children: React.ReactNode }) {
  const loc = useLocation()
  const navigate = useNavigate()

  return (
    <UrlStateProvider
      value={{
        urlQuery: loc.search,
        setUrlQuery(v) {
          navigate(`${loc.pathname}?${v}`)
        }
      }}
    >
      {props.children}
    </UrlStateProvider>
  )
}
```

### Step 2

Define your own url state hook, use `useUrlState()` to get query, parse it manually, and set query.

```js
import { useUrlState } from '@baurine/use-url-state'

type ExampleUrlState = Partial<Record<'count', string>>

export function useExampleUrlState() {
  const [queryParams, setQueryParams] = useUrlState<ExampleUrlState>()

  // count
  const count = parseInt(queryParams.count ?? '')
  const setCount = (v?: string) => setQueryParams({ count: v })

  return { count, setCount }
}
```

### Step 3

Use the self defined url state hook in your logic code.

```tsx
import { useExampleUrlState } from './url-state'

function CountButton() {
  const { count, setCount } = useExampleUrlState()

  return (
    <div className="card">
      Count: <button onClick={() => setCount('5')}>Init</button>{' '}
      {!isNaN(count) && (
        <>
          <button onClick={() => setCount(`${count + 1}`)}>Add</button>{' '}
          <button onClick={() => setCount(`${count - 1}`)}>Subtract</button>{' '}
        </>
      )}
      <button onClick={() => setCount()}>Clear</button>
    </div>
  )
}

function CountValue() {
  const { count } = useExampleUrlState()

  return <div className="card">Count is {count}</div>
}

export function Counter() {
  return (
    <div>
      <h2>@baurine/use-url-state demo</h2>
      <CountButton />
      <CountValue />
    </div>
  )
}
```

## Demo

https://github.com/user-attachments/assets/4efdca4b-e542-4af3-b090-44a64736915e
