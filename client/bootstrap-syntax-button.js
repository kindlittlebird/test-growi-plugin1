function addBootstrapSyntaxButton() {
    let toolbar = document.querySelector('div.d-flex.gap-2');
  
    if (!toolbar || document.getElementById("bootstrap-syntax-btn")) {
      return;
    }
  
    let button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn-toolbar-button";
    button.id = "bootstrap-syntax-btn";
    button.innerHTML = `<span class="material-symbols-outlined">view_timeline</span>`;
  
    button.addEventListener("click", function () {
      alert("Bootstrap Syntax Button Clicked!");
    });
  
    toolbar.appendChild(button);
  }
  
  document.addEventListener("DOMContentLoaded", addBootstrapSyntaxButton);
  