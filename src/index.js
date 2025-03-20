module.exports = function(crowi) {
    const logger = require('@alias/logger')('growi:plugins:custom-editor-button');
    
    // 初期化処理
    const initialize = () => {
      logger.info('custom-editor-button plugin initialized');
      
      // コンソールに確認用のメッセージ
      console.log('custom-editor-button plugin initialized');
  
      // 編集画面のボタン追加
      if (crowi.pluginService.isV5Available()) {
        // GROWIv5の場合
        registerEditorButtonV5();
      } else {
        // GROWIv4以前の場合（古いバージョン）
        registerEditorButtonLegacy();
      }
    };
  
    // GROWIv5向けボタン追加
    const registerEditorButtonV5 = () => {
      const customButton = {
        icon: 'fa fa-star', // FontAwesomeのアイコンクラス
        name: 'customButton',
        text: 'Custom Button',
        actionHandler: (cw) => {
          // エディタのセレクションを取得
          const editor = cw?.markdownEditor?.getEditorHandler?.();
          if (!editor) return;
          
          const currentSelection = editor.getSelection();
          
          // 選択範囲を何かで囲む、またはカーソル位置に何かを挿入
          editor.replaceSelection(`【${currentSelection}】`);
        },
      };
  
      // エディタツールバーに登録
      if (crowi.customEditorButtons == null) {
        crowi.customEditorButtons = [];
      }
      crowi.customEditorButtons.push(customButton);
    };
  
    // 古いバージョン向け（必要に応じて）
    const registerEditorButtonLegacy = () => {
      // 古いバージョン用のコード
      logger.info('Legacy version is not supported by this plugin');
    };
  
    // プラグイン情報
    const meta = {
      name: "Custom Editor Button",
      description: "Add custom buttons to GROWI editor menu",
    };
  
    return {
      meta,
      init: initialize,
    };
  };