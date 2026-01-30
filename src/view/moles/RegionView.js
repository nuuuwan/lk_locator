import { Paper, CircularProgress, Typography, ButtonBase } from "@mui/material";
import { useData } from "../../nonview/core/DataContext";

export default function RegionView({ region, regionClass, regionGeo }) {
  const { selectedRegion, onRegionSelect } = useData();

  const isSelected =
    selectedRegion && region && selectedRegion.region.id === region.id;

  const getFontSize = (text) => {
    if (!text) return "1.25rem";
    const length = text.length;
    if (length <= 10) return "1.25rem";
    if (length <= 15) return "1.1rem";
    if (length <= 20) return "0.95rem";
    if (length <= 25) return "0.85rem";
    return "0.75rem";
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
        width: "calc(min(45vw, 180px))",
        m: 0.5,
        display: "block",
        textAlign: "left",
        borderRadius: 1,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
          "& .MuiPaper-root": {
            elevation: 4,
            boxShadow: 4,
            bgcolor: "primary.main",
          },
        },
      }}
      disabled={!region}
    >
      <Paper
        sx={{
          p: 0.5,
          width: "100%",
          transition: "all 0.2s",
          bgcolor: isSelected ? "primary.main" : "primary.contrastText",
          color: isSelected ? "primary.contrastText" : "black",
        }}
        elevation={isSelected ? 3 : 1}
      >
        {region ? (
          <Typography variant="h6" sx={{ fontSize: getFontSize(region.name) }}>
            {region.name}
          </Typography>
        ) : (
          <CircularProgress size={20} />
        )}
        <Typography variant="body2" sx={{ opacity: 0.7, fontSize: "0.75rem" }}>
          {regionClass.regionName}
        </Typography>
      </Paper>
    </ButtonBase>
  );
}
