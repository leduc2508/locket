import React, { useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityCalendarStyle } from '../../assets/styles/ActivityCalendarSrceen.Style';
import Ionicons from '@expo/vector-icons/Ionicons';

const splitName = (name) => {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();
};
const getName = (fullname) => {
  const parts = fullname.trim().split(' ');
  return parts[parts.length - 1];
};

const ConpomentA = ({ user, opacity, translateY = 0, scale = 1 }) => (
  <Animated.View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
      paddingHorizontal: 10,
      opacity, // ẩn/hiện bằng opacity
      transform: [
        { translateY },
        { scale },
      ],
    }}
  >
    <View style={{ flexDirection: 'column' }}>
      <Text style={ActivityCalendarStyle.textBold}>{user.fullname}</Text>
      <Text style={ActivityCalendarStyle.textBold}>@{user.username}</Text>
    </View>
    <View style={ActivityCalendarStyle.borderAvatar}>
      <View style={ActivityCalendarStyle.avatar}>
        <Text style={ActivityCalendarStyle.textBold}>
          {splitName(user.fullname)}
        </Text>
      </View>
    </View>
  </Animated.View>
);

const SmallHeader = ({ user, opacity }) => (
  <Animated.View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      gap: 10,
      opacity, // ẩn/hiện bằng opacity
    }}
  >
    <View style={[ActivityCalendarStyle.avatar, { width: 40, height: 40 }]}>
      <Text style={[ActivityCalendarStyle.textBold, { fontSize: 30 }]}>
        {splitName(user.fullname)}
      </Text>
    </View>
    <Text style={ActivityCalendarStyle.textBold}>
      {getName(user.fullname)}
    </Text>
  </Animated.View>
);

