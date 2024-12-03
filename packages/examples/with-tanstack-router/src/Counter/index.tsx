import { useExampleUrlState } from './url-state'

function CountButton() {
  const { count, setCount } = useExampleUrlState()

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
      Count:{' '}
      <button
        className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={() => setCount('5')}
      >
        Init
      </button>{' '}
      {!isNaN(count) && (
        <>
          <button
            className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setCount(`${count + 1}`)}
          >
            Add
          </button>{' '}
          <button
            className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setCount(`${count - 1}`)}
          >
            Subtract
          </button>{' '}
        </>
      )}
      <button
        className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={() => setCount()}
      >
        Clear
      </button>
    </div>
  )
}

function CountValue() {
  const { count } = useExampleUrlState()

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
      Count is {count}
    </div>
  )
}

export function Counter() {
  return (
    <div className="mt-4">
      <CountButton />
      <div className="h-2" />
      <CountValue />
    </div>
  )
}
