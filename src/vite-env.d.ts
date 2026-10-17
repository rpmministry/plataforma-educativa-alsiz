/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_APP_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: { client_id: string; callback: (response: any) => void; auto_select?: boolean; prompt?: string }) => void;
          renderButton: (
            ref: HTMLElement | null,
            options: { theme?: string; size?: string; width?: number | string; text?: string }
          ) => void;
          prompt: (callback?: (response: any) => void) => void;
          disableAutoSelect: () => void;
        };
      };
    };
  }
}

export {};
