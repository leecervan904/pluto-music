import { IPersonalizedMvItem } from '@pluto-music/api'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRequest } from '/@/utils'
import MvItem from '/@/components/mv-item/index'

const Container = styled.div`
  display: flex;
  gap: 20px;
  .mv-item {
    width: 22%;
  }
`

export default function PersonalizedMv() {
  const [mvs, setMvs] = useState<IPersonalizedMvItem[]>([])

  const getData = async () => {
    const [error, data] = await useRequest('getPersonalizedMv')()
    if (error) return
    setMvs(data.result)
    console.log(data.result)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Container>
      {mvs.map((mv) => (
        <div className="mv-item">
          <MvItem mv={mv} key={mv.id} />
        </div>
      ))}
    </Container>
  )
}
