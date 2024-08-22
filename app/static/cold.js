// This function reads the uploaded resume and extracts the text content
let api=localStorage.getItem("api");

async function extractResumeContent(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = async function(event) {
        const arrayBuffer = event.target.result;
        // Assuming the file is a PDF; use PDF.js or a similar library to extract text
        const pdfjsLib = window['pdfjs-dist/build/pdf'];
        pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
        
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let text = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items.map(item => item.str).join(' ');
          text += ` ${pageText}`;
        }
        resolve(text.trim());
      };
  
      reader.onerror = function(error) {
        reject('Error reading resume: ' + error);
      };
  
      reader.readAsArrayBuffer(file);
    });
  }
  
  document.getElementById('sendButton').addEventListener('click', handleSend);
  document.getElementById('input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') handleSend();
  });
  
  async function handleSend() {
    const resumeFile = document.getElementById('resume-upload').files[0];
    const companyName = document.getElementById('company-name').value.trim();
    const companyInfo = document.getElementById('company-info').value.trim();
    const recruiterName = document.getElementById('recruiter-name').value.trim();
  
    if (resumeFile && companyName && companyInfo && recruiterName) {
      const resumeContent = await extractResumeContent(resumeFile);
      
      const prompt = generatePrompt(resumeContent, companyName, companyInfo, recruiterName);
      addMessage(prompt, 'user');
  
      const response = await getResponse(prompt);
      if (response) {
        setTimeout(() => {
          addMessage(response, 'bot');
        }, 1000);
      }
    } else {
      alert('Please complete all fields and upload your resume.');
    }
  }
  
  // This function generates a prompt for the Gemini API based on extracted content and user inputs
  function generatePrompt(resumeContent, companyName, companyInfo, recruiterName) {
    return `
    I am applying for a position at ${companyName}. 
    The company is known for ${companyInfo}. 
    The recruiter for this job is ${recruiterName}. 
    My resume includes experience and skills such as ${resumeContent}. 
    Please generate a professional cold email that highlights my qualifications and expresses my interest in joining ${companyName}.
    `;
  }
  
  async function getResponse(prompt) {
    const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key='+api;
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "contents": [
            {
              "role": "user",
              "parts": [{ "text": prompt }]
            }
          ]
        })
      });
      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error fetching response:', error);
      return null;
    }
  }
  
  function addMessage(text, sender) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    messageElement.textContent = text;
    
    const messagesContainer = document.getElementById('messages');
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }