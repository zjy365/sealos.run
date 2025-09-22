export type NotReadonly<T> = { -readonly [P in keyof T]: T[P] };
