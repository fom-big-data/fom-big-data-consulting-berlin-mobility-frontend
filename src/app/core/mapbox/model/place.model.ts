import {Location} from './location.model';

/**
 * Stores places
 */
export class Place {

  /** Brandenburg Gate */
  static BRANDENBURG_GATE = new Location(
    'Brandenburger Tor',
    '',
    11,
    13.377777777778,
    52.516388888889
  );

  static ZIP_10623_CHARLOTTENBURG = new Location(
    'charlottenburg',
    '10623 Charlottenburg',
    11,
    13.3189848,
    52.5086571
  );

  static ZIP_12107_BUCKOW_LICHTENRADE_MARIENDORF_MARIENFELDE_TEMPELHOF = new Location(
    'buckow-lichtenrade-mariendorf-marienfelde-tempelhof',
    '12107 Buckow-Lichtenrade-Mariendorf-Marienfelde-Tempelhof',
    11,
    13.3511922,
    52.4308308
  );

  static ZIP_12623_KAULSDORF_MAHLSDORF = new Location(
    'kaulsdorf-mahlsdorf',
    '12623 Kaulsdorf-Mahlsdorf',
    11,
    13.5863998,
    52.5005195
  );

  /** FOM */
  static FOM = new Location(
    'FOM',
    '', 14,
    13.3161495,
    52.5119408
  );

  /** Spreepark */
  static SPREEPARK = new Location(
    'spreepark',
    'Der Spreepark Berlin war ein Vergnügungspark im Norden des Plänterwaldes im Berliner Bezirk Treptow-Köpenick.',
    11.5,
    13.4934365,
    52.4825675
  );

  /** Tierpark */
  static TIERPARK = new Location(
    'tierpark',
    'Der Tierpark Berlin ist einer der beiden Zoologischen Gärten in Berlin.',
    11.5,
    13.5313559,
    52.5023038
  );

  /** Tegel */
  static TEGEL = new Location(
    'tegel',
    'Der Flughafen Berlin-Tegel „Otto Lilienthal“ war bis zum 8. November 2020 ein internationaler Verkehrsflughafen in Berlin-Tegel.',
    11.5,
    13.301036953926086,
    52.54451612539228
  );

  /** Gewerbegebiet Britz */
  static GEWERBEGEBIET_BRITZ = new Location(
    'gewerbegebiet-britz',
    'tbd',
    11.5,
    13.41184437274933,
    52.45105343499185
  );

  /** Siemensstadt */
  static SIEMENSSTADT = new Location(
    'siemensstadt',
    'tbd',
    11.5,
    13.22347283363342,
    52.53282722492756
  );

  /** Landsberger Allee */
  static LANDSBERGER_ALLEE = new Location(
    'landsberger-allee',
    'tbd',
    11.5,
    13.511579632759094,
    52.53283375135081
  );

  /** Westhafen */
  static WESTHAFEN = new Location(
    'westhafen',
    'tbd',
    11.5,
    13.334285616874695,
    52.54061908347808
  );

  /** Hellersdorf */
  static MARZAHN_HELLERSDORF = new Location(
    'marzahnhellersdorf',
    'tbd',
    11.5,
    13.593078,
    52.548584
  );
}
