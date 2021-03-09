import { Module } from "../types"

import CommonModule from "./common"

import BasicModel from "./models/basic"
import SocialModel from "./models/social"

import EmailPasswordMethod from "./methods/email_password"
import { Reducer } from "../reducer"

export enum Models {
  BASIC = "BASIC",
  SOCIAL = "SOCIAL",
}

export enum Methods {
  EMAIL_PASSWORD = "EMAIL_PASSWORD",
}

export type AuthConfig = {
  model: Models
  methods: Methods[]
} & Module

const initializer = (config: AuthConfig): Module => {
  const { model, methods, ...moduleExtend } = config
  const reducer = new Reducer()

  reducer.module(CommonModule)

  switch (model) {
    case Models.BASIC:
      reducer.module(BasicModel)
      break
    case Models.SOCIAL:
      reducer.module(SocialModel)
      break

    default:
      throw new Error(`Unsupported Auth model: ${model}`)
  }

  if (methods) {
    methods.forEach((method) => {
      switch (method) {
        case Methods.EMAIL_PASSWORD:
          reducer.module(EmailPasswordMethod)
          break

        default:
          throw new Error(`Unsupported Auth model: ${model}`)
      }
    })
  }

  if (moduleExtend) reducer.module(moduleExtend)

  return reducer.toReducible()
}

initializer.models = Models
initializer.methods = Methods

export default initializer
