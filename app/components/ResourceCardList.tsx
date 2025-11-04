import { Card } from '../ui/Card'
import { CardProps } from '../ui/Card'
import { resourceData } from '../data/resource'

interface LatestRelease {
  repo: string
  latest_version: string
  changelog: string
  published_at: string
  attachments: [string, string][] // [文件名, URL] 的数组
}

interface ApiResponse {
  results: Array<{
    repo: string
    success: boolean
    latest_release?: LatestRelease
    error?: string
  }>
}

async function getResourceData(): Promise<CardProps[]> {
  // 从 resourceData 中提取所有 github_repo
  const repos = resourceData.map(item => item.github_repo).filter(repo => repo && repo.includes('/')) // 过滤掉无效的 repo
  if (repos.length === 0) return resourceData

  try {
    // 调用 API 获取最新版本信息
    const response = await fetch('https://gh-info.okk.cool/repos/batch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        repos: repos,
        fields: ['latest_release'],
      }),
    })

    if (!response.ok) {
      throw new Error(`API 请求失败: ${response.status}`)
    }

    const apiData: ApiResponse = await response.json()

    // 将版本信息合并到 resourceData 中
    const repoVersionMap = new Map<string, string>()
    apiData.results.forEach(result => {
      if (result.success && result.latest_release) {
        repoVersionMap.set(result.repo, result.latest_release.latest_version)
      }
    })

    return resourceData.map(item => ({
      ...item,
      version: repoVersionMap.get(item.github_repo || '') || item.version,
    }))
  } catch (error) {
    return resourceData
  }
}

export async function ResourceCardList() {
  const data = await getResourceData()

  return (
    <ul className="grid items-center justify-center w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((item, index) => (
        <Card {...item} key={index} />
      ))}
    </ul>
  )
}
