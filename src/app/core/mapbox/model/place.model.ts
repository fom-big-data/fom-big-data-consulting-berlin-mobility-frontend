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
  // Districts
  //

  /** District Charlottenburg */
  static ZIP_10623_CHARLOTTENBURG = new Location('charlottenburg', '10623 Charlottenburg', 13.3189848, 52.5086571);
  /** District Buckow-Lichtenrade-Mariendorf-Marienfelde-Tempelhof */
  static ZIP_12107_BUCKOW_LICHTENRADE_MARIENDORF_MARIENFELDE_TEMPELHOF = new Location('buckow-lichtenrade-mariendorf-marienfelde-tempelhof', '12107 Buckow-Lichtenrade-Mariendorf-Marienfelde-Tempelhof', 13.3511922, 52.4308308);
  /** District Kaulsdorf-Mahlsdorf */
  static ZIP_12623_KAULSDORF_MAHLSDORF = new Location('kaulsdorf-mahlsdorf', '12623 Kaulsdorf-Mahlsdorf', 13.5863998, 52.5005195);

  /** FOM */
  static FOM = new Location('fom', 'FOM', 13.3161495, 52.5119408, 13);
  /** Area Zoologischer Garten */
  static ZOOLOGISCHER_GARTEN = new Location('zoologischer-garten', 'Gesundbrunnen',13.3323673, 52.5073337);
  /** Area Siegessaeule */
  static SIEGESSAEULE = new Location('siegessaeule', 'Siegessäule',13.3501189, 52.5145434);

  /** Area Gesundbrunnen */
  static GESUNDBRUNNEN = new Location('gesundbrunnen', 'Gesundbrunnen', 13.3671742, 52.5503968);
  /** Area Arnimkiez */
  static ARNIMKIEZ = new Location('arnimkiez', 'Arnimkiez',13.4014224, 52.5511111);
  /** Area Torstrasse */
  static TORSTRASSE = new Location('torstrasse', 'Torstraße',13.3848972, 52.5265118);
  /** Area Potsdamer PLatz */
  static POSTDAMER_PLATZ = new Location('potsdamer-platz', 'Potsdamer Platz',13.3759441, 52.5096488);
  /** Area Ostkreuz */
  static OSTKREUZ = new Location('ostkreuz', 'Ostkreuz',13.4693263, 52.5031531);
  /** Area Baumschulenweg */
  static BAUMSCHULENWEG = new Location('baumschulenweg', 'Baumschulenweg',13.4875787, 52.4676707);
  /** Area Neukoelln */
  static NEUKOELLN = new Location('neukoelln', 'Neukölln',13.436502, 52.469093);

  /** Area Kladow */
  static KLADOW = new Location('kladow', 'Kladow',13.1129395,52.4625043);
  /** Area Mueggelheim */
  static MUEGGELHEIM = new Location('mueggelheim', 'Müggelheim',13.6500662,52.4052779);
  /** Area Franzoesisch Buchholz */
  static FRANZOESISCH_BUCHHOLZ = new Location('franzoesisch-buchholz', 'Französisch Buchholz',13.4054556,52.6113215);
  /** Area Moabit */
  static MOABIT = new Location('moabit', 'Moabit',13.3250589,52.5290551);
  /** Area Graefekiez */
  static GRAEFEKIEZ = new Location('graefekiez', 'Gräfekiez',13.4145386,52.4916955);
  /** Area Alt Hohenschoenhausen */
  static ALT_HOHENSCHOENHAUSEN = new Location('alt-hohenschoenhausen', 'Alt Hohenschönhausen',13.4820985,52.5486436);

  //
  // Whitespots
  //

  /** Tegel */
  static TEGEL = new Location('tegel', 'Der Flughafen Berlin-Tegel „Otto Lilienthal“ war bis zum 8. November 2020 ein internationaler Verkehrsflughafen in Berlin-Tegel.', 13.301036953926086, 52.54451612539228);
  /** Gewerbegebiet Britz */
  static GEWERBEGEBIET_BRITZ = new Location('gewerbegebiet-britz', 'Gewerbegebiet Gradestraße', 13.41184437274933, 52.45105343499185, 12.0);
  /** Siemensstadt */
  static SPANDAU = new Location('spandau', 'tbd', 13.225531, 52.527586);
  /** Landsberger Allee */
  static LANDSBERGER_ALLEE_CLOSE = new Location(
    'landsberger-allee-close', 'Gewerbegebiet Landsberger Allee', 13.511579632759094, 52.53283375135081, 12.5);
  /** Landsberger Allee */
  static LANDSBERGER_ALLEE = new Location('landsberger-allee', 'Gewerbegebiet Landsberger Allee', 13.511579632759094, 52.53283375135081);
  /** Westhafen */
  static CHARLOTTENBURGNORD = new Location('charlottenburg-nord', 'tbd', 13.303615, 52.5459212);
  /** Hellersdorf */
  static MARZAHN_HELLERSDORF_CLOSER = new Location('marzahnhellersdorf', 'tbd', 13.59452260037462, 52.546943747075595, 12.5);
  /** Hellersdorf */
  static MARZAHN_HELLERSDORF = new Location('marzahnhellersdorf', 'tbd', 13.59452260037462, 52.546943747075595);


  //
  // Chemical and Retail
  //

  /* SIEMENSSTADT*/
  static TEC_SIEMENSSTADT = new Location(
    'tec-siemensstadt', 'Siemensstadt - Gewerbe und Technologie', 13.263056, 52.540556);
  /* ADLERSHOF */
  static TEC_ADLERSHOF = new Location(
    'tec-adlershof', 'Adlershof "science at work" - Technoligie und Wissenschaftspark ',
    13.535324, 52.431573);
  /* HUMBOLDTHAIN */
  static TEC_HUMBOLDTHAIN = new Location(
    'tec-humboldthain', 'Humboldthain - Gewerbe Technologie und Gründerzentrum ',
    13.385895, 52.542607);
  /* KATHIS CAMPUS .. EUREF*/
  static TEC_EUREF = new Location(
    'tec-euref', 'EUREF - Technologie und Gewerbepark', 13.357011, 52.481595);
  /* BORSIGTURM*/
  static TEC_BORSIGTURM = new Location(
    'tec-borsigturm', 'Borsigturm - Gewerbe, Technologie und Gründerzentrum ', 13.282722, 52.581781);
  /* MARZAHN GEWERBEPARK */
  static TEC_MARZAHN = new Location(
    'tec-marzahn', 'ECONOPARK - Gewerbe und Innovationspark', 13.546844, 52.558557);
  /* CAMPUS HTW */
  static TEC_HTW = new Location(
    'tec-htw', 'Campus Adlershof - Wissenschafts und Gründerzentrum', 13.526841, 52.458344);
  /* MARIENDORF */
  static TEC_MARIENDORF = new Location(
    'tec-mariendorf', 'Mariendorf - Gewerbe und Technologiepark', 13.374298, 52.438594);

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

  //
  // U-Bahn
  //

  /** U-Bahn station Blaschkoallee */
  static U_BLASCHKOALLEE = new Location(
    'u-blaschkoallee', 'U Blaschkoallee', 13.448983, 52.4527097);
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
  /** Tram station Brudowiener Rind */
  static TRAM_BRODOWIENERRING = new Location(
    'tram-brodowienerring', 'Tram Brodowiener Ring', 13.578159789319885, 52.54789287493665);
  /** Tram station Landsberger Strasse / Blumberger Strasse */
  static TRAM_LANDSBERGERBLUMBERGER = new Location(
    'tram-landsbergerblumberger', 'Tram Landberger Allee / Blumberger Damm', 13.572618345542136, 52.54640859789009);
}
