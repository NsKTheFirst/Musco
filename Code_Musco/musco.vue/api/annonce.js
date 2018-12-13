const annonceAPi = function annonceAPi(connection) {

    const router = require("express").Router();
    const annonceModel = require("./../model/annonce")(connection);
  
    router.post('/annonces', (req, res) => {
      annonceModel.create((err, dataset) => {
        if (err) return res.status(500).send(err);
        else console.log("ça poste");
        return res.status(200).send(dataset);  
      }, req.body); // post datas ici ...
    });
  
  
    router.get('/annonces/last', (req, res) => {
      annonceModel.getLast((err, dataset) => {
        console.log("ça passe");
        if (err) return res.status(500).send(err);
        else return res.status(200).send(dataset);
      });
    });

    router.get('/annonces/:id_annonce', (req, res) => {
      annonceModel.getOne((err, dataset) => {
        if (err) return res.status(500).send(err);
        else return res.status(200).send(dataset);
      }, req.params.id_annonce);
    });

  
    router.get('/annonces', (req, res) => {
      annonceModel.getAll((err, dataset) => {
        if (err) return res.status(500).send(err);
        else return res.status(200).send(dataset);
      }, null);
    });
  
    router.delete('/annonces', (req, res) => {
      annonceModel.remove((err, dataset) => {
        console.log("ça va del ou pas");
        if (err) return res.status(500).send(err);
        return res.status(200).send(dataset);
      }, req.body.id_user); // tableau d'ids ici ...
    });
  
    router.patch('/annonces', (req, res) => {
      annonceModel.update((err, dataset) => {
        if (err) return res.status(500).send(err);
        else return res.status(200).send(dataset);
      }, req.body); // un tableau d'ids ici ...
    });
  
    return router;
  };
  
  module.exports = annonceAPi;