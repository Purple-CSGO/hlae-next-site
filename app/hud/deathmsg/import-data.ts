import {
  type DeathMsg,
  CS2WeaponValues, CStrikeWeaponValues,
  CS2PrefixIconValues, CStrikePrefixIconValues,
  CS2SuffixIconValues, CStrikeSuffixIconValues,
} from './dmsg'

export function parseDeathNotices(json: string, gameType: string): DeathMsg[] {
  const data: unknown = JSON.parse(json)
  if (!data || typeof data !== 'object' || !('dNotices' in data) || !Array.isArray(data.dNotices)) {
    throw new Error('请选择包含 dNotices 列表的击杀数据 JSON 文件')
  }
  if ('gameType' in data && data.gameType !== gameType) {
    throw new Error('请先切换到与文件一致的游戏类型')
  }
  const weapons: readonly string[] = gameType === 'cs2' ? CS2WeaponValues : CStrikeWeaponValues
  const prefixes: readonly string[] = gameType === 'cs2' ? CS2PrefixIconValues : CStrikePrefixIconValues
  const suffixes: readonly string[] = gameType === 'cs2' ? CS2SuffixIconValues : CStrikeSuffixIconValues
  const validIcons = (value: unknown, allowed: readonly string[]) =>
    Array.isArray(value) && value.every(icon => typeof icon === 'string' && allowed.includes(icon))

  return data.dNotices.map((item: unknown, index) => {
    if (!item || typeof item !== 'object') throw new Error(`第 ${index + 1} 条击杀数据无效`)
    const row = item as Record<string, unknown>
    if (
      typeof row.attacker !== 'string' || typeof row.victim !== 'string' ||
      !['CT', 'T', ''].includes(String(row.attackerCamp)) || !['CT', 'T', ''].includes(String(row.victimCamp)) ||
      typeof row.weapon !== 'string' || !weapons.includes(row.weapon) ||
      !validIcons(row.prefixIcons, prefixes) || !validIcons(row.suffixIcons, suffixes) ||
      typeof row.redBorder !== 'boolean' || (row.hide !== undefined && typeof row.hide !== 'boolean')
    ) throw new Error(`第 ${index + 1} 条击杀数据格式错误，或不适用于当前游戏`)
    return { ...row, hide: false } as DeathMsg
  })
}
