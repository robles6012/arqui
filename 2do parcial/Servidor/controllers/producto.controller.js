import {
    getProductoAll,
    getProductoId,
    deleteProduct,
    createProduct,
    updateProduct,
} from "../models/producto.model.js";
export const getAll = async (req, res) => {
    try {
        const result = await getProductoAll();
        console.log('Se accedió al endpoint getAll. Resultado obtenido:', result);
        res.json({ success: true, result: result , msg: 'Todos Los Productos' });
    } catch (error) {
        console.error('Error al intentar acceder al endpoint getAll:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getId = async (req, res) => {
    try {
        const { id } = req.params; // Captura el parámetro ID de la ruta
        const result = await getProductoId(id);
        console.log(`Se accedió al endpoint getId con nombre: ${id}. Resultado obtenido:`, result);
        return res.status(200).json({ success: true, result: result, message: "get name" });
    } catch (error) {
        console.error('Error al intentar acceder al endpoint getId:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const deleteP = async (req, res) => {
    try {
        const { id } = req.params; // Captura el parámetro ID de la ruta
        const deletedProductId = await deleteProduct(id);
        console.log(`Producto eliminado correctamente con id: ${deletedProductId}`);
        return res.status(200).json({ success: true, message: `Producto eliminado correctamente con id: ${deletedProductId}` });
    } catch (error) {
        console.error('Error al intentar eliminar el producto:', error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params; // Captura el parámetro ID de la ruta
        const { detalle, nombre, valor, img } = req.body; // Obtener datos del cuerpo de la solicitud

        const result = await updateProduct(detalle, nombre, valor, id, img);

        console.log(`Producto actualizado correctamente con ID: ${result}`);

        return res.status(200).json({
            success: true,
            message: `Producto actualizado correctamente con ID: ${result}`,
        });
    } catch (error) {
        console.error('Error al intentar actualizar el producto:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const create = async (req, res) => {
    try {
        let { detalle, nombre, valor } = req.body;
        let result = await createProduct(detalle, nombre, valor);
        console.log(`Se accedió al endpoint create con nombre: ${nombre}. Producto creado correctamente.`);
        return res.status(200).json({ success: true, result: result, message: "Producto creado" });
    } catch (error) {
        console.error('Error al intentar acceder al endpoint create:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}
