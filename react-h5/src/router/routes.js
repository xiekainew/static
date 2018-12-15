import {default as load} from '@/async-component'

// async components
const Login = load(() => import('@/pages/Login'))
const List = load(() => import('@/pages/List'))
const Product = load(() => import('@/pages/Product'))
const Plan = load(() => import('@/pages/Product/plan'))
const PlanCover = load(() => import('@/pages/Product/cover'))
const ProductOpen = load(() => import('@/pages/Product/open'))
const PolicyList = load(() => import('@/pages/Policy/List'))
const PolicyProduct = load(() => import('@/pages/Policy/policy-product'))
const Pay = load(() => import('@/pages/Policy/pay'))
const PolicyDetail = load(() => import('@/pages/Policy/List/detail'))
const PolicyDetailBeneficiary = load(() => import('@/pages/Policy/List/beneficiariesInfo'))
const PolicyInsure = load(() => import('@/pages/Policy/Insure'))
const Payment = load(() => import('@/pages/Payment'))

const routes = [
  {
    path: '/login',
    component: Login,
    meta: {
      title: ''
    }
  },
  {
    path: '/list',
    needLogin: true,
    component: List
  },
  {
    path: '/product/:id',
    needLogin: true,
    component: Product
  },
  {
    path: '/product/:id/plan',
    needLogin: true,
    component: Plan
  },
  {
    path: '/product/:id/cover',
    component: PlanCover
  },
  {
    path: '/product/:id/open',
    needLogin: true,
    component: ProductOpen
  },
  {
    path: '/policylist',
    needLogin: true,
    component: PolicyList
  },
  {
    path: '/policy/product/:id',
    needLogin: true,
    component: PolicyProduct
  },
  {
    path: '/policy/pay',
    needLogin: true,
    component: Pay
  },
  {
    path: '/policylist/:id',
    needLogin: true,
    component: PolicyDetail
  },
  {
    path: '/policylist/:id/beneficiary',
    needLogin: true,
    component: PolicyDetailBeneficiary
  },
  {
    path: '/policyinsure',
    needLogin: true,
    component: PolicyInsure
  },
  {
    path: '/payment',
    needLogin: true,
    component: Payment
  }
]

export default routes
