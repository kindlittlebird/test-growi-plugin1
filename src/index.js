import { Plugin } from '@growi/core';

class MyToolbarPlugin extends Plugin {
  constructor(pluginName) {
    super(pluginName);
    console.log('MyToolbarPlugin: プラグインが初期化されました');
  }

  async onAttached() {
    console.log('MyToolbarPlugin: onAttached が呼び出されました');
    // ツールバーが読み込まれるのを待つ
    this.waitForToolbarAndAddButton();
  }

  waitForToolbarAndAddButton() {
    console.log('MyToolbarPlugin: ツールバーの検索を開始します');
    let attempts = 0;
    const maxAttempts = 20; // 試行回数を増やす
    
    const checkInterval = setInterval(() => {
      attempts++;
      console.log(`MyToolbarPlugin: ツールバー検索試行 ${attempts}/${maxAttempts}`);
      
      // セレクタを複数試してみる
      const toolbarSelectors = [
        'div._codemirror-editor-toolbar_eyhib_1',
        '.editor-toolbar',
        '.CodeMirror-toolBar',
        '.growi-editor-toolbar',
        '.rich-attachment-addon',
        '.user-dropdown-menu', // 明らかに存在する要素で確認テスト
      ];
      
      let toolbar = null;
      for (const selector of toolbarSelectors) {
        const element = document.querySelector(selector);
        if (element) {
          console.log(`MyToolbarPlugin: 要素が見つかりました: ${selector}`, element);
          toolbar = element;
          break;
        }
      }
      
      if (toolbar) {
        clearInterval(checkInterval);
        console.log('MyToolbarPlugin: ツールバーが見つかりました。ボタンを追加します');
        this.addCustomButton(toolbar);
      }
      else if (attempts >= maxAttempts) {
        clearInterval(checkInterval);
        console.warn('MyToolbarPlugin: ツールバーが見つかりませんでした。現在のDOM構造:', document.body.innerHTML.substring(0, 500) + '...');
      }
    }, 1000);
  }

  addCustomButton(toolbar) {
    console.log('MyToolbarPlugin: ボタン作成開始');
    try {
      // ボタン要素の作成
      const button = document.createElement('button');
      button.className = 'btn btn-outline-secondary btn-sm';
      button.innerHTML = '<i class="fa fa-star"></i>'; // Font Awesomeアイコンの例
      button.title = 'カスタムボタン';
      
      console.log('MyToolbarPlugin: ボタン要素を作成しました', button);
      
      // ボタンクリック時の動作
      button.addEventListener('click', () => {
        console.log('MyToolbarPlugin: ボタンがクリックされました');
        // エディタにテキストを挿入するロジック
        const editor = this.getEditor();
        console.log('MyToolbarPlugin: 取得したエディタ:', editor);
        if (editor) {
          editor.replaceSelection('挿入したいテキスト');
        }
      });
      
      // ツールバーに追加
      toolbar.appendChild(button);
      console.log('MyToolbarPlugin: ボタンをツールバーに追加しました');
    } catch (error) {
      console.error('MyToolbarPlugin: ボタン追加中にエラーが発生しました', error);
    }
  }
  
  getEditor() {
    console.log('MyToolbarPlugin: エディタを取得しようとしています');
    try {
      // いくつかの方法を試してエディタを見つける
      const possibleEditorContainers = [
        document.querySelector('.editor-container'),
        document.querySelector('.CodeMirror'),
        document.querySelector('.monaco-editor')
      ];
      
      for (const container of possibleEditorContainers) {
        if (!container) continue;
        
        console.log('MyToolbarPlugin: エディタコンテナの候補を見つけました', container);
        
        // Vue.jsインスタンスを確認
        if (container.__vue__ && container.__vue__.editor) {
          console.log('MyToolbarPlugin: Vue.jsエディタインスタンスを見つけました');
          return container.__vue__.editor;
        }
        
        // CodeMirrorの場合
        if (container.CodeMirror) {
          console.log('MyToolbarPlugin: CodeMirrorインスタンスを見つけました');
          return container.CodeMirror;
        }
      }
      
      console.warn('MyToolbarPlugin: エディタインスタンスを見つけられませんでした');
      return null;
    } catch (error) {
      console.error('MyToolbarPlugin: エディタ取得中にエラーが発生しました', error);
      return null;
    }
  }
}

// プラグインのインスタンス化と登録
console.log('MyToolbarPlugin: プラグイン登録を開始します');
const plugin = new MyToolbarPlugin('my-toolbar-plugin');
plugin.register();
console.log('MyToolbarPlugin: プラグイン登録が完了しました');