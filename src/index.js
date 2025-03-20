import { Plugin } from '@growi/core';

class MyToolbarPlugin extends Plugin {
  constructor(pluginName) {
    super(pluginName);
  }

  async onAttached() {
    console.log('MyToolbarPlugin: プラグインが読み込まれました');
    
    // DOMContentLoadedイベントを待つ
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initPlugin());
    } else {
      this.initPlugin();
    }
  }

  initPlugin() {
    console.log('MyToolbarPlugin: 初期化を開始します');
    // 記事のサンプルに合わせてMutationObserverを使用
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          this.checkAndAddButton();
        }
      }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    // 最初の確認
    this.checkAndAddButton();
  }

  checkAndAddButton() {
    // 記事ではクラス名を '.layout-root' で見つけています
    // GROWIのバージョンによって適切なセレクタを使用してください
    const toolbar = document.querySelector('.editor-toolbar');
    if (toolbar && !toolbar.querySelector('.my-custom-button')) {
      console.log('MyToolbarPlugin: ツールバーを発見しました、ボタンを追加します');
      this.addButton(toolbar);
    }
  }

  addButton(toolbar) {
    const button = document.createElement('button');
    button.className = 'btn btn-outline-secondary btn-sm my-custom-button';
    button.innerHTML = '<i class="fa fa-star"></i>';
    button.title = 'マイカスタムボタン';
    
    button.addEventListener('click', () => {
      console.log('MyToolbarPlugin: ボタンがクリックされました');
      // エディタの取得方法は記事を参考に
      const editor = document.querySelector('.CodeMirror').CodeMirror;
      if (editor) {
        editor.replaceSelection('挿入するテキスト');
      }
    });
    
    toolbar.appendChild(button);
    console.log('MyToolbarPlugin: ボタンを追加しました');
  }
}

// プラグインのインスタンス化と登録
console.log('MyToolbarPlugin: プラグイン登録を開始します');
const plugin = new MyToolbarPlugin('my-toolbar-plugin');
export default plugin;