/**
 * Represents a location
 */
export class Location {

  /**
   * Constructor
   * @param name name
   * @param zoom zoom
   * @param longitude longitude
   * @param latitude latitude
   */
  constructor(public name, public zoom: number, public longitude, public latitude) {
  }
}
