let api=localStorage.getItem("api");
    async function fetchDefinitionData(word) {
      const re = "You are herbert garrison a teacher your job is to explain "+ word + "In simple terms if possible attach youtube video links";
      const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key='+api;
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: re }]
              }
            ]
          })
        });
        const data = await response.json();
        return data.candidates[0]?.content?.parts[0]?.text || 'No definition found.';
      } catch (error) {
        console.error('Error fetching definition:', error);
        return 'Error fetching definition.';
      }
    }

    function convertMarkdownToHTML(markdown) {
      // Convert headers, bold, italic, links, and line breaks
      let html = markdown
        .replace(/### (.*$)/gim, '<h3>$1</h3>')  // ### Header
        .replace(/## (.*$)/gim, '<h2>$1</h2>')   // ## Header
        .replace(/# (.*$)/gim, '<h1>$1</h1>')    // # Header
        .replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>') // **Bold**
        .replace(/\*(.*?)\*/gim, '<i>$1</i>')     // *Italic*
        .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>") // [Text](Link)
        .replace(/\n/gim, '<br />');              // Line breaks

      // Convert unordered lists (lines starting with '- ')
      html = html.replace(/^\s*-\s+(.*)/gm, '<ul><li>$1</li></ul>');
      
      // Convert ordered lists (lines starting with '1. ', '2. ', etc.)
      html = html.replace(/^\s*\d+\.\s+(.*)/gm, '<ol><li>$1</li></ol>');

      // Handle nested lists and ensure they are properly wrapped
      html = html.replace(/<\/ul>\s*<ul>/g, '')  // Remove extra </ul><ul> tags
                .replace(/<\/ol>\s*<ol>/g, '')  // Remove extra </ol><ol> tags
                .replace(/<\/li><br \/><li>/g, '</li><li>'); // Handle line breaks inside lists
      
      return html;
    }

    function extractReferences(text) {
      // Regex to extract reference links and preview text if available
      const referenceRegex = /(?:\[([^\]]+)\]\(([^)]+)\))|(?:\(([^)]+)\))/g;
      let match;
      const references = [];

      while ((match = referenceRegex.exec(text)) !== null) {
        const title = match[1] || match[3];
        const url = match[2] || match[3];
        if (url && title) {
          references.push({ title, url });
        }
      }

      return references;
    }

    function renderReferenceCards(references) {
      return references.map(ref => `
        <div class="reference-card">
          <a href="${ref.url}" target="_blank" rel="noopener noreferrer">
            ${ref.title}
          </a>
        </div>
      `).join('');
    }

    document.getElementById('definition-form').addEventListener('submit', async function(event) {
      event.preventDefault();
      const definitionInput = document.getElementById('definition-input');
      const definitionContent = document.getElementById('definition-content');
      const loadingSpinner = document.getElementById('loading-spinner');

      const word = definitionInput.value.trim();
      if (word) {
        loadingSpinner.style.display = 'block';
        definitionContent.innerHTML = '';
        const content = await fetchDefinitionData(word);
        loadingSpinner.style.display = 'none';

        const htmlContent = convertMarkdownToHTML(content);
        definitionContent.innerHTML = htmlContent;

        // Extract and render reference links if present
        const references = extractReferences(content);
        if (references.length > 0) {
          definitionContent.innerHTML += '<h2>References</h2>' + renderReferenceCards(references);
        }
      }
    });