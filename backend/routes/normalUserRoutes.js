const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authMiddleware');
const bcrypt = require('bcrypt');
const db = require('../db');

router.put('/profile/password', auth, async (req, res) => {
    const { newPassword } = req.body;
    const userId = req.user.id;

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId]);
        res.status(200).json({ message: 'Password updated successfully.' });
    } catch (err) {
        console.error('Error updating password:', err);
        res.status(500).json({ error: 'Failed to update password.' });
    }
});


router.get('/stores', auth, async (req, res) => {
    const userId = req.user.id;
    const { name, address, sortField, sortOrder } = req.query;

    let query = `
        SELECT
            s.id,
            s.name,
            s.address,
            COALESCE(AVG(r.rating_value), 0) AS overall_rating,
            (SELECT rating_value FROM ratings WHERE user_id = ? AND store_id = s.id) AS user_submitted_rating
        FROM stores AS s
        LEFT JOIN ratings AS r ON s.id = r.store_id
        WHERE 1=1
    `;
    let params = [userId];

    if (name) {
        query += ' AND s.name LIKE ?';
        params.push(`%${name}%`);
    }
    if (address) {
        query += ' AND s.address LIKE ?';
        params.push(`%${address}%`);
    }

    query += ' GROUP BY s.id';

    try {
        const [stores] = await db.query(query, params);
        res.status(200).json(stores);
    } catch (err) {
        console.error('Error fetching stores:', err);
        res.status(500).json({ error: 'Failed to fetch store list.' });
    }
});


router.post('/stores/:storeId/ratings', auth, async (req, res) => {
    const { rating_value } = req.body;
    const { storeId } = req.params;
    const userId = req.user.id;

    if (rating_value < 1 || rating_value > 5) {
        return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
    }

    try {
        const sql = 'INSERT INTO ratings (user_id, store_id, rating_value) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE rating_value = ?';
        await db.query(sql, [userId, storeId, rating_value, rating_value]);
        res.status(201).json({ message: 'Rating submitted successfully!' });
    } catch (err) {
        console.error('Error submitting rating:', err);
        res.status(500).json({ error: 'Failed to submit rating.' });
    }
});


module.exports = router;
