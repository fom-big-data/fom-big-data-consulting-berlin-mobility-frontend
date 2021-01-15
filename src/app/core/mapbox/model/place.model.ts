import {Location} from './location.model';

/**
 * Stores places
 */
export class Place {

  /** Brandenburg Gate */
  static BRANDENBURG_GATE = new Location('Brandenburger Tor', '', 13.377777777778, 52.516388888889);
  /** Spreepark */
  static SPREEPARK = new Location('spreepark', 'Der Spreepark Berlin war ein Vergnügungspark im Norden des Plänterwaldes im Berliner Bezirk Treptow-Köpenick.', 13.4934365, 52.4825675);
  /** Tierpark */
  static TIERPARK = new Location(
    'tierpark', 'Der Tierpark Berlin ist einer der beiden Zoologischen Gärten in Berlin.', 13.5313559, 52.5023038);

  //
  // Understanding
  //

  // Lebensraeume

  /** Area Charlottenburg */
  static HABITAT_CHARLOTTENBURG = new Location('habitat-charlottenburg', '10623 Charlottenburg', 13.3189848, 52.5086571);
  /** Area Buckow-Lichtenrade-Mariendorf-Marienfelde-Tempelhof */
  static HABITAT_BUCKOW_LICHTENRADE_MARIENDORF_MARIENFELDE_TEMPELHOF = new Location('habitat-buckow-lichtenrade-mariendorf-marienfelde-tempelhof', '12107 Buckow-Lichtenrade-Mariendorf-Marienfelde-Tempelhof', 13.3511922, 52.4308308);
  /** Area Kaulsdorf-Mahlsdorf */
  static HABITAT_KAULSDORF_MAHLSDORF = new Location('habitat-kaulsdorf-mahlsdorf', '12623 Kaulsdorf-Mahlsdorf', 13.5863998, 52.5005195);

  // Arbeitsraeume

  /* Siemensstadt*/
  static WORKING_SPACE_SIEMENSSTADT = new Location(
    'working-space-siemensstadt', 'Siemensstadt - Gewerbe und Technologie', 13.263056, 52.540556);
  /* Adlershof */
  static WORKING_SPACE_ADLERSHOF = new Location(
    'working-space-adlershof', 'Adlershof "science at work" - Technoligie und Wissenschaftspark ',
    13.535324, 52.431573);
  /* Humboldthain */
  static WORKING_SPACE_HUMBOLDTHAIN = new Location(
    'working-space-humboldthain', 'Humboldthain - Gewerbe Technologie und Gründerzentrum ',
    13.385895, 52.542607);
  /* KATHIS CAMPUS .. EUREF */
  static WORKING_SPACE_EUREF = new Location(
    'working-space-euref', 'EUREF - Technologie und Gewerbepark', 13.357011, 52.481595);
  /* Borsigturm */
  static WORKING_SPACE_BORSIGTURM = new Location(
    'working-space-borsigturm', 'Borsigturm - Gewerbe, Technologie und Gründerzentrum ', 13.282722, 52.581781);
  /* Marzahn Gewerbepark */
  static WORKING_SPACE_MARZAHN = new Location(
    'working-space-marzahn', 'ECONOPARK - Gewerbe und Innovationspark', 13.546844, 52.558557);

  static WORKING_SPACE_MARZAHN_HARRY = new Location(
     'working-space-marzahn-harry', 'Harry', 13.548192922913174, 52.55513177643416);
  static WORKING_SPACE_MARZAHN_COLA = new Location(
      'working-space-marzahn-cola', 'Coca Cola', 13.5401520290791, 52.566204694518305 );
  static WORKING_SPACE_MARZAHN_WUERTH = new Location(
      'working-space-marzahn-wuerth', 'Würth', 13.543296423175628, 52.55425058250681);

  /* Campus HTW */
  static WORKING_SPACE_HTW = new Location(
    'working-space-htw', 'Campus Adlershof - Wissenschafts und Gründerzentrum', 13.526841, 52.458344);
  /* Mariendorf */
  static WORKING_SPACE_MARIENDORF = new Location(
    'working-space-mariendorf', 'Mariendorf - Gewerbe und Technologiepark', 13.374298, 52.438594);

  //
  // Visibility
  //

