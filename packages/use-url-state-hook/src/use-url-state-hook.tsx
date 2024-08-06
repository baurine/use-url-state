import { createContext, useContext, useMemo, useState } from 'react'

type UrlStateCtxValue = {
  urlQuery: string
  setUrlQuery: (v: string) => void
}

const UrlStateContext = createContext<UrlStateCtxValue | null>(null)

const useUrlStateContext = () => {
  const context = useContext(UrlStateContext)

  if (!context) {
    throw new Error('useUrlStateContext must be used within a provider')
  }

  return context
}

type UrlStateProviderOptions = {
  getUrlQuery: () => string
  updateUrlQuery: (p: string) => void
}

const defaultOptions: UrlStateProviderOptions = {
  getUrlQuery() {
    const url = new URL(window.location.href)
    return url.search
  },
  updateUrlQuery(p) {
    const url = new URL(window.location.href)
    window.history.replaceState({}, '', `${url.pathname}?${p}`)
  }
}

export function UrlStateProvider(props: {
  children: React.ReactNode
  options?: UrlStateProviderOptions
}) {
  const opt = props.options || defaultOptions
  const [urlQuery, _setUrlQuery] = useState(opt.getUrlQuery())

  const ctxValue = useMemo(
    () => ({
      urlQuery,
      setUrlQuery: (v: string) => {
        opt.updateUrlQuery(v)
        _setUrlQuery(v)
      }
    }),
    [urlQuery]
  )

  return (
    <UrlStateContext.Provider value={ctxValue}>
      {props.children}
    </UrlStateContext.Provider>
  )
}

//----------------------

type UrlState = Partial<Record<string, string>>
type UrlStateObj<T extends UrlState = UrlState> = {
  [key in keyof T]: string
}

export function useUrlState<T extends UrlState = UrlState>(): [
  UrlStateObj<T>,
  (s: UrlStateObj<T>) => void
] {
  const { urlQuery, setUrlQuery } = useUrlStateContext()

  const queryParams = useMemo(() => {
    const searchParams = new URLSearchParams(urlQuery)
    const paramsObj: any = {}
    searchParams.forEach((v, k) => {
      paramsObj[k] = v
    })
    return paramsObj as UrlStateObj<T>
  }, [urlQuery])

  function setQueryParams(s: UrlStateObj<T>) {
    const searchParams = new URLSearchParams(urlQuery)
    Object.keys(s).forEach((k) => {
      if (s[k]) {
        searchParams.set(k, s[k])
      } else {
        searchParams.delete(k)
      }
    })
    setUrlQuery(searchParams.toString())
  }

  return [queryParams, setQueryParams] as const
}
