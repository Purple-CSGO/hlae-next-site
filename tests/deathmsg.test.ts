import { describe, expect, test } from 'bun:test'
import { parseDeathNotices } from '../app/hud/deathmsg/import-data'
import { DefaultDeathMsgs, CStrikeDefaultDeathMsgs } from '../app/hud/deathmsg/dmsg'

describe('击杀数据导入', () => {
  test('支持旧格式以及带游戏类型的新格式', () => {
    expect(parseDeathNotices(JSON.stringify({ dNotices: DefaultDeathMsgs }), 'cs2')).toEqual(DefaultDeathMsgs)
    expect(parseDeathNotices(JSON.stringify({ gameType: 'cstrike', dNotices: CStrikeDefaultDeathMsgs }), 'cstrike')).toEqual(CStrikeDefaultDeathMsgs)
  })
  test('拒绝损坏数据、无效武器和错误游戏类型', () => {
    for (const value of [null, {}, { dNotices: [null] }, { dNotices: [{ ...DefaultDeathMsgs[0], weapon: '../unknown' }] }, { dNotices: [{ ...DefaultDeathMsgs[0], prefixIcons: null }] }]) {
      expect(() => parseDeathNotices(JSON.stringify(value), 'cs2')).toThrow()
    }
    expect(() => parseDeathNotices('{', 'cs2')).toThrow()
    expect(() => parseDeathNotices(JSON.stringify({ gameType: 'cs2', dNotices: DefaultDeathMsgs }), 'cstrike')).toThrow()
  })
  test('允许清空列表，导入时恢复可见状态', () => {
    expect(parseDeathNotices('{"dNotices":[]}', 'cs2')).toEqual([])
    expect(parseDeathNotices(JSON.stringify({ dNotices: [{ ...DefaultDeathMsgs[0], hide: true }] }), 'cs2')[0].hide).toBe(false)
  })
})
