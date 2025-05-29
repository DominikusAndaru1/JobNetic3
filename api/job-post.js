const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
// Inisialisasi Supabase dari env
const supabaseUrl = 'https://ejrgtezpzksmtzpxuurg.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqcmd0ZXpwemtzbXR6cHh1dXJnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODQ2OTQwMywiZXhwIjoyMDY0MDQ1NDAzfQ.o_ctZ6dY_z8TB9j9mSMhrzoHYG9EFw-gvWaf9foqFOw";
const supabase = createClient(supabaseUrl, supabaseKey);

router.post('/', async (req, res) => {
  try {
    const formData = req.body;

    // Insert data ke tabel 'jobs' di Supabase
    const { data, error } = await supabase
      .from('jobs')
      .insert([formData]);

    if (error) {
      console.error('Supabase error:', error);
      return res.status(400).json({ message: 'Gagal menyimpan data', error });
    }

    res.json({ message: 'Job berhasil disimpan!', data });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
});

module.exports = router;
