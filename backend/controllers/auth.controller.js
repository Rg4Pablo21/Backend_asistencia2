export const register = async (req, res) => {
    try {
        const { nombre, correo, password, rol } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        // 🚨 Si no envían rol desde el frontend, ponemos 'profesor'
        const userRol = rol || 'profesor';

        const [result] = await pool.query(
            `INSERT INTO usuarios (nombre, correo, password, rol) VALUES (?, ?, ?, ?)`,
            [nombre, correo, hashedPassword, userRol]
        );

        res.status(201).json({
            message: '✅ Usuario registrado correctamente',
            userId: result.insertId
        });
    } catch (error) {
        console.error('❌ Error en registro:', error);
        res.status(500).json({
            message: '❌ Error en registro',
            error: error.sqlMessage || error.message
        });
    }
};
