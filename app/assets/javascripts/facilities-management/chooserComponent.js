function ChooserComponent(baseClass, classification, selectedItems) {
  this._baseClass = baseClass
  this._classification = classification
  this._parentElementName = `div.${this._baseClass}`
  this._chooserElementName = `${this._parentElementName} .chooser-component.${this._classification}`
  this._checkboxSourceDivName = `${this._chooserElementName} div.chooser-input`
  this._basketName = `${this._parentElementName} .basket`
  this._basketContainer = null
  this._allCheckboxes = []
  this._sections = []
  this.selectedItems = selectedItems == null ? [] : selectedItems
}

ChooserComponent.prototype.validate = function () {
  let result = false

  result = ($(this._chooserElementName)).length > 0

  return result
}
ChooserComponent.prototype.init = function () {
  const result = false
  $('body').addClass('js-enabled')
  this._basketContainer = new BasketComponent(this._baseClass, this._classification, $(this._basketName), this.handleBasketRemove.bind(this))
  const sectionArray = $(`${this._checkboxSourceDivName} .govuk-accordion__section`)
  for (let index = 0; index < sectionArray.length; index++) {
    const elem = $(sectionArray[index])
    const elmInfo = elem.find('.govuk-accordion__section-content > div:nth-child(1)')
    const id = elmInfo.attr('section')
    const name = elmInfo.attr('sectionname')
    if (id !== undefined && name !== undefined) {
      const newSection = new ChooserSection(elem, id, name, this.checkboxHandler.bind(this))
      this._sections.push(newSection)
      this._sections[id] = newSection
    }
  }
  this._basketContainer.UpdateBasketNumber(0)

  return result
}
ChooserComponent.prototype.checkboxHandler = function (sectionEvent) {
  const chooserEvent = sectionEvent

  chooserEvent.baseClass = this._baseClass
  chooserEvent.classification = this._classification
  chooserEvent.isValid = this.GetValidStatus()
  chooserEvent.total_count = this.GetTotalCount()
  chooserEvent.selected_count = this.GetSelectedCount()

  const basketItem = {
    groupId: chooserEvent.sectionCode,
    captionText: chooserEvent.target.title,
    code: chooserEvent.target.id,
  }

  if (chooserEvent.select_all) {
    if (chooserEvent.target.checked) {
      const newCollection = chooserEvent.section._allCheckboxes.map((item) => {
        const newVal = {
          groupId: chooserEvent.section._allCheckboxes[item].getAttribute('sectionid'),
          code: chooserEvent.section._allCheckboxes[item].id,
          captionText: chooserEvent.section._allCheckboxes[item].title,
        }
        return newVal
      })
      this._basketContainer.AddItems(newCollection)
    } else {
      this._basketContainer.clearByGroupID.bind(this._basketContainer)(chooserEvent.sectionCode)
    }
  } else if (chooserEvent.target.checked) {
    this._basketContainer.AddItem(basketItem)
  } else {
    this._basketContainer.RemoveItem(basketItem)
  }

  this._basketContainer.UpdateBasketNumber(chooserEvent.selected_count)
}
ChooserComponent.prototype.handleBasketRemove = function (groupID, value) {
  const section = this._sections[groupID]
  section.uncheckItem.bind(section)(value)

  const chooserEvent = {
    baseClass: this._baseClass,
    classification: this._classification,
    isValid: this.GetValidStatus(),
    total_count: this.GetTotalCount(),
    selected_count: this.GetSelectedCount(),
  }

  this._basketContainer.UpdateBasketNumber(chooserEvent.selected_count)
}
ChooserComponent.prototype.GetValidStatus = function () {
  let status = false
  for (let index = 0; !status && index < this._sections.length; index++) {
    status = this._sections[index].IsSectionValid() || status
  }
  return status
}
ChooserComponent.prototype.GetTotalCount = function () {
  let total = 0

  for (let index = 0; index < this._sections.length; index++) {
    total += this._sections[index].GetTotalCount()
  }

  return total
}
ChooserComponent.prototype.GetSelectedCount = function () {
  let total = 0

  for (let index = 0; index < this._sections.length; index++) {
    total += this._sections[index].GetSelectedCount()
  }

  return total
}
ChooserComponent.prototype.PrimeBasket = function () {
  let selectedItems = []

  if (this.GetSelectedCount() > 0) {
    for (let index = 0; index < this._sections.length; index++) {
      const sectionItem = this._sections[index]
      const mappedItems = []
      sectionItem._allCheckboxes.each(function () {
        if (this.checked) {
          const cb = this
          const newItem = {
            code: cb.id,
            groupId: sectionItem._sectionCode,
            captionText: cb.title,
          }
          mappedItems.push(newItem)
        }
      })
      selectedItems = selectedItems.concat(mappedItems)
    }
    this._basketContainer.AddItems(selectedItems)
    this._basketContainer.UpdateBasketNumber(selectedItems.length)
  }
}

