import React from 'react'
import { Skeleton } from 'antd'

export default function SkeletonComponent({
  loading = false,
  paragraph = { rows: 1, width: '100%' },
  children = null as any,
}) {
  return <Skeleton loading={loading} active avatar paragraph={paragraph}>
    {children}
  </Skeleton>
}
