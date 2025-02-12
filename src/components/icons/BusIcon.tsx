type IconProps = {
  size?: number;
  color?: string;
};

/**
 * バス停を表すSVGアイコン
 * @param props.size - アイコンのサイズ（ピクセル）
 * @param props.color - アイコンの色（CSS color）
 */
export function BusIcon({ size = 30, color = "#2563EB" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5s1.5.67 1.5 1.5s-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z" />
    </svg>
  );
}
