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
    <>
      <div>
        <h2>@baurine/use-url-state demo</h2>
      </div>
      <CountButton />
      <CountValue />
    </>
  )
}
