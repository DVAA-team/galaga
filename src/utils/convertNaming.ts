type TSnakeToCamelCase<TKey extends string> =
  TKey extends `${infer T}_${infer U}`
    ? `${Lowercase<T>}${Capitalize<TSnakeToCamelCase<U>>}`
    : TKey;

export type TSnakeToCamelCaseNested<T> = T extends object
  ? {
      [K in keyof T as TSnakeToCamelCase<K & string>]: TSnakeToCamelCaseNested<
        T[K]
      >;
    }
  : T;

function isObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === 'object' &&
    value === Object(value) &&
    !Array.isArray(value)
  );
}

function snakeToCamelCase(s: string): string {
  return s.replace(/([_][a-z])/gi, ($1) => $1.toUpperCase().replace('_', ''));
}
function camelToSnakeCase(s: string): string {
  return s.replace(/([A-Z])/g, ($1) => `_${$1.toLowerCase()}`);
}

export function clientToServerNaming(serverRequest: unknown): unknown {
  if (isObject(serverRequest)) {
    const n: Record<string, unknown> = {};
    Object.keys(serverRequest).forEach((key) => {
      n[camelToSnakeCase(key)] = clientToServerNaming(serverRequest[key]);
    });
    return n;
  }
  if (Array.isArray(serverRequest)) {
    return serverRequest.map((item) => clientToServerNaming(item));
  }
  return serverRequest;
}

export function serverToClientNaming<T = unknown>(
  serverResponse: T
): TSnakeToCamelCaseNested<T> {
  if (isObject(serverResponse)) {
    const n: Record<string, unknown> = {};
    Object.keys(serverResponse).forEach((key) => {
      n[snakeToCamelCase(key)] = serverToClientNaming(serverResponse[key]);
    });
    return n as TSnakeToCamelCaseNested<T>;
  }
  return serverResponse as TSnakeToCamelCaseNested<T>;
}