function ChooserSection($parentSection, sectionCode, sectionName, checkboxHandler) {
  this._parentElementName = $parentSection
  this._sectionName = sectionName
  this._sectionCode = sectionCode
  this._allCheckboxes = []
  this._allHandlerCheckbox = null
  this._selectAllCheckboxCount = 0
  this.init(checkboxHandler)
}

ChooserSection.prototype.init = function (checkboxCallback) {
  this._allCheckboxes = (this._parentElementName).find('input[type=\'checkbox\']').filter('input[name!=\'section-checkbox_select_all\']')
  this._allHandlerCheckbox = $(this._parentElementName).find('input[name=\'section-checkbox_select_all\']')
  this.setAllHandlerCheckbox(this.GetSelectedCount(), this.GetTotalCount())
  this.connectCheckboxes(checkboxCallback)
}
ChooserSection.prototype.connectCheckboxes = function (callback) {
  const $self = this
  $(this._allCheckboxes).on('click', (e) => {
    $self.checkboxHandler(e, callback)
  })
  $(this._allHandlerCheckbox).on('click', (e) => {
    $self.checkboxHandler(e, callback)
  })
}
ChooserSection.prototype.uncheckItem = function (value) {
  const target = this._allCheckboxes.filter((item) => this._allCheckboxes[item].id == value)
  $(target).prop('checked', false)
  if (this._allHandlerCheckbox) {
    this._allHandlerCheckbox.prop('checked', false)
  }
}
ChooserSection.prototype.IsSectionValid = function () {
  return this._allCheckboxes.filter(':checked').length > 0
}
ChooserSection.prototype.GetTotalCount = function () {
  return this._allCheckboxes.length - this._selectAllCheckboxCount
}
ChooserSection.prototype.GetSelectedCount = function () {
  return this._allCheckboxes.filter(':checked').length
}
ChooserSection.prototype.checkboxHandler = function (e, callback) {
  const sectionEvent = {
    section: this,
    target: e.target,
    targetid: e.target.id,
    targetname: e.target.name,
    sectionName: this._sectionName,
    sectionCode: this._sectionCode,
    section_total_count: undefined,
    section_selected_count: undefined,
    select_all: false,
  }
  if (sectionEvent.targetid.endsWith('_all')) {
    this._allCheckboxes.prop('checked', sectionEvent.target.checked)
    sectionEvent.select_all = true
  }
  sectionEvent.section_total_count = this.GetTotalCount()
  sectionEvent.section_selected_count = this.GetSelectedCount()

  this.setAllHandlerCheckbox(sectionEvent.section_selected_count, sectionEvent.section_total_count)

  callback(sectionEvent)
}
ChooserSection.prototype.setAllHandlerCheckbox = function (selectedCount, totalCount) {
  if (selectedCount == totalCount) {
    this._allHandlerCheckbox.prop('checked', true)
  } else {
    this._allHandlerCheckbox.prop('checked', false)
  }
}

function BasketComponent(baseClass, classification, jqueryObject, removeHandler) {
  this._baseClass = baseClass
  this._classification = classification
  this.jqueryObject = jqueryObject
  this.jqRemoveAll = null
  this.list = null
  this.removeAllBtn = null
  this.onRemove = removeHandler || this.onRemove
  this.init()
}

