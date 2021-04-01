// see https://stackoverflow.com/a/41102306
const CAN_SET_PROTOTYPE = 'setPrototypeOf' in Object

/**
 * Indicates that the pair has insufficient reserves for a desired output amount. I.e. the amount of output cannot be
 * obtained by sending any amount of input.
 */
export class InsufficientQuantaAvailableError extends Error {
  public readonly isInsufficientQuantaAvailableError: true = true

  public constructor() {
    super()
    this.name = this.constructor.name
    if (CAN_SET_PROTOTYPE) Object.setPrototypeOf(this, new.target.prototype)
  }
}

