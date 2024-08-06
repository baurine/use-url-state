import { useUrlState } from '@baurine/use-url-state'
import { useCallback, useMemo } from 'react'

type ExampleUrlState = Partial<Record<'count', string>>

export function useExampleUrlState() {
  const [queryParams, setQueryParams] = useUrlState<ExampleUrlState>()

  // count
  const count = parseInt(queryParams.count ?? '')
  // const count = useMemo(() => {
  //   const c = parseInt(queryParams.count ?? '')
  //   if (isNaN(c)) {
  //     return 0
  //   }
  //   return c
  // }, [queryParams.count])
  const setCount = useCallback((v?: string) => {
    setQueryParams({ count: v })
  }, [])

  return { count, setCount }
}
