
const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middleware/authMiddleware');
const db = require('../db');

router.get('/dashboard', auth, checkRole(['store_owner']), async (req, res) => {
    const ownerId = req.user.id;

    try {
        const [storeRows] = await db.query('SELECT id FROM stores WHERE owner_id = ?', [ownerId]);
        if (storeRows.length === 0) {
            return res.status(404).json({ message: 'Store not found for this user.' });
        }
        const storeId = storeRows[0].id;

        const [avgRatingRows] = await db.query('SELECT AVG(rating_value) AS averageRating FROM ratings WHERE store_id = ?', [storeId]);
        const averageRating = avgRatingRows[0].averageRating || 0;

        const [ratingUsers] = await db.query(`
            SELECT u.name, u.email, r.rating_value, r.created_at
            FROM ratings AS r
            JOIN users AS u ON r.user_id = u.id
            WHERE r.store_id = ?
            ORDER BY r.created_at DESC
        `, [storeId]);

        res.status(200).json({
            averageRating: parseFloat(averageRating).toFixed(1),
            ratings: ratingUsers
        });
    } catch (err) {
        console.error('Error fetching store owner dashboard data:', err);
        res.status(500).json({ error: 'Failed to fetch dashboard data.' });
    }
});

router.put('/profile/password', auth, checkRole(['store_owner']), async (req, res) => {
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

module.exports = router;