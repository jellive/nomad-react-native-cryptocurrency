import { info, history } from '@/apis'
import { Icon } from '@/components/Coin'
import { BLACK_COLOR } from '@/utils/colors'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import {
  CartesianChart,
  Line,
  PointsArray,
  Scatter,
  useAnimatedPath,
  useLinePath
} from 'victory-native'

import styled from 'styled-components/native'
import { View } from 'react-native'
import { Path } from '@shopify/react-native-skia'

const Container = styled.ScrollView`
  background-color: ${BLACK_COLOR};
`

const InterpolationLine = ({ points }: { points: PointsArray }) => {
  const { path } = useLinePath(points, { curveType: 'monotoneX' })
  const animPath = useAnimatedPath(path, { type: 'spring' })
  return (
    <Path path={animPath} style="stroke" strokeWidth={2} color={'#1abc9c'} />
  )
}

const detail = () => {
  const { params }: { params: { symbol: string; id: string } } = useRoute()
  const navigation = useNavigation()
  console.log(params)

  useEffect(() => {
    navigation.setOptions({
      // title: params?.symbol,
      headerLargeTitle: true,

      headerTitle: () => (
        <Icon
          source={{
            uri: `https://cryptoicon-api.pages.dev/api/icon/${params?.symbol.toLowerCase()}`
          }}
        />
      )
    })
  }, [])
  const { isLoading: infoLoading, data: infoData } = useQuery(
    ['coinInfo', params.id],
    info
  )

  const { isLoading: historyLoading, data: historyData } = useQuery(
    ['coinHistory', params.id],
    history
  )
  const [victoryData, setVictoryData] = useState([])
  useEffect(() => {
    if (historyData) {
      setVictoryData(
        historyData.map((price: { timestamp: string; price: string }) => ({
          x: new Date(price.timestamp).getTime(),
          y: price.price
        }))
      )
    }
  }, [historyData])
  console.log('victoryData', victoryData)
  return (
    <Container>
      {!historyData ? null : (
        <View style={{ height: 360 }}>
          <CartesianChart data={victoryData} xKey="time" yKeys={['y']}>
            {({ points }) => (
              <>
                <InterpolationLine points={points.y} />
                <Scatter
                  points={points.y}
                  shape="circle"
                  radius={3}
                  style="fill"
                  color={'#1abc9c'}
                />
              </>
            )}
          </CartesianChart>
        </View>
      )}
    </Container>
  )
}
export default detail
