type Endpoints = '/products' | '/users' | '/customers' | '/orders' | '/me'
type Methods = 'POST' | 'DELETE' | 'PUT'

export interface IUseAxios {
  endpoint: Endpoints
  method: Methods
}
