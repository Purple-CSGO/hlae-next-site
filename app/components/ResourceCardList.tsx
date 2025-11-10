import { CardProps } from '../ui/Card'
import { resourceData } from '../data/resource'
import { ResourceCard } from './ResourceCard'
import { unstable_cache } from 'next/cache'

interface LatestRelease {
  repo: string
  latest_version: string
  changelog: string
  published_at: string
  attachments: string[] // 仅 URL 列表
}

interface ApiResponse {
  results: Array<{
    repo: string
    success: boolean
    latest_release?: LatestRelease
    error?: string
  }>
}

export interface ResourceCardData extends CardProps {
  releaseInfo?: LatestRelease
}

// 执行 API 调用的函数
async function fetchResourceReleaseData(repos: string[]): Promise<ApiResponse> {
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

  return await response.json()
}

// 使用 unstable_cache 缓存 API 调用结果
const getCachedResourceReleaseData = unstable_cache(
  async (repos: string[]) => {
    return fetchResourceReleaseData(repos)
  },
  ['resource-release-data'], // cache key
  {
    revalidate: 180, // 3 分钟
    tags: ['resource-releases'], // 可选：用于按需重新验证
  }
)

async function getResourceData(): Promise<ResourceCardData[]> {
  // 从 resourceData 中提取所有 github_repo，并确保类型安全
  const repos = resourceData.map(item => item.github_repo).filter((repo): repo is string => !!repo && repo.includes('/')) // 过滤掉无效的 repo，并确保类型为 string[]
  if (repos.length === 0) return resourceData.map(item => ({ ...item }))

  try {
    // 使用缓存的 API 调用
    const apiData = await getCachedResourceReleaseData(repos)

    // 将版本信息和完整的 release 信息合并到 resourceData 中
    const repoReleaseMap = new Map<string, LatestRelease>()
    apiData.results.forEach(result => {
      if (result.success && result.latest_release) {
        repoReleaseMap.set(result.repo, result.latest_release)
      }
    })

    return resourceData.map(item => {
      const releaseInfo = item.github_repo ? repoReleaseMap.get(item.github_repo) : undefined
      return {
        ...item,
        version: releaseInfo?.latest_version || item.version,
        releaseInfo: releaseInfo,
      }
    })
  } catch (error) {
    return resourceData.map(item => ({ ...item }))
  }
}

export async function ResourceCardList() {
  const data = await getResourceData()

  return (
    <ul className="grid items-center justify-center w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((item, index) => (
        <ResourceCard {...item} key={index} />
      ))}
    </ul>
  )
}
