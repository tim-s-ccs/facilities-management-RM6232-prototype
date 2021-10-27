/*

Provide default values for user session data. These are automatically added
via the `autoStoreData` middleware. Values will only be added to the
session if a value doesn't already exist. This may be useful for testing
journeys where users are returning or logging in to an existing application.

============================================================================

Example usage:

"full-name": "Sarah Philips",

"options-chosen": [ "foo", "bar" ]

============================================================================

*/

module.exports = {
  user: {
    email: 'buyer@example.com',
    buyerDetail: {
      id: '1',
      fullName: 'James Bond',
      jobTitle: 'Secret Agent',
      telephoneNumber: '0345 007 2222',
      organisationName: 'MI6',
      organisationAddress: {
        addressLine1: 'SIS Building',
        addressLine2: '85 Albert Embankment',
        city: 'London',
        postcode: 'SE11 5AW'
      },
      centralGovernment: 'true'
    }
  }
  // Insert values here

}
