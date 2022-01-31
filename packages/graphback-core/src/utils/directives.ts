export const directives = `
      enum RelDirection { IN OUT }
      directive @unique on FIELD_DEFINITION
      directive @relation(
            type: String!
            direction: RelDirection!
      ) on FIELD_DEFINITION
      directive @transient on FIELD_DEFINITION
      directive @default(value: String!) on FIELD_DEFINITION
      directive @computed(value: String!) on FIELD_DEFINITION
      directive @constraint(
            minLength: Int
            maxLength: Int
            startsWith: String
            endsWith: String
            contains: String
            notContains: String
            pattern: String
            format: String
            min: Float
            max: Float
            exclusiveMin: Float
            exclusiveMax: Float
            multipleOf: Float
        ) on INPUT_FIELD_DEFINITION | FIELD_DEFINITION`