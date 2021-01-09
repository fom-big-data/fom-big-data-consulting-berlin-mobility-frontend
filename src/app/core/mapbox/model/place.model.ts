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
  static SPANDAU = new Location(
    'spandau',
    'tbd',
    11.5,
    13.225531,
    52.527586
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
  static CHARLOTTENBURGNORD = new Location(
    'charlottenburg-nord',
    'tbd',
    11.5,
    13.303615,
    52.5459212​
  );

  /** Hellersdorf */
  static MARZAHN_HELLERSDORF = new Location(
    'marzahnhellersdorf',
    'tbd',
    11.5,
    13.593078,
    52.548584
  );

  /* PUNKTE FUER DIE COMMERCIAL und RETAIL HOTSPOTS*/
  static TEC_SIEMENSSTADT = new Location(
    'tec_siemensstadt',
    'tbd',
    11.5,
    13.263056,
    52.540556
  );

  static TEC_ADLERSHOF = new Location(
    'tec_adlershof',
    'tbd',
    11.5,
    13.535324,
    52.431573
  );

  static TEC_HUMBOLDTHAIN = new Location(
    'tec_humboldthain',
    'tbd',
    11.5,
    13.385895,
    52.542607
  );

  static TEC_EUREF = new Location(
    'tec_euref',
    'tbd',
    11.5,
    13.357011,
    52.481595
  );

  static TEC_BORSIGTURM = new Location(
    'tec_borsigturm',
    'tbd',
    11.5,
    13.357011,
    52.481595
  );

  static TEC_MARZAHN = new Location(
    'tec_borsigturm',
    'tbd',
    11.5,
    13.546844,
    52.558557
  );
}
