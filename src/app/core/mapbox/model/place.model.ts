import {Location} from './location.model';

/**
 * Stores places
 */
export class Place {

  /** Brandenburg Gate */
  static BRANDENBURG_GATE = new Location('Brandenburger Tor', 14, 13.377777777778, 52.516388888889);
  /** Brandenburg Gate S+U Bahn station */
  static BRANDENBURG_GATE_STATION = new Location('S+U Brandenburger Tor', 14, 13.380833333333, 52.516388888889);
  /** Zoologischer Garten S+U Bahn station */
  static ZOOLOGISCHER_GARTEN_STATION = new Location('S+U Zoologischer Garten', 14, 13.3325, 52.507222);
}
