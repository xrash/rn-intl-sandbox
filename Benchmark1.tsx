import React, { useState } from 'react'
import { StyleSheet, View, Text, Platform, Button } from 'react-native'
import utcToZonedTime from 'date-fns-tz/utcToZonedTime'
import zonedTimeToUtc from 'date-fns-tz/zonedTimeToUtc'
import { perf } from './utils'
import range from 'lodash/range'
import format from 'date-fns-tz/format'
import * as Localization from 'expo-localization'

if (Platform.OS === 'android') {
  void import('intl')
  void import('intl/locale-data/jsonp/en')
  void import('date-time-format-timezone')
}

const TIMES = 150

export const Benchmark1 = () => {

  const run = () => {

    const dotest = async () => {
      const expoLocalization = await Localization.getLocalizationAsync()
      console.log('expo-localization', expoLocalization)

      console.log('Intl.DateTimeFormat().resolvedOptions()', Intl.DateTimeFormat().resolvedOptions())

      console.log('=== START ===')

      perf(() => {
        range(TIMES).forEach(() => {
          Intl.DateTimeFormat()
        })
      }, `run Intl.DateTimeFormat() ${TIMES} times`)

      perf(() => {
        range(TIMES).forEach(() => {
          Intl.DateTimeFormat().resolvedOptions()
        })
      }, `run Intl.DateTimeFormat().resolvedOptions() ${TIMES} times`)

      perf(() => {
        range(TIMES).forEach(() => {
          const now = new Date()
          utcToZonedTime(now, 'America/Sao_Paulo')
        })
      }, `run utcToZonedTime(America/Sao_Paulo) ${TIMES} times`)

      perf(() => {
        range(TIMES).forEach(() => {
          const now = new Date()
          utcToZonedTime(now, undefined)
        })
      }, `run utcToZonedTime(undefined) ${TIMES} times`)

      perf(() => {
        range(TIMES).forEach(() => {
          const date = new Date()
          const fmt = 'd MMM yyyy'
          const timeZone = 'America/Sao_Paulo'
          format(date, fmt, {
            timeZone,
          })
        })
      }, `run format() with timezone America/Sao_Paulo ${TIMES} times`)

      perf(() => {
        range(TIMES).forEach(() => {
          const date = new Date()
          const fmt = 'd MMM yyyy'
          const timeZone = undefined
          format(date, fmt, {
            timeZone,
          })
        })
      }, `run format() with timezone undefined ${TIMES} times`)

      perf(() => {
        range(TIMES).forEach(() => {
          const date = new Date()
          const fmt = 'd MMM yyyy'
          format(date, fmt)
        })
      }, `run format() without timezone ${TIMES} times`)

      perf(() => {
        range(TIMES).forEach(() => {
          const fn = () => { 15 + 25 + 35 * 150 }
          fn()
        })
      }, `run reference fn 1 ${TIMES} times`)

      perf(() => {
        const t = (
          <View><Text>{'AAABBBCCC'}</Text></View>
        )
      }, `run reference fn 2 ${TIMES} times`)

      console.log('=== END ===')
    }

    void dotest()
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
