import Questions from "./questions"
import Install from "./install"

Questions().then((answers) => {
  Install(answers)
})
