/**
 * structuredClone có sẵn ở Node ≥17 và mọi browser hiện đại,
 * nhưng lib ES2022 của TypeScript chưa khai báo (nó nằm trong lib DOM).
 * Khai báo tay để @atelier/core không phải kéo @types/node hay lib DOM.
 */
declare function structuredClone<T>(value: T, options?: { transfer?: unknown[] }): T;
