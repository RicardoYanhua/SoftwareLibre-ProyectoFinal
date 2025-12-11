const db = require("../Config/DataConnection");
const DB_TABLE = "platos";
const TABLE_COLUMN_NAME_ID = "id_plato";
const TABLE_COLUMN_NAME_SEARCH = "nombre";
const DB_NUMERIC_COLUMN = "precio";


/*
  Table
    id_plato
    nombre
    descripcion
    precio
    tipo_plato

    id_restaurante  
*/

// Centralizar consultas
const SQL = {
  obtenerLista: `SELECT * FROM ${DB_TABLE} ORDER BY ${TABLE_COLUMN_NAME_ID} DESC`,
  obtenerPorId: `SELECT * FROM ${DB_TABLE} WHERE ${TABLE_COLUMN_NAME_ID} = ?`,
  insertar: `INSERT INTO ${DB_TABLE} (tabla_columna_1, tabla_columna_2, tabla_columna_3) VALUES (?,?,?)`,
  actualizar: `UPDATE ${DB_TABLE} SET tabla_columna_1 = ?, tabla_columna_2 = ?, tabla_columna_3 = ? WHERE ${TABLE_COLUMN_NAME_ID} = ?`,
  eliminar: `DELETE FROM ${DB_TABLE} WHERE ${TABLE_COLUMN_NAME_ID} = ?`,
  buscarPorTexto: `SELECT * FROM ${DB_TABLE} WHERE ${TABLE_COLUMN_NAME_SEARCH} LIKE ? ORDER BY ${TABLE_COLUMN_NAME_ID} DESC`,
  contar: `SELECT COUNT(*) AS total FROM ${DB_TABLE}`,
  sumar: `SELECT SUM(${DB_NUMERIC_COLUMN}) AS suma FROM ${DB_TABLE}`,
  promedio: `SELECT AVG(${DB_NUMERIC_COLUMN}) AS promedio FROM ${DB_TABLE}`,
  minimo: `SELECT MIN(${DB_NUMERIC_COLUMN}) AS minimo FROM ${DB_TABLE}`,
  maximo: `SELECT MAX(${DB_NUMERIC_COLUMN}) AS maximo FROM ${DB_TABLE}`,
};

const ObtenerLista = async (req, res) => {
  try {
    const [DB_Lista] = await db.query(SQL.obtenerLista);
    res.json({ success: true, count: DB_Lista.length, data: DB_Lista });
  } catch (error) {
    console.error("Error al obtener registros:", error);
    res
      .status(500)
      .json({
        success: false,
        mensaje: "Error al obtener los registros.",
        error: error.message,
      });
  }
};

const ObtenerPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [DB_Lista] = await db.query(SQL.obtenerPorId, [id]);
    if (!DB_Lista.length)
      return res
        .status(404)
        .json({ success: false, mensaje: "Registro no encontrado." });
    res.json({
      success: true,
      mensaje: "Registro encontrado.",
      data: DB_Lista[0],
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        mensaje: "Error al obtener el registro.",
        error: error.message,
      });
  }
};

const Crear = async (req, res) => {
  try {
    const { json_atributo_1, json_atributo_2, json_atributo_3 } = req.body;
    if (!json_atributo_1 || !json_atributo_2)
      return res
        .status(400)
        .json({ success: false, mensaje: "Campos obligatorios." });

    const [DB_NUEVO_REGISTRO] = await db.query(SQL.insertar, [
      json_atributo_1,
      json_atributo_2,
      json_atributo_3,
    ]);
    res.status(201).json({
      success: true,
      mensaje: "Registro creado exitosamente.",
      data: {
        id: DB_NUEVO_REGISTRO.insertId,
        json_atributo_1,
        json_atributo_2,
        json_atributo_3,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        mensaje: "Error al crear el registro.",
        error: error.message,
      });
  }
};

const Actualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { json_atributo_1, json_atributo_2, json_atributo_3 } = req.body;
    const [DB_LIST] = await db.query(SQL.obtenerPorId, [id]);
    if (!DB_LIST.length)
      return res
        .status(404)
        .json({
          success: false,
          mensaje: `No se encontró el registro con id ${id}`,
        });

    await db.query(SQL.actualizar, [
      json_atributo_1,
      json_atributo_2,
      json_atributo_3,
      id,
    ]);
    res.json({
      success: true,
      mensaje: "Registro actualizado correctamente.",
      data: { id, json_atributo_1, json_atributo_2, json_atributo_3 },
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        mensaje: "Error al actualizar el registro.",
        error: error.message,
      });
  }
};

