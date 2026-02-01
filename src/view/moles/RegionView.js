import { Box, CircularProgress, Typography, ButtonBase } from "@mui/material";
import { useData } from "../../nonview/core/DataContext";

export default function RegionView({ region, regionClass, regionGeo }) {
  const { selectedRegion, onRegionSelect } = useData();

  const isSelected =
    selectedRegion && region && selectedRegion.region.id === region.id;

  const getFontSize = (text) => {
    if (!text) return "0.9rem";
    const p = Math.min(0.9, 15 / text.length);
    return `${p}rem`;
  };

  const handleClick = () => {
    if (region && regionGeo) {
      onRegionSelect(region, regionGeo);
    }
  };

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
        m: 0.5,
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
                fontSize: getFontSize(region.name),
                fontWeight: 500,
                color: isSelected ? "primary.contrastText" : "primary.main",
              }}
            >
              {region.name}
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
              color: isSelected ? "white" : "black",
            }}
          >
            {regionClass.regionName}
          </Typography>
        )}
      </Box>
    </ButtonBase>
  );
}
