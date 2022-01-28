# Facilities Management RM6232 Prototype

This was created using the [GOV.UK Prototype Kit](https://github.com/alphagov/govuk-prototype-kit).
You can go to the [GOV.UK Prototype Kit site](https://govuk-prototype-kit.herokuapp.com/docs) to read the documentation on how it can be used to create prototypes.

This specific project hosts the code for the Facilities Management RM6232 prototype.
This is the next framework of Facilities Management which is building on the work done from the [previous framework](https://github.com/Crown-Commercial-Service/crown-marketplace).

## About the Prototype

The intention for this prototype is for it to be used in some user testing activities so that we can get feedback and make improvements.
This should result in an overall better experience for our customers when the new framework goes live.


As an added bonus, it should also make development easier as we are able get a better idea of how the application should be laid out before development starts.

## Access

This prototype is hosted on Heroku on [https://ccs-fm-rm6232-prototype.herokuapp.com/facilities-management/RM6232](https://ccs-fm-rm6232-prototype.herokuapp.com/facilities-management/RM6232).

You will need a username and password to access it.
To obtain these credentials you will need to contact a member of the Facilities Management prototype project.

## Technologies and additional projects

### TypeScript

It was decided that we would adapt the GOV.UK Prototype Kit to use TypeScript.
This was because some of the logic that is in Facilities Management was quite complicated and it was thought using TypeScript would help make writing and debugging easier.

### CCS Prototype Kit Model Interface

Because Facilities Management is quite data intensive, an additional project was created called [CCS Prototype Kit Model Interface](https://github.com/tim-s-ccs/ccs-prototype-kit-model-interface/).
This project is designed to work with the GOV.UK Prototype Kit and add features such as:
- Models
- Validations
- A data structure and interface to work with the prototype

This has allowed us to make the prototype more similar to the real application.

It should be noted that this project is still a **work in progress** and it is undecided if it will be maintained beyond this prototype.

### CCS Frontend

In order to add the CCS stylings to the application, another project was created called [CCS Frontend](https://github.com/tim-s-ccs/ts-ccs-frontend).
This is based on the [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend) and is very easy to integrate into this project.
This allows us to have the CCS stylings for the header and footer without much issue.

It should be noted that this project is still a **work in progress** and it is undecided if it will be maintained beyond this prototype, however the author is hopeful that it will be.

## Security

CCS is an advocate of responsible vulnerability disclosure. If you’ve found a vulnerability, we would like to know so we can fix it.

If you have discovered a security vulnerability in this code, we appreciate your help in disclosing it to us in a responsible manner.

Please follow the [CCS vulnerability reporting steps](https://www.crowncommercial.gov.uk/about-ccs/vulnerability-disclosure-policy/), giving details of any issue you find. Appropriate credit will be given to those reporting confirmed issues.
