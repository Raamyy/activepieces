import {
  createPiece,
  PieceAuth,
  Property,
} from '@activepieces/pieces-framework';
import { uploadFile } from './lib/actions/upload-file';
import { createCustomApiCallAction } from '@activepieces/pieces-common';

export const supabaseAuth = PieceAuth.CustomAuth({
  required: true,
  props: {
    url: Property.ShortText({
      displayName: 'URL',
      required: true,
    }),
    apiKey: PieceAuth.SecretText({
      displayName: 'API Key',
      required: true,
    }),
  },
});
export const supabase = createPiece({
  displayName: 'Supabase',
  auth: supabaseAuth,
  minimumSupportedRelease: '0.6.0',
  logoUrl: 'https://cdn.activepieces.com/pieces/supabase.png',
  authors: ['abuaboud'],
  actions: [
    uploadFile,
    createCustomApiCallAction({
      baseUrl: (auth) => (auth as { url: string }).url,
      auth: supabaseAuth,
      authMapping: (auth) => ({
        Authorization: `Bearer ${(auth as { apiKey: string }).apiKey}`,
      }),
    }),
  ],
  triggers: [],
});