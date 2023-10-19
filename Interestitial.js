import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import { GAMBannerAd, BannerAdSize, TestIds,InterstitialAd, AdEventType  } from 'react-native-google-mobile-ads';
const adUnitId = __DEV__ ? TestIds.GAM_BANNER : '/xxx/yyyy';
const adUnitId2 = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';
const interstitial = InterstitialAd.createForAdRequest(adUnitId2, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});
const Interestitial = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
    });

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);
  // No advert ready to show yet
  if (!loaded) {
    return null;
  }
  
  return (
    <View style={{flex:1}}>
    <GAMBannerAd
    unitId={adUnitId}
    sizes={[BannerAdSize.FULL_BANNER]}
    requestOptions={{
      requestNonPersonalizedAdsOnly: true,
    }}
  />
  <TouchableOpacity style={{width:'80%',height:50,borderWidth:1,alignSelf:'center',marginTop:100,justifyContent:'center',alignItems:'center'}} onPress={() => {
        interstitial.show();
      }}>
<Text>Show Interstial Ads</Text>
  </TouchableOpacity>
  </View>
  )
}

export default Interestitial