export type DeathMsg = {
  attacker: string
  attackerCamp: Camp
  victim: string
  victimCamp: Camp
  weapon: Weapon
  prefixIcons: prefixIcon[]
  suffixIcons: suffixIcon[]
  redBorder: boolean
  hide?: boolean
}

export const DefaultDeathMsgs: DeathMsg[] = [
  {
    attacker: 'Attacker',
    attackerCamp: 'T',
    victim: 'Victim',
    victimCamp: 'CT',
    weapon: 'ak47',
    prefixIcons: ['blind_kill'],
    suffixIcons: ['headshot'],
    redBorder: false,
    hide: false,
  },
  {
    attacker: '中文字体样式.gg',
    attackerCamp: 'CT',
    victim: 'Purp1e',
    victimCamp: 'T',
    weapon: 'awp',
    prefixIcons: ['revenge', 'blind_kill'],
    suffixIcons: [],
    redBorder: true,
    hide: false,
  },
]

export const DefaultDeathMsg = DefaultDeathMsgs[0]

export type Camp = 'CT' | 'T' | ''

export const CampValues: Camp[] = ['CT', 'T']

export type prefixIcon = 'revenge' | 'domination' | 'blind_kill' | ''

export const PrefixIconValues: prefixIcon[] = ['revenge', 'domination', 'blind_kill']

export type suffixIcon = 'noscope' | 'jumpkill' | 'throughsmoke' | 'penetrate' | 'headshot' | 'suicide' | 'kill360' | ''

export const SuffixIconValues: suffixIcon[] = ['noscope', 'jumpkill', 'throughsmoke', 'penetrate', 'headshot', 'suicide', 'kill360']

export type Weapon =
  | 'ak47'
  | 'ammobox'
  | 'ammobox_threepack'
  | 'armor'
  | 'armor_helmet'
  | 'assaultsuit_helmet_only'
  | 'assaultsuit'
  | 'aug'
  | 'awp'
  | 'axe'
  | 'bayonet'
  | 'bizon'
  | 'breachcharge'
  | 'breachcharge_projectile'
  | 'bumpmine'
  | 'c4'
  | 'clothing_hands'
  | 'controldrone'
  | 'customplayer'
  | 'cz75a'
  | 'deagle'
  | 'decoy'
  | 'defuser'
  | 'disconnect'
  | 'diversion'
  | 'dronegun'
  | 'elite'
  | 'famas'
  | 'firebomb'
  | 'fists'
  | 'fiveseven'
  | 'flair0'
  | 'flashbang'
  | 'flashbang_assist'
  | 'frag_grenade'
  | 'g3sg1'
  | 'galilar'
  | 'glock'
  | 'grenadepack'
  | 'grenadepack2'
  | 'hammer'
  | 'healthshot'
  | 'heavy_armor'
  | 'hegrenade'
  | 'helmet'
  | 'hkp2000'
  | 'incgrenade'
  | 'inferno'
  | 'kevlar'
  | 'knife'
  | 'knife_bowie'
  | 'knife_butterfly'
  | 'knife_canis'
  | 'knife_cord'
  | 'knife_css'
  | 'knife_falchion'
  | 'knife_flip'
  | 'knife_gut'
  | 'knife_gypsy_jackknife'
  | 'knife_karambit'
  | 'knife_kukri'
  | 'knife_m9_bayonet'
  | 'knife_push'
  | 'knife_skeleton'
  | 'knife_stiletto'
  | 'knife_survival_bowie'
  | 'knife_t'
  | 'knife_tactical'
  | 'knife_twinblade'
  | 'knife_ursus'
  | 'knife_widowmaker'
  | 'knifegg'
  | 'm4a1'
  | 'm4a1_silencer'
  | 'm4a1_silencer_off'
  | 'm249'
  | 'mac10'
  | 'mag7'
  | 'melee'
  | 'molotov'
  | 'movelinear'
  | 'mp5sd'
  | 'mp7'
  | 'mp9'
  | 'negev'
  | 'nova'
  | 'p90'
  | 'p250'
  | 'p2000'
  | 'planted_c4_survival'
  | 'planted_c4'
  | 'prop_exploding_barrel'
  | 'radarjammer'
  | 'revolver'
  | 'sawedoff'
  | 'scar20'
  | 'sg556'
  | 'shield'
  | 'smokegrenade'
  | 'snowball'
  | 'spanner'
  | 'spray0'
  | 'ssg08'
  | 'stomp_damage'
  | 'tablet'
  | 'tagrenade'
  | 'taser'
  | 'tec9'
  | 'tripwirefire_projectile'
  | 'tripwirefire'
  | 'ump45'
  | 'usp_silencer'
  | 'usp_silencer_off'
  | 'xm1014'
  | 'zone_repulsor'
  | ''

