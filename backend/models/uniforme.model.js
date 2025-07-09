import pool from '../config/db.js';

// Registrar faltas de uniforme
export const registrarUniforme = async (alumno_id, fecha, uniforme) => {
    const [result] = await pool.query(
        `INSERT INTO uniformes 
        (alumno_id, fecha, playera, pantalon, zapatos, sueter, corte_pelo, observaciones) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            alumno_id, fecha,
            uniforme.playera, uniforme.pantalon, uniforme.zapatos,
            uniforme.sueter, uniforme.corte_pelo, uniforme.observaciones
        ]
    );
    return result.insertId;
};
