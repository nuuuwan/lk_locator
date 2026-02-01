import { Box, CircularProgress, Typography, ButtonBase } from "@mui/material";
import { useData } from "../../nonview/core/DataContext";

export default function RegionView({ region, regionClass, regionGeo }) {
  const { selectedRegion, onRegionSelect, gndLegacyData } = useData();

  const isSelected =
    selectedRegion && region && selectedRegion.region.id === region.id;

  const getFontSize = (text) => {
    if (!text) return "0.9rem";
    const p = Math.min(0.9, 20 / text.length);
    return `${p}rem`;
  };

  const handleClick = () => {
    if (region && regionGeo) {
      onRegionSelect(region, regionGeo);
    }
  };

  let displayName = region?.name;
  if (regionClass.regionShortName === "GND") {
    const gndNum = gndLegacyData?.gnd_num;
    if (gndNum && gndNum !== "None") {
      displayName += ` (${gndNum})`;
    }
  }

  return (
    <ButtonBase
      onClick={handleClick}
      sx={{
        flex: 1,
        display: "block",
        textAlign: "left",
        borderRadius: 1,
        bgcolor: isSelected ? "primary.main" : "grey.50",
        p: 0.5,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          bgcolor: isSelected ? "primary.main" : "primary.main",
        },
        height: 48,
        maxWidth: "48vw",
      }}
      disabled={!region}
    >
      <Box>
        <Box sx={{ height: 21 }}>
          {region ? (
            <Typography
              variant="body2"
              sx={{
                fontSize: getFontSize(displayName),
                fontWeight: 500,
                color: isSelected ? "white" : "primary.main",
              }}
            >
              {displayName}
            </Typography>
          ) : (
            <CircularProgress size={12} />
          )}
        </Box>
        {region && (
          <Typography
            variant="caption"
            sx={{
              fontSize: getFontSize(regionClass.regionName),
              color: isSelected ? "grey" : "black",
            }}
          >
            {regionClass.regionName}
          </Typography>
        )}
      </Box>
    </ButtonBase>
  );
}
