/**
 * Represents a location
 */
export class Location {

  /**
   * Constructor
   * @param name name
   * @param description description
   * @param zoom zoom
   * @param longitude longitude
   * @param latitude latitude
   */
  constructor(public name, public description, public zoom: number, public longitude, public latitude) {
  }
}
