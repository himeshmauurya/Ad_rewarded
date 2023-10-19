import { View, Text, TouchableOpacity, Button } from 'react-native';
import React, { useEffect, useState } from 'react';

import { RewardedAd, TestIds, RewardedAdEventType } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const Reward2 = () => {
  const [loaded, setLoaded] = useState(false);
  const [adReady, setAdReady] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setLoaded(true);
      setAdReady(true);
    });

    const unsubscribeEarned = rewarded.addAdEventListener(
       
      RewardedAdEventType.EARNED_REWARD,
      
      reward => {
        console.log("object",RewardedAdEventType);
        console.log('User earned reward of ', reward);
      },
    );

  rewarded.addAdEventListener('closed',()=>{
    console.log("object")
    rewarded.load();
  })

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    //   unsubscribeClosed();
    };
  }, []);

  // No advert ready to show yet
  if (!adReady) {
    return null;
  }

  return (
    <TouchableOpacity
      style={{
        width: '80%',
        height: 50,
        borderWidth: 1,
        alignSelf: 'center',
        marginTop: 100,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={() => {
        rewarded.show();
        setAdReady(false);

        // Add a listener for the AdEventType.CLOSED event.
        // rewarded.addAdEventListener(RewardedAdEventType.CLOSED, () => {
        //   // The ad has closed.
        //   console.log('Ad closed.');

        //   // Navigate to the button screen.
        //   // ...
        // });
      }}
    >
      <Text>Show Rewarded Ad</Text>
    </TouchableOpacity>
  );
};

export default Reward2;
