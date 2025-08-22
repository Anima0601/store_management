const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middleware/authMiddleware');
const bcrypt = require('bcrypt');
const db = require('../db');

router.get('/dashboard', auth, checkRole(['system_administrator']), async (req, res) => {
    try {
        const [totalUsers] = await db.query('SELECT COUNT(*) AS count FROM users');
        const [totalStores] = await db.query('SELECT COUNT(*) AS count FROM stores');
        const [totalRatings] = await db.query('SELECT COUNT(*) AS count FROM ratings');

        res.status(200).json({
            totalUsers: totalUsers[0].count,
            totalStores: totalStores[0].count,
            totalRatings: totalRatings[0].count
        });
    } catch (err) {
        console.error('Error fetching dashboard data:', err);
        res.status(500).json({ error: 'Failed to fetch dashboard data.' });
    }
});

router.post('/users', auth, checkRole(['system_administrator']), async (req, res) => {
    const { name, email, password, address, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)';
        const values = [name, email, hashedPassword, address, role];

        await db.query(sql, values);
        res.status(201).json({ message: 'User created successfully!' });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'Failed to create user.' });
    }
});

router.get('/users', auth, checkRole(['system_administrator']), async (req, res) => {
    const { name, email, address, role, sortField, sortOrder } = req.query;

    let query = 'SELECT id, name, email, address, role FROM users WHERE 1=1';
    let params = [];

    if (name) {
        query += ' AND name LIKE ?';
        params.push(`%${name}%`);
    }
    if (email) {
        query += ' AND email LIKE ?';
        params.push(`%${email}%`);
    }
    if (address) {
        query += ' AND address LIKE ?';
        params.push(`%${address}%`);
    }
    if (role) {
        query += ' AND role = ?';
        params.push(role);
    }

    if (sortField) {
        const allowedSortFields = ['name', 'email', 'address', 'role'];
        if (allowedSortFields.includes(sortField)) {
            const order = (sortOrder && sortOrder.toUpperCase() === 'DESC') ? 'DESC' : 'ASC';
            query += ` ORDER BY ${sortField} ${order}`;
        }
    }

    try {
        const [users] = await db.query(query, params);
        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Failed to fetch user list.' });
    }
});

router.get('/stores', auth, checkRole(['system_administrator']), async (req, res) => {
    const { name, email, address, sortField, sortOrder } = req.query;

    let query = `
        SELECT
            s.id,
            s.name,
            s.email,
            s.address,
            COALESCE(AVG(r.rating_value), 0) AS overall_rating
        FROM stores AS s
        LEFT JOIN ratings AS r ON s.id = r.store_id
        WHERE 1=1
    `;
    let params = [];

    if (name) {
        query += ' AND s.name LIKE ?';
        params.push(`%${name}%`);
    }
    if (email) {
        query += ' AND s.email LIKE ?';
        params.push(`%${email}%`);
    }
    if (address) {
        query += ' AND s.address LIKE ?';
        params.push(`%${address}%`);
    }
    
    query += ' GROUP BY s.id';

    if (sortField) {
        const allowedSortFields = ['name', 'email', 'address', 'overall_rating'];
        if (allowedSortFields.includes(sortField)) {
            const order = (sortOrder && sortOrder.toUpperCase() === 'DESC') ? 'DESC' : 'ASC';
            query += ` ORDER BY ${sortField} ${order}`;
        }
    }

    try {
        const [stores] = await db.query(query, params);
        res.status(200).json(stores);
    } catch (err) {
        console.error('Error fetching stores:', err);
        res.status(500).json({ error: 'Failed to fetch store list.' });
    }
});

module.exports = router;
