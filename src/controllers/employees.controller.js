import { pool } from "../db.js"

export const readallemployees = async (req, res) => {
    
    try {

        const [rows] = await pool.query('SELECT * FROM EMPLOYEE')
        res.send(rows)

    } catch (error) {
        return res.status(500).json({
            message: 'something goes wrong'
        })
    }

}

export const reademployee = async (req, res) => {

    try {

        const [rows] = await pool.query('SELECT * FROM EMPLOYEE WHERE id = ?', [req.params.id])

        if (rows.length <= 0) {
            return res.status(404).json({ message: 'Employee not found' })
        }

        res.send(rows[0])

    } catch (error) {
        return res.status(500).json({
            message: 'something goes wrong'
        })
    }
}

export const updateemployees = async (req, res) => {
    const { id } = req.params
    const { name, salary } = req.body

    try {

        const [result] = await pool.query('UPDATE EMPLOYEE SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?', [name, salary, id])

        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: 'Employee not found' })
        }

        const [rows] = await pool.query('SELECT * FROM EMPLOYEE WHERE id = ?', [id])

        res.json(rows[0])

    } catch (error) {
        return res.status(500).json({
            message: 'something goes wrong'
        })
    }
}

export const deleteemployees = async (req, res) => {

    try {

        const [result] = await pool.query('DELETE FROM EMPLOYEE WHERE id = ?', [req.params.id])

        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: 'Employee not found' })
        }

        res.sendStatus(204)

    } catch (error) {
        return res.status(500).json({
            message: 'something goes wrong'
        })
    }
}

export const createemployee = async (req, res) => {
    const { name, salary } = req.body

    try {

        const [row] = await pool.query('INSERT INTO EMPLOYEE(name, salary) VALUES (?, ?)', [name, salary])
        res.send({
            id: row.insertId,
            name,
            salary
        })

    } catch (error) {
        return res.status(500).json({
            message: 'something goes wrong'
        })
    }
}