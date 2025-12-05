export function normalizeRemoteError(err: unknown): RemotePayload {
  // err puede ser un Error, un objecto, o un objeto con message string que contiene JSON
  try {
    const anyErr: any = err ?? {};
    // 1) si err.message es string y JSONizable, se parsea
    if (typeof anyErr.response === 'string') {
      const msg = anyErr.message.trim();
      // Si parece un JSON, parsear
      console.log(`api gateway details : ${msg}`);
      if (
        (msg.startsWith('{') && msg.endsWith('}')) ||
        (msg.startsWith('[') && msg.endsWith(']'))
      ) {
        const parsed = JSON.parse(msg);
        if (typeof parsed === 'object' && parsed !== null) {
          return {
            status: parsed.status ?? parsed.statusCode ?? anyErr.status,
            message: parsed.message ?? parsed.error ?? msg,
            details: parsed.details ?? parsed.response.details ?? null,
          };
        }
      }
      // si no es JSON, devolver message tal cual
      return {
        status: anyErr.status ?? undefined,
        message: msg,
        details: anyErr.response.details ?? null,
      };
    }

    // 2) si err es un objeto con propiedades
    if (typeof anyErr === 'object' && anyErr !== null) {
      return {
        status: anyErr.status ?? anyErr.statusCode ?? undefined,
        message: anyErr.message ?? anyErr.error ?? undefined,
        details: anyErr.response.details ?? anyErr.details ?? null,
      };
    }

    // 3) fallback
    return { message: String(err) };
  } catch (parseErr) {
    return { message: 'Unknown remote error' };
  }
}
