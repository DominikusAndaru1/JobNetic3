// server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');
const jobPostRoute = require('../api/job-post');
const app = express();
const jobDeletesRoute = require('../api/job-deletes');
const cookieParser = require('cookie-parser');
app.use(express.json()); // penting agar bisa baca req.body
app.use('/api/job-deletes', jobDeletesRoute);



// Load .env dari /js/.env
dotenv.config({ path: path.join(__dirname, 'js/.env') });

// Supabase setup
const supabase = createClient('https://ejrgtezpzksmtzpxuurg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqcmd0ZXpwemtzbXR6cHh1dXJnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODQ2OTQwMywiZXhwIjoyMDY0MDQ1NDAzfQ.o_ctZ6dY_z8TB9j9mSMhrzoHYG9EFw-gvWaf9foqFOw');

// Middlewares
app.use(cors({
  origin: 'http://127.0.0.1:5500', // Ganti sesuai frontend kamu
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static file (HTML, CSS, JS frontend)
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/job-post', jobPostRoute); // POST ke /api/job-post dari frontend

// Optional: GET config untuk client
app.get('/config', (req, res) => {
  res.json({
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_ANON_KEY,
  });
});

// Optional: GET all jobs
app.get('/get-jobs', async (req, res) => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    return res.status(500).json({ message: 'Failed to fetch jobs', error });
  }

  res.json(data);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
