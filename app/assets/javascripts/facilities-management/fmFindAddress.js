const finderComponent = {
  isRegionContainterPresent: $('[data-module=\'find-region\']').length > 0,

  $postcodeSearch: $('#postcode-search'),
  $postcodeChange: $('#postcode-change'),
  $selectAnAddress: $('#select-an-address'),
  $fullAddress: $('#full-address'),

  $findAddressBtn: $('#find-address-button'),
  $searchAddress: $('.postcode-entry').first(),
  $changePostcodeLink: $('#change-input-1'),
  $changeAddressLink: $('#change-input-2'),

  $addressDropDown: $('#address-results-container'),

  $postcodeText: $('#postcode-on-view'),
  $addressText: $('#address-text'),

  objectName: $('#object_name').val(),
  postcodeName: 'postcode',

  init () {
    this.setupSelectBoxes(this.$addressDropDown, this.selectAddress.bind(this))
    this.setupEventListenersForAddress()

    if (this.isRegionContainterPresent) {
      this.$changeRegionLink = $('#change-input-3')
      this.$regionDropDown = $('#regions-container')
      this.$regionText = $('#region-text')
      this.$fullRegion = $('#full-region')
      this.$selectARegion = $('#select-a-region')

      this.setupEventListenersForRegions()
      this.setupSelectBoxes(this.$regionDropDown, this.selectRegion.bind(this))
    }
  },

  setupSelectBoxes ($dropdownElement, selectFunction) {
    $dropdownElement.on('blur', (e) => {
      e.preventDefault()
      selectFunction()
    })

    if (!(/Windows/.test(navigator.userAgent))) {
      $dropdownElement.on('change', selectFunction)
    } else {
      $dropdownElement.on('click', (event) => {
        if (event.currenetTarget.selectedIndex > 0) {
          selectFunction()
        }
      })
      $dropdownElement.on('keypress', (event) => {
        if (event.keyCode === 13 && this.selectedIndex > 0) {
          event.preventDefault()
          event.stopPropagation()
          selectFunction()
        }
      })
    }
  },

  setupEventListenersForAddress () {
    const module = this

    this.$findAddressBtn.on('click', module.lookupInput.bind(this))

    this.$searchAddress.on('keypress', (e) => {
      if (e.keyCode === 13) {
        module.lookupInput(e)
      }
    })

    this.$changePostcodeLink.on('click', this.changeAddress.bind(this))
    this.$changeAddressLink.on('click', this.changeAddress.bind(this))

    $('#new_facilities_management_building').on('submit', () => {
      module.hideError(module.$searchAddress, module.postcodeName, 'input')
    })
  },

  setupEventListenersForRegions () {
    this.$changeRegionLink.on('click', this.changeRegion.bind(this))
  },

  lookupInput (e) {
    e.preventDefault()
    const module = this

    this.hideError(module.$searchAddress, this.postcodeName, 'input')

    const input = this.destructurePostCode(this.$searchAddress.val())

    if (input.valid) {
      module.findAddress(input.fullPostcode)
    } else {
      module.showError(module.$searchAddress)
    }
  },

  destructurePostCode (postcode) {
    const input = (`${postcode}`).trim().toUpperCase()
    const regEx = /^(([A-Z][A-Z]{0,1})([0-9][A-Z0-9]{0,1})) {0,}(([0-9])([A-Z]{2}))$/i
    const matches = input.match(regEx)

    if (matches !== null) {
      return {
        valid: true,
        fullPostcode: `${matches[1]} ${matches[4]}`
      }
    } else {
      return { valid: false }
    }
  },

  showError ($input) {
    $input.addClass('govuk-input--error')
    $($input.closest('.govuk-form-group')).addClass('govuk-form-group--error')

    const $errorMessage = $('#hidden-postcode-error').clone()
    $errorMessage.removeClass('govuk-visually-hidden')
    $errorMessage.attr('id', 'postcode-error')

    $('label[for="postcode"]').after($errorMessage)
  },

  hideError ($input, attribute, inputError) {
    $(`#${attribute}-form-group`).removeClass('govuk-form-group--error')
    $(`span[id='${attribute}-error']`).remove()
    $(`#error_${this.objectName}_${attribute}`).remove()
    $(`label[id='${attribute}-error'] > span`).addClass('govuk-visually-hidden')
    $input.removeClass(`govuk-${inputError}--error`)
  },

  findAddress (postcode) {
    const module = this
    const validPostcode = this.normalisePostcode(postcode)
    const url = encodeURI(`/api/v2/postcodes/${validPostcode}`)

    $.ajax({
      type: 'GET',
      url,
      data: $(this).serialize(),
      dataType: 'json',
      success (data) {
        module.processAddress(data.result, postcode)
      },
      error () {
        module.processAddress([], postcode)
      }
    })
  },

  normalisePostcode (postcode) {
    return postcode.toUpperCase().replace(/\s/g, '')
  },

  processAddress (result, postcode) {
    const module = this

    this.$addressDropDown.empty()
    this.setBlankOption(this.$addressDropDown, result.length, 'Please select an address')

    if (result.length > 0) {
      module.addAddressOptions(result)
    }

    this.$postcodeText.text(postcode)
    this.updateView(2)
  },

  addAddressOptions (addresses) {
    addresses.forEach((address) => {
      const newOption = document.createElement('option')
      newOption.value = address.summary_line
      newOption.innerText = address.summary_line
      newOption.dataset.address_line_1 = address.address_line_1
      newOption.dataset.address_line_2 = address.address_line_2
      newOption.dataset.address_town = address.address_town
      newOption.dataset.address_postcode = address.address_postcode
      this.$addressDropDown.append(newOption)
    })
  },

  setBlankOption (search, results, dropDownText) {
    const module = this
    let text

    if (results === 0) {
      text = search.data('withdata-text-plural')
      dropDownText = `0 ${text}`
    } else if (results === 1) {
      text = search.data('withdata-text-single')
    } else {
      text = search.data('withdata-text-plural')
    }

    text = `${results} ${text}`
    module.setBlankOptionText(search, text, dropDownText)
  },

  setBlankOptionText (search, optionalText, text) {
    const option = document.createElement('option')
    option.appendChild(document.createTextNode(text))

    search.prepend(`<optgroup label="${optionalText}"> </optgroup>`)
    search.append(option)
  },

  selectAddress () {
    const selectedOption = this.$addressDropDown.find('option:selected')

    if (selectedOption.index() <= 1) return

    this.hideError(this.$addressDropDown, 'base', 'select')

    $('#address-line-1').val(selectedOption.data('address_line_1'))
    $('#address-line-2').val(selectedOption.data('address_line_2'))
    $('#address-town').val(selectedOption.data('address_town'))
    this.$addressText.text(`${selectedOption.text()} ${selectedOption.data('address_postcode')}`)

    if (this.isRegionContainterPresent) {
      this.findRegion()
    } else {
      this.updateView(5)
    }
  },

  findRegion () {
    const module = this
    const postcode = this.$postcodeText.text()
    const validPostcode = this.normalisePostcode(postcode)
    const url = encodeURI(`/api/v2/find-region-postcode/${validPostcode}`)

    $.ajax({
      type: 'GET',
      url,
      data: $(this).serialize(),
      dataType: 'json',
      success (data) {
        module.processRegion(data.result)
      },
      error () {
        module.processRegion([])
      }
    })
  },

  processRegion (regions) {
    this.$regionDropDown.empty()
    this.setBlankOption(this.$regionDropDown, regions.length, 'Please select a region')

    if (regions.length > 0) {
      regions.forEach((region) => {
        const newOption = document.createElement('option')
        newOption.value = region.code
        newOption.innerText = region.region
        newOption.dataset.address_region = region.region
        newOption.dataset.address_region_code = region.code
        this.$regionDropDown.append(newOption)
      })
    }

    if (regions.length === 1) {
      this.selectOneRegion()
      this.updateView(5)
    } else {
      this.updateView(3)
    }
  },

  selectOneRegion () {
    this.$regionDropDown.find('option:eq(1)').attr('selected', 'selected')
    this.selectRegion()
  },

  selectRegion () {
    const selectedOption = this.$regionDropDown.find('option:selected')

    if (selectedOption.index() <= 1) return

    this.hideError(this.$regionDropDown, 'address_region', 'select')

    $('#address-region').val(selectedOption.data('address_region'))
    $('#address-region-code').val(selectedOption.data('address_region_code'))
    this.$regionText.text(selectedOption.data('address_region'))

    this.updateView(4)
  },

  changeAddress (e) {
    e.preventDefault()
    this.hideError(this.$addressDropDown, 'base', 'select')
    this.removeAddress()
    this.removeRegion()
    this.updateView(1)
  },

  changeRegion (e) {
    e.preventDefault()
    this.hideError(this.$regionDropDown, 'address_region', 'select')
    this.removeRegion()
    this.updateView(3)
  },

  removeAddress () {
    $('#address-line-1').val('')
    $('#address-line-2').val('')
    $('#address-town').val('')
    $('#address-county').val('')
  },

  removeRegion () {
    if (!this.isRegionContainterPresent) return

    this.$regionDropDown.find('option:selected').prop('selected', false)
    $('#address-region').val('')
    $('#address-region-code').val('')
  },

  updateView (state) {
    this.showOrHideInputs(state === 1, this.$postcodeSearch)
    this.showOrHideInputs(state === 1, this.$findAddressBtn)

    this.showOrHideInputs(state === 2, this.$postcodeChange)
    this.showOrHideInputs(state === 2, this.$selectAnAddress)

    this.showOrHideInputs([3, 4, 5].indexOf(state) !== -1, this.$fullAddress)

    if (this.isRegionContainterPresent) {
      this.showOrHideInputs(state === 3, this.$selectARegion)

      this.showOrHideInputs([4, 5].indexOf(state) !== -1, this.$fullRegion)

      this.showOrHideInputs(state === 4, this.$changeRegionLink)
    }

    this.updateFocus(state)
  },

  updateFocus (state) {
    switch (state) {
    case 1:
      this.$searchAddress.focus()
      break
    case 2:
      this.$addressDropDown.focus()
      break
    case 3:
      if (this.isRegionContainterPresent) this.$regionDropDown.focus()
      break
    case 4:
      if (this.isRegionContainterPresent) this.$changeRegionLink.focus()
      break
    case 5:
      this.$changeAddressLink.focus()
      break
    default:
      break
    }
  },

  showOrHideInputs (show, section) {
    let tabindex

    if (show) {
      section.removeClass('govuk-visually-hidden')
      tabindex = 0
    } else {
      section.addClass('govuk-visually-hidden')
      tabindex = -1
    }

    if (section.attr('tabindex')) section.attr('tabIndex', tabindex)
    section.find('[tabindex]').attr('tabIndex', tabindex)
  }
}

$(() => {
  if (document.querySelectorAll('[data-module=\'find-address\']').length) {
    finderComponent.init()
  }
})
