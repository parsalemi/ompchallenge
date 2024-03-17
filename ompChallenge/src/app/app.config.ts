import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { tokenInterceptor} from "./core/interceptor/token.interceptor";
import { provideHttpClient, withInterceptors } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors([tokenInterceptor])),provideRouter(routes), provideClientHydration()]
};
