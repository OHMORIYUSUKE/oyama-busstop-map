import { Hospital } from "@/lib/types";
import { MAP_CONFIG } from "@/lib/constants";

type HeaderProps = {
  hospitals: Hospital[];
  onDepartmentChange: (department: string | null) => void;
  showCircles: boolean;
  onCircleVisibilityChange: (show: boolean) => void;
  walkingTime: keyof typeof MAP_CONFIG.WALKING_DISTANCES;
  onWalkingTimeChange: (
    time: keyof typeof MAP_CONFIG.WALKING_DISTANCES
  ) => void;
};

/**
 * 診療科目を分割して配列にする
 * @example "消化器内科；内科" → ["消化器内科", "内科"]
 */
function splitDepartments(departments: string): string[] {
  return departments
    .split(/[;；:]/)
    .map((d) => d.trim())
    .filter(Boolean);
}

/**
 * ヘッダーコンポーネント
 */
export function Header({
  hospitals,
  onDepartmentChange,
  showCircles,
  onCircleVisibilityChange,
  walkingTime,
  onWalkingTimeChange,
}: HeaderProps) {
  // 診療科目の一覧を重複なしで取得
  const departments = Array.from(
    new Set(hospitals.flatMap((h) => splitDepartments(h.departments)))
  ).sort();

  return (
    <header className="bg-white shadow-sm p-4">
      <h3 className="text-3xl font-bold mb-4">小山市の病院マップ</h3>
      <div className="text-sm text-gray-600 mb-4">
        <p className="mb-2">
          バス停から徒歩圏内にある病院を診療科目から検索することができます。
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            ※
            時間帯によってはバス停から病院まで徒歩で表示より時間がかかる場合があります
          </li>
          <li>
            ※
            全てのバス路線を網羅していないため、円の外にある病院でもバス停から徒歩圏内で向かうことができる場合があります
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-6">
        {/* 診療科目フィルター */}
        <div className="flex items-center gap-2">
          <label htmlFor="department" className="text-base whitespace-nowrap">
            診療科目：
          </label>
          <select
            id="department"
            className="border rounded px-3 py-2 min-w-[160px] text-base"
            onChange={(e) => onDepartmentChange(e.target.value || null)}
            defaultValue=""
          >
            <option value="">すべて</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* 徒歩圏内表示設定 */}
        <div className="flex items-center gap-2 border-l pl-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="show-circles"
              checked={showCircles}
              onChange={(e) => onCircleVisibilityChange(e.target.checked)}
              className="mr-2 w-4 h-4"
            />
            <label
              htmlFor="show-circles"
              className="text-base whitespace-nowrap"
            >
              バス停からの徒歩圏内を表示
            </label>
            {showCircles && (
              <select
                className="border rounded px-3 py-2 ml-3 text-base"
                value={walkingTime}
                onChange={(e) =>
                  onWalkingTimeChange(
                    e.target.value as keyof typeof MAP_CONFIG.WALKING_DISTANCES
                  )
                }
              >
                {Object.keys(MAP_CONFIG.WALKING_DISTANCES).map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
