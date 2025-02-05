import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import { Stop, Hospital, HospitalRecord } from "./types";

type StopRecord = {
  stop_id: string;
  stop_name: string;
  stop_desc: string;
  stop_lat: string;
  stop_lon: string;
  zone_id: string;
  location_type: string;
};

/**
 * stops.csvから停留所データを読み込む
 * @returns 停留所情報の配列
 */
export async function loadStops(): Promise<Stop[]> {
  const filePath = path.join(process.cwd(), "data", "stops.csv");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });

  return records.map((record: StopRecord) => ({
    ...record,
    stop_lat: Number(record.stop_lat),
    stop_lon: Number(record.stop_lon),
    location_type: Number(record.location_type),
  }));
}

/**
 * hospitals.csvから病院データを読み込み、整形して返す
 * @returns 病院情報の配列
 */
export async function loadHospitals(): Promise<Hospital[]> {
  const filePath = path.join(process.cwd(), "data", "hospitals.csv");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });

  return records.map((record: HospitalRecord) => ({
    prefecture: record.都道府県名,
    city: record.市区町村名,
    name: record.名称,
    address: record.住所,
    latitude: parseFloat(record.緯度),
    longitude: parseFloat(record.経度),
    phone: record.電話番号,
    departments: record.診療科目,
    openDays: record.診療曜日,
    openTime: parseFloat(record.診療開始時間),
    closeTime: parseFloat(record.診療終了時間),
    timeNote: record.診療日時特記事項,
  }));
}
