const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

// Supabase init
const supabaseUrl = 'https://ejrgtezpzksmtzpxuurg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqcmd0ZXpwemtzbXR6cHh1dXJnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODQ2OTQwMywiZXhwIjoyMDY0MDQ1NDAzfQ.o_ctZ6dY_z8TB9j9mSMhrzoHYG9EFw-gvWaf9foqFOw'; // Gunakan service role key, bukan anon key
const supabase = createClient(supabaseUrl, supabaseKey);

// Route untuk delete job
router.delete('/:id', async (req, res) => {
  const jobId = req.params.id;

  try {
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', jobId);

    if (error) {
      return res.status(400).json({ message: 'Gagal menghapus job', error });
    }

    return res.json({ message: 'Job berhasil dihapus' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Kesalahan server' });
  }
});

module.exports = router;
