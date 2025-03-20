import { Plugin } from '@growi/core';

class MyToolbarPlugin extends Plugin {
  constructor(pluginName) {
    super(pluginName);
  }

  async onAttached() {
    // ツールバーが読み込まれるのを待つ
    this.waitForToolbarAndAddButton();
  }

  waitForToolbarAndAddButton() {
    let attempts = 0;
    const maxAttempts = 10;
    
    const checkInterval = setInterval(() => {
      attempts++;
      const toolbar = document.querySelector('div._codemirror-editor-toolbar_eyhib_1');
      
      if (toolbar) {
        clearInterval(checkInterval);
        this.addCustomButton(toolbar);
      }
      else if (attempts >= maxAttempts) {
        clearInterval(checkInterval);
        console.warn('ツールバーが見つかりませんでした');
      }
    }, 1000);
  }

  addCustomButton(toolbar) {
    // ボタン要素の作成
    const button = document.createElement('button');
    button.className = 'btn btn-outline-secondary btn-sm';
    button.innerHTML = '<i class="fa fa-star"></i>'; // Font Awesomeアイコンの例
    button.title = 'カスタムボタン';
    
    // ボタンクリック時の動作
    button.addEventListener('click', () => {
      // エディタにテキストを挿入するロジック
      const editor = this.getEditor(); // エディタのインスタンスを取得する実装が必要
      if (editor) {
        editor.replaceSelection('挿入したいテキスト');
      }
    });
    
    // ツールバーに追加
    toolbar.appendChild(button);
  }
  
  // エディタインスタンスを取得するヘルパーメソッド
  getEditor() {
    // GROWIのエディタインスタンスにアクセスするロジック
    // 実際の実装はGROWIのバージョンによって異なる場合があります
    const editorContainer = document.querySelector('.editor-container');
    if (editorContainer && editorContainer.__vue__) {
      return editorContainer.__vue__.editor;
    }
    return null;
  }
}

// プラグインのインスタンス化と登録
const plugin = new MyToolbarPlugin('my-toolbar-plugin');
plugin.register();