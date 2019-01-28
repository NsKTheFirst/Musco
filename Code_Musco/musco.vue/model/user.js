const userModel = function userModel(connection) {

  // const auth = require("./../utils/auth");
  const table = "users";
    // Requête de création
    // const create = function createUser(clbk, data) {
    //   const sql = "INSERT INTO users (nom, prenom, pseudo, mdp, mail, avatar, soundcloud, youtube, facebook, localisation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    //   const payload = [data.nom, data.prenom, data.pseudo, data.mdp, data.mail, data.avatar, data.soundcloud, data.youtube, data.facebook, data.localisation];
  
    //   connection.query(sql, payload, (err, res) => {
    //     // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
    //     if (err) return clbk(err, null);
    //     return clbk(null, res);
    //   });
    // };

    const create = function createUser(clbk, payload) {
      const sql = `INSERT INTO ${table} (nom, prenom, pseudo, mdp, mail, avatar, soundcloud, youtube, facebook, localisation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const { nom, prenom, pseudo, avatar, mail, mdp, soundcloud, youtube, facebook, localisation } = payload;
      const query = connection.query(
        sql,
        [nom, prenom, pseudo, mdp, mail, avatar, soundcloud, youtube, facebook, localisation],
        (err, res) => {
          if (err) return clbk(err, null);
          console.log(query.sql);
          return clbk(null, res);
        }
      );
      console.log("last db query =>", query.sql);
    };
  
    // Requête de suppression
    const remove = function deleteUser(clbk, id_user) {
      // la clause SQL IN permet de chercher une valeur dans un tableau
      const sql = "DELETE FROM users WHERE id_user = ?";
      console.log(sql + " " + id_user);

  
      connection.query(sql, id_user, function (err, res) {
        // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
        if (err) return clbk(res, null);
        return clbk(null, res);
      });
    };
  
    // Requête de mise à jour
    const update = function editUser(clbk, users) {
      const sql = "UPDATE users SET nom = ?, prenom = ?,pseudo = ?, mdp = ?, mail = ?, avatar = ?, presentation = ?, soundcloud = ?, youtube = ?, facebook = ?, localisation = ? WHERE id_user = ?";
      const payload = [users.nom, users.prenom,users.pseudo, users.mdp, users.mail, users.avatar, users.presentation, users.soundcloud, users.youtube, users.facebook, users.localisation, users.id_user];
      connection.query(sql, payload, function (err, res) { //retrait de fields dans les paramètres
        // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
        if (err) return clbk(err, null);
        return clbk(null, res);
      });
    };
  
    // Requête de récupération par id
    const get = function getFullUser(clbk, id_user) {
      let sql;
      if (id_user && !isNaN(id_user)) {
        sql = "SELECT *, m.date AS 'date', m.sujet, m.message, m.id_emetteur, a.annonce, a.date as 'a_date', ufu.id_user_followed FROM users AS u LEFT JOIN messages AS m ON u.id_user = m.id_receveur LEFT JOIN annonces AS a ON u.id_user = a.id_annonce_owner LEFT JOIN user_follows_user AS ufu ON u.id_user = ufu.id_user_followed WHERE u.id_user = ?";
      } else {
        sql = "SELECT * FROM users";
      }
      connection.query(sql, [id_user], (error, results) => {
        // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
        if (error) return clbk(error, null);
        return clbk(null, results);
      });
    };

    // Requête de récupération par mail
    const getByMail = function getUserByMail(clbk, mail) {
      const sql = `SELECT *, m.date AS 'date', m.sujet, m.message, m.id_emetteur, a.annonce, a.date as 'a_date', ufu.id_user_followed FROM ${table} AS u LEFT JOIN messages AS m ON u.id_user = m.id_receveur LEFT JOIN annonces AS a ON u.id_user = a.id_annonce_owner LEFT JOIN user_follows_user AS ufu ON u.id_user = ufu.id_user_followed WHERE u.mail = ?`;
      const q = connection.query(sql, mail, (err, user) => {
        if (err) return clbk(err, null);
        return clbk(null, ...user);
      });
      console.log(q.sql);
    };

    // ********* Requêtes sur la table user_follow_user *********
    // Requête de récupération
    const getUfu = function getUfu(clbk, id_following_user) {
      const sql = "SELECT ufu.id_ufu, ufu.id_following_user, ufu.id_user_followed, users.avatar, users.pseudo FROM `user_follows_user` AS ufu LEFT JOIN users ON users.id_user = ufu.id_user_followed WHERE ufu.id_following_user = ?";
      connection.query(sql, id_following_user, (err, results) => {
        if (err) return clbk(err, null);
        return clbk(null, results);
      });
    };

    // Requête d'envoi
    const createUfu = function createUfu(clbk, data) {
      const sql = "INSERT INTO user_follows_user (id_following_user, id_user_followed) VALUES (?, ?)";
      const payload = [data.id_following_user, data.id_user_followed];
      connection.query(sql, payload, (err, results) => {
        if (err) return clbk(err, null);
        return clbk(null, results);
      });
    };

    // Requête de suppression
    const removeUfu = function removeUfu(clbk, id_ufu) {
      const sql = "DELETE FROM user_follows_user WHERE id_ufu = ?";
      connection.query(sql, id_ufu, (err, results) => {
        if (err) return clbk(err, null);
        return clbk(null, results);
      });
    };
  
    return {
      create,
      remove,
      update,
      get,
      getByMail,
      getUfu,
      createUfu,
      removeUfu
    };
  };
  
  module.exports = userModel;