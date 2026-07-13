import type { Point } from "../types.js";

export const add = (a: Point, b: Point): Point => [a[0] + b[0], a[1] + b[1]];
export const sub = (a: Point, b: Point): Point => [a[0] - b[0], a[1] - b[1]];
export const scale = (a: Point, k: number): Point => [a[0] * k, a[1] * k];
export const dot = (a: Point, b: Point): number => a[0] * b[0] + a[1] * b[1];
/** Tích chéo 2D (z của cross 3D) — dương nếu b nằm bên trái a. */
export const cross = (a: Point, b: Point): number => a[0] * b[1] - a[1] * b[0];
export const len = (a: Point): number => Math.hypot(a[0], a[1]);
export const dist = (a: Point, b: Point): number => len(sub(a, b));

export function normalize(a: Point): Point {
  const l = len(a);
  return l === 0 ? [0, 0] : [a[0] / l, a[1] / l];
}

/** Pháp tuyến trái của vector (quay +90° CCW). */
export const perp = (a: Point): Point => [-a[1], a[0]];

/** Xoay CCW quanh gốc, góc theo ĐỘ (quy ước toàn dự án). */
export function rotate(p: Point, deg: number): Point {
  const r = (deg * Math.PI) / 180;
  const c = Math.cos(r);
  const s = Math.sin(r);
  return [p[0] * c - p[1] * s, p[0] * s + p[1] * c];
}

/** Xoay CCW quanh tâm `center`. */
export function rotateAround(p: Point, center: Point, deg: number): Point {
  return add(center, rotate(sub(p, center), deg));
}

export const nearlyEqual = (a: number, b: number, eps = 1e-6): boolean =>
  Math.abs(a - b) <= eps;
