import rest from '@/backend/rest'

let baseurl = '/customermanager/v1'

/**
 * 登陆
 */
export const login = data => rest(baseurl + '/customer/auth/login', data, 'POST');