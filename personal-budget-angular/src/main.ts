import { provideHttpClient } from '@angular/common/http';

export const appConfig = {
  providers: [
    provideHttpClient() // ✅ Ensures HttpClient is available
  ]
};

