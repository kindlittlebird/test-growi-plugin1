module.exports = function (crowi) {
  crowi.events.on('editor:initialized', () => {
    console.log('Editor initialized - Custom Button Plugin Loaded');

    const toolbar = document.querySelector('.editor-toolbar');
    if (toolbar) {
      const button = document.createElement('button');
      button.textContent = 'Custom';
      button.classList.add('custom-editor-button');
      button.onclick = () => {
        alert('Custom button clicked!');
      };
      toolbar.appendChild(button);
    }
  });
};
