# NM-DXC-AI-Email-Improver
This project uses Ollama to allow a user to enter in text they would like to send as an email, and receive a cleaned up and professional version. 

To view the code for this project, all python scripts are located in the backEnd folder. 
The code for the React front end is primarily located in frontEnd/src/App.tsx.

To run this project:

1. Install requirements.

2. As Ollama runs locally, you will need to pull the model on first use. This is done with *ollama pull gemma:2b*

3. Navigate to the backend with cd backEnd and then enter *python -m uvicorn main:app --reload --port 8000* in the terminal to run the backend on http://localhost:8000.

4. Navigate to the email-improver folder with cd frontEnd, and then install the dependencies with *npm install*

5. Run the React frontend with *npm run dev*

6. This should create the webpage on http://localhost:5173.
