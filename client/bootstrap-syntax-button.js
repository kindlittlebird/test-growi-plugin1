//202503 テスト
document.addEventListener("DOMContentLoaded", function () {
  // ここでinsertTextToEditor関数を定義
  function insertTextToEditor(html) {
      const editor = document.querySelector('[contenteditable="true"]');
      if (!editor) {
          console.warn('エディタが見つかりません。');
          return;
      }

      // エディタをフォーカス
      editor.focus();

      // 現在の選択範囲を取得
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);

      // 新しいdivを作成して、HTMLを挿入
      const newNode = document.createElement('div');
      
      // 文字列をそのまま挿入（エスケープせず）
      newNode.innerHTML = html; // ここでHTMLをそのまま入れます。

      // 挿入位置を調整
      const fragment = document.createDocumentFragment();
      while (newNode.firstChild) {
          fragment.appendChild(newNode.firstChild);
      }

      range.deleteContents();  // 現在選択されている範囲を削除
      range.insertNode(fragment);  // 新しい内容を挿入
  }

  function addBootstrapSyntaxButton() {
     let toolbar = document.querySelector('div._codemirror-editor-toolbar_eyhib_1 div.flex-grow-1 div.simplebar-content div.gap-2');
     //let toolbar = document.querySelector('div.d-flex.gap-2'); //別枠では端に表示させる場合はこっち

      if (!toolbar) {
          console.warn('エディタのツールバーが見つかりません。');
          return;
      }

      if (document.getElementById("bootstrap-syntax-btn")) {
          return;
      }

      let btn = document.createElement("button");
      btn.id = "bootstrap-syntax-btn";
      btn.className = "btn btn-toolbar-button";
      //btn.innerHTML = '<span class="material-symbols-outlined">extension</span>';
      //btn.innerHTML = '<span class="material-symbols-outlined">variable_add</span>';  //追加ボタンのアイコンセット(Material Symbols Icons)
      btn.innerHTML = '<span class="material-symbols-outlined">view_timeline</span>';  //追加ボタンのアイコンセット

     toolbar.appendChild(btn);

      btn.addEventListener("click", function () {
          let existingMenu = document.getElementById("bootstrap-syntax-menu");
          if (existingMenu) {
              existingMenu.remove();
          }

          let menu = document.createElement("div");
          menu.id = "bootstrap-syntax-menu";
          menu.className = "dropdown-menu show";
          menu.innerHTML = `
              <button class="dropdown-item" id="insert-bootstrap-alert">🚨アラート</button>
              <button class="dropdown-item" id="insert-bootstrap-warning">⚠️ワーニング</button>
              <button class="dropdown-item" id="insert-bootstrap-success">✅Success</button>
              <button class="dropdown-item" id="insert-bootstrap-info">ℹ️Info</button>
              <button class="dropdown-item" id="insert-alert-block">🚨🔲アラートブロック</button>
              <button class="dropdown-item" id="insert-warning-block">⚠️🔲ワーニングブロック</button>
              <button class="dropdown-item" id="insert-success-block">✅🔲Successブロック</button>
              <button class="dropdown-item" id="insert-info-block">ℹ️🔲Infoブロック</button>
              <button class="dropdown-item" id="insert-content-box">📦コンテンツボックス</button>
          `;

          document.body.appendChild(menu);

          let rect = btn.getBoundingClientRect();
          menu.style.position = "absolute";
       // ボタンの上にメニューを表示するように調整
          menu.style.top = `${rect.top - menu.offsetHeight + window.scrollY}px`;
          menu.style.left = `${rect.left + window.scrollX}px`;

          // メニューの外側をクリックしたらメニューを閉じる
          setTimeout(() => {
              function closeMenuOnClickOutside(event) {
                  if (!menu.contains(event.target) && event.target !== btn) {
                      menu.remove();
                      document.removeEventListener("click", closeMenuOnClickOutside);
                  }
              }
              document.addEventListener("click", closeMenuOnClickOutside);
          }, 0);

//アラート用
          document.getElementById("insert-bootstrap-alert").addEventListener("click", function (event) {
              event.preventDefault();
              insertTextToEditor(`
<span class="ͼ34">&lt;</span><span class="ͼ34">div</span> class=<span class="ͼ34">&quot;</span>alert alert-danger<span class="ͼ34">&quot;</span> role=<span class="ͼ34">&quot;</span>alert<span class="ͼ34">&quot;</span><span class="ͼ34">&gt;</span>
これは Bootstrap のアラートボックスです！
<span class="ͼ34">&lt;/</span><span class="ͼ34">div</span><span class="ͼ34">&gt;</span>
`);
              menu.remove();
          });

//ワーニング用
         document.getElementById("insert-bootstrap-warning").addEventListener("click", function (event) {
              event.preventDefault();
              insertTextToEditor(`
<span class="ͼ34">&lt;</span><span class="ͼ34">div</span> class=<span class="ͼ34">&quot;</span>alert alert-warning<span class="ͼ34">&quot;</span> role=<span class="ͼ34">&quot;</span>alert<span class="ͼ34">&quot;</span><span class="ͼ34">&gt;</span>
これは Bootstrap のワーニングボックスです！
<span class="ͼ34">&lt;/</span><span class="ͼ34">div</span><span class="ͼ34">&gt;</span>
`);
              menu.remove();
          });

//Success用
         document.getElementById("insert-bootstrap-success").addEventListener("click", function (event) {
              event.preventDefault();
              insertTextToEditor(`
<span class="ͼ34">&lt;</span><span class="ͼ34">div</span> class=<span class="ͼ34">&quot;</span>alert alert-success<span class="ͼ34">&quot;</span> role=<span class="ͼ34">&quot;</span>alert<span class="ͼ34">&quot;</span><span class="ͼ34">&gt;</span>
これは Bootstrap のSuccessボックスです！
<span class="ͼ34">&lt;/</span><span class="ͼ34">div</span><span class="ͼ34">&gt;</span>
`);
              menu.remove();
          });
          
//Info用
         document.getElementById("insert-bootstrap-info").addEventListener("click", function (event) {
              event.preventDefault();
              insertTextToEditor(`
<span class="ͼ34">&lt;</span><span class="ͼ34">div</span> class=<span class="ͼ34">&quot;</span>alert alert-info<span class="ͼ34">&quot;</span> role=<span class="ͼ34">&quot;</span>alert<span class="ͼ34">&quot;</span><span class="ͼ34">&gt;</span>
これは Bootstrap のInfoボックスです！
<span class="ͼ34">&lt;/</span><span class="ͼ34">div</span><span class="ͼ34">&gt;</span>
`);
              menu.remove();
          });


// メニューに「コンテンツボックス」項目を追加
         document.getElementById("insert-content-box").addEventListener("click", function (event) {
             event.preventDefault();
  // 新しい一意のIDを生成（例えば、ランダムなIDを付与）
  const uniqueId = 'collapse-' + Date.now();  // 現在の時刻をIDとして利用
             // コンテンツボックス用のHTMLコードを特殊文字をエスケープして挿入
             insertTextToEditor(`
<span class="ͼ34">&lt;</span>a class="btn btn-info text-white" data-bs-toggle="collapse" href="#${uniqueId}"&gt;
コンテンツを表示する
<span class="ͼ34">&lt;/</span>a&gt;

<span class="ͼ34">&lt;</span>div class="collapse" id="${uniqueId}"&gt;
<span class="ͼ34">&lt;</span>div class="card card-body"&gt;

- 表示させたいコンテンツの内容が入ります

<span class="ͼ34">&lt;/</span>div&gt;
<span class="ͼ34">&lt;/</span>div&gt;
`);
              menu.remove();
          });

// アラートブロック用のコードを挿入
document.getElementById("insert-alert-block").addEventListener("click", function (event) {
  event.preventDefault();
  insertTextToEditor(`
<span class="ͼ34">&lt;</span><span class="ͼ34">blockquote</span> class=<span class="ͼ34">&quot;</span>is-danger<span class="ͼ34">&quot;</span><span class="ͼ34">&gt;</span>

<span class="ͼ34">&lt;</span><span class="ͼ34">font</span><span class="ͼ34"> size</span><span class="ͼ34">=</span><span class="ͼ34">&quot;</span>6<span class="ͼ34">&quot;</span>><span class="ͼ34">:rotating_light:</span>重要<span class="ͼ34">&lt;</span><span class="ͼ34">/</span><span class="ͼ34">font</span><span class="ͼ34">&gt;</span>
<span class="ͼ34">&lt;</span><span class="ͼ34">br</span><span class="ͼ34">/</span><span class="ͼ34">&gt;</span>
アラートブロック
<span class="ͼ34">&lt;</span><span class="ͼ34">br</span><span class="ͼ34">/</span><span class="ͼ34">&gt;</span>

<span class="ͼ34">&lt;/</span><span class="ͼ34">blockquote</span><span class="ͼ34">&gt;</span>
`);
  menu.remove();  // メニューを閉じる処理
});

// ワーニングブロック用のコードを挿入
document.getElementById("insert-warning-block").addEventListener("click", function (event) {
  event.preventDefault();
  insertTextToEditor(`
<span class="ͼ34">&lt;</span><span class="ͼ34">blockquote</span> class=<span class="ͼ34">&quot;</span>is-warning<span class="ͼ34">&quot;</span><span class="ͼ34">&gt;</span>

<span class="ͼ34">&lt;</span><span class="ͼ34">font</span><span class="ͼ34"> size</span><span class="ͼ34">=</span><span class="ͼ34">&quot;</span>6<span class="ͼ34">&quot;</span>><span class="ͼ34">:warning:</span>注意<span class="ͼ34">&lt;</span><span class="ͼ34">/</span><span class="ͼ34">font</span><span class="ͼ34">&gt;</span>
<span class="ͼ34">&lt;</span><span class="ͼ34">br</span><span class="ͼ34">/</span><span class="ͼ34">&gt;</span>
ワーニングブロック
<span class="ͼ34">&lt;</span><span class="ͼ34">br</span><span class="ͼ34">/</span><span class="ͼ34">&gt;</span>

<span class="ͼ34">&lt;/</span><span class="ͼ34">blockquote</span><span class="ͼ34">&gt;</span>
`);
  menu.remove();  // メニューを閉じる処理
});

// Successブロック用のコードを挿入
document.getElementById("insert-success-block").addEventListener("click", function (event) {
  event.preventDefault();
  insertTextToEditor(`
<span class="ͼ34">&lt;</span><span class="ͼ34">blockquote</span> class=<span class="ͼ34">&quot;</span>is-success<span class="ͼ34">&quot;</span><span class="ͼ34">&gt;</span>

<span class="ͼ34">&lt;</span><span class="ͼ34">font</span><span class="ͼ34"> size</span><span class="ͼ34">=</span><span class="ͼ34">&quot;</span>6<span class="ͼ34">&quot;</span>><span class="ͼ34">:white_check_mark:</span>OK<span class="ͼ34">&lt;</span><span class="ͼ34">/</span><span class="ͼ34">font</span><span class="ͼ34">&gt;</span>
<span class="ͼ34">&lt;</span><span class="ͼ34">br</span><span class="ͼ34">/</span><span class="ͼ34">&gt;</span>
Successブロック
<span class="ͼ34">&lt;</span><span class="ͼ34">br</span><span class="ͼ34">/</span><span class="ͼ34">&gt;</span>

<span class="ͼ34">&lt;/</span><span class="ͼ34">blockquote</span><span class="ͼ34">&gt;</span>
`);
  menu.remove();  // メニューを閉じる処理
});

// Infoブロック用のコードを挿入
document.getElementById("insert-info-block").addEventListener("click", function (event) {
  event.preventDefault();
  insertTextToEditor(`
<span class="ͼ34">&lt;</span><span class="ͼ34">blockquote</span> class=<span class="ͼ34">&quot;</span>is-info<span class="ͼ34">&quot;</span><span class="ͼ34">&gt;</span>

<span class="ͼ34">&lt;</span><span class="ͼ34">font</span><span class="ͼ34"> size</span><span class="ͼ34">=</span><span class="ͼ34">&quot;</span>6<span class="ͼ34">&quot;</span>><span class="ͼ34">:information_source:</span>情報<span class="ͼ34">&lt;</span><span class="ͼ34">/</span><span class="ͼ34">font</span><span class="ͼ34">&gt;</span>
<span class="ͼ34">&lt;</span><span class="ͼ34">br</span><span class="ͼ34">/</span><span class="ͼ34">&gt;</span>
Infoブロック
<span class="ͼ34">&lt;</span><span class="ͼ34">br</span><span class="ͼ34">/</span><span class="ͼ34">&gt;</span>

<span class="ͼ34">&lt;/</span><span class="ͼ34">blockquote</span><span class="ͼ34">&gt;</span>
`);
  menu.remove();  // メニューを閉じる処理
});





      });
  }

  let checkInterval = setInterval(() => {
      let toolbar = document.querySelector('div._codemirror-editor-toolbar_eyhib_1');
      if (toolbar) {
          clearInterval(checkInterval);
          addBootstrapSyntaxButton();
      }
  }, 3000);
});

//ーーーーーーーーーここまでテスト


