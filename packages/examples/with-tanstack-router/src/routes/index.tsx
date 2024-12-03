import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'

import { Counter } from '../Counter'

export const Route = createFileRoute('/')({
  component: HomeComponent
})

function HomeComponent() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>

      <Counter />
    </div>
  )
}
