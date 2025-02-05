/** 停留所の情報を表す型 */
export type Stop = {
  /** 停留所のユニークID */
  stop_id: string;
  /** 停留所の名称 */
  stop_name: string;
  /** 停留所の説明 */
  stop_desc: string;
  /** 緯度 */
  stop_lat: number;
  /** 経度 */
  stop_lon: number;
  /** ゾーンID */
  zone_id: string;
  /** ロケーションタイプ */
  location_type: number;
};

/** 病院の情報を表す型 */
export type Hospital = {
  /** 都道府県名 */
  prefecture: string;
  /** 市区町村名 */
  city: string;
  /** 病院名 */
  name: string;
  /** 住所 */
  address: string;
  /** 緯度 */
  latitude: number;
  /** 経度 */
  longitude: number;
  /** 電話番号 */
  phone: string;
  /** 診療科目 */
  departments: string;
  /** 診療曜日 */
  openDays: string;
  /** 診療開始時間（24時間形式） */
  openTime: number;
  /** 診療終了時間（24時間形式） */
  closeTime: number;
  /** 診療日時特記事項 */
  timeNote: string;
};

/** CSVから読み込んだ病院の生データを表す型 */
export type HospitalRecord = {
  都道府県名: string;
  市区町村名: string;
  名称: string;
  住所: string;
  緯度: string;
  経度: string;
  電話番号: string;
  診療科目: string;
  診療曜日: string;
  診療開始時間: string; // 0.375 = 9:00 (小数で表現された時刻)
  診療終了時間: string; // 0.770833... = 18:30
  診療日時特記事項: string;
};
