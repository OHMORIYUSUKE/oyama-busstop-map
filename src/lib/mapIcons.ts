import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { createElement } from "react";
import { HospitalIcon } from "@/components/icons/HospitalIcon";
import { BusIcon } from "@/components/icons/BusIcon";
import { ICON_CONFIG } from "@/lib/constants";

/**
 * SVGアイコンからLeafletのDivIconを作成する
 * @param IconComponent - SVGアイコンのReactコンポーネント
 * @param options - アイコンのオプション
 * @param options.size - アイコンのサイズ（ピクセル）
 * @param options.color - アイコンの色（CSS color）
 * @param options.className - アイコンのCSS class名
 * @returns Leaflet DivIcon インスタンス
 */
export function createDivIcon(
  IconComponent: React.ComponentType<{ size: number; color: string }>,
  options?: {
    size?: number;
    color: string;
    className?: string;
  }
) {
  const {
    size = 30,
    color,
    className = "custom-div-icon",
  } = options || { color: "#000000" };

  return new L.DivIcon({
    html: ReactDOMServer.renderToString(
      createElement(IconComponent, { size, color: color || "#000000" })
    ),
    className,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
}

/**
 * マップで使用するアイコンのコレクション
 */
export const mapIcons = {
  /** 病院のマーカーアイコン */
  hospital: createDivIcon(HospitalIcon, {
    color: ICON_CONFIG.HOSPITAL_COLOR,
    size: ICON_CONFIG.DEFAULT_SIZE,
  }),
  /** バス停のマーカーアイコン */
  bus: createDivIcon(BusIcon, {
    color: ICON_CONFIG.BUS_COLOR,
    size: ICON_CONFIG.DEFAULT_SIZE,
  }),
} as const;