const EliminarRegistro = async (req, res) => {
  try {
    const { id } = req.params;
    const [DB_LIST] = await db.query(SQL.obtenerPorId, [id]);
    if (!DB_LIST.length)
      return res
        .status(404)
        .json({ success: false, mensaje: "Registro no encontrado." });

    await db.query(SQL.eliminar, [id]);
    res.json({ success: true, mensaje: "Registro eliminado correctamente." });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        mensaje: "Error al eliminar el registro.",
        error: error.message,
      });
  }
};

const BuscarPorTexto = async (req, res) => {
  try {
    const { texto } = req.query;
    if (!texto)
      return res
        .status(400)
        .json({ success: false, mensaje: "Parámetro de búsqueda requerido." });

    const [DB_BUSQUEDA] = await db.query(SQL.buscarPorTexto, [`%${texto}%`]);
    if (!DB_BUSQUEDA.length)
      return res
        .status(404)
        .json({ success: false, mensaje: "No se encontraron registros." });

    res.json({
      success: true,
      mensaje: "Búsqueda realizada correctamente.",
      count: DB_BUSQUEDA.length,
      data: DB_BUSQUEDA,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        mensaje: "Error en la búsqueda.",
        error: error.message,
      });
  }
};

const ObtenerCantidadDeRegistros = async (req, res) => {
  try {
    const [DB_RESULT] = await db.query(SQL.contar);
    res.json({
      success: true,
      mensaje: "Cantidad obtenida correctamente.",
      total: DB_RESULT[0].total,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        mensaje: "Error al obtener la cantidad de registros.",
        error: error.message,
      });
  }
};

const ObtenerSuma = async (req, res) => {
  try {
    const [DB_RESULT] = await db.query(SQL.sumar);
    res.json({
      success: true,
      mensaje: "Suma obtenida correctamente.",
      suma: DB_RESULT[0].suma,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        mensaje: "Error al obtener la suma.",
        error: error.message,
      });
  }
};

const ObtenerPromedio = async (req, res) => {
  try {
    const [DB_RESULT] = await db.query(SQL.promedio);
    res.json({
      success: true,
      mensaje: "Promedio obtenido correctamente.",
      promedio: DB_RESULT[0].promedio,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        mensaje: "Error al obtener el promedio.",
        error: error.message,
      });
  }
};

const ObtenerMinimo = async (req, res) => {
  try {
    const [DB_RESULT] = await db.query(SQL.minimo);
    res.json({
      success: true,
      mensaje: "Valor mínimo obtenido correctamente.",
      minimo: DB_RESULT[0].minimo,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        mensaje: "Error al obtener el valor mínimo.",
        error: error.message,
      });
  }
};

const ObtenerMaximo = async (req, res) => {
  try {
    const [DB_RESULT] = await db.query(SQL.maximo);
    res.json({
      success: true,
      mensaje: "Valor máximo obtenido correctamente.",
      maximo: DB_RESULT[0].maximo,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        mensaje: "Error al obtener el valor máximo.",
        error: error.message,
      });
  }
};

const ObtenerUsuariosConCompras = async (req, res) => {
  const DB_TABLE_1 = "tabla_1";
  const DB_TABLE_2 = "tabla_2";
  try {
    const [DB_RESULT] = await db.query(
      `SELECT t1.id, t1.column, t2.column, t2.column 
             FROM ${DB_TABLE_1} AS t1
             LEFT JOIN ${DB_TABLE_2} AS t2
             ON t1.id = t2.table1_id_foreign_key`
    );
    res.json({
      success: true,
      mensaje: "Usuarios con compras obtenidos.",
      count: DB_RESULT.length,
      data: DB_RESULT,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        mensaje: "Error al obtener los datos",
        error: error.message,
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
  ObtenerUsuariosConCompras,
};
