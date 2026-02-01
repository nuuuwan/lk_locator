import { Box, CircularProgress, Typography, ButtonBase } from "@mui/material";
import { useData } from "../../nonview/core/DataContext";

export default function RegionView({ region, regionClass, regionGeo }) {
  const { selectedRegion, onRegionSelect } = useData();

  const isSelected =
    selectedRegion && region && selectedRegion.region.id === region.id;

  const getFontSize = (text) => {
    if (!text) return "0.9rem";
    const length = text.length;
    if (length <= 10) return "0.9rem";
    if (length <= 15) return "0.85rem";
    if (length <= 20) return "0.8rem";
    if (length <= 25) return "0.75rem";
    return "0.7rem";
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
        borderRadius: 0.5,
        bgcolor: isSelected ? "primary.main" : "grey.50",
        color: isSelected ? "primary.contrastText" : "text.primary",
        p: 0.5,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          bgcolor: isSelected ? "primary.main" : "grey.100",
        },
        height: 48,
      }}
      disabled={!region}
    >
      <Box>
        <Box sx={{ height: 24 }}>
          {region ? (
            <Typography
              variant="body2"
              sx={{ fontSize: getFontSize(region.name), fontWeight: 500 }}
            >
              {region.name}
            </Typography>
          ) : (
            <CircularProgress size={12} />
          )}
        </Box>
        <Typography
          variant="caption"
          sx={{ opacity: 0.6, fontSize: "0.65rem" }}
        >
          {regionClass.regionName}
        </Typography>
      </Box>
    </ButtonBase>
  );
}
