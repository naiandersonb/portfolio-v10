type MessageTree = { [key: string]: string | string[] | MessageTree };

function isBlank(value: unknown): boolean {
  return value === undefined || value === "" || (Array.isArray(value) && value.length === 0);
}

function isTree(value: unknown): value is MessageTree {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Fills every key that is missing or empty in `primary` with the value from `fallback`,
 * so an untranslated string shows the other language instead of a raw key (FR-017c).
 */
export function withFallbackMessages<T extends MessageTree>(primary: T, fallback: MessageTree): T {
  const merged: MessageTree = { ...primary };
  for (const [key, fallbackValue] of Object.entries(fallback)) {
    const value = primary[key];
    if (isTree(value) && isTree(fallbackValue)) {
      merged[key] = withFallbackMessages(value, fallbackValue);
    } else if (isBlank(value)) {
      merged[key] = fallbackValue;
    }
  }
  return merged as T;
}
