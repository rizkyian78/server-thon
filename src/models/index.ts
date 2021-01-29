import Role from 'models/Role'
import User from 'models/User'
import RefreshToken from 'models/RefreshToken'
import Category from 'models/Category'
import Activity from 'models/Activity'
import Bank from './Bank'
import Booking from './Booking'
import Feature from './Feature'
import Image from './Image'
import Item from './Item'

export interface FilterAttributes {
  id: string
  value: string
}

export interface SortAttributes {
  id: string
  desc: string
}

export interface FilterQueryAttributes {
  page: string | number
  pageSize: string | number
  filtered: string
  sorted: string
}

export default {
  Role,
  User,
  RefreshToken,
  Category,
  Activity,
  Bank,
  Booking,
  Feature,
  Image,
  Item,
}
