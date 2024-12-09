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
    prefixIcons: ['blindkill'],
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
    prefixIcons: ['revenge', 'blindkill'],
    suffixIcons: [],
    redBorder: true,
    hide: false,
  },
]

export const DefaultDeathMsg = DefaultDeathMsgs[0]

export type Camp = 'CT' | 'T' | ''

export const CampValues: Camp[] = ['CT', 'T']

export type prefixIcon = 'revenge' | 'domination' | 'blindkill' | ''

export const PrefixIconValues: prefixIcon[] = ['revenge', 'domination', 'blindkill']

export type suffixIcon = 'noscope' | 'jumpkill' | 'throughsmoke' | 'penetrate' | 'headshot' | 'suicide' | 'kill360' | ''

export const SuffixIconValues: suffixIcon[] = ['noscope', 'jumpkill', 'throughsmoke', 'penetrate', 'headshot', 'suicide', 'kill360']

export type Weapon =
  | 'ak47'
  | 'ammobox'
  | 'ammobox_threepack'
  | 'armor'
  | 'armor_helmet'
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
  | 'controldrone'
  | 'cz75a'
  | 'deagle'
  | 'decoy'
  | 'defuser'
  | 'diversion'
  | 'dronegun'
  | 'elite'
  | 'famas'
  | 'firebomb'
  | 'fists'
  | 'fiveseven'
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
  | 'knife_m9_bayonet'
  | 'knife_push'
  | 'knife_skeleton'
  | 'knife_stiletto'
  | 'knife_survival_bowie'
  | 'knife_t'
  | 'knife_tactical'
  | 'knife_ursus'
  | 'knife_widowmaker'
  | 'knifegg'
  | 'm4a1'
  | 'm4a1_silencer'
  | 'm4a1_silencer_off'
  | 'm249'
  | 'mac10'
  | 'mag7'
  | 'molotov'
  | 'mp5sd'
  | 'mp7'
  | 'mp9'
  | 'negev'
  | 'nova'
  | 'p90'
  | 'p250'
  | 'p2000'
  | 'planted_c4_survival'
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
  | 'ssg08'
  | 'stomp_damage'
  | 'tablet'
  | 'tagrenade'
  | 'taser'
  | 'tec9'
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
  'controldrone',
  'cz75a',
  'deagle',
  'decoy',
  'defuser',
  'diversion',
  'dronegun',
  'elite',
  'famas',
  'firebomb',
  'fists',
  'fiveseven',
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
  'knife_m9_bayonet',
  'knife_push',
  'knife_skeleton',
  'knife_stiletto',
  'knife_survival_bowie',
  'knife_t',
  'knife_tactical',
  'knife_ursus',
  'knife_widowmaker',
  'knifegg',
  'm4a1',
  'm4a1_silencer',
  'm4a1_silencer_off',
  'm249',
  'mac10',
  'mag7',
  'molotov',
  'mp5sd',
  'mp7',
  'mp9',
  'negev',
  'nova',
  'p90',
  'p250',
  'p2000',
  'planted_c4_survival',
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
  'ssg08',
  'stomp_damage',
  'tablet',
  'tagrenade',
  'taser',
  'tec9',
  'ump45',
  'usp_silencer',
  'usp_silencer_off',
  'xm1014',
  'zone_repulsor',
]
