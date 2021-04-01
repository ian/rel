import inquirer from "inquirer"

export type Answers = {
  projectName: string
  auth: string
  plugins: string[]
}

export default (): Promise<Answers> => {
  return inquirer.prompt([
    {
      type: "input",
      message: "What is your project named?",
      name: "projectName",
      validate: function (answer) {
        if (answer.length < 1) {
          return "Sorry, we need to know the name of your project before we can continue."
        }

        return true
      },
    },
    {
      type: "list",
      message: "Which auth model best fits your project?",
      name: "auth",
      choices: [
        // new inquirer.Separator(" = The Meats = "),
        {
          name: "None",
          value: "none",
        },
        {
          name: "Basic (User)",
          value: "basic",
        },
        {
          name: "Social (Users follower/following)",
          value: "social",
        },
        {
          name: "SaaS (Users belong to Account)",
          value: "social",
        },
        // new inquirer.Separator("== COMING SOON =="),
        // {
        //   name: "Crypto (Users with ETH addresses)",
        //   value: "crypto",
        //   disabled: "coming soon",
        // },
        // {
        //   name: "SaaS model (Users, Accounts, Subscriptions)",
        //   value: "saas",
        //   disabled: "coming soon",
        // },
      ],
    },
    {
      type: "checkbox",
      message: "Which services do you need?",
      name: "plugins",
      choices: [
        new inquirer.Separator("== Bundled Services =="),
        {
          name: "Background Jobx",
          value: "jobs",
        },
        new inquirer.Separator("== Media =="),
        {
          name: "Imgix",
          value: "imgix",
        },
        {
          name: "Cloudinary",
          value: "cloudinary",
        },
        {
          name: "Mux",
          value: "mux",
        },
        new inquirer.Separator("== Amazon =="),
        {
          name: "S3",
          value: "S3",
        },
        new inquirer.Separator("== Google =="),
        {
          name: "Cloud Storage",
          value: "storage",
        },
        {
          name: "Dialogflow",
          value: "dialogflow",
        },
        // new inquirer.Separator("== COMING SOON =="),
        // {
        //   name: "Crypto (Users with ETH addresses)",
        //   value: "crypto",
        //   disabled: "coming soon",
        // },
        // {
        //   name: "SaaS model (Users, Accounts, Subscriptions)",
        //   value: "saas",
        //   disabled: "coming soon",
        // },
      ],
    },
  ])
}
