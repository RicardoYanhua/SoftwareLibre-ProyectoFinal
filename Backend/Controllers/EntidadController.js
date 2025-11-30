const db = require('../Config/DataBaseConfig');

const DB_TABLE = 'table_name';
const TABLE_COLUMN_NAME_ID = 'db_columna_id';

const ObtenerLista = async (req, res) => {
    try {
        const [DB_Lista] = await db.query('SELECT * FROM ' + DB_TABLE + ' ORDER BY id DESC');
        res.json({
            success: true,
            count: DB_Lista.length,
            data: DB_Lista
        });
    } catch (error) {
        console.error('Error en obtener los registros desde la base de datos.');
        res.json({
            success: false,
            mensaje: 'Error al obtener los registros.',
            error: error.message
        });
    }
};

const ObtenerPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [DB_Lista] = await db.query('SELECT * FROM ' + DB_TABLE + ' WHERE ' + TABLE_COLUMN_NAME_ID + ' = ?', [id]);
        if (DB_Lista.length === 0) {
            return res.status(404).json({
                success: false,
                mensaje: 'El registro no fue encontrado o no existe.'
            });
        }
        res.json({
            success: true,
            mensaje: '¡ Registro Encontrado !',
            data: DB_Lista[0]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: 'Error al obtener el registro.',
            error: error.message,
        });
    }
};

const Crear = async (req, res) => {
    try {
        const {
            json_atributo_1,
            json_atributo_2,
            json_atributo_3
        } = req.body;
        if (!json_atributo_1 || !json_atributo_2) {
            return res.status(400).json({
                success: false,
                mensaje: 'Estos campos son obligatorios.'
            });
        }
        const [DB_NUEVO_REGISTRO] = await db.query(
            'INSERT INTO ' + DB_TABLE
            + ' ( '
            + 'tabla_columna_1, '
            + 'tabla_columna_2, '
            + 'tabla_columna_3  '
            + ') VALUES (?,?,?)'
            [json_atributo_1, json_atributo_2, json_atributo_3]
        );
        res.status(201).json({
            success: true,
            mensaje: 'Se ha creado un nuevo registro exitosamente',
            data: {
                id: DB_NUEVO_REGISTRO.insertId,
                json_atributo_1,
                json_atributo_2,
                json_atributo_3,
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: 'Error al crear el registro.',
            error: error.message,
        });
    }
};

const Actualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            json_atributo_1,
            json_atributo_2,
            json_atributo_3
        } = req.body;
        const [DB_LIST] = await db.query('SELECT * FROM ' + DB_TABLE + ' WHERE ' + TABLE_COLUMN_NAME_ID + ' = ?', [id]);
        if (DB_LIST.length === 0) {
            return res.status(404).json({
                success: false,
                mensaje: 'No se encontro un registro con el atributo ' + TABLE_COLUMN_NAME_ID + ' : ' + id
            });
        }
        await db.query(
            'UPDATE ' + DB_TABLE + ' SET '
            + ' tabla_columna_1 = ? , '
            + ' tabla_columna_2 = ? , '
            + ' tabla_columna_3 = ? '
            + ' WHERE ' + TABLE_COLUMN_NAME_ID + ' = ?',
            [json_atributo_1, json_atributo_2, json_atributo_3, id]
        );
        res.status(200).json({
            success: true,
            mensaje: 'Registro actualizado correctamente.',
            data: {
                id,
                json_atributo_1,
                json_atributo_2,
                json_atributo_3
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: 'Error al actualizar el registro.',
            error: error.message,
        });
    }
};

const EliminarRegistro = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('SELECT * FROM ' + DB_TABLE + ' WHERE ' + TABLE_COLUMN_NAME_ID + ' = ?', [id]);
        if (Registro.length === 0) {
            return res.status(404).json({
                success: false,
                mensaje: 'El registro no fue encontrado o no existe.'
            });
        }
        await db.query('DELETE FROM ' + DB_TABLE + ' WHERE ' + TABLE_COLUMN_NAME_ID + ' = ?', [id]);
        res.status(200).json({
            success: true,
            mensaje: 'Se ha eliminado el registro correctamente.'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: 'Error al eliminar el registro.',
            error: error.message,
        });
    }
};

