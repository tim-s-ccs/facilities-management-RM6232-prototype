const stepByStepNav = {
  $stepByStepNav: $('#step-by-step-navigation'),
  $stepPanels: $('.js-toggle-panel'),

  init() {
    // Prepare elements
    this.getTextForInsertedElements()
    this.addButtonstoSteps()
    this.addShowHideAllButton()
    this.addShowHideToggle()

    this.$toggleAllButton = $('.app-step-nav__button.app-step-nav__button--controls.js-step-controls-button')

    // Setup event listeners
    this.addEventListenersToPanels()
    this.addEventListenerToToggleAll()
  },

  // Setup elements
  getTextForInsertedElements () {
    this.actions = {
      showText: this.$stepByStepNav.attr('data-show-text'),
      hideText: this.$stepByStepNav.attr('data-hide-text'),
      showAllText: this.$stepByStepNav.attr('data-show-all-text'),
      hideAllText: this.$stepByStepNav.attr('data-hide-all-text')
    }
  },

  addButtonstoSteps () {
    this.$stepPanels.each((_, element) => {
      const $step = $(element)
      const $title = $step.find('.js-step-title')
      const contentId = $step.find('.js-panel').first().attr('id')

      $title.wrapInner(
        '<span class="js-step-title-text"></span>'
      )

      $title.wrapInner(
        '<button ' +
        'class="app-step-nav__button app-step-nav__button--title js-step-title-button" ' +
        'aria-expanded="false" aria-controls="' + contentId + '">' +
        '</button>'
      )
    })
  },
  
  addShowHideAllButton () {
    this.$stepByStepNav.prepend('<div class="app-step-nav__controls"><button aria-expanded="false" class="app-step-nav__button app-step-nav__button--controls js-step-controls-button">' + this.actions.showAllText + '</button></div>')
  },

  addShowHideToggle () {
    this.$stepPanels.each((_, element) => {
      $(element).find('.js-step-title-button').append(
        `<span class="app-step-nav__toggle-link js-toggle-link" aria-hidden="true" hidden>${this.actions.showText}</span>`
      )
    })
  },

  // Event listeners
  addEventListenersToPanels() {
    this.$stepPanels.on('click', (event) => {
      event.preventDefault()

      this.togglePanel(event.target)
    })
  },

  addEventListenerToToggleAll() {
    this.$toggleAllButton.on('click', (event) => {
      event.preventDefault()

      this.toggleAllPanels()
    })
  },

  // Action functions
  togglePanel(panelButton) {
    const $panel = $($(panelButton).parents('.app-step-nav__step').get(0))

    if (this.sectionIsShown($panel)) {
      this.updatePanel($panel, false)
    } else {
      this.updatePanel($panel, true)
    }

    this.updateToggleAllText()
  },

  toggleAllPanels() {
    const showPanel = !this.areAllShown()

    this.$stepPanels.each((_, panelButton) => {
      const $panel = $($(panelButton).parents('.app-step-nav__step').get(0))

      this.updatePanel($panel, showPanel)
    })

    this.updateToggleAllText()
  },

  sectionIsShown($panel) {
    return $panel.hasClass('step-is-shown')
  },

  // Show and hide individual panels
  updatePanel($panel, isShown) {
    $panel.toggleClass('step-is-shown', isShown)
    $panel.find('.js-panel').toggleClass('js-hidden', !isShown)
    $panel.find('.js-step-title-button').attr('aria-expanded', isShown)
    $panel.find('.js-toggle-link').html(isShown ? this.actions.hideText : this.actions.showText)
  },

  // Show/Hide all buttons
  updateToggleAllText() {
    let text
    let ariaExpanded
  
    if (this.areAllShown()) {
      text = this.actions.hideAllText
      ariaExpanded = true
    } else {
      text =  this.actions.showAllText
      ariaExpanded = false
    }

    this.$toggleAllButton.text(text)
    this.$toggleAllButton.attr('aria-expanded', ariaExpanded)
  },

  areAllShown() {
    return $('.step-is-shown').length === $('.js-step').length
  }
}

export { stepByStepNav }
