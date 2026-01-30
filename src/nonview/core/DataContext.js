import React, { createContext, useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Province from "./Province";
import District from "./District";
import DSD from "./DSD";
import GND from "./GND";
import PD from "./PD";
import LG from "./LG";
import ED from "./ED";
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
  const [gndLegacyData, setGndLegacyData] = useState(null);
  const [pd, setPd] = useState(null);
  const [pdGeo, setPdGeo] = useState(null);
  const [lg, setLg] = useState(null);
  const [ed, setEd] = useState(null);

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

    // Reset all region states before searching
    setProvince(null);
    setProvinceGeo(null);
    setDistrict(null);
    setDistrictGeo(null);
    setDsd(null);
    setDsdGeo(null);
    setGnd(null);
    setGndGeo(null);
    setGndLegacyData(null);
    setPd(null);
    setPdGeo(null);
    setLg(null);
    setEd(null);

    const findRegions = async () => {
      // Province
      const foundProvince = await Province.find(latLng, null);
      if (!foundProvince) {
        return;
      }
      setProvince(foundProvince);
      const provinceGeo = await foundProvince.getGeo();
      setProvinceGeo(provinceGeo);

      // District
      const foundDistrict = await District.find(latLng, foundProvince);
      if (!foundDistrict) {
        return;
      }
      setDistrict(foundDistrict);
      const districtGeo = await foundDistrict.getGeo();
      setDistrictGeo(districtGeo);

      // DSD
      const foundDsd = await DSD.find(latLng, foundDistrict);
      if (!foundDsd) {
        return;
      }
      setDsd(foundDsd);
      const dsdGeo = await foundDsd.getGeo();
      setDsdGeo(dsdGeo);

      // GND
      const foundGnd = await GND.find(latLng, foundDsd);
      if (!foundGnd) {
        return;
      }
      setGnd(foundGnd);
      const gndGeo = await foundGnd.getGeo();
      setGndGeo(gndGeo);

      const gndLegacyData = await foundGnd.getLegacyData();
      if (!gndLegacyData) {
        return;
      }
      setGndLegacyData(gndLegacyData);

      // ED
      const edID = gndLegacyData.ed_id;
      const foundEd = await ED.fromID(edID);
      if (foundEd) {
        setEd(foundEd);
      }

      // PD
      const pdID = gndLegacyData.pd_id;
      const foundPd = await PD.fromID(pdID);
      if (foundPd) {
        setPd(foundPd);
        const pdGeo = await foundPd.getGeo();
        setPdGeo(pdGeo);
      }

      // LG
      const lgID = gndLegacyData.lg_id;
      const foundLg = await LG.fromID(lgID);
      if (foundLg) {
        setLg(foundLg);
      }
    };

    findRegions();
  }, [latLng]);

  const onLatLngChange = (newLatLng) => {
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
    gndLegacyData,
    pd,
    pdGeo,
    lg,
    ed,
    onLatLngChange,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
