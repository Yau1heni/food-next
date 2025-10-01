import { enableStaticRendering } from 'mobx-react-lite';

export const isServer = typeof window === 'undefined';
enableStaticRendering(isServer);
