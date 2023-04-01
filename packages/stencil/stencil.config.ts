import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { vueOutputTarget } from '@stencil/vue-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'stencil',
  plugins: [sass()],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    vueOutputTarget({
      componentCorePackage: '@pluto-music/stencil',
      proxiesFile: '../vue-library/lib/components.ts',
    }),
    reactOutputTarget({
      componentCorePackage: '@pluto-music/stencil',
      proxiesFile: '../react-library/lib/components/stencil-generated/index.ts',
    }),
  ],
};
