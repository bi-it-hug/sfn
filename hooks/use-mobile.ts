import * as React from "react"

/** Tailwind v4 default `screens` (min-width). */
export const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
} as const

export type Breakpoint = keyof typeof breakpoints

export type BreakpointState = Record<Breakpoint, boolean>

const breakpointOrder: Breakpoint[] = ["sm", "md", "lg", "xl", "2xl"]

function getBreakpointState(): BreakpointState {
    return Object.fromEntries(
        breakpointOrder.map((key) => [
            key,
            window.matchMedia(`(min-width: ${breakpoints[key]}px)`).matches,
        ])
    ) as BreakpointState
}

/** Largest active Tailwind breakpoint (mobile-first), or `"base"` below `sm`. */
export function getActiveBreakpoint(): Breakpoint | "base" {
    for (let i = breakpointOrder.length - 1; i >= 0; i--) {
        const key = breakpointOrder[i]
        if (window.matchMedia(`(min-width: ${breakpoints[key]}px)`).matches) {
            return key
        }
    }
    return "base"
}

function subscribeToBreakpoints(onChange: () => void) {
    const mqls = breakpointOrder.map((key) =>
        window.matchMedia(`(min-width: ${breakpoints[key]}px)`)
    )
    for (const mql of mqls) {
        mql.addEventListener("change", onChange)
    }
    return () => {
        for (const mql of mqls) {
            mql.removeEventListener("change", onChange)
        }
    }
}

/** `true` when viewport is at or above each Tailwind min-width breakpoint. */
export function useBreakpoints(): BreakpointState {
    const [state, setState] = React.useState<BreakpointState | undefined>(
        undefined
    )

    React.useEffect(() => {
        const onChange = () => setState(getBreakpointState())
        const unsubscribe = subscribeToBreakpoints(onChange)
        onChange()
        return unsubscribe
    }, [])

    return (
        state ?? {
            sm: false,
            md: false,
            lg: false,
            xl: false,
            "2xl": false,
        }
    )
}

/** Current Tailwind breakpoint name (`"base"` below `sm`). */
export function useBreakpoint(): Breakpoint | "base" {
    const [active, setActive] = React.useState<Breakpoint | "base" | undefined>(
        undefined
    )

    React.useEffect(() => {
        const onChange = () => setActive(getActiveBreakpoint())
        const unsubscribe = subscribeToBreakpoints(onChange)
        onChange()
        return unsubscribe
    }, [])

    return active ?? "base"
}

/** Match a custom media query string, e.g. `"(max-width: 767px)"`. */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = React.useState<boolean | undefined>(undefined)

    React.useEffect(() => {
        const mql = window.matchMedia(query)
        const onChange = () => setMatches(mql.matches)
        mql.addEventListener("change", onChange)
        onChange()
        return () => mql.removeEventListener("change", onChange)
    }, [query])

    return !!matches
}

/** Viewport below the `md` breakpoint (< 768px). */
export function useIsMobile() {
    const { md } = useBreakpoints()
    return !md
}