  /** FOM */
  static VISIBILITY_FOM = new Location('visibility-fom', 'FOM', 13.3161495, 52.5119408, 13);
  /** Zoologischer Garten */
  static VISIBILITY_ZOOLOGISCHER_GARTEN = new Location('visibility-zoologischer-garten', 'Zoologischer Garten', 13.3323673, 52.5073337);
  /** Siegessaeule */
  static VISIBILITY_SIEGESSAEULE = new Location('visibility-siegessaeule', 'Siegessäule', 13.3501189, 52.5145434);

  //
  // Problems
  //

  // Auto

  /** Auto Franzoesisch Buchholz */
  static AUTO_FRANZOESISCH_BUCHHOLZ = new Location('auto-franzoesisch-buchholz', 'Französisch Buchholz', 13.4054556, 52.6113215);
  /** Auto Kladow */
  static AUTO_KLADOW = new Location('auto-kladow', 'Kladow', 13.1129395, 52.4625043);
  /** Auto Charlottenburg */
  static AUTO_CHARLOTTENBURG = new Location('auto-charlottenburg', 'Charlottenburg', 13.3189848, 52.5086571);

  // S-Bahn

  /** Gesundbrunnen */
  static LIGHT_RAIL_GESUNDBRUNNEN = new Location('light-rail-gesundbrunnen', 'Gesundbrunnen', 13.3671742, 52.5503968);
  /** S Friedrichsstrasse */
  static LIGHT_RAIL_FRIEDRICHSTRASSE = new Location('light-rail-friedrichstrasse', 'Friedrichstraße', 13.3869776, 52.5202894);
  /** S Ostkreuz */
  static LIGHT_RAIL_OSTKREUZ = new Location('light-rail-ostkreuz', 'Ostkreuz', 13.4693263, 52.5031531);
  /** Neukoelln */
  static LIGHT_RAIL_NEUKOELLN = new Location('light-rail-neukoelln', 'Neukölln', 13.436502, 52.46909);
  /** Charlottenburg Nord */
  static LIGHT_RAIL_CHARLOTTENBURG_NORD = new Location('light-rail-charlottenburg-nord', 'Charlottenburg Nord', 13.303615, 52.5459212);
  /** Weissensee */
  static LIGHT_RAIL_WEISSENSEE = new Location('light-rail-weissensee', 'Weißensee', 13.4475312, 52.5506711);

  // U-Bahn

  /** Friedrichshain */
  static SUBWAY_FRIEDRICHSHAIN = new Location('subway-friedrichshain', 'Friedrichshain', 13.4207508, 52.5085327);
  /** Mitte */
  static SUBWAY_MITTE = new Location('subway-mitte', 'Mitte', 13.2954024, 52.533177);
  /** Charlottenburg-Wilmersdorf */
  static SUBWAY_CHARLOTTENBURG_WILMERSDORF = new Location(
    'subway-charlottenburg-wilmersdorf', 'Charlottenburg-Wilmersdorf', 13.1938725, 52.5079568);

  /** Steglitz Zehlendorf */
  static SUBWAY_STEGLITZ_ZEHLENDORF = new Location('subway-steglitz-zehlendorf', 'Steglitz-Zehlendorf', 13.2404481, 52.4449916);
  /** Spandau */
  static SUBWAY_SPANDAU = new Location('subway-spandau', 'Spandau', 13.1256895, 52.5192793);
  /** Weissensee */
  static SUBWAY_WEISSENSEE = new Location('subway-weissensee', 'Weißensee', 13.4475312, 52.5506711);
  /** Hönow */
  static SUBWAY_HOENOW = new Location('subway-hoenow', 'Hönow', 13.6321753, 52.5381537);

  // Intermodal

  /**  Gesundbrunnen */
  static INTERMODAL_GESUNDBRUNNEN = new Location('intermodal-gesundbrunnen', 'Gesundbrunnen', 13.3671742, 52.5503968);
  /**  Arnimkiez */
  static INTERMODAL_ARNIMKIEZ = new Location('intermodal-arnimkiez', 'Arnimkiez', 13.4014224, 52.5511111);
  /**  Torstrasse */
  static INTERMODAL_TORSTRASSE = new Location('intermodal-torstrasse', 'Torstraße', 13.3848972, 52.5265118);
  /**  Potsdamer PLatz */
  static INTERMODAL_POSTDAMER_PLATZ = new Location('intermodal-potsdamer-platz', 'Potsdamer Platz', 13.3759441, 52.5096488);
  /**  Ostkreuz */
  static INTERMODAL_OSTKREUZ = new Location('intermodal-ostkreuz', 'Ostkreuz', 13.4693263, 52.5031531);
  /**  Baumschulenweg */
  static INTERMODAL_BAUMSCHULENWEG = new Location('intermodal-baumschulenweg', 'Baumschulenweg', 13.4875787, 52.4676707);
  /**  Neukoelln */
  static INTERMODAL_NEUKOELLN = new Location('intermodal-neukoelln', 'Neukölln', 13.436502, 52.469093);

