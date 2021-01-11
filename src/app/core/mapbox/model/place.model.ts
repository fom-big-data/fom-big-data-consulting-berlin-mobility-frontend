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
    '', 13,
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
    'Gewerbegebiet Gradestraße',
    12.0,
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
  static LANDSBERGER_ALLEE_CLOSE = new Location(
    'landsberger-allee',
    'Gewerbegebiet Landsberger Allee',
    12.5,
    13.511579632759094,
    52.53283375135081
  );

  /** Landsberger Allee */
  static LANDSBERGER_ALLEE = new Location(
    'landsberger-allee',
    'Gewerbegebiet Landsberger Allee',
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
    52.5459212
  );

  /** Hellersdorf */
  static MARZAHN_HELLERSDORF_CLOSER = new Location(
    'marzahnhellersdorf',
    'tbd',
    12.5,
    13.59452260037462,
    52.546943747075595
  );

  /** Hellersdorf */
  static MARZAHN_HELLERSDORF = new Location(
    'marzahnhellersdorf',
    'tbd',
    11.5,
    13.59452260037462,
    52.546943747075595

  );

  /** S Poelchaustraße */
  static S_POELCHAUSTRASSE = new Location(
    's-poelchaustrasse',
    'S Poelchaustraße',
    11.5,
    13.5355019,
    52.5357114
  );

  /** S Springpfuhl */
  static S_SPRINGPFUHL = new Location(
    's-springpfuhl',
    'S Springpfuhl',
    11.5,
    13.5361989,
    52.5256553,
  );

  /** S Landsberger Allee */
  static S_LANDSBERGER_ALLEE = new Location(
    's-landsberger-allee',
    'S Landsberger Allee',
    11.5,
    13.4566444,
    52.5286552
  );

  /** S Storkower Straße */
  static S_STORKOWER_STRASSE = new Location(
    's-storkower-strasse',
    'S Storkower Straße',
    11.5,
    13.4623906,
    52.5236357
  );

  /** S Marzahn */
  static S_MARZAHN = new Location(
    's-marzahn',
    'S Marzahn',
    11.5,
    13.541288892810723,
    52.543613874069685
  );

    /** S Wuhletalstraße */
    static S_WUHLETAL = new Location(
    's-wuhletal',
    'S Wuhletal',
    11.5,
    13.577991920021807,
    52.512607512439565
  );

  /** U Cottbusser */
  static U_COTTBUSSER = new Location(
    'u-cottbusser',
    'U Cottbusser',
    11.5,
    13.59651127229371,
    52.533917147650236
  );

  /** U Magdalenenstraße */
  static U_MAGDALENENSTRASSE = new Location(
    'u-magdalenenstrasse',
    'U Magdalenenstraße',
    11.5,
    13.4873591,
    52.5124398
  );

  /** U Wuhletalstr */
  static U_WUHLETAL = new Location(
    'u-wuhletal',
    'U Wuhletal',
    11.5,
    13.57522325860481,
    52.512871516295945
  );



  /** Tram Zechliner Str. */
  static TRAM_ZECHLINER_STRASSE = new Location(
    'tram-zechliner-rhinstrasse',
    'Zechliner Straße',
    11.5,
    13.4867382,
    52.5338701);
  /** Tram Genslerstr */
  static TRAM_GENSLERSTRASSE = new Location(
    'tram-genslerstrasse',
    'Tram Genslertraße',
    11.5,
    13.4966408,
    52.5343795);
  /** Tram Arendsweg */
  static TRAM_ARENDSWEG = new Location(
    'tram-arendsweg',
    'Tram Arendsweg',
    11.5,
    13.5042978,
    52.5348992);
  /** Tram Landsberger Allee/Rhinstr. */
  static TRAM_LANDSBERGER_ALLEE_RHINSTRASSE = new Location(
    'tram-landsgerber-allee-rhinstrasse',
    'Landsberger Allee/Rhinstraße',
    11.5,
    13.5160151,
    52.535766);
  /** Tram Dingelstädter Str. */
  static TRAM_DINGELSTAEDTER_STRASSE = new Location(
    'tram-dingelstaedter-strasse',
    'Dingelstädter Straße',
    11.5,
    13.524788,
    52.536739);
  /** Tram Marzahner Promenade */
  static TRAM_MARZAHNER_PROMENADE = new Location(
    'tram-marzahner-promenade',
    'Tram Marzahner Promenade',
    11.5,
    13.543595,
    52.542664);
  /** Tram Gewerbepark Georg Knorr */
  static TRAM_GEWERBEPARK_GEORG_KNORR = new Location(
    'tram-gewerbepark-georg-knorr',
    'Tram Gewerbepark Georg Knorr',
    11.5,
    13.5132825,
    52.5342643);

  /** Tram Herzbergstr./Industriepark. */
  static TRAM_HERZBERGSTRASSE_INDUSTRIEPARK = new Location(
    'tram-herzbergstrasse-industriepark',
    'Tram Herzbergstraße /Industriegebiet',
    11.5,
    13.4876626,
    52.5266628);
  /** Tram Herzbergstr./Siegfriedstr. */
  static TRAM_HERZBERGSTRASSE_SIEGFRIEDSTRASSE = new Location(
    'tram-herzbergstrasse-siegfriedstrasse',
    'Tram Herzbergstr./Siegfriedstr.',
    11.5,
    13.4968548,
    52.5263009);
  /** Tram Ev. Krankenhaus KEH */
  static TRAM_EV_KRANKENHAUS_KEH = new Location(
    'tram-ev-krankenhaus-keh',
    'Tram Ev. Krankenhaus KEH',
    11.5,
    13.506036,
    52.5254404);
  /** Tram Allee der Kosmonauten */
  static TRAM_ALLEE_DER_KOSMONAUTEN_ = new Location(
    'tram-beilsteiner-strasse',
    'Tram Allee der Kosmonauten/Rhinstraße',
    11.5,
    13.5179255,
    52.5259323);
  /** Tram Beilsteiner Str. */
  static TRAM_BEILSTEINER_STRASSE = new Location(
    'tram-beilsteiner-strasse',
    'Tram Beilsteiner Straße',
    11.5,
    13.5277358,
    52.5255362);

  /** Tram Reinhardsbrunner Str. */
  static TRAM_REINHARDSBRUNNER_STRASSE = new Location(
    'tram-reinhardsbrunner-strasse',
    'Tram Reinhardsbrunner Straße',
    11.5,
    13.5011757,
    52.5286168);
  /** Tram Meeraner Str. */
  static TRAM_MEERANER_STRASSE = new Location(
    'tram-meeraner-strasse',
    'Tram Meeraner Straße',
    11.5,
    13.517137,
    52.5293831);
  /** Tram Kleingartenablage Bielefeldt */
  static TRAM_KLEINGARTENANLAGE_BIELEFELDT = new Location(
    'tram-kleingartenanlage-bielefeldt',
    'Tram Kleingartenanlage Bielefeldt',
    11.5,
    13.5170745,
    52.5188969);

    /** Tram Kleingartenablage Bielefeldt */
  static TRAM_AHRENSFELDE = new Location(
    'tram-ahrensfelde',
    'Tram Ahrensfelde',
    11.5,
    13.574762,
    52.572830);

  static TRAM_HELLERSDORF_U = new Location(
    'tram-hellersdorf-u',
    'Tram Hellersdorf U-Bahnhof',
    11.5,
    13.605391,
    52.536320);

  static TRAM_STENDALER = new Location(
    'tram-stendaler',
    'Tram Stendaler',
    11.5,
    13.604378283658102,
    52.53932077992437);

  static TRAM_STENDALERZOSSENER = new Location(
    'tram-stendalerzossener',
    'Tram Stendalerzossener',
    11.5,
    13.603463340326858,
    52.543775568848446);

  static TRAM_ZOSSENER = new Location(
    'tram-zossener',
    'Tram Zossener',
    11.5,
    13.598828498921185,
    52.54394085869042);


  static TRAM_ALTEHELLERSDORFER = new Location(
    'tram-altehellersdorfer',
    'Tram Alte-Hellersdorfer',
    11.5,
    13.592182865509304,
    52.544933070709305);

  static TRAM_MICHENDORFER = new Location(
    'tram-michendorfer',
    'Tram Michendorfer',
    11.5,
    13.586852965519604,
    52.5456741659942);

  static TRAM_LANDSBERGERZOSSENER = new Location(
    'tram-landsbergerzossener',
    'Tram Landsberger Allee / Zossener Str.',
    11.5,
    13.587103,
    52.548822);

  static TRAM_BETRIEBSBAHNHOFMARZAHN = new Location(
    'tram-betriebsbahnhofmarzahn',
    'Tram Betriebsbahnhof Marzahn',
    11.5,
    13.581988,
    52.548871);

  static TRAM_BRODOWIENERRING = new Location(
    'tram-brodowienerring',
    'Tram Brodowiener Ring',
    11.5,
    13.578159789319885,
    52.54789287493665);


  static TRAM_LANDSBERGERBLUMBERGER = new Location(
    'tram-landsbergerblumberger',
    'Tram Landberger Allee / Blumberger Damm',
    11.5,
    13.572618345542136,
    52.54640859789009);

  /* PUNKTE FUER DIE COMMERCIAL und RETAIL HOTSPOTS*/
  /* SIEMENSSTADT*/
  static TEC_SIEMENSSTADT = new Location(
    'tec_siemensstadt',
    'Siemensstadt - Gewerbe und Technologie',
    11.5,
    13.263056,
    52.540556
  );
  /* ADLERSHOF */
  static TEC_ADLERSHOF = new Location(
    'tec_adlershof',
    'Adlershof "science at work" - Technoligie und Wissenschaftspark ',
    11.5,
    13.535324,
    52.431573
  );
  /* HUMBOLDTHAIN */
  static TEC_HUMBOLDTHAIN = new Location(
    'tec_humboldthain',
    'Humboldthain - Gewerbe Technologie und Gründerzentrum ',
    11.5,
    13.385895,
    52.542607
  );
  /* KATHIS CAMPUS .. EUREF*/
  static TEC_EUREF = new Location(
    'tec_euref',
    'EUREF - Technologie und Gewerbepark',
    11.5,
    13.357011,
    52.481595
  );
  /* BORSIGTURM*/
  static TEC_BORSIGTURM = new Location(
    'tec_borsigturm',
    'Borsigturm - Gewerbe, Technologie und Gründerzentrum ',
    11.5,
    13.282722,
    52.581781
  );

  /* MARZAHN GEWERBEPARK */
  static TEC_MARZAHN = new Location(
    'tec_marzahn',
    'ECONOPARK - Gewerbe und Innovationspark',
    11.5,
    13.546844,
    52.558557
  );
  /* CAMPUS HTW */
  static TEC_HTW = new Location(
    'tec_htw',
    'Campus Adlershof - Wissenschafts und Gründerzentrum',
    11.5,
    13.526841,
    52.458344
  );
  /* MARIENDORF */
  static TEC_MARIENDORF = new Location(
    'tec_mariendorf',
    'Mariendorf - Gewerbe und Technologiepark',
    11.5,
    13.374298,
    52.438594
  );


  static BUS_GERADESTRASSE = new Location(
    'bus-geradestrasse',
    'Bus Geradestraße 91',
    11.5,
    13.423071,
    52.452285
  );

  static BUS_EINTRAGSIEDLUNG = new Location(
    'bus-eintrachtsiedlung',
    'Bus Eintrachtsiedlung',
    11.5,
    13.430639,
    52.454333
  );

  static BUS_KLAUSDORFER = new Location(
    'bus-klausdorfer',
    'Bus Klausdorfer',
    11.5,
    13.592834211826112,
    52.54802735119252
  );

  static BUS_TEUPITZER = new Location(
    'bus-teupitzer',
    'Bus Teupitzer Str.',
    11.5,
    13.59959286424824,
    52.54738421405889
  );

  static BUS_LANDSBERGERZOSSENER = new Location(
    'bus-landsbergerzossener',
    'Bus Landsberger Chaussee/Zossener Str. ',
    11.5,
    13.587965102633826,
    52.54923683160367
  );

  static U_BLASCHKOALLEE = new Location(
    'u-blaschkoallee',
    'U Blaschkoallee',
    11.5,
    13.448983,
    52.4527097
  );

  static U_ULLSTEINSTRASSE = new Location(
    'u-ullsteinstrasse',
    'U Ullsteinstraße',
    11.5,
    13.384133,
    52.452835
  );

  static U_HELLERSDORF = new Location(
    'u-hellersdorf',
    'U Hellersdorf',
    11.5,
    13.606054,
    52.536493);



  static S_HERMANNSTRASSE = new Location(
    's-hermannstrasse',
    'S+U Hermannstraße',
    11.5,
    13.4314,
    52.4674003
  );





}
