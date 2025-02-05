import { Hospital } from "@/lib/types";
import { MAP_CONFIG } from "@/lib/constants";
import {
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Box,
  Paper,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";

type HeaderProps = {
  hospitals: Hospital[];
  selectedDepartment: string | null;
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
  selectedDepartment,
  onDepartmentChange,
  showCircles,
  onCircleVisibilityChange,
  walkingTime,
  onWalkingTimeChange,
}: HeaderProps) {
  const departments = Array.from(
    new Set(hospitals.flatMap((h) => splitDepartments(h.departments)))
  ).sort();

  return (
    <Paper elevation={1}>
      <Box p={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          小山市の病院マップ
        </Typography>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="search-options-content"
            id="search-options-header"
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.03)",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.05)",
              },
            }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <SearchIcon fontSize="small" />
              <Typography>検索オプション</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box mb={3}>
              <Typography variant="body2" color="text.secondary" paragraph>
                バス停から徒歩圏内にある病院を診療科目から検索することができます。
              </Typography>
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2" component="div">
                  <ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
                    <li>
                      時間帯によってはバス停から病院まで徒歩で表示より時間がかかる場合があります
                    </li>
                    <li>
                      全てのバス路線を網羅していないため、円の外にある病院でもバス停から徒歩圏内で向かうことができる場合があります
                    </li>
                  </ul>
                </Typography>
              </Alert>
            </Box>

            <Box display="flex" gap={4} alignItems="center">
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>診療科目</InputLabel>
                <Select
                  value={
                    selectedDepartment === null ? "すべて" : selectedDepartment
                  }
                  label="診療科目"
                  onChange={(e) => {
                    const value = e.target.value;
                    onDepartmentChange(value === "すべて" ? null : value);
                  }}
                >
                  <MenuItem value="すべて">すべて</MenuItem>
                  {departments.map((dept) => (
                    <MenuItem key={dept} value={dept}>
                      {dept}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box
                display="flex"
                alignItems="center"
                gap={2}
                sx={{ borderLeft: 1, borderColor: "divider", pl: 4 }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showCircles}
                      onChange={(e) =>
                        onCircleVisibilityChange(e.target.checked)
                      }
                    />
                  }
                  label="バス停からの徒歩圏内を表示"
                />
                {showCircles && (
                  <FormControl sx={{ minWidth: 120 }}>
                    <Select
                      value={walkingTime}
                      onChange={(e) =>
                        onWalkingTimeChange(
                          e.target
                            .value as keyof typeof MAP_CONFIG.WALKING_DISTANCES
                        )
                      }
                    >
                      {Object.keys(MAP_CONFIG.WALKING_DISTANCES).map((time) => (
                        <MenuItem key={time} value={time}>
                          {time}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Paper>
  );
}
