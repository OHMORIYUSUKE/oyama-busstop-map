"use client";

import { Hospital, Stop } from "@/lib/types";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { mapIcons, createDivIcon } from "@/lib/mapIcons";
import { MAP_CONFIG, STYLE_CONFIG } from "@/lib/constants";
import { ICON_CONFIG } from "@/lib/constants";
import { isHospitalInRange, formatTime } from "@/lib/utils";
import { HospitalIcon } from "@/components/icons/HospitalIcon";

type MapProps = {
  hospitals: Hospital[];
  stops: Stop[];
  showCircles: boolean;
  walkingDistance: number;
};

/**
 * 診療科目を表示用に整形
 * @example "内科；整形外科" → "内科、整形外科"
 */
function formatDepartments(departments: string): string {
  return departments
    .split(/[;；:]/)
    .map((d) => d.trim())
    .filter(Boolean)
    .join("、");
}

/**
 * 地図コンポーネント
 * @param props.hospitals - 病院データの配列
 * @param props.stops - バス停データの配列
 */
export default function Map({
  hospitals,
  stops,
  showCircles,
  walkingDistance,
}: MapProps) {
  return (
    <MapContainer
      center={MAP_CONFIG.CENTER}
      zoom={MAP_CONFIG.DEFAULT_ZOOM}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {showCircles &&
        stops.map((stop) => (
          <Circle
            key={`circle-${stop.stop_id}`}
            center={[stop.stop_lat, stop.stop_lon]}
            radius={walkingDistance}
            pathOptions={{
              color: ICON_CONFIG.BUS_COLOR,
              fillColor: ICON_CONFIG.BUS_COLOR,
              fillOpacity: STYLE_CONFIG.CIRCLE_OPACITY,
              weight: STYLE_CONFIG.CIRCLE_WEIGHT,
            }}
          />
        ))}

      {hospitals.map((hospital, index) => {
        const inRange = showCircles
          ? isHospitalInRange(hospital, stops, walkingDistance)
          : true;

        return (
          <Marker
            key={`hospital-${index}`}
            position={[hospital.latitude, hospital.longitude]}
            icon={
              inRange
                ? mapIcons.hospital
                : createDivIcon(HospitalIcon, {
                    color: ICON_CONFIG.HOSPITAL_OUT_OF_RANGE_COLOR,
                    size: ICON_CONFIG.DEFAULT_SIZE,
                  })
            }
          >
            <Popup>
              <div className="min-w-[300px]">
                <h3 className="text-lg font-bold mb-3">{hospital.name}</h3>

                <div className="space-y-2 mb-4">
                  <p>📍 {hospital.address}</p>
                  <p>🏥 {formatDepartments(hospital.departments)}</p>
                  <p>☎️ {hospital.phone}</p>
                  <p>
                    ⏰ 診療時間：{hospital.openDays}{" "}
                    {hospital.openTime || hospital.closeTime ? (
                      <>
                        {formatTime(hospital.openTime)}～
                        {formatTime(hospital.closeTime)}
                      </>
                    ) : (
                      <></>
                    )}
                    {hospital.timeNote && (
                      <span className="block text-sm text-gray-600 mt-1">
                        ※ {hospital.timeNote}
                      </span>
                    )}
                  </p>
                </div>

                <div className="border-t pt-3">
                  <div style={{ display: "flex", gap: "1.5rem" }}>
                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(
                        `${hospital.name} ${hospital.address}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#2563eb",
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                    >
                      🔍 病院をGoogle検索
                    </a>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${hospital.latitude},${hospital.longitude}&travelmode=transit&dir_action=navigate`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#2563eb",
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                    >
                      🚌 バスでのルートを検索
                    </a>
                  </div>
                </div>

                {showCircles && !inRange && (
                  <p
                    className="mt-3 text-sm"
                    style={{ color: ICON_CONFIG.HOSPITAL_OUT_OF_RANGE_COLOR }}
                  >
                    ※ バス停から徒歩
                    {Object.keys(MAP_CONFIG.WALKING_DISTANCES).find(
                      (key) =>
                        MAP_CONFIG.WALKING_DISTANCES[
                          key as keyof typeof MAP_CONFIG.WALKING_DISTANCES
                        ] === walkingDistance
                    ) ?? "5分"}
                    圏外
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}

      {showCircles &&
        stops.map((stop) => (
          <Marker
            key={stop.stop_id}
            position={[stop.stop_lat, stop.stop_lon]}
            icon={mapIcons.bus}
          >
            <Popup>
              <div>
                <h3>{stop.stop_name}</h3>
                <p>{stop.stop_desc}</p>
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