  /**  Kladow */
  static INTERMODAL_KLADOW = new Location('intermodal-kladow', 'Kladow', 13.1129395, 52.4625043);
  /**  Mueggelheim */
  static INTERMODAL_MUEGGELHEIM = new Location('intermodal-mueggelheim', 'Müggelheim', 13.6500662, 52.4052779);
  /**  Franzoesisch Buchholz */
  static INTERMODAL_FRANZOESISCH_BUCHHOLZ = new Location(
    'intermodal-franzoesisch-buchholz', 'Französisch Buchholz', 13.4054556, 52.6113215);
  /**  Moabit */
  static INTERMODAL_MOABIT = new Location('intermodal-moabit', 'Moabit', 13.3250589, 52.5290551);
  /**  Graefekiez */
  static INTERMODAL_GRAEFEKIEZ = new Location('intermodal-graefekiez', 'Gräfekiez', 13.4145386, 52.4916955);
  /**  Alt Hohenschoenhausen */
  static INTERMODAL_ALT_HOHENSCHOENHAUSEN = new Location(
    'intermodal-alt-hohenschoenhausen', 'Alt Hohenschönhausen', 13.4820985, 52.5486436);

  //
  // Whitespots
  //

  // Spandau

  /** Persona Ben */
  static WHITESPOT_PERSONA_BEN = new Location(
    'whitespot-persona-ben', 'Ben Bäcker', 13.3671742, 52.5503968);
  /** Polizeiakademie */
  static WHITESPOT_PERSONA_BEN_TARGET = new Location('whitespot-persona-ben-target', 'Polizeiakademie', 13.2251673, 52.5261955, 12.5);
  /** Polizeiakademie */
  static WHITESPOT_POLIZEIAKADEMIE = new Location('whitespot-polizeiakademie', 'Polizeiakademie', 13.2251673, 52.5261955, 12.5);
  /** Siemensstadt */
  static WHITESPOT_SPANDAU = new Location('whitespot-spandau', 'Spandau', 13.225531, 52.527586);

  // Charlottenburg Nord


  /** Persona Peter */
  static WHITESPOT_PERSONA_PETER = new Location(
    'whitespot-persona-peter', 'Peter Peters', 13.303615, 52.5459212);
  /** Hauptbahnhof */
  static WHITESPOT_PERSONA_PETER_TARGET = new Location('whitespot-persona-peter-target', 'Hauptbahnhof', 13.3606472, 52.5250966);


  /** Whitespot charlottenburg */
  static WHITESPOT_CHARLOTTENBURG_NORD = new Location('whitespot-charlottenburg-nord', 'Charlottenburg Nord', 13.310465698608695, 52.543342208865575, 12.8);
  static WHITESPOT_TXL = new Location('whitespot-txl', 'TXL', 13.296066363610175, 52.55027531560123, 12.8);

  // Gewerbegebiet Gradestrasse

  /** Persona Tim */
  static WHITESPOT_PERSONA_TIM = new Location(
    'whitespot-persona-tim', 'Tim ', 13.3213383, 52.4798632);
  /** Gewerbegebiet Gradestrasse */
  static WHITESPOT_PERSONA_TIM_TARGET = new Location(
    'whitespot-persona-tim-target', 'Gewerbegebiet Gradestraße', 13.41184437274933, 52.45105343499185, 12.0);
  /** Gewerbegebiet Gradestrasse */
  static WHITESPOT_GEWERBEGEBIET_GRADESTRASSE = new Location(
    'whitespot-gewerbegebiet-gradestrasse', 'Gewerbegebiet Gradestraße', 13.41184437274933, 52.45105343499185, 12.0);

  // Gewerbegebiet Landsberger Allee

