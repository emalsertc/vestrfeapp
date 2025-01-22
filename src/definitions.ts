import { Plugin } from '@capacitor/core';

export interface GoogleSignInPlugin extends Plugin {
  signIn(): Promise<{ token: string }>;
}

declare module '@capacitor/core' {
  interface PluginRegistry {
    GoogleSignIn: GoogleSignInPlugin;
  }
} 