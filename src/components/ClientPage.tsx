"use client";

import { useState } from "react";
import { Hospital, Stop } from "@/lib/types";
import MapSection from "@/components/MapSection";
import { Header } from "@/components/Header";
import { MAP_CONFIG, APP_CONFIG } from "@/lib/constants";
import { Box, Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

type ClientPageProps = {
  initialHospitals: Hospital[];
  stops: Stop[];
};

/**
 * 診療科目を分割して配列にする
 * @example "消化器内科；内科" → ["消化器内科", "内科"]
 */
function splitDepartments(departments: string): string[] {
  return departments
    .split(/[;；:]/) // セミコロン（全角/半角）とコロンで分割
    .map((d) => d.trim())
    .filter(Boolean); // 空文字を除去
}

export default function ClientPage({
  initialHospitals,
  stops,
}: ClientPageProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [showCircles, setShowCircles] = useState(false);
  const [walkingTime, setWalkingTime] =
    useState<keyof typeof MAP_CONFIG.WALKING_DISTANCES>("徒歩5分");

  // 選択された診療科目で部分一致フィルタリング
  const filteredHospitals = selectedDepartment
    ? initialHospitals.filter((h) =>
        splitDepartments(h.departments).some((d) =>
          d.includes(selectedDepartment)
        )
      )
    : initialHospitals;

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header
        hospitals={initialHospitals}
        selectedDepartment={selectedDepartment}
        onDepartmentChange={setSelectedDepartment}
        showCircles={showCircles}
        onCircleVisibilityChange={setShowCircles}
        walkingTime={walkingTime}
        onWalkingTimeChange={setWalkingTime}
      />
      <div style={{ flex: 1, position: "relative" }}>
        <MapSection
          hospitals={filteredHospitals}
          stops={stops}
          showCircles={showCircles}
          walkingDistance={MAP_CONFIG.WALKING_DISTANCES[walkingTime]}
        />
        <Box
          position="fixed"
          bottom={16}
          left={16}
          bgcolor="white"
          p={1}
          borderRadius={1}
          boxShadow={1}
          zIndex={1000}
        >
          <Link
            href={APP_CONFIG.GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "text.primary",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            <GitHubIcon fontSize="small" />
            ソースコード
          </Link>
        </Box>
      </div>
    </div>
  );
}