  /** Persona Hanna */
  static WHITESPOT_PERSONA_HANNA = new Location(
    'whitespot-persona-hanna', 'Hanna Habicht', 13.3440572, 52.5362224, 12.5);
  static WHITESPOT_PERSONA_HANNA_TARGET = new Location(
    'whitespot-persona-hanna-target', 'Gewerbegebiet Landsberger Allee', 13.511579632759094, 52.53283375135081, 12.5);
  /** Landsberger Allee */
  static WHITESPOT_LANDSBERGER_ALLEE_CLOSE = new Location(
    'whitespot-landsberger-allee-close', 'Gewerbegebiet Landsberger Allee', 13.511579632759094, 52.53283375135081, 12.5);
  /** Landsberger Allee */
  static WHITESPOT_LANDSBERGER_ALLEE = new Location(
    'whitespot-landsberger-allee', 'Gewerbegebiet Landsberger Allee', 13.511579632759094, 52.53283375135081);

  // Gewerbegebiet Marzahn-Hellersdorf

  /** Persona Birgit */
  static WHITESPOT_PERSONA_BIRGIT = new Location(
    'whitespot-persona-birgit', 'Birgit Bohne', 13.59452260037462, 52.546943747075595, 11.5);
  /** Marzahn-Hellersdorf */
  static WHITESPOT_MARZAHN_HELLERSDORF_CLOSER = new Location(
    'whitespot-marzahn-hellersdorf-closer', 'Marzahn-Hellersdorf', 13.59452260037462, 52.546943747075595, 12.5);
  /** Marzahn-Hellersdorf */
  static WHITESPOT_MARZAHN_HELLERSDORF = new Location(
    'whitespot-marzahn-hellersdorf', 'Marzahn-Hellersdorf', 13.59452260037462, 52.546943747075595);

  static WHITESPOT_PERSONA_BIRGIT_TARGET = new Location(
     'whitespot-persona-birgit-target', 'Gärten der Welt', 13.57286916853386, 52.53846946086898);

  static WHITESPOT_PERSONA_BIRGIT_WOHN = new Location(
      'whitespot-persona-birgit-wohn', 'Birgit Bohne', 13.59452260037462, 52.546943747075595, 14.0);

  static WHITESPOT_PERSONA_BIRGIT_DRK = new Location(
      'whitespot-persona-birgit-drk', 'Deutsche Rote Kreuz e.V.', 13.558501031950275, 52.554278450261236);

  static WHITESPOT_PERSONA_BIRGIT_KLUB74 = new Location(
      'whitespot-persona-birgit-klub74', 'Nachbarschafthilfe Klub 74 e.V.', 13.595416869561534, 52.522847169685264);

  static WHITESPOT_PERSONA_BIRGIT_ALTMARZAHN = new Location(
      'whitespot-persona-birgit-altmarzahn', 'Alt Marzahner Dorf', 13.562854041532109, 52.54352213467471);

  //
  // Bus
  //

  /** Bus station Gradestrasse */
  static BUS_GRADESTRASSE = new Location(
    'bus-gradestrasse', 'Bus Gradestraße 91', 13.423071, 52.452285);
  /** Bus station Eintragsiedlung */
  static BUS_EINTRAGSIEDLUNG = new Location(
    'bus-eintrachtsiedlung', 'Bus Eintrachtsiedlung', 13.430639, 52.454333);
  /** Bus station Kalsudorfer */
  static BUS_KLAUSDORFER = new Location(
    'bus-klausdorfer', 'Bus Klausdorfer', 13.592834211826112, 52.54802735119252);
  /** Bus station Teupitzer Strasse */
  static BUS_TEUPITZER = new Location(
    'bus-teupitzer', 'Bus Teupitzer Str.', 13.59959286424824, 52.54738421405889);
  /** Bus station Landsberger Strasse / Zossener Strasse */
  static BUS_LANDSBERGERZOSSENER = new Location(
    'bus-landsbergerzossener', 'Bus Landsberger Chaussee/Zossener Str. ', 13.587965102633826, 52.54923683160367);

  static BUS_ALTEHELLERSDORFER = new Location(
     'bus-altehellersdorfer', 'Bus Alte-Hellersdorfer', 13.59222729530772, 52.54504439880684);
//Spandau Bus
  static BUS_FREIHEIT = new Location('bus-freiheit', 'Freiheit 16-34', 13.22333603718653, 52.531232222346034);

