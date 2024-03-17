import { CanActivateFn } from '@angular/router';

export const loginGuard: CanActivateFn = () => {
  localStorage.removeItem('token');
  return true;
};
