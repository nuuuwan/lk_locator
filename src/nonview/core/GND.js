import AbstractRegion from "./AbstractRegion";
import WWW from "../base/WWW";

export default class GND extends AbstractRegion {
  static get regionName() {
    return "Grama Niladhari Division";
  }

  static get regionShortName() {
    return "GND";
  }

  async getLegacyData() {
    const idx = await this.constructor.idxLegacy();
    return idx[this.id] || null;
  }

  static async idxLegacy() {
    const url =
      "https://raw.githubusercontent.com" +
      "/nuuuwan/gig-data/refs/heads/master/ents/gnd.tsv";

    const data = await WWW.fetchTSV(url);
    const idx = Object.fromEntries(data.map((d) => [d.gnd_id, d]));
    return idx;
  }

  get edID() {
    return this.rawData["ed_id"];
  }

  get pdID() {
    return this.rawData["pd_id"];
  }

  get lgID() {
    return this.rawData["lg_id"];
  }

  get num() {
    return this.rawData["num"];
  }
}
