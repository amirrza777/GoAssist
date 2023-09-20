import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../theme'
import ScreenWrapper from '../components/screenWrapper'
import randomImage from '../assets/images/randomimage'
import EmptyList from '../components/emptyList'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { signOut } from 'firebase/auth'
import { auth, distanceRef } from '../config/firebase'
import { useSelector } from 'react-redux'
import { getDocs, query, where } from 'firebase/firestore'

const items = [
    {
      id: 1, 
      distance: 40+' Km', 
      EngineType: 'Gasoline'
    },
    {
      id: 2, 
      distance: 10+' Km',
      EngineType: 'Hybrid',
    },
    {
      id: 3, 
      distance: 76+' Km',
      EngineType: 'Diesel',
    },
    {
      id: 4, 
      distance: 27+' Km',
      EngineType: 'Gasoline'
    }
  ]

export default function HomeScreen() {
    const navigation = useNavigation();

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

    const handleLogout = async ()=>{
        await signOut(auth);
    }

  return (
    <ScreenWrapper className="flex-1">
        <View className="flex-row justify-between ites-center p-4">
            <Text className={`${colors.heading} font-bold text-3xl shadow-sm`}>GoAssist</Text>
            <TouchableOpacity onPress={handleLogout} className="p-2 px-3 bg-white border border-gray-200 rounded-full">
                <Text className={colors.heading}>Logout</Text>
            </TouchableOpacity>
        </View>
        <View className="flex-row justify-center items-center bg-blue-200 rounded-xl mx-4 mb-4">
            <Image source={require('../assets/images/banner.png')} className="w-60 h-60" />
        </View>
        <View className="px-4 space-y-3">
            <View className="flex-row justify-between items-center ">
                <Text className={`${colors.heading} font-bold text-xl`}>Recent Trips</Text>
                <TouchableOpacity onPress={()=> navigation.navigate('AddTrip')} className="p-2 px-3 bg-white border border-gray-200 rounded-full">
                    <Text className={colors.heading}>Add Trip</Text>
                </TouchableOpacity>
            </View>
            <View style={{height:430}}>
                <FlatList 
                    data={trips}
                    numColumns={2}
                    ListEmptyComponent={<EmptyList message = {"You don't have any trips yet"}/>}
                    keyExtractor={item=> item.id}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={{
                        justifyContent: 'space-between'
                    }}
                    className="mx-2"
                    renderItem={({item})=>{
                        return (
                            <TouchableOpacity onPress={()=> navigation.navigate('TripExpenses', {...item})} className="bg-white p-3 rounded-2xl mb-3 shadow-sm">
                                <View>
                                    <Image source={randomImage()} className="w-36 h-36 mb-2" />
                                    <Text className={`${colors.heading} font-bold`}>{item.distance}</Text>
                                    <Text className={`${colors.heading} text-xs`}>{item.EngineType}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        </View>
    </ScreenWrapper>
  )
}