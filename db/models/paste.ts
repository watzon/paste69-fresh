import { DataTypes, Model } from "denodb/mod.ts";

export default class Paste extends Model {
  static table = "pastes";
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, type: DataTypes.STRING },
    contents: DataTypes.TEXT,
    views: DataTypes.INTEGER,
  };

  static defaults = {
    // Random 8 character string
    id: () => Math.random().toString(36).substring(2, 10),
    views: 0,
  };
}
