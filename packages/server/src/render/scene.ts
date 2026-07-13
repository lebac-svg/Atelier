import type { Point } from "@atelier/core";

/**
 * SceneGraph2D trung gian (doc 08): mọi writer (SVG P1, DXF P4)
 * cùng đọc một nguồn primitive — không bao giờ lệch nhau.
 *
 * Quy ước không gian:
 * - space "model" (mặc định): tọa độ mm THẬT — writer transform điểm-điểm.
 * - space "paper": mm GIẤY trên khổ A3 (gốc trên-trái, y XUỐNG) — khung, khung tên.
 * - weight (độ dày nét) và size chữ LUÔN là mm giấy (paper-space).
 */

export const LAYERS = [
  "UNDERLAY", // bản vẽ cũ/ảnh đồ lại — LUÔN dưới cùng, chỉ có ở plan live (không vào bộ tờ)
  "TRUC",
  "TUONG-CAT",
  "TUONG-THAY",
  "CUA",
  "THANG",
  "NOI-THAT",
  "DIM",
  "TEXT",
  "HATCH",
  "KHUNG",
] as const;

export type LayerName = (typeof LAYERS)[number];

export type Prim =
  | { kind: "line"; a: Point; b: Point; weight: number; dash?: string; color?: string }
  | { kind: "polyline"; pts: Point[]; weight: number; dash?: string; close?: boolean; color?: string }
  | { kind: "polygon"; pts: Point[]; fill?: string; weight?: number }
  | { kind: "circle"; c: Point; r: number; weight: number; fill?: string; rPaper?: boolean }
  | { kind: "ellipse"; c: Point; rx: number; ry: number; rot: number; weight: number }
  | { kind: "arc"; c: Point; r: number; a0: number; a1: number; weight: number; dash?: string }
  | {
      kind: "text";
      at: Point;
      text: string;
      size: number; // mm giấy
      anchor?: "start" | "middle" | "end";
      bold?: boolean;
      /** Xoay chữ theo hướng đoạn model (writer tự chống lộn ngược đầu). */
      along?: { from: Point; to: Point };
    }
  | {
      /**
       * Ảnh raster đặt trong KHÔNG GIAN MODEL (underlay đồ lại) — chỉ SVG writer
       * vẽ; DXF writer bỏ qua. origin = model mm của góc DƯỚI-TRÁI ảnh,
       * scale = mm/pixel, rot = độ CCW quanh origin (cùng quy ước Underlay).
       */
      kind: "image";
      href: string;
      wpx: number;
      hpx: number;
      origin: Point;
      scale: number;
      rot: number;
    };

export type SceneItem = {
  layer: LayerName;
  prim: Prim;
  dataId?: string;
  space?: "model" | "paper";
  /** Độ mờ 0..1 (underlay) — writer SVG áp lên element; DXF bỏ qua. */
  opacity?: number;
};

export type Scene2D = SceneItem[];

/** Bộ nét chuẩn (mm giấy) — doc 08. */
export const W = {
  hair: 0.13,
  thin: 0.18,
  mid: 0.25,
  strong: 0.35,
  cut: 0.5,
  frame: 0.7,
} as const;