const BuscarPorTexto = async (req, res) => {
    const TABLE_COLUMN_NAME_SEARCH = 'db_columna_busqueda';
    try {
        const { texto } = req.query;
        if (!texto) {
            return res.status(400).json({
                success: false,
                mensaje: 'Debe proporcionar un parámetro para realizar la búsqueda.'
            });
        }
        const [DB_BUSQUEDA] = await db.query(
            'SELECT * FROM ' + DB_TABLE + ' WHERE ' + TABLE_COLUMN_NAME_SEARCH + ' LIKE ? ORDER BY ' + TABLE_COLUMN_NAME_ID + ' DESC',
            ['%' + texto + '%']
        );
        if (DB_BUSQUEDA.length === 0) {
            return res.status(404).json({
                success: false,
                mensaje: 'No se encontraron registros.'
            });
        }
        res.json({
            success: true,
            mensaje: 'Búsqueda realizada correctamente.',
            count: Busqueda.length,
            data: Busqueda
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: 'Error al realizar la búsqueda.',
            error: error.message
        });
    }
};
const ObtenerCantidadDeRegistros = async (req, res) => {
    try {
        const [DB_RESULT] = await db.query(
            'SELECT COUNT(*) AS total FROM ' + DB_TABLE
        );
        res.json({
            success: true,
            mensaje: 'Cantidad obtenida correctamente.',
            total: DB_RESULT[0].total
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: 'Error al obtener la cantidad de registros.',
            error: error.message
        });
    }
};

const ObtenerSuma = async (req, res) => {
    const DB_COLUMN_NAME_NUMBER = 'columna';
    try {
        const [DB_RESULT] = await db.query(
            'SELECT SUM(' + DB_COLUMN_NAME_NUMBER + ') AS suma FROM ' + DB_TABLE
        );
        res.json({
            success: true,
            mensaje: 'Suma obtenida correctamente.',
            suma: DB_RESULT[0].suma
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: 'Error al obtener la suma.',
            error: error.message
        });
    }
};
const ObtenerPromedio = async (req, res) => {
    const DB_COLUMN_NAME_NUMBER = 'columna';
    try {
        const [DB_RESULT] = await db.query(
            'SELECT AVG(' + DB_COLUMN_NAME_NUMBER + ') AS promedio FROM ' + DB_TABLE
        );
        res.json({
            success: true,
            mensaje: 'Promedio obtenido correctamente.',
            promedio: DB_RESULT[0].promedio
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: 'Error al obtener el promedio.',
            error: error.message
        });
    }
};

const ObtenerMinimo = async (req, res) => {
    const DB_COLUMN_NAME_NUMBER = 'columna';
    try {
        const [DB_RESULT] = await db.query(
            'SELECT MIN(' + DB_COLUMN_NAME_NUMBER + ') AS minimo FROM ' + DB_TABLE
        );
        res.json({
            success: true,
            mensaje: 'Valor mínimo obtenido correctamente.',
            minimo: DB_RESULT[0].minimo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: 'Error al obtener el valor mínimo.',
            error: error.message
        });
    }
};

const ObtenerMaximo = async (req, res) => {
    const DB_COLUMN_NAME_NUMBER = 'columna';
    try {
        const [DB_RESULT] = await db.query(
            'SELECT MAX(' + DB_COLUMN_NAME_NUMBER + ') AS maximo FROM ' + DB_TABLE
        );
        res.json({
            success: true,
            mensaje: 'Valor máximo obtenido correctamente.',
            maximo: DB_RESULT[0].maximo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: 'Error al obtener el valor máximo.',
            error: error.message
        });
    }
};

const ObtenerUsuariosConCompras = async (req, res) => {
    const DB_TABLE_1 = 'tabla_1';
    const DB_TABLE_2 = 'tabla_2';
    try {
        /*
        INNER JOIN - Devuelve SOLO los datos que tienen coincidencia en ambas tablas.

        LEFT JOIN (LEFT OUTER JOIN) - Devuelve todos los registros de la tabla izquierda y los relacionados de la derecha.
        Si no hay coincidencia → devuelve NULL.
        */
        const [DB_RESULT] = await db.query(
            
             'SELECT t1.id, t1.column, t2.column, t2.column'// <-- select columns for t1 and t2
            + ' FROM ' + DB_TABLE_1 + ' AS t1'
            + ' LEFT JOIN ' + DB_TABLE_2 + ' AS t2'
            + ' ON t1.id = t2.table1_id_foreign_key' // <-- edit keys
        );
        res.json({
            success: true,
            mensaje: 'Usuarios con sus compras obtenidos correctamente',
            count: DB_RESULT.length,
            data: DB_RESULT
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            mensaje: 'Error al obtener los datos',
            error: error.message
        });
    }
};

module.exports = {
    ObtenerLista,
    ObtenerPorId,
    Crear,
    Actualizar,
    EliminarRegistro,
    BuscarPorTexto,
    ObtenerCantidadDeRegistros,
    ObtenerSuma,
    ObtenerPromedio,
    ObtenerMinimo,
    ObtenerMaximo,
    ObtenerUsuariosConCompras
};

