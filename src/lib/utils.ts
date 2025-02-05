/**
 * 2点間の距離を計算する（メートル単位）
 * @param lat1 - 地点1の緯度
 * @param lon1 - 地点1の経度
 * @param lat2 - 地点2の緯度
 * @param lon2 - 地点2の経度
 * @returns 距離（メートル）
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // 地球の半径（メートル）
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * 病院がいずれかのバス停の徒歩圏内にあるかを判定
 */
export function isHospitalInRange(
  hospital: { latitude: number; longitude: number },
  stops: { stop_lat: number; stop_lon: number }[],
  range: number
): boolean {
  return stops.some(
    (stop) =>
      calculateDistance(
        hospital.latitude,
        hospital.longitude,
        stop.stop_lat,
        stop.stop_lon
      ) <= range
  );
}

/**
 * 小数形式の時刻を時:分形式に変換
 * @example 0.375 → "09:00"
 */
export function formatTime(decimal: number | null): string {
  if (decimal === null || isNaN(decimal)) return "時間未定";

  const hours = Math.floor(decimal * 24);
  const minutes = Math.round((decimal * 24 - hours) * 60);
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}
