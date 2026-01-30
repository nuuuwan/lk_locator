export default class Nominatim {
  static async reverseGeocode(latLng) {
    if (!latLng) {
      return null;
    }

    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latLng.lat}&lon=${latLng.lng}&zoom=18&addressdetails=1`;
      const response = await fetch(url, {
        headers: {
          "User-Agent": "lk_locator/1.0",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch location data");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Nominatim error:", err);
      return null;
    }
  }
}
