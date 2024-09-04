import { useRoute } from '@react-navigation/native'
import { useNavigation } from 'expo-router'
import React, { useEffect } from 'react'

import styled from 'styled-components/native'

const Wrapper = styled.View``
const Text = styled.Text``

const detail = () => {
  const { params } = useRoute()
  const navigation = useNavigation()
  console.log(params?.symbol)

  useEffect(() => {
    navigation.setOptions({
      title: params?.symbol
    })
  }, [])
  return (
    <Wrapper>
      <Text>Detail</Text>
    </Wrapper>
  )
}
export default detail