  static BUS_RUHLEBEN = new Location('bus-ruhleben', 'Ruhleben Güterbahnhof', 13.223893936667837, 52.52901310165168);

  static BUS_TELTOWER_STR = new Location('bus-teltower', 'Teltower Str.', 13.214452560830292, 52.527394378184354);

  static BUS_STRESOW = new Location('bus-stresow', 'Stresowplatz', 13.534182173918694, 52.208444412595366);

  static BUS_RUHLEBEN2 = new Location('bus-ruhleben2', 'Ruhlebener Str./Grunewaldstr.', 13.204710777671, 52.531049475502634);

  static BUS_WERKRING = new Location('bus-werkring', 'Werkring', 13.240158852340576, 52.52937861163229);

// TXL Busse
  static BUS_FRIEDRICH_OLBERT = new Location('bus-friedrich', 'Friedrich-Olbricht-Damm/Saatwinkler Damm', 13.31272741869019, 52.54791491442076);

  static BUS_BUCHHOLZWEG = new Location('bus-buchholzweg', 'Buchholzweg', 13.318590196866316, 52.54700947215529);

  static BUS_STIEFRING = new Location('bus-stiefring', 'Stiefring', 13.31263435871914, 52.54545319961817);

  static BUS_PLOETZENSEE = new Location('bus-ploetzensee', 'Gedenkstätte Plötzensee', 13.324127265143765, 52.54222729536093);

  static BUS_SEESTRASSE = new Location('bus-seestrasse', 'Seestr. / Beusselstr.', 13.326378185024835, 52.538373966380085);

  static BUS_THATER = new Location('bus-thater', 'Thaters Privatweg', 13.310349976007355, 52.53963937037642);

  static BUS_WIRMER = new Location('bus-wirmer', 'Wirmerzeile', 13.302974090206936, 52.537237451913825);

  static BUS_GLOEDE = new Location('bus-gloede', 'Gloedenpfad', 13.302451903601597, 52.53977832031618);

  static BUS_REICHWEIN = new Location('bus-reichwein', 'Reichweindamm', 13.300656887145744, 52.53608607250622);

  static BUS_GOERDELER = new Location('bus-goerdeler', 'Goerdelerdamm', 13.29801331745621, 52.53529200015053);

  static BUS_HINCKELDEY = new Location('bus-hinckeldey', 'Hinckeldeybrücke', 13.300330520546476, 52.547003111217045);

  static BUS_WELTLINGER = new Location('bus-weltlinger', 'Weltlingerbrücke', 13.300330520546476, 52.547003111217045);







  //
  // S-Bahn
  //

  /** S-Bahn station Hermannstrasse */
  static S_HERMANNSTRASSE = new Location('s-hermannstrasse', 'S+U Hermannstraße', 13.4314, 52.4674003);
  /** S-Bahn station Poelchaustraße */
  static S_POELCHAUSTRASSE = new Location('s-poelchaustrasse', 'S Poelchaustraße', 13.5355019, 52.5357114);
  /** S-Bahn station Springpfuhl */
  static S_SPRINGPFUHL = new Location('s-springpfuhl', 'S Springpfuhl', 13.5361989, 52.5256553);
  /** S-Bahn station Landsberger Allee */
  static S_LANDSBERGER_ALLEE = new Location('s-landsberger-allee', 'S Landsberger Allee', 13.4566444, 52.5286552);
  /** S-Bahn station Storkower Straße */
  static S_STORKOWER_STRASSE = new Location('s-storkower-strasse', 'S Storkower Straße', 13.4623906, 52.5236357);
  /** S-Bahn station Marzahn */
  static S_MARZAHN = new Location('s-marzahn', 'S Marzahn', 13.541288892810723, 52.543613874069685);
  /** S-Bahn station Wuhletalstraße */
  static S_WUHLETAL = new Location('s-wuhletal', 'S Wuhletal', 13.577991920021807, 52.512607512439565);
  /** Bahn station Stresow */
  static S_STRESOW = new Location('s-stresow', 'S Stresow', 13.2012605, 52.5324273);
  /** Beusselstrasse */
  static S_BEUSSELSTRASSE = new Location('s-beusselstrasse', 'S Beusselstraße', 13.3287218, 52.5343357);
  /** Pichelsdorf */
  static S_PICHELSDORF = new Location('s-pichelsdorf', 'S Pichelsdorf', 13.228805059040575, 52.51048444416288);
  /** Pichelsdorf */
  static S_SPANDAU = new Location('s-spandau', 'S Spandau', 13.19805413688166, 52.534679412475896);

