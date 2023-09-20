import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../theme'
import ScreenWrapper from '../components/screenWrapper'
import randomImage from '../assets/images/randomimage'
import EmptyList from '../components/emptyList'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import BackButton from '../components/backButton'
import ExpenseCard from '../components/expenseCard'
import { getDocs, query, where } from 'firebase/firestore'
import { auth, distanceRef } from '../config/firebase'
import { useSelector } from 'react-redux'

const items = [
    {
      id: 1, 
      CarbonFootprint: 4000, 
      EngineType: 'Gasoline'
    }
  ]



export default function TripExpensesScreen(props) {

    const {user} = useSelector(state=> state.user);
    const [trips, setTrips] = useState([]);

    const isFocused = useIsFocused();

    const fetchTrips = async ()=>{
        const q = query(distanceRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        let data = [];
        querySnapshot.forEach(doc=>{
            // console.log('document: ', doc.data());
            data.push({...doc.data(), id: doc.id});
        })
        setTrips(data);
    }

    useEffect(()=>{
        if(isFocused)
            fetchTrips();
    },[isFocused])

    const navigation = useNavigation();
    const {id} = props.route.params;
  return (
    <ScreenWrapper className="flex-1">
        <View className="px-4">
            <View className="relative mt-5">
                <View className="absolute top-2 left-0 z-10">
                    <BackButton />
                </View>
                <View>
                <Text className={`${colors.heading} text-xl font-bold text-center`}>Carbon Footprint For Current Trip</Text>
                </View>
                </View>
            <View className="flex-row justify-center items-center rounded-xl mb-4">
                <Image source={require('../assets/images/7.png')} className="w-80 h-80" />
            </View>
            <View className="space-y-3">
                <View className="flex-row justify-between items-center ">
                    <Text className={`${colors.heading} font-bold text-xl`}>Carbon Footprint</Text>
                    <Text>{item.distance}</Text>
                </View>
                <View style={{height:430}}>
                    <FlatList 
                        data={items}
                        ListEmptyComponent={<EmptyList message = {"You don't have any trips yet"}/>}
                        keyExtractor={item=> item.id}
                        showsVerticalScrollIndicator={false}
                        className="mx-2"
                        renderItem={({item})=>{
                            return (
                                <Text>{item.distance}</Text>
                            )
                        }}
                    />
                </View>
            </View>
        </View>
         
    </ScreenWrapper>
  )
}