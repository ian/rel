import ora from "ora"
import spawn from "cross-spawn"

export default () => {
  const compiling = ora("Compiling").start()
  spawn("tsc", ["--project", "tsconfig.json"]).on("close", (code) => {
    compiling.succeed()
  })
}