  //
  // U-Bahn
  //

  /** U-Bahn station Blaschkoallee */
  static U_BLASCHKOALLEE = new Location('u-blaschkoallee', 'U Blaschkoallee', 13.448983, 52.4527097);
  /** U-Bahn station Ullsteinstrasse */
  static U_ULLSTEINSTRASSE = new Location('u-ullsteinstrasse', 'U Ullsteinstraße', 13.384133, 52.452835);
  /** U-Bahn station Hellersdorf */
  static U_HELLERSDORF = new Location('u-hellersdorf', 'U Hellersdorf', 13.606054, 52.536493);
  /** U Cottbusser */
  static U_COTTBUSSER = new Location('u-cottbusser', 'U Cottbusser', 13.59651127229371, 52.533917147650236);
  /** U Magdalenenstraße */
  static U_MAGDALENENSTRASSE = new Location('u-magdalenenstrasse', 'U Magdalenenstraße', 13.4873591, 52.5124398);
  /** U Wuhletalstr */
  static U_WUHLETAL = new Location('u-wuhletal', 'U Wuhletal', 13.57522325860481, 52.512871516295945);
  /** U Ruhleben */
  static U_RUHLEBEN = new Location('u-ruhleben', 'U Ruhleben', 13.2390313, 52.525648);
  /** Jakob-Kaiser-Platz */
  static U_JAKOB_KAISER_PLATZ = new Location('u-jakob-kaiser-platz', 'U Jakob-Kaiser-Platz', 13.2918199, 52.5364933);
  /** Jakob-Kaiser-Platz */
  static U_HALEMWEG = new Location('u-halemweg', 'U Halemweg', 13.286051345326404, 52.536625161329795);


  //
  // Tram
  //

