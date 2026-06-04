import { useEffect, useRef, useState } from "react"

type UseFetchOptions<T> = {
    initialData: T
    parse: (json: unknown) => T
    errorMessage?: string
}

export function useFetch<T>(
    url: string | null,
    {
        initialData,
        parse,
        errorMessage = "Could not load data.",
    }: UseFetchOptions<T>
) {
    const [data, setData] = useState(initialData)
    const [loading, setLoading] = useState(!!url)
    const [error, setError] = useState<string | null>(null)
    const parseRef = useRef(parse)
    parseRef.current = parse
    const initialRef = useRef(initialData)
    initialRef.current = initialData

    useEffect(() => {
        if (!url) {
            setLoading(false)
            return
        }

        const requestUrl = url
        let cancelled = false

        const delay = (ms: number) =>
            new Promise((resolve) => setTimeout(resolve, ms))

        async function run() {
            setLoading(true)
            setError(null)

            // await delay(10000)

            try {
                const response = await fetch(requestUrl, {
                    method: "GET",
                    cache: "no-store",
                })

                if (!response.ok) {
                    throw new Error("Request failed")
                }

                const json = await response.json()
                if (!cancelled) {
                    setData(parseRef.current(json))
                }
            } catch {
                if (!cancelled) {
                    setError(errorMessage)
                    setData(initialRef.current)
                }
            } finally {
                if (!cancelled) {
                    setLoading(false)
                }
            }
        }

        run()

        return () => {
            cancelled = true
        }
    }, [url, errorMessage])

    return { data, loading, error }
}
