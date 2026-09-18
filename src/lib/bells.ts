import { BELL_IMAGES } from "./bell-assets";

export type PackId = "classic" | "christmas" | "spring" | "autumn" | "halloween" | "exclusive";
export type BellShape = "classic" | "slim" | "dome" | "tulip" | "faceted" | "fluted" | "pagoda" | "teardrop" | "cathedral" | "lotus";
export type HandleKind = "loop" | "knob" | "stem" | "spire";
export type Decoration = "none" | "ribbon" | "holly" | "flower" | "leaf" | "web" | "crown";
export type Finish = { stops: [string,string,string,string]; highlight:string; shadow:string; accent:string; trim:string };
export type Tone = { base:number; partials:number[]; decay:number; brightness:number };
export type Bell = { id:string; pack:PackId; name:{en:string;sv:string}; shape:BellShape; handle:HandleKind; decoration:Decoration; band:boolean; finish:Finish; tone:Tone; image:string };
export const PACKS:{id:PackId;name:{en:string;sv:string};premium:boolean}[] = [
 {id:"classic",name:{en:"Free Collection",sv:"Gratis samling"},premium:false},
 {id:"christmas",name:{en:"Christmas & Winter",sv:"Jul & vinter"},premium:true},
 {id:"spring",name:{en:"Spring & Summer",sv:"Vår & sommar"},premium:true},
 {id:"autumn",name:{en:"Autumn",sv:"Höst"},premium:true},
 {id:"halloween",name:{en:"Halloween",sv:"Halloween"},premium:true},
 {id:"exclusive",name:{en:"Exclusive",sv:"Exklusivt"},premium:true},
];
const finishes:Finish[]=[
 {stops:["#fff6da","#f0cd7a","#c2932f","#6f4f11"],highlight:"#fffdf4",shadow:"#3b2807",accent:"#e3bd5f",trim:"#9e1b2f"},
 {stops:["#ffffff","#f8f7f4","#ded9d0","#9d978f"],highlight:"#ffffff",shadow:"#6b665f",accent:"#dcc79a",trim:"#d8cfbf"},
 {stops:["#ffe9d1","#e0a466","#a25b23","#4f260a"],highlight:"#fff4e6",shadow:"#2a1205",accent:"#d99a5c",trim:"#c05f1c"},
 {stops:["#ffffff","#eef6fb","#cfe0ea","#8fa3b1"],highlight:"#ffffff",shadow:"#7d8f9c",accent:"#dcc78f",trim:"#cfe0ea"},
 {stops:["#ffe2e4","#e5858f","#a32c3e","#4c0d18"],highlight:"#fff4f5",shadow:"#280610",accent:"#e0b060",trim:"#9e1b2f"},
 {stops:["#e2ecff","#8fadec","#37589f","#111e42"],highlight:"#f4f8ff",shadow:"#0a1128",accent:"#dcc07a",trim:"#9db6ee"},
 {stops:["#d9f5ea","#79c7a8","#1f6f52","#08331f"],highlight:"#f1fff9",shadow:"#041c11",accent:"#e0c173",trim:"#8fb884"},
 {stops:["#fff5f8","#fbd3de","#dc9cb0","#814d60"],highlight:"#fffafc",shadow:"#42222e",accent:"#e8c07f",trim:"#f2bdcc"},
];
const shapes:BellShape[]=["classic","tulip","dome","fluted","pagoda","slim","teardrop","lotus","cathedral","faceted"];
const handles:HandleKind[]=["loop","knob","stem","spire"];
const partials=[1,2.02,2.68,3.47,4.16,5.43,6.79,8.21];
const makeBell=(id:string,pack:PackId,en:string,sv:string,index:number):Bell=>({id,pack,name:{en,sv},shape:shapes[index%shapes.length]??"classic",handle:handles[index%handles.length]??"loop",decoration:pack==="classic"?"none":pack==="christmas"?"holly":pack==="spring"?"flower":pack==="autumn"?"leaf":pack==="halloween"?"web":"crown",band:index%2===0,finish:finishes[index%finishes.length]??finishes[0]!,tone:{base:560+(index%10)*25,partials,decay:4.2+(index%5)*.28,brightness:.68+(index%4)*.07},image:BELL_IMAGES[id]??"");

export const BELLS:Bell[]=[
 makeBell("free-01","classic","Rosette Gold","Rosettguld",0),
 makeBell("free-02","classic","Garden Porcelain","Trädgårdsporslin",1),
 makeBell("free-03","classic","Heart Bronze","Hjärtbrons",2),
 makeBell("free-04","classic","Crystal Blossom","Kristallblomma",3),
 makeBell("free-05","classic","Ruby Snow","Rubinsnö",4),
 makeBell("free-06","classic","Silver Daisy","Silverprästkrage",5),
 makeBell("free-07","classic","Pearl Blush","Pärlrosa",6),
 makeBell("free-08","classic","Emerald Velvet","Smaragdsammet",7),
 makeBell("free-09","classic","Rose Flute","Roséflöjt",8),
 makeBell("free-10","classic","Starlit Ivory","Stjärnelfenben",9),
 makeBell("free-11","classic","Golden Ribbon","Gyllene band",10),
 makeBell("free-12","classic","Petite Bouquet","Liten bukett",11),
 makeBell("free-13","classic","Copper Arabesque","Koppararabesk",12),
 makeBell("free-14","classic","Pink Couture","Rosa couture",13),
 makeBell("free-15","classic","Midnight Blossom","Midnattsblomma",14),
 makeBell("free-16","classic","Meadow Green","Ängsgrön",15),
 makeBell("free-17","classic","Champagne Crystal","Champagnekristall",16),
 makeBell("free-18","classic","Celestial Noir","Himmelsk noir",17),
 makeBell("free-19","classic","Sage Silk","Salviasiden",18),
 makeBell("free-20","classic","Platinum Pearl","Platinapärla",19),
 makeBell("free-21","classic","Blue Botanica","Blå botanika",20),
 makeBell("free-22","classic","Coral Glow","Korallglöd",21),
 makeBell("free-23","classic","Lilac Crystal","Syrénkristall",22),
 makeBell("free-24","classic","Laurel Gold","Lagerguld",23),
 makeBell("free-25","classic","Wildflower Rose","Vildblomsrosa",24),
 makeBell("free-26","classic","Moon Pearl","Månpärla",25),
 makeBell("free-27","classic","Silver Snowdrop","Silversnödroppe",26),
 makeBell("free-28","classic","Bronze Velvet","Bronssammet",27),
 makeBell("free-29","classic","Lemon Daisy","Citronprästkrage",28),
 makeBell("free-30","classic","Smoky Champagne","Rökig champagne",29),
 makeBell("christmas-01","christmas","Velvet Holly","Sammet & järnek",30),
 makeBell("christmas-02","christmas","Tartan Noël","Tartan Noël",31),
 makeBell("christmas-03","christmas","Porcelain Holly","Porslinsjärnek",32),
 makeBell("christmas-04","christmas","Crystal Fir","Kristallgran",33),
 makeBell("christmas-05","christmas","Golden Poinsettia","Gyllene julstjärna",34),
 makeBell("christmas-06","christmas","Midnight Snow","Midnattssnö",35),
 makeBell("christmas-07","christmas","Pearl Frost","Pärlfrost",36),
 makeBell("christmas-08","christmas","Burgundy Stars","Bordeauxstjärnor",37),
 makeBell("christmas-09","christmas","Candy Ribbon","Polkaband",38),
 makeBell("christmas-10","christmas","Woodland Reindeer","Skogsren",39),
 makeBell("spring-01","spring","Rose Bouquet","Rosenbukett",40),
 makeBell("spring-02","spring","Golden Daisies","Gyllene prästkragar",41),
 makeBell("spring-03","spring","Cherry Crystal","Körsbärskristall",42),
 makeBell("spring-04","spring","Blue Hydrangea","Blå hortensia",43),
 makeBell("spring-05","spring","Mint Peony","Mintpion",44),
 makeBell("spring-06","spring","Lavender Silk","Lavendelsiden",45),
 makeBell("spring-07","spring","Coral Meadow","Koralläng",46),
 makeBell("spring-08","spring","Sunflower Pearl","Solrospärla",47),
 makeBell("spring-09","spring","Aqua Shell","Aquasnäckan",48),
 makeBell("spring-10","spring","Jasmine Champagne","Jasminchampagne",49),
 makeBell("autumn-01","autumn","Maple Cascade","Lönnkaskad",50),
 makeBell("autumn-02","autumn","Copper Wreath","Kopparkrans",51),
 makeBell("autumn-03","autumn","Amber Leaves","Bärnstensblad",52),
 makeBell("autumn-04","autumn","Acorn Velvet","Ekollonsammet",53),
 makeBell("autumn-05","autumn","Woodland Bronze","Skogsbrons",54),
 makeBell("halloween-01","halloween","Nocturne Web","Nattväv",55),
 makeBell("halloween-02","halloween","Pumpkin Filigree","Pumpafiligran",56),
 makeBell("halloween-03","halloween","Violet Moon","Violett måne",57),
 makeBell("halloween-04","halloween","Lantern Glass","Lyktglas",58),
 makeBell("halloween-05","halloween","Raven Noir","Korpnoir",59),
 makeBell("exclusive-01","exclusive","Imperial Ruby","Imperialrubin",60),
 makeBell("exclusive-02","exclusive","Diamond Crystal","Diamantkristall",61),
 makeBell("exclusive-03","exclusive","Pearl Crown","Pärlkrona",62),
 makeBell("exclusive-04","exclusive","Onyx Constellation","Onyxkonstellation",63),
 makeBell("exclusive-05","exclusive","Emerald Laurel","Smaragdlager",64),
 makeBell("exclusive-06","exclusive","Rose Peony","Rosépion",65),
 makeBell("exclusive-07","exclusive","Sapphire Relief","Safirrelief",66),
 makeBell("exclusive-08","exclusive","Magnolia Jewel","Magnoliasmycke",67),
 makeBell("exclusive-09","exclusive","Golden Flakes","Gyllene flingor",68),
 makeBell("exclusive-10","exclusive","Cameo Velvet","Kameosammet",69),
];
export const DEFAULT_BELL:Bell=BELLS[0]!;
export const DEFAULT_BELL_ID=DEFAULT_BELL.id;
export const PREMIUM_PACK_IDS:PackId[]=["christmas","spring","autumn","halloween","exclusive"];
export function getBell(id:string):Bell{return BELLS.find((bell)=>bell.id===id)??DEFAULT_BELL}
export function bellsByPack(pack:PackId):Bell[]{return BELLS.filter((bell)=>bell.pack===pack)}