  /** Tram station Zechliner Str. */
  static TRAM_ZECHLINER_STRASSE = new Location('tram-zechliner-rhinstrasse', 'Zechliner Straße', 13.4867382, 52.5338701);
  /** Tram station Genslerstr */
  static TRAM_GENSLERSTRASSE = new Location('tram-genslerstrasse', 'Tram Genslertraße', 13.4966408, 52.5343795);
  /** Tram station Arendsweg */
  static TRAM_ARENDSWEG = new Location('tram-arendsweg', 'Tram Arendsweg', 13.5042978, 52.5348992);
  /** Tram station Landsberger Allee/Rhinstr. */
  static TRAM_LANDSBERGER_ALLEE_RHINSTRASSE = new Location(
    'tram-landsgerber-allee-rhinstrasse', 'Landsberger Allee/Rhinstraße', 13.5160151, 52.535766);
  /** Tram station Dingelstädter Str. */
  static TRAM_DINGELSTAEDTER_STRASSE = new Location('tram-dingelstaedter-strasse', 'Dingelstädter Straße', 13.524788, 52.536739);
  /** Tram station Marzahner Promenade */
  static TRAM_MARZAHNER_PROMENADE = new Location('tram-marzahner-promenade', 'Tram Marzahner Promenade', 13.543595, 52.542664);
  /** Tram station Gewerbepark Georg Knorr */
  static TRAM_GEWERBEPARK_GEORG_KNORR = new Location(
    'tram-gewerbepark-georg-knorr', 'Tram Gewerbepark Georg Knorr', 13.5132825, 52.5342643);
  /** Tram station Herzbergstr./Industriepark. */
  static TRAM_HERZBERGSTRASSE_INDUSTRIEPARK = new Location(
    'tram-herzbergstrasse-industriepark', 'Tram Herzbergstraße /Industriegebiet', 13.4876626, 52.5266628);
  /** Tram station Herzbergstr./Siegfriedstr. */
  static TRAM_HERZBERGSTRASSE_SIEGFRIEDSTRASSE = new Location(
    'tram-herzbergstrasse-siegfriedstrasse', 'Tram Herzbergstr./Siegfriedstr.', 13.4968548, 52.5263009);
  /** Tram station Ev. Krankenhaus KEH */
  static TRAM_EV_KRANKENHAUS_KEH = new Location(
    'tram-ev-krankenhaus-keh', 'Tram Ev. Krankenhaus KEH', 13.506036, 52.5254404);
  /** Tram station Allee der Kosmonauten */
  static TRAM_ALLEE_DER_KOSMONAUTEN_ = new Location(
    'tram-allee-der-kosmonauten', 'Tram Allee der Kosmonauten/Rhinstraße', 13.5179255, 52.5259323);
  /** Tram station Beilsteiner Str. */
  static TRAM_BEILSTEINER_STRASSE = new Location(
    'tram-beilsteiner-strasse', 'Tram Beilsteiner Straße', 13.5277358, 52.5255362);
  /** Tram station Reinhardsbrunner Str. */
  static TRAM_REINHARDSBRUNNER_STRASSE = new Location(
    'tram-reinhardsbrunner-strasse', 'Tram Reinhardsbrunner Straße', 13.5011757, 52.5286168);
  /** Tram station Meeraner Str. */
  static TRAM_MEERANER_STRASSE = new Location(
    'tram-meeraner-strasse', 'Tram Meeraner Straße', 13.517137, 52.5293831);
  /** Tram station Kleingartenablage Bielefeldt */
  static TRAM_KLEINGARTENANLAGE_BIELEFELDT = new Location(
    'tram-kleingartenanlage-bielefeldt', 'Tram Kleingartenanlage Bielefeldt', 13.5170745, 52.5188969);
  /** Tram station Kleingartenablage Bielefeldt */
  static TRAM_AHRENSFELDE = new Location('tram-ahrensfelde', 'Tram Ahrensfelde', 13.574762, 52.572830);
  /** Tram station Hellersdorf U */
  static TRAM_HELLERSDORF_U = new Location(
    'tram-hellersdorf-u', 'Tram Hellersdorf U-Bahnhof', 13.605391, 52.536320);
  /** Tram station Stendaler Strasse */
  static TRAM_STENDALER = new Location(
    'tram-stendaler', 'Tram Stendaler', 13.604378283658102, 52.53932077992437);
  /** Tram station Stendaler Strasse / Zossener Strasse */
  static TRAM_STENDALERZOSSENER = new Location(
    'tram-stendalerzossener', 'Tram Stendalerzossener', 13.603463340326858, 52.543775568848446);
  /** Tram station Zossener Str. */
  static TRAM_ZOSSENER = new Location(
    'tram-zossener', 'Tram Zossener', 13.598828498921185, 52.54394085869042);
  /** Tram station Althellersdorfer Strasse */
  static TRAM_ALTEHELLERSDORFER = new Location(
    'tram-altehellersdorfer', 'Tram Alte-Hellersdorfer', 13.592182865509304, 52.544933070709305);
  /** Tram station Michendorfer Strasse */
  static TRAM_MICHENDORFER = new Location(
    'tram-michendorfer', 'Tram Michendorfer', 13.586852965519604, 52.5456741659942);
  /** Tram station Landsberger Strasse / Zossener Strasse */
  static TRAM_LANDSBERGERZOSSENER = new Location(
    'tram-landsbergerzossener', 'Tram Landsberger Allee / Zossener Str.', 13.587103, 52.548822);
  /** Tram station Betriebsbahnhof Marzahn */
  static TRAM_BETRIEBSBAHNHOFMARZAHN = new Location(
    'tram-betriebsbahnhofmarzahn', 'Tram Betriebsbahnhof Marzahn', 13.581988, 52.548871);
  /** Tram station Brudowiener Ring */
  static TRAM_BRODOWIENERRING = new Location(
    'tram-brodowienerring', 'Tram Brodowiener Ring', 13.578159789319885, 52.54789287493665);
  /** Tram station Landsberger Strasse / Blumberger Strasse */
  static TRAM_LANDSBERGERBLUMBERGER = new Location(
    'tram-landsbergerblumberger', 'Tram Landberger Allee / Blumberger Damm', 13.572618345542136, 52.54640859789009);


  /** Bahn station Stresow */
  // static TRAM_BRODOWIENERRING = new Location(
  //  'tram-brodowienerring', 'Tram Brodowiener Ring', 13.578159789319885, 52.54789287493665);
}
