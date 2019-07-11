const db = require("./conn.js");

// @TODO -
// convert, the delete and update methods to instance methods

class Posts {
    constructor(id, title, content, author) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
    }

    static async getAll() {
        try {
            const response = await db.any(`select * from posts`);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async getById(p_id) {
        try {
            const response = await db.one(
                `select * from posts where id = ${p_id}`
            );
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async removeEntry(p_id) {
        try {
            const response = await db.result(
                `delete from posts where id=${p_id}`
            );
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async createPost(title, content, author) {
        const query = `insert into posts (title, content, author) values (${title}, ${content}, ${author})
        returning id`;
        try {
            const response = await db.result(query);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async updateEntry(id, title, author, content) {
        const query = `update posts set ${column} = ${content} where id = '${id}'`;
        try {
            const response = await db.result(query);
            return response;
        } catch (err) {
            return err.message;
        }
    }
}

module.exports = Posts;
