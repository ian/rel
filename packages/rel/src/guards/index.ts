import Guard from "./guard"

export { default as Guard } from "./guard"

export default {
  guard: (name: string) => new Guard(name),
}
