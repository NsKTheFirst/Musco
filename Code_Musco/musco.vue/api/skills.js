const skillsAPi = function skillsAPi(connection) {

    const router = require("express").Router();
    const skillsModel = require("./../model/skills")(connection);

    router.get('/skills', (req, res) => {
        skillsModel.get((err, dataset) => {
          if (err) return res.status(500).send(err);
          return res.status(200).send(dataset);
        }, null);
    });
    
    router.get('/skills/:id_skill', (req, res) => {
        skillsModel.get((err, dataset) => {
          if (err) return res.status(500).send(err);
          else return res.status(200).send(dataset);
        }, req.params.id_skill);
    });

    router.get('/annonce_needs_skills', (req, res) => {
        skillsModel.getAns((err, dataset) => {
            if (err) return res.status(500).send(err);
            else return res.status(200).send(dataset);
        }, null);
    });

    router.get('/annonce_needs_skills/:id_annonce_skill', (req, res) => {
        skillsModel.getAns((err, dataset) => {
            if (err) return res.status(500).send(err);
            else return res.status(200).send(dataset);
        }, req.params.id_annonce_skill);
    })
    
    router.post('/annonce_needs_skills', (req, res) => {
        skillsModel.create((err, dataset) => {
          if (err) return res.status(500).send(err);
          else console.log("ça poste");
          return res.status(200).send(dataset);  
        }, req.body); // post datas ici ...
    });

    router.delete('/annonce_needs_skills', (req, res) => {
        console.log(req.body);
        skillsModel.remove((err, dataset) => {
          console.log("ça va del ou pas");
          if (err) return res.status(500).send(err);
          return res.status(200).send(dataset);
        }, req.body.id_annonce_skill); // tableau d'ids ici ...
    });

    router.patch('/annonce_needs_skills', (req, res) => {
        skillsModel.update((err, dataset) => {
          if (err) return res.status(500).send(err);
          else return res.status(200).send(dataset);
        }, req.body); // un tableau d'ids ici ...
    });

    return router;
};

module.exports = skillsAPi