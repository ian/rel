import _ from "lodash"
import { Guard, Handler, Relation, RelationDirection } from "../types"

import {
  hydrateAddRelation,
  hydrateRemoveRelation,
  hydrateListRelation,
} from "../hydration"

const DEFAULT_OPTS = {
  endpoints: true,
}
export default class RelationImpl implements Relation {
  _label: string
  _endpoints: { add?: boolean | string; remove?: boolean | string }
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
  _handler: Handler

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

  endpoints(endpoints: boolean | { add: string; remove: string }) {
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

  handler(handler: Handler) {
    this._handler = handler
    return this
  }

  hydrate(hydrator, opts) {
    const { obj } = opts

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

    hydrateListRelation(relation, this._handler)(hydrator, opts)

    if (this._endpoints) {
      if (this._endpoints.add) {
        const addRelationName =
          this._endpoints.add === true
            ? // if it's boolean, dynamically generate the name
              this._singular
              ? `${relation.from.label}Set${this._to.label}`
              : `${relation.from.label}Add${this._to.label}`
            : // if it's string, use the label name
              this._endpoints.add

        hydrateAddRelation(addRelationName, relation)(hydrator)
      }

      if (this._endpoints.remove) {
        const removeRelationName =
          this._endpoints.remove === true
            ? `${relation.from.label}Remove${this._to.label}`
            : this._endpoints.remove

        hydrateRemoveRelation(removeRelationName, relation)(hydrator)
      }
    }
  }
}
