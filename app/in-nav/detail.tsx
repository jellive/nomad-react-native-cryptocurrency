import { useRoute } from '@react-navigation/native'
import React from 'react'

import styled from 'styled-components/native'

const Wrapper = styled.View``
const Text = styled.Text``

const detail = () => {
  const route = useRoute()
  console.log(route)
  return (
    <Wrapper>
      <Text>Detail</Text>
    </Wrapper>
  )
}
export default detail
