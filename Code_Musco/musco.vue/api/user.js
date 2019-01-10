const userAPi = function userAPi(connection) {

    const router = require("express").Router();
    const userModel = require("./../model/user")(connection);
    const bcrypt = require("bcrypt");
    const auth = require("./../utils/auth");

  
    // router.post('/user', (req, res) => {
    //   userModel.create((err, dataset) => {
    //     if (err) res.send(err);
    //     res.send(dataset);
    //     console.log("ça poste");
    //   }, req.body); // post datas ici ...
    // });
  
    router.get('/user/:id_user', (req, res) => {
      userModel.get((err, dataset) => {
        if (err) res.send(err);
        res.send(dataset);
      }, req.params.id_user);
    });
  
    // router.get('/user', (req, res) => {
    //   userModel.get( (err, dataset) => {
    //     res.send(dataset);
    //   }, null);
    // });

    router.post("/user/login", (req, res) => {
      console.log("wesh");
      // on récupère l'user par son mail
      userModel.getByMail((err, user) => {
    
        // si erreur interne au serveur, retourner l'erreur au client
        if (err) return res.status(500).send(err);
        // sinon si le mail n'existe pas en bdd, retourner une erreur au client
        else if (!user) return res.status(401).send("unknown mail");

        // sinon  le mail a été trouvé, comparer le password avec son crypt/salt
        bcrypt.compare(req.body.user.mdp, user.mdp).then(function(match) {
          // si le password est invalide, retourner une erreur au client
          if (!match) return res.status(401).send("login failed"); 
      
          // tout est ok => retourner l'objet user (sans password, etc.) au client
          // accompagné d'un token dans l'entête HTTP pour sécuriser l'accès au dashboard.

          user = auth.removeSensitiveInfo(user);
          const token = auth.createToken(user, req.ip);
          return res.header("x-authenticate", token).status(200).send({user, token});

        }).catch(err => {
          console.log("@catch", err)
          res.status(500).send(err);
        }); // si bcrypt a planté, => erreur au client

      }, req.body.user.mail);
    });

    router.post("/user", (req, res) => {
      const { nom, prenom, pseudo, avatar, mail, mdp, soundcloud, youtube, facebook, localisation } = req.body.data;
      const newUser = { nom, prenom, pseudo, avatar, mail, soundcloud, youtube, facebook, localisation };
      console.log(newUser);
      bcrypt.hash(mdp, 10).then(hash => {
        newUser.mdp = hash;
        userModel.create(function (err, result) {
          if (err) return res.status(520).send(err);
          return res.status(201).send(result);
        }, newUser);
      }).catch(err => {
        return res.status(500).send(err);
      });
    });

    router.get("/user", auth.authenticate, (req, res) => {
      // router.get("/user", (req, res) => {
        userModel.getAll((err, users) => {
          if (err) return res.status(520).send(err);
          // si pas d'erreur sql, on retourne un status 200 accompagné des users sans les mots de passe et les mails (removeSensitiveInfo)
          return res.status(200).send(users.map(user => {
            // noter l'utilisation de la valeur de retour de array.map
            return auth.removeSensitiveInfo(user);
          }));
        });
      });
  
    router.delete('/user', (req, res) => {
      userModel.remove((err, dataset) => {
        console.log("ça va del ou pas");
        if (err) return res.status(500).send(err);
        return res.status(200).send(dataset);
      }, req.body.id_user); // tableau d'ids ici ...
    });
  
    router.patch('/user', (req, res) => {
      userModel.update((err, dataset) => {
        if (err) return res.status(500).send(err);
        else return res.status(200).send(dataset);
      }, req.body); // un tableau d'ids ici ...
    });
  
    return router;
  };
  
  module.exports = userAPi;