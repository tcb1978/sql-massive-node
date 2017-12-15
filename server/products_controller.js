module.exports = {

    create: function (req, res, next) {
        const db = req.app.get('db');
        const { name, description, price, imageurl } = req.body;
        db.create_product([name, description, price, imageurl])
            .then((product) => {
                res.status(200).json()
            })
            .catch(err => {
                console.log(err);
            });
    },

    getOne: function (req, res, next) {
        const db = req.app.get('db');

        db.read_product([req.params.id])
            .then(product => res.status(200).json(product))
            .catch((err) => {
                console.error(err);
            })
    },

    getAll: function (req, res, next) {
        const db = req.app.get('db');

        db.read_products().then(products => {
            res.status(200).json(products);
        }).catch(err => {
            console.error(err);
        })
    },

    update: function (req, res, next) {
        const db = req.app.get('db');
        console.log(req.query)
        db.update_product([req.params.id, req.query.desc]).then(() => {
            res.status(200).json('You\'ve done it!');
        }).catch(err => {
            console.error(err);;
        });
    },

    delete: function (req, res, next) {
        const db = req.app.get('db');

        db.delete_product([req.params.id]).then(() => {
            res.status(200).json();
        }).catch(err => {
            console.error(err);
        })
    }

}