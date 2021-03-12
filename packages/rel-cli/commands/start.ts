import spawn from "cross-spawn"

export default () => {
  spawn.sync("node", ["./dist/server.js"], {
    stdio: "inherit",
  })
}
