import { useUrlState } from '@baurine/use-url-state'

type ExampleUrlState = Partial<Record<'count', string>>

export function useExampleUrlState() {
  const [queryParams, setQueryParams] = useUrlState<ExampleUrlState>()

  // count
  const count = parseInt(queryParams.count ?? '')
  const setCount = (v?: string) => setQueryParams({ count: v })

  return { count, setCount }
}
