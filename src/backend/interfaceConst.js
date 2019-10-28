import rest from '@/backend/rest'

let version = '/customermanager/v1'

/**
 * 登陆
 */
export const login = data => rest(version + '/customer/auth/login', data, 'POST');