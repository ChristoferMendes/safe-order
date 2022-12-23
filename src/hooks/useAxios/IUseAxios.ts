type Endpoints = '/products' | '/users' | '/customers' | '/orders'
type Methods = 'POST' | 'DELETE' | 'PUT'

export interface IUseAxios {
  endpoint: Endpoints
  method: Methods
}
