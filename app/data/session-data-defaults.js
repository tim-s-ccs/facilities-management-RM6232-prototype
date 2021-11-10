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

const tables = require('../../dist/app/data/tables').default

module.exports = {
  user: {
    id: 1,
    email: 'buyer@example.com'
  },
  tables: tables
}
