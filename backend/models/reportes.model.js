import pool from '../config/db.js';

export const obtenerReportesTotales = async () => {
  const [asistencias] = await pool.query(`
    SELECT COUNT(*) AS total_asistencias FROM asistencia
  `);
  const [uniformes] = await pool.query(`
    SELECT COUNT(*) AS total_uniformes FROM uniforme
  `);
  const [correos] = await pool.query(`
    SELECT COUNT(*) AS total_correos FROM correos
  `);
  return {
    total_asistencias: asistencias[0].total_asistencias,
    total_uniformes: uniformes[0].total_uniformes,
    total_correos: correos[0].total_correos
  };
};
