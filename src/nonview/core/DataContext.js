import React, { createContext, useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Province from "./Province";
import LatLng from "../base/LatLng";

const DataContext = createContext();

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}

export function DataProvider({ children }) {
  const { latlng } = useParams();
  const navigate = useNavigate();

  // Initialize latLng from URL params or use browser location
  const parsedLatLng = latlng ? LatLng.fromString(latlng) : null;
  const [latLng, setLatLng] = useState(parsedLatLng || LatLng.DEFAULT);
  const [initialized, setInitialized] = useState(!!parsedLatLng);
  const [province, setProvince] = useState(null);
  const [provinceGeo, setProvinceGeo] = useState(null);

  useEffect(() => {
    // If no valid latlng from URL, get browser location
    if (!initialized) {
      LatLng.fromBrowserLocation().then((browserLatLng) => {
        setLatLng(browserLatLng);
        navigate(`/${browserLatLng.toString()}`, { replace: true });
        setInitialized(true);
      });
    }
  }, [initialized, navigate]);

  useEffect(() => {
    if (!latLng) return;

    // Find province for the current latLng
    const findProvince = async () => {
      setProvince(null); // Set to null to indicate loading
      const foundProvince = await Province.find(latLng);
      setProvince(foundProvince || undefined); // undefined = not found

      // Load province geometry
      if (foundProvince) {
        const geo = await foundProvince.getGeo();
        setProvinceGeo(geo);
      } else {
        setProvinceGeo(null);
      }
    };

    findProvince();
  }, [latLng]);

  const handleLatLngChange = (newLatLng) => {
    setLatLng(newLatLng);
    navigate(`/${newLatLng.toString()}`, { replace: true });
  };

  const value = {
    latLng,
    province,
    provinceGeo,
    onLatLngChange: handleLatLngChange,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
