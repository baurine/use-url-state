import { UrlStateProvider } from '@baurine/use-url-state'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import * as React from 'react'

export const Route = createRootRoute({
  component: RootComponent
})

function TanStackRouterUrlStateProvider(props: { children: React.ReactNode }) {
  const loc = useLocation()
  const navigate = useNavigate()

  return (
    <UrlStateProvider
      value={{
        urlQuery: loc.searchStr,
        setUrlQuery(v: string) {
          navigate({ to: `${loc.pathname}?${v}` })
        }
      }}
    >
      {props.children}
    </UrlStateProvider>
  )
}

function RootComponent() {
  return (
    <>
      <div className="p-2 flex gap-2 text-lg">
        <Link
          to="/"
          activeProps={{
            className: 'font-bold'
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>{' '}
        <Link
          to="/about"
          activeProps={{
            className: 'font-bold'
          }}
        >
          About
        </Link>
      </div>
      <hr />
      <TanStackRouterUrlStateProvider>
        <Outlet />
      </TanStackRouterUrlStateProvider>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
