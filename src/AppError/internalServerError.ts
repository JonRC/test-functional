export type InternalServerError = {
  message: string
}

// side-effects if log in a logging service
export const internalServerError =
  (input: { message: string; code?: number }) =>
  (childrenError: unknown): InternalServerError => {
    const { message } = input
    // log in a logging service with the code and the childrenError

    return {
      message
    }
  }
