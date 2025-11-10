'use client'

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@heroui/react'
import { Switch } from '@heroui/react'
import ReactMarkdown from 'react-markdown'
import { useState } from 'react'

interface LatestRelease {
  repo: string
  latest_version: string
  changelog: string
  published_at: string
  // 新版：仅返回 URL 列表
  attachments: string[]
}

interface ChangelogModalProps {
  isOpen: boolean
  onClose: () => void
  releaseInfo: LatestRelease | undefined
  title: string
}

export function ChangelogModal({ isOpen, onClose, releaseInfo, title }: ChangelogModalProps) {
  if (!releaseInfo) return null

  const [useCdn, setUseCdn] = useState(false)
  const cdnize = (url: string) => (useCdn ? `https://cdn.upup.cool/${url}` : url)

  const parseFilenameFromUrl = (url: string) => {
    try {
      const decoded = decodeURIComponent(url)
      const pathname = new URL(decoded, typeof window !== 'undefined' ? window.location.origin : 'https://dummy.local').pathname
      const last = pathname.split('/').filter(Boolean).pop() || url
      return last
    } catch {
      // 回退：简单从字符串末尾截取
      const parts = url.split('?')[0].split('#')[0].split('/')
      return parts[parts.length - 1] || url
    }
  }

  // 映射为 { name, url }[]
  const normalizedAttachments =
    (releaseInfo.attachments || []).map(url => ({
      name: parseFilenameFromUrl(url),
      url,
    })) ?? []

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    } catch {
      return dateString
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside" placement="center">
      <ModalContent>
        {onCloseModal => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center justify-between w-full">
                <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-100">{title} - 更新日志</h2>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                <span>发布时间: {formatDate(releaseInfo.published_at)}</span>
                <span>版本: {releaseInfo.latest_version}</span>
              </p>
            </ModalHeader>
            <ModalBody className="pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    a: ({ ...props }) => (
                      <a
                        {...props}
                        href={props.href || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      />
                    ),
                    h1: ({ ...props }) => <h1 className="text-xl font-bold mb-3 mt-4 text-zinc-950 dark:text-zinc-100" {...props} />,
                    h2: ({ ...props }) => <h2 className="text-lg font-bold mb-2 mt-3 text-zinc-950 dark:text-zinc-100" {...props} />,
                    h3: ({ ...props }) => <h3 className="text-base font-semibold mb-2 mt-2 text-zinc-950 dark:text-zinc-100" {...props} />,
                    p: ({ ...props }) => <p className="mb-2 text-zinc-700 dark:text-zinc-300" {...props} />,
                    ul: ({ ...props }) => <ul className="list-disc pl-5 mb-2 text-zinc-700 dark:text-zinc-300" {...props} />,
                    ol: ({ ...props }) => <ol className="list-decimal pl-5 mb-2 text-zinc-700 dark:text-zinc-300" {...props} />,
                    li: ({ ...props }) => <li className="mb-1 text-zinc-700 dark:text-zinc-300" {...props} />,
                    code: ({ ...props }) => (
                      <code className="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-700 rounded text-sm font-mono text-zinc-800 dark:text-zinc-200" {...props} />
                    ),
                    pre: ({ ...props }) => <pre className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-x-auto mb-2" {...props} />,
                  }}
                >
                  {releaseInfo.changelog || '暂无更新日志'}
                </ReactMarkdown>
              </div>

              {normalizedAttachments.length > 0 && (
                <div className="py-4 border-t border-zinc-200 dark:border-zinc-700">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-100">附件下载</h3>
                    <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300">
                      <span>使用 CDN 镜像</span>
                      <Switch size="sm" isSelected={useCdn} onValueChange={setUseCdn} aria-label="使用 CDN 镜像" />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {normalizedAttachments.map(({ name, url }, index) => (
                      <Button
                        key={index}
                        as="a"
                        href={cdnize(url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="sm"
                        className="bg-[#ca4940] hover:bg-[#B33B32] text-white"
                      >
                        {name}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </ModalBody>
            {/* <ModalFooter>
              <Button color="default" variant="light" onPress={onCloseModal}>
                关闭
              </Button>
            </ModalFooter> */}
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
