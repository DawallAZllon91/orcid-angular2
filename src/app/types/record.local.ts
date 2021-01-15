import {
  Biography,
  Countries,
  EmailsEndpoint,
  ExternalIdentifier,
  Keywords,
  Names,
  OtherNames,
  Person,
  Preferences,
  Website,
} from '.'

export interface UserRecord {
  person: Person
  emails: EmailsEndpoint
  otherNames: OtherNames
  countries: Countries
  keyword: Keywords
  website: Website
  externalIdentifier: ExternalIdentifier
  names: Names
  biography: Biography
  preferences: Preferences
}
