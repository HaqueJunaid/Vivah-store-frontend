export interface GoogleCredentialResponse {
  credential?: string;
}

declare global {
  interface Window {
    google?: {
      accounts?: {
        id?: {
          cancel?: () => void;
          initialize: (options: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
            ux_mode: 'popup';
            credential_helper: 'none';
            itp_support: boolean;
          }) => void;
          renderButton: (element: HTMLElement, options: {
            theme: 'outline';
            size: 'large';
            width: string;
          }) => void;
        };
      };
    };
  }
}