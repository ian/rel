import {
  Model,
  Input,
  Output,
  ModelProperties,
  ModelOptions,
  InputProperties,
  OutputProperties,
} from "../types"

import ModelImpl from "../objects/model"
import Tree from "../objects/tree"
import InputImpl from "../objects/input"
import OutputImpl from "../objects/output"

export { default as Input } from "./input"
export { default as Output } from "./output"
export { default as Model } from "./model"
export { default as Tree } from "./tree"

export default {
  model: (name: string, props: ModelProperties, opts?: ModelOptions): Model =>
    new ModelImpl(name, props, opts),

  tree: (
    name: string,
    props: ModelProperties,
    opts: ModelOptions = {}
  ): Tree => {
    return new Tree(name, props, opts)
  },

  input: (name: string, props: InputProperties): Input =>
    new InputImpl(name, props),
  output: (name: string, props: OutputProperties): Output =>
    new OutputImpl(name, props),
}