export const WeaponValues: Weapon[] = [
  'ak47',
  'ammobox',
  'ammobox_threepack',
  'armor',
  'armor_helmet',
  'assaultsuit_helmet_only',
  'assaultsuit',
  'aug',
  'awp',
  'axe',
  'bayonet',
  'bizon',
  'breachcharge',
  'breachcharge_projectile',
  'bumpmine',
  'c4',
  'clothing_hands',
  'controldrone',
  'customplayer',
  'cz75a',
  'deagle',
  'decoy',
  'defuser',
  'disconnect',
  'diversion',
  'dronegun',
  'elite',
  'famas',
  'firebomb',
  'fists',
  'fiveseven',
  'flair0',
  'flashbang',
  'flashbang_assist',
  'frag_grenade',
  'g3sg1',
  'galilar',
  'glock',
  'grenadepack',
  'grenadepack2',
  'hammer',
  'healthshot',
  'heavy_armor',
  'hegrenade',
  'helmet',
  'hkp2000',
  'incgrenade',
  'inferno',
  'kevlar',
  'knife',
  'knife_bowie',
  'knife_butterfly',
  'knife_canis',
  'knife_cord',
  'knife_css',
  'knife_falchion',
  'knife_flip',
  'knife_gut',
  'knife_gypsy_jackknife',
  'knife_karambit',
  'knife_kukri',
  'knife_m9_bayonet',
  'knife_push',
  'knife_skeleton',
  'knife_stiletto',
  'knife_survival_bowie',
  'knife_t',
  'knife_tactical',
  'knife_twinblade',
  'knife_ursus',
  'knife_widowmaker',
  'knifegg',
  'm4a1',
  'm4a1_silencer',
  'm4a1_silencer_off',
  'm249',
  'mac10',
  'mag7',
  'melee',
  'molotov',
  'movelinear',
  'mp5sd',
  'mp7',
  'mp9',
  'negev',
  'nova',
  'p90',
  'p250',
  'p2000',
  'planted_c4_survival',
  'planted_c4',
  'prop_exploding_barrel',
  'radarjammer',
  'revolver',
  'sawedoff',
  'scar20',
  'sg556',
  'shield',
  'smokegrenade',
  'snowball',
  'spanner',
  'spray0',
  'ssg08',
  'stomp_damage',
  'tablet',
  'tagrenade',
  'taser',
  'tec9',
  'tripwirefire_projectile',
  'tripwirefire',
  'ump45',
  'usp_silencer',
  'usp_silencer_off',
  'xm1014',
  'zone_repulsor',
]