BasketComponent.prototype.init = function () {
  this.list = this.jqueryObject.find('ul')

  this.jqRemoveAll = this.jqueryObject.find('a.remove-link')
  if (this.jqRemoveAll.length > 0) {
    this.jqRemoveAll.on('click', this.RemoveAll.bind(this))
  }
}
BasketComponent.prototype.AddItems = function (itemsToAdd) {
  for (let index = 0; index < itemsToAdd.length; index++) {
    this.AddItem(itemsToAdd[index])
  }
}
BasketComponent.prototype.AddItem = function (itemToAdd) {
  const selectedID = `${itemToAdd.code}_basket`
  const removeLinkID = `${itemToAdd.code}_removeLink`

  const newLI = `<li style="margin-top:0; word-break: keep-all;" groupid="${itemToAdd.groupId}" class="govuk-list" id="${selectedID}">`
      + '<div style="float:right;"><span class="remove-link">'
      + `<a data-no-turbolink id="${removeLinkID}" groupid="${itemToAdd.groupId}" name="${removeLinkID}" href="" class="govuk-link font-size--8" >Remove</a>`
      + '</span></div>'
      + `<div style="float:left; max-width: 70%; float:left; font-size: 1rem;" >${itemToAdd.captionText}</div></li>`

  if (this.list) {
    if ($(this.list).find(`li#${selectedID}`).length === 0) {
      $(this.list).append(newLI)

      $(`#${removeLinkID}`).on('click', (e) => {
        e.preventDefault()
        this.removeSelectedItem(e.target.getAttribute('groupid'), e.target.id.replace('_removeLink', ''))
        this.onRemove(e.target.getAttribute('groupid'), e.target.id.replace('_removeLink', ''))
      })
    }
  }
}
BasketComponent.prototype.clear = function () {
  this.list[0].innerHTML = ''
  this.UpdateBasketNumber(0)
}
BasketComponent.prototype.clearByGroupID = function (groupID) {
  let item = null
  const collection = this.list.find(`li[groupid="${groupID}"]`)
  for (let index = 0; index < collection.length && (item = collection[index]) != null; index++) {
    this.removeSelectedItem('', item.id.replace('_basket', ''))
  }
}
BasketComponent.prototype.removeSelectedItem = function (groupID, selectedID) {
  $(`li#${selectedID}_basket`).remove()
}
BasketComponent.prototype.RemoveAll = function (e) {
  let item = null
  const collection = this.list.find('li')
  for (let index = 0; index < collection.length && (item = collection[index]) != null; index++) {
    this.removeSelectedItem('', item.id.replace('_basket', ''))
    this.onRemove(item.getAttribute('groupid'), item.id.replace('_basket', ''))
  }
  e.preventDefault()
}
BasketComponent.prototype.RemoveItem = function (itemToRemove) {
  this.removeSelectedItem(itemToRemove.groupId, itemToRemove.code)
}
BasketComponent.prototype.onRemove = function (sectionID, itemValue) {
  console.log(`Removing ${sectionID}.${itemValue}`)
}
BasketComponent.prototype.UpdateBasketNumber = function (count) {
  const selectedCount = $(`#selected-${this._classification}-count`)
  const selectedParent = selectedCount.parent()

  if (count < 2) {
    this.jqRemoveAll.hide()
  } else {
    this.jqRemoveAll.show()
  }
  if (selectedCount) {
    selectedCount.text(count)
  }

  if (selectedParent && selectedParent.data('txt01')) {
    if (count === 0) {
      selectedCount.text('')
      selectedCount.next().text(selectedParent.data('txt02'))
    } else if (count === 1) {
      $(`#selected-${this._classification}-count`).next().text(selectedParent.data('txt03'))
    } else {
      $(`#selected-${this._classification}-count`).next().text(selectedParent.data('txt01'))
    }
  }
}

export { ChooserComponent }