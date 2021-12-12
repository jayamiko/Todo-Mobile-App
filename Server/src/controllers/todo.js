const { todo } = require('../../models')

exports.addTodo = async (req, res) => {
    try {
        const data = req.body;
        const todos = await todo.create(data)

        res.send({
            status: 'success',
            message: 'add todo success',
            data
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'Server Error',
        })
    }
};

exports.getTodos = async (req, res) => {
    try {
        let data = await todo.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        })
        res.send({
            status: 'success',
            todos: data
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'Server Error',
        })
    }
};

exports.getTodo = async (req, res) => {
    try {

        const { id } = req.params;
        const data = await todo.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        })
        res.send({
            status: 'success',
            data
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'Server Error',
        })
    }
};

exports.updateTodo = async (req, res) => {
    try {

        const { id } = req.params;
        const body = req.body;
        const data = await todo.update({ ...body },
            {
                where: {
                    id
                }
            })

        res.send({
            status: 'success',
            data: {
                id,
                status: body
            }
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'Server Error',
        })
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params
        await todo.destroy({
            where: {
                id
            }
        })

        res.send({
            status: 'success',
            message: `Todo has been removed`
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}