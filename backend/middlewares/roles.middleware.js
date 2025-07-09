export const isAdmin = (req, res, next) => {
    if (req.userRol !== 'administrador') {
        return res.status(403).json({ message: 'Acceso solo para administradores' });
    }
    next();
};

export const isProfesor = (req, res, next) => {
    if (req.userRol !== 'profesor') {
        return res.status(403).json({ message: 'Acceso solo para profesores' });
    }
    next();
};
