/**
 * Indicates that the pair has insufficient reserves for a desired output amount. I.e. the amount of output cannot be
 * obtained by sending any amount of input.
 */
export declare class InsufficientQuantaAvailableError extends Error {
    readonly isInsufficientQuantaAvailableError: true;
    constructor();
}
