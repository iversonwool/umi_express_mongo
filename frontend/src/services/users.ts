import {request} from '@umijs/max'


export function users(data: any) {

  return request('/api/users', {
    method: 'GET',
    data
  })
}

export function createUser(data: any) {
  return request('/api/users/create', {
    method: 'POST',
    data,
  });
}

export function updateUser(data: any) {
  return request('/api/users/update', {
    method: 'POST',
    data,
  });
}

export function deleteUser(id: string) {
  return request('/api/users/delete', {
    method: 'POST',
    data: {_id: id},
  });
}
