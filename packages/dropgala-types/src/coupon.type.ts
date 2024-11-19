import { Nullable, Scalars } from './custom.type'
import { CouponDiscountType } from './enums.type'

export interface CouponType {
  id?: Nullable<Scalars['ID']>
  code?: Nullable<Scalars['String']>
  discountValue?: Scalars['Int']
  discountType?:
    | {
        value: CouponDiscountType
      }
    | CouponDiscountType
  timesUsed?: Nullable<Scalars['Int']>
  maxUsage?: Nullable<Scalars['Int']>
  orderAmountLimit?: Nullable<Scalars['Int']>
  couponStartDate?: Nullable<Scalars['Date']>
  couponEndDate?: Nullable<Scalars['Date']>
}
