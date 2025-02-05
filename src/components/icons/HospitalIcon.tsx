type IconProps = {
  size?: number;
  color?: string;
};

/**
 * 病院を表すSVGアイコン
 * @param props.size - アイコンのサイズ（ピクセル）
 * @param props.color - アイコンの色（CSS color）
 */
export function HospitalIcon({ size = 30, color = "#DC2626" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M18 14h-4v4h-4v-4H6v-4h4V6h4v4h4v4zm2-12H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
    </svg>
  );
}
