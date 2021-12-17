import { Observable } from 'zen-observable-ts'

export default (_url) => {
    return {
        request(op) {
            return new Observable((sink) => {
                const url = new URL(_url)
                url.searchParams.append('query',op.query)
                url.searchParams.append('variables', JSON.stringify(op.variables))
                const eventsource = new EventSource(url.toString())
                eventsource.onmessage = (event) => {
                    const data = JSON.parse(event.data)
                    sink.next(data)
                    if (eventsource.readyState === 2) {
                        sink.complete()
                    }
                }
                eventsource.onerror = (error) => {
                    sink.error(error)
                }
                return () => eventsource.close()
            })
        },
    }
}