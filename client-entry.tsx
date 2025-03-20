import React from 'react';
import { GrowiPluginType } from '@growi/core/dist/consts';
import { usePluginHooks } from '@growi/core/dist/plugin/hook';

export default (crowi: any) => {
  usePluginHooks(crowi, {
    // エディタのツールバーにボタンを追加
    'editor:toolbar': (toolbar: any) => {
      toolbar.items.push({
        name: 'custom-button',
        icon: 'fa fa-star',
        action: () => alert('Custom button clicked!'),
        tooltip: 'Custom Button',
      });
    },
  });
};