export const WeaponMap: Record<string, string> = {
  ak47: 'AK47',
  ammobox: '弹药箱',
  ammobox_threepack: '弹药箱三件套',
  armor: '护甲',
  armor_helmet: '护甲头盔',
  assaultsuit_helmet_only: '突击套装头盔',
  assaultsuit: '突击套装',
  aug: 'AUG',
  awp: 'AWP',
  axe: '斧头',
  bayonet: '刺刀',
  bizon: 'PP野牛',
  breachcharge: '遥控炸弹',
  breachcharge_projectile: '遥控炸弹投射物',
  bumpmine: '弹射地雷',
  c4: 'C4炸弹',
  clothing_hands: '服装手',
  controldrone: '无人机',
  customplayer: '自定义玩家',
  cz75a: 'CZ75',
  deagle: '沙漠之鹰',
  decoy: '诱饵弹',
  defuser: '拆弹器',
  disconnect: '断开连接',
  diversion: '分散注意',
  dronegun: '无人机枪',
  elite: '精英',
  famas: '法玛斯',
  firebomb: '燃烧弹',
  fists: '拳头',
  fiveseven: 'FN57',
  flair0: '天赋',
  flashbang: '闪光弹',
  flashbang_assist: '闪光弹助攻',
  frag_grenade: '破片手榴弹',
  g3sg1: 'G3SG1',
  galilar: '加利尔',
  glock: '格洛克',
  grenadepack: '手榴弹包',
  grenadepack2: '手榴弹包2',
  hammer: '锤子',
  healthshot: '医疗针',
  heavy_armor: '重装甲',
  hegrenade: '高爆手榴弹',
  helmet: '头盔',
  hkp2000: 'P2000',
  incgrenade: '燃烧手榴弹',
  inferno: '地狱火',
  kevlar: '凯夫拉',
  knife: '刀',
  knife_bowie: '鲍伊猎刀',
  knife_butterfly: '蝴蝶刀',
  knife_canis: '求生匕首',
  knife_cord: '系绳匕首',
  knife_css: '海豹短刀',
  knife_falchion: '弯刀',
  knife_flip: '折叠刀',
  knife_gut: '穿肠刀',
  knife_gypsy_jackknife: '折刀',
  knife_karambit: '爪子刀',
  knife_kukri: '廓尔喀弯刀',
  knife_m9_bayonet: 'M9刺刀',
  knife_push: '暗影双匕',
  knife_skeleton: '骷髅匕首',
  knife_stiletto: '短剑',
  knife_survival_bowie: '求生鲍伊猎刀',
  knife_t: 'T刀',
  knife_tactical: '猎杀者匕首',
  knife_twinblade: '双刃匕首',
  knife_ursus: '熊刀',
  knife_widowmaker: '锯齿爪刀',
  knifegg: 'gg刀',
  m4a1: 'M4A4',
  m4a1_silencer: 'M4A1消音版',
  m4a1_silencer_off: 'M4A1无消音器',
  m249: 'M249',
  mac10: 'MAC-10',
  mag7: 'MAG-7',
  melee: '幽灵之刃',
  molotov: '燃烧弹',
  movelinear: '移动线性',
  mp5sd: 'MP5',
  mp7: 'MP7',
  mp9: 'MP9',
  negev: '内格夫',
  nova: '新星',
  p90: 'P90',
  p250: 'P250',
  p2000: 'P2000',
  planted_c4_survival: '放置C4生存',
  planted_c4: '放置C4',
  prop_exploding_barrel: '爆炸桶',
  radarjammer: '雷达干扰器',
  revolver: '左轮手枪',
  sawedoff: '匪喷',
  scar20: 'SCAR',
  sg556: 'SG553',
  shield: '盾牌',
  smokegrenade: '烟雾弹',
  snowball: '雪球',
  spanner: '扳手',
  spray0: '喷漆',
  ssg08: 'SSG08',
  stomp_damage: '踩踏伤害',
  tablet: '平板',
  tagrenade: '标记手榴弹',
  taser: '电击枪',
  tec9: 'Tec-9',
  tripwirefire_projectile: '绊网火投射物',
  tripwirefire: '绊网火',
  ump45: 'UMP45',
  usp_silencer: 'USP消音版',
  usp_silencer_off: 'USP无消音器',
  xm1014: 'XM1014连喷',
  zone_repulsor: '区域排斥装置',
}
