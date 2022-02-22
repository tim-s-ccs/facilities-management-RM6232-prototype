const selectServicesForBuildings = {
  init() {
    this.checkAllSelected()
    this.initSelectAll()
  },

  areAllChecked() {
    return $('input.govuk-checkboxes__input[data-input="procurement-building__input"]').length === $('input.govuk-checkboxes__input[data-input="procurement-building__input"]:checked').length
  },

  checkAllSelected() {
    $('#box-all').prop('checked', this.areAllChecked())
  },

  checkAll(choice) {
    $('input.govuk-checkboxes__input[data-input="procurement-building__input"]').each((_, element) =>{
      $(element).prop('checked', choice)
    })
    $('#box-all').prop('checked', choice)
  },

  initSelectAll() {
    $('.govuk-checkboxes').each((_, element) => {
      $(element).on('click', () => {
        this.checkAllSelected()
      })
    })

    $('#box-all').on('click', () => {
      this.checkAll(!selectServicesForBuildings.areAllChecked())
    })
  },
}

export { selectServicesForBuildings }