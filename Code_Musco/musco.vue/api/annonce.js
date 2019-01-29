const annonceAPi = function annonceAPi(connection) {

    const router = require("express").Router();
    const annonceModel = require("./../model/annonce")(connection);
  
    router.post('/annonces', (req, res) => {
      annonceModel.create((err, dataset) => {
        if (err) return res.status(500).send(err);
        else console.log("ça poste");
        return res.status(200).send(dataset);  
      }, req.body); // post datas ici ...
      console.log(req.body);
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

    router.get('/annonces/owner/:id_annonce_owner', (req, res) => {
      annonceModel.get((err, dataset) => {
        if (err) return res.status(500).send(err);
        else return res.status(200).send(dataset);
      }, req.params.id_annonce_owner);
    });

    router.get('/annonces/simple_owned/:id_annonce_owner', (req, res) => {
      annonceModel.getOsa((err, dataset) => {
        if (err) return res.status(500).send(err);
        else return res.status(200).send(dataset);
      }, req.params.id_annonce_owner);
    });
  
    router.get('/annonces', (req, res) => {
      annonceModel.getAll((err, dataset) => {
        if (err) return res.status(500).send(err);
        else return res.status(200).send(dataset);
      }, null);
    });

    router.get('/annonces/categorie/:categorie', (req, res) => {
      annonceModel.getByCat((err, dataset) => {
        console.log(dataset);
        if (err) return res.status(500).send(err);
        else return res.status(200).send(dataset);
      }, req.params.categorie);
    });

    router.get('/annonces/skill/:skill', (req, res) => {
      annonceModel.getBySkill((err, dataset) => {
        console.log(dataset);
        if (err) return res.status(500).send(err);
        else return res.status(200).send(dataset);
      }, req.params.skill);
    });
  
    router.delete('/annonces', (req, res) => {
      console.log(req.body);
      annonceModel.remove((err, dataset) => {
        console.log("ça va del ou pas");
        if (err) return res.status(500).send(err);
        return res.status(200).send(dataset);
      }, req.body.id_annonce); // tableau d'ids ici ...
    });
  
    router.patch('/annonces', (req, res) => {
      console.log(req.body);
      annonceModel.update((err, dataset) => {
        if (err) return res.status(500).send(err);
        else return res.status(200).send(dataset);
      }, req.body); // un tableau d'ids ici ...
    });
  
    return router;
  };
  
  module.exports = annonceAPi;