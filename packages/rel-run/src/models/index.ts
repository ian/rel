import Model from "./model"
import Input from "./input"
import Output from "./output"

export const model = (props, opts?) => new Model(props, opts)
export const input = (props, opts?) => new Input(props, opts)
export const output = (props, opts?) => new Output(props, opts)

export { default as Input } from "./input"
export { default as Output } from "./output"
export { default as Model } from "./model"
