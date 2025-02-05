/**
 * マップ関連の定数
 */
export const MAP_CONFIG = {
  /** 小山市の中心座標 */
  CENTER: [36.3139684166666, 139.815920027777] as [number, number],
  /** デフォルトのズームレベル */
  DEFAULT_ZOOM: 13,
  /** 徒歩圏内の距離オプション（メートル） */
  WALKING_DISTANCES: {
    // 5km/h = 83.33m/分
    // 5分 = 416.67m ≈ 400m
    // 10分 = 833.33m ≈ 800m
    徒歩5分: 417,
    徒歩10分: 833,
  } as const,
} as const;

/**
 * アイコン関連の定数
 */
export const ICON_CONFIG = {
  /** アイコンのデフォルトサイズ（ピクセル） */
  DEFAULT_SIZE: 20,
  /** 病院アイコンの色 */
  HOSPITAL_COLOR: "#DC2626",
  /** 病院アイコンの色（範囲外） */
  HOSPITAL_OUT_OF_RANGE_COLOR: "#9CA3AF",
  /** バス停アイコンの色 */
  BUS_COLOR: "#2563EB",
} as const;

/**
 * スタイル関連の定数
 */
export const STYLE_CONFIG = {
  /** バス停圏内円の透明度 */
  CIRCLE_OPACITY: 0.05,
  /** バス停圏内円の線の太さ */
  CIRCLE_WEIGHT: 0.5,
} as const;
