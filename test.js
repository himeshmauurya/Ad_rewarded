import { View, Text, TouchableOpacity, Button } from 'react-native';
import React, { useEffect, useState } from 'react';

import { RewardedAd, TestIds, RewardedAdEventType } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const Reward = () => {
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
        console.log('User earned reward of ', reward);
      },
    );

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
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
        // Reload the ad after the user closes it.
        rewarded.load();
      }}
    >
      <Text>Show Rewarded Ad</Text>
    </TouchableOpacity>
  );
};

export default Reward;
