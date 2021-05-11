// @todo clean me up, this file is a mess

import _ from "lodash"
import {
  Guard,
  Resolver,
  HydrationOpts,
  HydrationPropertyOpts,
  Relation,
  RelationDirection,
  RelationEndpointOpts,
} from "../types"

import {
  hydrateAddRelation,
  hydrateRemoveRelation,
  hydrateListRelation,
} from "./hydration"

const DEFAULT_OPTS = {
  // We default these off so they're opt-in
  endpoints: false,
}
export default class RelationImpl implements Relation {
  _label: string
  _endpoints: {
    add: boolean | RelationEndpointOpts
    remove: boolean | RelationEndpointOpts
  }
  _guard: Guard = null
  _from: {
    label: string
  } = null
  _to: {
    label: string
  } = null
  _direction: RelationDirection = RelationDirection.OUT
  _singular: boolean = false
  _order: string = null
  _resolver: Resolver

  constructor(label: string) {
    this._label = label

    const _opts = {
      ...DEFAULT_OPTS,
    }

    this.endpoints(_opts.endpoints)

    return this
  }

  guard(scope: Guard) {
    this._guard = scope
    return this
  }

  from(from: string) {
    this._from = {
      label: from,
    }
    return this
  }

  to(to: string) {
    this._to = {
      label: to,
    }
    return this
  }

  endpoints(
    endpoints:
      | boolean
      | {
          add: boolean | RelationEndpointOpts
          remove: boolean | RelationEndpointOpts
        }
  ) {
    if (endpoints) {
      if (endpoints === true) {
        this._endpoints = { add: true, remove: true }
      } else {
        this._endpoints = endpoints
      }
    } else {
      this._endpoints = null
    }

    return this
  }

  singular() {
    this._singular = true
    return this
  }

  inbound() {
    this._direction = RelationDirection.IN
    return this
  }

  direction(d: RelationDirection) {
    this._direction = d
    return this
  }

  order(order: string) {
    this._order = order
    return this
  }

  resolve(resolver: Resolver) {
    this._resolver = resolver
    return this
  }

  // A relation should hydrate to:
  // - the type resolver
  // - Create/Delete/Set endpoints
  // - Deep, nested creation: CreateBook(input: { title: "", author: { name: "Ian" }})
  // - Deep, nested finds:
  //
  // query Map(
  //   $search: String,
  //   $boundingBox: BoundingBox,
  //   $distinctions: [UUID],
  //   $awards: [UUID]
  // ) {
  //   ListRestaurants(
  //     first: 10,
  //     skip: 10,
  //     where: {
  //       name_like: $search,
  //       geobounds: $boundingBox,
  //       distinction: {
  //         _or: [
  //           id_in: $distinctions,
  //           award: {
  //             id_in: $awards
  //           }
  //         ]
  //       }
  //     }
  //   ) {
  //     id
  //     name
  //     slug
  //     location
  //   }
  // }
  hydrate(hydration: HydrationOpts, opts: HydrationPropertyOpts) {
    const { obj } = opts

    const relation = {
      from: this._from || { label: obj },
      to: this._to,
      rel: {
        label: this._label,
        direction: this._direction,
      },
      guard: this._guard,
      singular: this._singular,
      order: this._order,
    }

    hydrateListRelation(relation, this._resolver)(hydration, opts)

    let defaultFromParam = `${relation.from.label.toLowerCase()}Id`,
      defaultToParam = `${relation.to.label.toLowerCase()}Id`
    if (defaultToParam === defaultFromParam) {
      // for relationships of the same name lets just increment the to
      defaultToParam = `${relation.to.label.toLowerCase()}Id_2`
    }

    if (this._endpoints) {
      if (this._endpoints.add) {
        let relationOpts = {
          name: this._singular
            ? `${relation.from.label}Set${this._to.label}`
            : `${relation.from.label}Add${this._to.label}`,
          fromParam: defaultFromParam,
          toParam: defaultToParam,
          guard: this._guard,
        }

        if (typeof this._endpoints.add === "object") {
          Object.assign(relationOpts, this._endpoints.add)
        }

        hydrateAddRelation(relation, relationOpts)(hydration)
      }

      if (this._endpoints.remove) {
        let relationOpts = {
          name: this._singular
            ? `${relation.from.label}Unset${this._to.label}`
            : `${relation.from.label}Remove${this._to.label}`,
          fromParam: defaultFromParam,
          toParam: defaultToParam,
          guard: this._guard,
        }

        if (typeof this._endpoints.remove === "object") {
          Object.assign(relationOpts, this._endpoints.remove)
        }

        hydrateRemoveRelation(relation, relationOpts)(hydration)
      }
    }
  }
}
