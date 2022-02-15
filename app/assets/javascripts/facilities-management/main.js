import utils from './utils.js'
import { finderComponent } from './fmFindAddress.js'
import { ChooserComponent } from './chooserComponent.js'
import { numberInput } from './numberInput.js'
import { stepByStepNav } from './stepByStepNav.js'
import { contractPeriod } from './contractPeriod.js'

$(() => {
  if (document.querySelectorAll('[data-module=\'find-address\']').length) {
    finderComponent.init()
  }
})

$(() => {
  function initialiseChooseServices() {
    const obj = new ChooserComponent('procurement', 'services', utils.getCachedData('fm-locations'))
    if (obj.validate()) {
      return obj
    }
    return null
  }

  if ($('.chooser-component').length > 0) {
    try {
      let activeChooser = null
      if (activeChooser === null) {
        if ($('.services').length > 0) {
          activeChooser = initialiseChooseServices()
        }
      }

      if (activeChooser !== null) {
        activeChooser.init()
        activeChooser.PrimeBasket()
      }
    } catch (e) {
      console.log('No service chooser component found')
    }
  }
})

$(() => {
  function initialiseChooseLocations() {
    const obj = new ChooserComponent('procurement', 'regions', utils.getCachedData('fm-regions'))
    if (obj.validate()) {
      return obj
    }
    return null
  }

  if ($('.chooser-component').length > 0) {
    try {
      let activeChooser = null
      activeChooser = initialiseChooseLocations()

      if (activeChooser !== null) {
        activeChooser.init()
        activeChooser.PrimeBasket()
      }
    } catch (e) {
      console.log('No location chooser component found')
    }
  }
})

$(() => {
  if ($('.ccs-number-field').length) {
    numberInput.showNumberWithCommas()
  }

  if ($('.ccs-integer-field').length) {
    numberInput.limitInputToInteger()
  }
})

$(() => {
  if ($('#step-by-step-navigation').length > 0) {
    stepByStepNav.init()
  }
})

$(() => {
  if ($('.extensionContainer').length > 0) {
    contractPeriod()
  }
})
