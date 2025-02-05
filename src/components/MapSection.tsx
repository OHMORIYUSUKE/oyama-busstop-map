"use client";

import dynamic from "next/dynamic";
import { Hospital, Stop } from "@/lib/types";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <p>地図を読み込み中...</p>,
});

type MapSectionProps = {
  hospitals: Hospital[];
  stops: Stop[];
  showCircles: boolean;
  walkingDistance: number;
};

/**
 * 地図セクションのクライアントコンポーネント
 * @param props.hospitals - 病院データの配列
 * @param props.stops - バス停データの配列
 */
export default function MapSection({
  hospitals,
  stops,
  showCircles,
  walkingDistance,
}: MapSectionProps) {
  return (
    <Map
      hospitals={hospitals}
      stops={stops}
      showCircles={showCircles}
      walkingDistance={walkingDistance}
    />
  );
}
