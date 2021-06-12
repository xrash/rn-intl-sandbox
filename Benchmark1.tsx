import React, { useState } from 'react'
import { StyleSheet, View, Platform, Button } from 'react-native'
import utcToZonedTime from 'date-fns-tz/utcToZonedTime'
import zonedTimeToUtc from 'date-fns-tz/zonedTimeToUtc'
import { perf } from './utils'
import range from 'lodash/range'
import format from 'date-fns-tz/format'

if (Platform.OS === 'android') {
  void import('intl')
  void import('intl/locale-data/jsonp/en')
  void import('date-time-format-timezone')
}

export const Benchmark1 = () => {

  const run = () => {
    console.log('=== START ===')

    console.log('got timezone:', Intl.DateTimeFormat().resolvedOptions().timeZone)

    perf(() => {
      range(50).map(() => {
        Intl.DateTimeFormat()
      })
    }, 'run Intl.DateTimeFormat() 50 times')

    perf(() => {
      range(50).map(() => {
        Intl.DateTimeFormat().resolvedOptions()
      })
    }, 'run Intl.DateTimeFormat().resolvedOptions() 50 times')

    perf(() => {
      range(50).map(() => {
        const now = new Date()
        utcToZonedTime(now, 'America/Sao_Paulo')
      })
    }, 'run utcToZonedTime(America/Sao_Paulo)  50 times')

    perf(() => {
      range(50).map(() => {
        const now = new Date()
        utcToZonedTime(now, undefined)
      })
    }, 'run utcToZonedTime(undefined)  50 times')

    perf(() => {
      range(50).map(() => {
        const date = new Date()
        const fmt = 'd MMM yyyy'
        const timeZone = 'America/Sao_Paulo'
        format(date, fmt, {
          timeZone,
        })
      })
    }, 'run format() with timezone America/Sao_Paulo 50 times')

    perf(() => {
      range(50).map(() => {
        const date = new Date()
        const fmt = 'd MMM yyyy'
        const timeZone = undefined
        format(date, fmt, {
          timeZone,
        })
      })
    }, 'run format() with timezone undefined 50 times')

    perf(() => {
      range(50).map(() => {
        const date = new Date()
        const fmt = 'd MMM yyyy'
        format(date, fmt)
      })
    }, 'run format() without timezone 50 times')

    console.log('=== END ===')
  }

  return (
    <View style={styles.container}>
      <Button title="run" onPress={run} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    padding: 64,
  },
})