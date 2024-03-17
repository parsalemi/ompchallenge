import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";

export const checkAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem("token");
  if(Boolean(token)) {
    return true;
  }
  router.navigate(['dashboard/signIn']);
  return false;
};

