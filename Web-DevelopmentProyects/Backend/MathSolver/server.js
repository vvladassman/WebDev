const express = require('express');
const multer = require('multer');
const axios = require('axios');
const path = require('path');
const FormData = require('form-data');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(express.static('public'));

// Render the main page
app.get('/', (req, res) => {
    res.render('index');
});

// Solve the math problem via the Mathpix and ChatGPT APIs
app.post('/solve', upload.single('image'), async (req, res) => {
    try {
        let mathText;

        // If an image is uploaded, process it with Mathpix API
        if (req.file) {
            const imagePath = req.file.path;
            const imageData = fs.readFileSync(imagePath, 'base64');

            // Prepare form data for Mathpix API
            const formData = new FormData();
            formData.append('src', `data:image/png;base64,${imageData}`);
            formData.append('formats', 'text');

            // Call Mathpix API
            const mathpixResponse = await axios.post('https://api.mathpix.com/v3/text', formData, {
                headers: {
                    ...formData.getHeaders(),
                    'app_id': 'your_mathpix_app_id',
                    'app_key': 'your_mathpix_app_key'
                }
            });

            mathText = mathpixResponse.data.text;
            fs.unlinkSync(imagePath); // Remove uploaded image after processing
        } else {
            // Use the text input directly
            mathText = req.body.text;
        }

        // Call ChatGPT API
        const chatgptResponse = await axios.post('https://api.openai.com/v1/completions', {
            model: "text-davinci-003",
            prompt: `Solve this math problem: ${mathText}`,
            max_tokens: 100
        }, {
            headers: {
                'Authorization': `Bearer your_openai_api_key`
            }
        });

        const chatGPTResult = chatgptResponse.data.choices[0].text;
        
        // Send the result back to the frontend
        res.json({ response: chatGPTResult.trim() });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ response: 'Failed to process the request.' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});