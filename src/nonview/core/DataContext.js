import React, { createContext, useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Province from "./Province";
import District from "./District";
import DSD from "./DSD";
import GND from "./GND";
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
  const [district, setDistrict] = useState(null);
  const [districtGeo, setDistrictGeo] = useState(null);
  const [dsd, setDsd] = useState(null);
  const [dsdGeo, setDsdGeo] = useState(null);
  const [gnd, setGnd] = useState(null);
  const [gndGeo, setGndGeo] = useState(null);

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

    const findRegions = async () => {
      const foundProvince = await Province.find(latLng, null);
      setProvince(foundProvince);

      if (!foundProvince) {
        return;
      }

      const foundDistrict = await District.find(latLng, foundProvince);
      setDistrict(foundDistrict);

      if (foundDistrict) {
        const foundDsd = await DSD.find(latLng, foundDistrict);
        setDsd(foundDsd);

        if (foundDsd) {
          const foundGnd = await GND.find(latLng, foundDsd);
          setGnd(foundGnd);

          if (foundGnd) {
            const geo = await foundGnd.getGeo();
            setGndGeo(geo);
          }
        }

        if (foundDsd) {
          const geo = await foundDsd.getGeo();
          setDsdGeo(geo);
        }
      }

      if (foundProvince) {
        const geo = await foundProvince.getGeo();
        setProvinceGeo(geo);
      }

      if (foundDistrict) {
        const geo = await foundDistrict.getGeo();
        setDistrictGeo(geo);
      }
    };

    findRegions();
  }, [latLng]);

  const handleLatLngChange = (newLatLng) => {
    setLatLng(newLatLng);
    navigate(`/${newLatLng.toString()}`, { replace: true });
  };

  const value = {
    latLng,
    province,
    provinceGeo,
    district,
    districtGeo,
    dsd,
    dsdGeo,
    gnd,
    gndGeo,
    onLatLngChange: handleLatLngChange,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
