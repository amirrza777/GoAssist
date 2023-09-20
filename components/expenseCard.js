import { View, Text, fontSize } from 'react-native'
import React from 'react'
import { categoryBG, colors } from '../theme'

export default function ExpenseCard({item}) {
  return (
    <View style={{backgroundColor: categoryBG[item.CarbonFootprint]}} className="flex-row justify-between items-center p-3 px-5 mb-3 bg-red-300 rounded-2xl">
        <View>
        <Text className={`${colors.heading} font-bold`}>{item.CarbonFootprint} Cubic Meters</Text>
        <Text className={`${colors.heading} text-xs`}>{item.EngineType}</Text>
      </View>
    </View>
  )
}