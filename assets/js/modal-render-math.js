function insertReadmeHtmlAndRender(readmeHtml, targetElement) {
  targetElement.innerHTML = readmeHtml;

  // MathJax v3
  if (window.MathJax && MathJax.typesetPromise) {
    MathJax.typesetPromise([targetElement]).catch(function (err) {
      console.error('MathJax typeset error:', err);
    });
  }
  // KaTeX auto-render fallback
  else if (window.renderMathInElement) {
    renderMathInElement(targetElement, {
      delimiters: [
        {left: "$$", right: "$$", display: true},
        {left: "$", right: "$", display: false},
        {left: "\\(", right: "\\)", display: false},
        {left: "\\[", right: "\\]", display: true}
      ]
    });
  }
}