const Calendar = ({ accountCreateDate, user }) => {
  const navigation = useNavigation();
  const months = React.useMemo(() => {
    const safeStart = new Date(accountCreateDate);
    const isValid = !isNaN(safeStart.getTime());
    const start = isValid ? safeStart : new Date();
    start.setDate(1);
    // render lùi về 1 tháng kể từ ngày tạo
    start.setMonth(start.getMonth() - 1);

    const now = new Date();
    now.setDate(1);

    const list = [];
    const cursor = new Date(start);
    while (
      cursor.getFullYear() < now.getFullYear() ||
      (cursor.getFullYear() === now.getFullYear() && cursor.getMonth() <= now.getMonth())
    ) {
      list.push({
        year: cursor.getFullYear(),
        month: cursor.getMonth(),
        key: `${cursor.getFullYear()}-${cursor.getMonth() + 1}`,
      });
      cursor.setMonth(cursor.getMonth() + 1);
    }
    return list;
  }, [accountCreateDate]);

  return (
    <View style={{ gap: 12 }}>
      {months.map((m) => {
        const firstDay = new Date(m.year, m.month, 1).getDay(); // 0=CN..6=Th7
        const daysInMonth = new Date(m.year, m.month + 1, 0).getDate();
        const prevMonthDays = new Date(m.year, m.month, 0).getDate();

        const leading = firstDay;
        const totalCells = 42;
        const cells = [];

        const today = new Date();
        const isCurrentMonth = today.getFullYear() === m.year && today.getMonth() === m.month;
        const todayDate = isCurrentMonth ? today.getDate() : null;

        for (let i = 0; i < leading; i++) {
          const dayNum = prevMonthDays - leading + 1 + i;
          cells.push({ key: `p-${i}`, type: 'prev', day: dayNum });
        }
        for (let d = 1; d <= daysInMonth; d++) {
          cells.push({ key: `c-${d}`, type: 'current', day: d });
        }
        while (cells.length < totalCells) {
          const nextIndex = cells.length - (leading + daysInMonth) + 1;
          cells.push({ key: `n-${nextIndex}`, type: 'next', day: nextIndex });
        }

        return (
          <View
            key={m.key}
            style={{ backgroundColor: '#2b1f17cc', borderRadius: 18, overflow: 'hidden' }}
          >
            <View style={{ backgroundColor: '#ffffff22', paddingHorizontal: 14, paddingVertical: 8 }}>
              <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>
                tháng {m.month + 1} {m.year}
              </Text>
            </View>
            <View style={{ paddingTop: 10, paddingHorizontal: 10 }}>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {cells.map((c, idx) => (
                  <View
                    key={c.key}
                    style={{
                      width: `${100 / 7}%`,
                      aspectRatio: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: Math.floor(idx / 7) === 5 ? 0 : 4,
                    }}
                  >
                    {c.type === 'current' ? (
                      isCurrentMonth && todayDate === c.day ? (
                        // Today: big circle with border and plus
                        <View
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 10,
                            borderWidth: 3,
                            borderColor: '#f5b400',
                            backgroundColor: '#3a2a1a',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => navigation.navigate('Home', { ...user, from: 'calendar' })}
                          >
                            <Text style={{ color: '#f5b400', fontWeight: 'bold', fontSize: 30, textAlign: 'center' }}>+</Text>
                          </TouchableOpacity>

                        </View>
                      ) : isCurrentMonth && todayDate !== null && c.day > todayDate ? (
                        // Future day in current month: medium circle placeholder
                        <View
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 10,
                            backgroundColor: 'rgba(255,255,255,0.12)',
                          }}
                        />
                      ) : (
                        // Past day in current month: dot
                        <View
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: '#7a6a60',
                          }}
                        />
                      )
                    ) : (
                      // không hiển thị dấu chấm cho ngày bù
                      <View />
                    )}
                  </View>
                ))}
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const ActivityCalendarScreen = () => {
  const route = useRoute();
  const user = route.params || {};
  const navigation = useNavigation();

  const accountCreateDate = user.createdAt
    ? new Date(user.createdAt)
    : new Date();

  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const startOffset = useRef(new Animated.Value(0)).current;
  const layoutHeightRef = useRef(0);
  const contentHeightRef = useRef(0);
  const [compAHeight, setCompAHeight] = useState(0);


  const effectiveY = Animated.subtract(scrollY, startOffset);
  const animY = Animated.multiply(effectiveY, -1);


  const compAOpacity = animY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });


  const compATranslateY = animY.interpolate({
    inputRange: [0, 120],
    outputRange: [0, -24],
    extrapolate: 'clamp',
  });

  const compAScale = animY.interpolate({
    inputRange: [0, 120],
    outputRange: [1, 0.95],
    extrapolate: 'clamp',
  });

  // translate để ẩn dần từ dưới lên bên trong container có overflow: hidden
  const compAHideTranslate = animY.interpolate({
    inputRange: [0, 120],
    outputRange: [0, -(compAHeight || 80)],
    extrapolate: 'clamp',
  });
  const totalTranslateY = Animated.add(compATranslateY, compAHideTranslate);


  const smallHeaderOpacity = animY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={ActivityCalendarStyle.container}>
      <View>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}
        >
          {/* Header trái đổi ẩn/hiện */}
          <SmallHeader user={user} opacity={smallHeaderOpacity} />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 10,
              gap: 20,
            }}
          >
            <Ionicons name="people" size={30} color="white" />
            <TouchableOpacity
              onPress={() => navigation.navigate('Setting', user)}>
              <Ionicons name="settings-sharp" size={30} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Home', { ...user, from: 'calendar' })}
            >
              <Ionicons name="chevron-forward-sharp" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Component A hiển thị mặc định với hiệu ứng thu từ dưới lên (gồm cả nền bao quanh) */}
        <View style={{ overflow: 'hidden' }}>
          <Animated.View
            onLayout={(e) => setCompAHeight(e.nativeEvent.layout.height)}
            style={{ transform: [{ translateY: totalTranslateY }] }}
          >
            <View
              style={{
                backgroundColor: '#343434ac',
                borderRadius: 10,
                padding: 16,

                // iOS
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 4,

                // Android
                elevation: 5,
              }}
            >
              <ConpomentA
                user={user}
                opacity={compAOpacity}
                translateY={0}
                scale={compAScale}
              />
            </View>
          </Animated.View>
        </View>
      </View>

      {/* Scroll nội dung */}
      <Animated.ScrollView
        style={{ flex: 1, marginTop: 20 }}
        ref={scrollViewRef}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        onLayout={(e) => {
          layoutHeightRef.current = e.nativeEvent.layout.height;
          if (contentHeightRef.current && scrollViewRef.current) {
            const offset = Math.max(contentHeightRef.current - layoutHeightRef.current, 0);
            startOffset.setValue(offset);
            scrollViewRef.current.scrollTo({ y: offset, animated: false });
          }
        }}
        onContentSizeChange={(_, contentHeight) => {
          contentHeightRef.current = contentHeight;
          if (layoutHeightRef.current && scrollViewRef.current) {
            const offset = Math.max(contentHeightRef.current - layoutHeightRef.current, 0);
            startOffset.setValue(offset);
            scrollViewRef.current.scrollTo({ y: offset, animated: false });
          }
        }}
      >
        <View
          style={{
            minHeight: 800,
            backgroundColor: '#333333ff',
            borderRadius: 12,
            margin: 10,
            padding: 10,
          }}
        >
          {/* Lịch ở đây */}
          <Calendar accountCreateDate={accountCreateDate} user={user} />
        </View>

        {/* Stats inline under the calendar (scrolls with content) */}
        <View style={{ alignItems: 'center', marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#2b1f17cc',
                borderRadius: 18,
                paddingVertical: 8,
                paddingHorizontal: 12,
              }}
            >
              <Ionicons name="heart" size={30} color="#f5c33b" />
              <Text style={[{ color: 'white', marginLeft: 6 }, ActivityCalendarStyle.textBold]}>
                {(user.totalLocket ?? 0)} Locket
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#2b1f17cc',
                borderRadius: 18,
                paddingVertical: 8,
                paddingHorizontal: 12,
              }}
            >
              <Ionicons name="flame" size={30} color="#f5c33b" />
              <Text style={[{ color: 'white', marginLeft: 6 }, ActivityCalendarStyle.textBold]}>
                {(user.streakDays ?? 0)}d chuỗi
              </Text>
            </View>
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default ActivityCalendarScreen;
